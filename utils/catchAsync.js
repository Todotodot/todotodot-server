module.exports.catchAsync = (asyncFunction) => {
  return async (req, res, next) => {
    try {
      return await asyncFunction(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
