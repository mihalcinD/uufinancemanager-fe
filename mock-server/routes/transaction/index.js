const express = require("express");
const router = express.Router();

router.get("/list", (_req, _res)=> {
    _res.json([{
        id: "RQUJEJ4DDOQSN4E9YMN2LPY5",
        creatorId: "0YETAEBJMWBCIPL6HU8LHAW2",
        parentId: "YVN1UOY5TTKAT9HRERHK2TSN",
        tags: ["KTKBU98SFRHK2KSO0YETA52A", "MWB39PM68U8CHAW2315LQVGP"],
        value: 2000,
        description: "Prodal jsem hotdog",
        counterpartId: null
    },{
        id: "OZ24YFQLAXZDX0A7V5MM5BK3",
        creatorId: "0YETAEBJMWBCIPL6HU8LHAW2",
        parentId: "YVN1UOY5TTKAT9HRERHK2TSN",
        tags: ["KTKBU98SFRHK2KSO0YETA52A", "MWB39PM68U8CHAW2315LQVGP"],
        value: -3000,
        description: "Kopil jsem hotdog",
        counterpartId: null
    }])
})
router.get("/:id", (_req, _res)=> {
    _res.json({
        id: "RQUJEJ4DDOQSN4E9YMN2LPY5",
        creatorId: "0YETAEBJMWBCIPL6HU8LHAW2",
        parentId: "YVN1UOY5TTKAT9HRERHK2TSN",
        tags: ["KTKBU98SFRHK2KSO0YETA52A", "MWB39PM68U8CHAW2315LQVGP"],
        value: 2000,
        description: "Prodal jsem hotdog",
        counterpartId: null
    })
})
router.patch("/:id", (_req, _res)=> {
    _res.json({
        id: "RQUJEJ4DDOQSN4E9YMN2LPY5",
        creatorId: "0YETAEBJMWBCIPL6HU8LHAW2",
        parentId: "YVN1UOY5TTKAT9HRERHK2TSN",
        tags: ["KTKBU98SFRHK2KSO0YETA52A", "MWB39PM68U8CHAW2315LQVGP"],
        value: 2489,
        description: "Prodal jsem hotdog (upraveno)",
        counterpartId: null
    })
})
router.delete("/:id", (_req, _res)=> {
    _res.send()
})

module.exports = router;