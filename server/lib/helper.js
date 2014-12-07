module.exports = {
  invalidMethodHandler: function(req, res, next) {
    res.send(405, { message: "Method not allowed" });
  },

  errorLogger: function(error, req, res, next) {
    console.error(error.stack);
    next(error);
  },

  errorHandler: function(error, req, res, next) {
    var errorCode = error.status ? error.status : 500;
    res.send(errorCode, {error: error.message});
  }
};