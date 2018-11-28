var express = require("express");

var router = express.Router();

// Import the model (burrito.js) to use its database functions.
var burrito = require("../models/burrito.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burrito.all(function(data) {
    var hbsObject = {
      burritos: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burritos", function(req, res) {
  burrito.create([
    "bitchin_name", "consumed"
  ], [
    req.body.bitchin_name, req.body.consumed
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burritos/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burrito.update({
    consumed: req.body.consumed
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burritos/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burrito.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
