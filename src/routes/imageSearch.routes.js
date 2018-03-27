var routes = function (app) {
  app.get("/", function (req, res) {
    return res.send("Server is working")
  })
  app.get("/imagesearch/:input", function (req, res) {

  });

  app.get("/searchhistory", function (req, res) {

  });
}

module.exports = routes
