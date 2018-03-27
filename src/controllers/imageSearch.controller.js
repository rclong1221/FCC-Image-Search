const googleSearch = require('../../lib/search.js')

var q = [];

class ImageSearch {
  static search(req, res) {
    let query = req.params.input;
    let offset = req.query.offset || 1;

    q.push({"searchTerm": query, "when": new Date()});

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
