const ImageSearch = require('../controllers/imageSearch.controller.js')

var routes = function (app) {
  app.get("/", function (req, res) {
    return res.send("Server is working")
  })
  app.get("/imagesearch/:input", function (req, res) {
    ImageSearch.search(req, res)
  });

  app.get("/searchhistory", function (req, res) {
    ImageSearch.getSearchHistory(req, res)
  });
}

module.exports = routes
