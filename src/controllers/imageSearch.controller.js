const googleSearch = require('../../lib/search.js')

const Image = require('../models/imageSearch.model.js')

var q = [];

class ImageSearch {
  static saveSearch(q) {
    let data = new Image({query: q})
    data.save(function (err) {
      if (err) res.send('Error saving to database')
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
      if (error) return res.send("Search error");
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

        return res.send(i);
      }
    });
  }
  static getSearchHistory(req, res) {
    return res.send(q);
  }
}

module.exports = ImageSearch
