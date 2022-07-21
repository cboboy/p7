const express = require("express");

const userCtrl = require("../controllers/user");
const jwtCheck = require("../middleware/jwtCheck");

let router = express.Router();

router.get("/", userCtrl.getAllUsers);

router.get("/:id", userCtrl.getUser);

router.put("", userCtrl.addUser);

router.patch("/:id", jwtCheck, userCtrl.updateUser);

router.post("/untrash/:id", jwtCheck, userCtrl.untrashUser);

router.delete("/trash/:id", jwtCheck, userCtrl.trashUser);

router.delete("/:id", jwtCheck, userCtrl.deleteUser);

module.exports = router;
