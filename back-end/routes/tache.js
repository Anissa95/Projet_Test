const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tacheCtrl = require("../controllers/tache");

//les routers
router.get("/", auth, tacheCtrl.getAllTache);
router.get("/:id", auth, tacheCtrl.getOneTache);
router.post("/", auth, tacheCtrl.createTache);
router.put("/:id", auth, tacheCtrl.updateTache);
router.delete("/:id", auth, tacheCtrl.deleteTache);

module.exports = router;