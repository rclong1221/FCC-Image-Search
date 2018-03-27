const googleSearch = require('../../lib/search.js')

const Image = require('../models/imageSearch.model.js')

var q = [];

class ImageSearch {
  static saveSearch(q) {
    let data = new Image({query: q})
    data.save(function (err) {
      if (err) console.error(err)
    })
  }
  static getSearches(res) {
    Image.find(function(err, data){
      if (err) console.error(err)
      else {
        let d = []
        data.forEach((item) => {
          d.push({
            "term": item.query,
            "when": item.createdAt
          })
        })
        res.json(d)
      }
    })
  }
  static search(req, res) {
    let query = req.params.input;
    let offset = req.query.offset || 1;

    // q.push({"searchTerm": query, "when": new Date()});

    this.saveSearch(query)

    googleSearch.build({
      fileType: "jpg",
      imgSize: "small",
      q: query,
      lr: "lang_en",
      num: offset,
      searchType: "image",
      start: 1,
    }, function(error, response) {
      if (error) res.send("Search error");
      else {
        let i = [];
        response.items.forEach((item) => {
          i.push({
            "url": item.link,
            "snippet": item.snippet,
            "thumbnail": item.image.thumbnailLink,
            "context": item.displayLink
          })
        })

        res.send(i);
      }
    });
  }
  static getSearchHistory(req, res) {
    // return res.send(q);
    this.getSearches(res)
  }
}

module.exports = ImageSearch
