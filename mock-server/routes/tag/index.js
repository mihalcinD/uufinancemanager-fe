const express = require("express");
const router = express.Router();

router.get("/list", (_req, _res)=> {
    _res.json([{
        id: "KTKBU98SFRHK2KSO0YETA52A",
        name: "Útraza za jídlo"
        
    },{
        id: "MWB39PM68U8CHAW2315LQVGP",
        name: "Útraza za nájem"
        
    }])
})
router.get("/:id", (_req, _res)=> {
    _res.json({
        id: "KTKBU98SFRHK2KSO0YETA52A",
        name: "Útraza za jídlo"
        
    })
})
router.patch("/:id", (_req, _res)=> {
    _res.json({
        id: "KTKBU98SFRHK2KSO0YETA52A",
        name: "Útraza za jídlo (upraveno)"
    })
})
router.delete("/:id", (_req, _res)=> {
    _res.send()
})

module.exports = router;