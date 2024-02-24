const Product = require("../model/product");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apifeature");

exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  // we can make seprate a method to handle the async error rather than writing try and catch every time
  const resultPerPage = 10;
  console.log("what your query is", req.query.keyword);
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search() // searching logic
    .filter() // filtering login
    .pagination(resultPerPage); // pagination logic

  const productCount = await Product.countDocuments();

  const products = await apiFeature.query;
  console.log("your product is ", products);
  res.status(200).json({
    success: true,
    products: products,
    productCount,
  });
});

exports.createProduct = catchAsyncError(async (req, res, next) => {
  // req.body.user = req.user._id;// we will take in production
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id); //here we are using let instead of const because we will modified this in this block or function
  if (!product) {
    return next(new ErrorHandler("product not found in DB", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    product: product,
    message: "your product is updated",
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});


exports.getSingleProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log("in the single product", product);
  if (!product) {
    return next(new ErrorHandler("Product not  found", 401));
  }

  res.status(200).json({
    success: true,
    product: product,
  });
});





















exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("product is not found in DB", 400));
  }

  const reviews = product.reviews.filter((rev) => {
    return rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const numOfReviews = reviews.length;
  const ratings = avg / reviews.length;

 
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews,
    product,
  });
});
