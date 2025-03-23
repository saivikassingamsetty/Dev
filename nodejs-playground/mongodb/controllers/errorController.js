const handleDevErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTree: error.stack,
    error: error,
  });
};

const handleProdErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something Went Wrong, please try again",
    });
  }
};

export const errorController = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    handleDevErrors(res, error);
  } else {
    handleProdErrors(res, error);
  }
};
