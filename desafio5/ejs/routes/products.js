const express = require("express");
const router = express.Router();

const Manager = require("../manager");
const manager = new Manager();

router.get("/", (req, res) => {
  let products = manager.findAll();
  res.render('get-products', {
    products
  })
})

// router.get("/:id", (req, res) => {
//   let result = manager.findById(req.params.id);
//   if (!result)
//     return res.send({
//       error: "No encontre el producto",
//     });
//   res.send(result);
// });S

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail)
    return res.send({
      error: "Necesito la data",
    });
  manager.create(req.body);
  res.redirect('/');
});

// router.put("/:id", (req, res) => {
//   if (!req.body.title || !req.body.price || !req.body.thumbnail)
//     return res.send({
//       error: "Necesito la data",
//     });
//   let result = manager.update(req.params.id, req.body);
//   if (!result)
//     return res.send({
//       error: "No encontre el producto",
//     });
//   res.send(result);
// });

// router.delete("/:id", (req, res) => {
//   let result = manager.delete(req.params.id);
//   res.send(result);
// });

module.exports = router;
