const express = require("express");
const router = express.Router();

router.get("/list", (_req, _res)=> {
    _res.json([{
        id: "NKCQKDNUII9ZIY6G4G69RIHC",
        householdId: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Můj spočící cíl",
        goal: 10000,
        balance: 8329
    },{
        id: "PN3IZ308BL017EAV6JXA6ZLR",
        householdId: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Můj spočící cíl 2",
        goal: 10000,
        balance: 6327
    }])
})
router.get("/:id", (_req, _res)=> {
    _res.json({
        id: "NKCQKDNUII9ZIY6G4G69RIHC",
        householdId: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Můj spočící cíl",
        goal: 10000,
        balance: 8329
    })
})
router.patch("/:id", (_req, _res)=> {
    _res.json({
        id: "NKCQKDNUII9ZIY6G4G69RIHC",
        householdId: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Můj upravený spočící cíl",
        goal: 15000,
        balance: 9000
    })
})
router.delete("/:id", (_req, _res)=> {
    _res.send()
})

module.exports = router;