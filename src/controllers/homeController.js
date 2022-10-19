module.exports = homeController = {
  index: async (req, res, next) => {
    try {
      res.render('index');
    } catch (error) {
      next(error);
    }
  }
}