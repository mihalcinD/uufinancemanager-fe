const express = require("express");
const router = express.Router();

router.get("/list", (_req, _res)=> {
    _res.json([])
})
router.get("/:id", (_req, _res)=> {
    _res.json({})
})
router.patch("/:id", (_req, _res)=> {
    _res.json({})
})
router.delete("/:id", (_req, _res)=> {
    _res.send()
})

module.exports = router;