const express = require("express");
const router = express.Router();

router.get("/list", (_req, _res) => {
    _res.json([
        {
            id: "YVN1UOY5TTKAT9HRERHK2TSN",
            name: "Moje domácnost",
            balance: 3783,
            ownerId: "0YETAEBJMWBCIPL6HU8LHAW2",
            membersIds: [
                "214UPUFOOZ13YFPK9XYDWZ9G",
                "V4VM5KJ3Q2SVDV3ZB9P4LGDL",
            ],
        },
        {
            id: "X7MDK0XHI5JNSL7DECGW16R0",
            name: "Moje domácnost 2",
            balance: 6733,
            ownerId: "0YETAEBJMWBCIPL6HU8LHAW2",
            membersIds: [
                "214UPUFOOZ13YFPK9XYDWZ9G",
                "V4VM5KJ3Q2SVDV3ZB9P4LGDL",
            ],
        },
    ]);
});
router.get("/:id", (_req, _res) => {
    _res.json({
        id: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Moje domácnost",
        balance: 3783,
        ownerId: "0YETAEBJMWBCIPL6HU8LHAW2",
        membersIds: ["214UPUFOOZ13YFPK9XYDWZ9G", "V4VM5KJ3Q2SVDV3ZB9P4LGDL"],
    });
});
router.patch("/:id", (_req, _res) => {
    _res.json({
        id: "YVN1UOY5TTKAT9HRERHK2TSN",
        name: "Moje upravená domácnost",
        balance: 10000,
        ownerId: "214UPUFOOZ13YFPK9XYDWZ9G",
        membersIds: ["0YETAEBJMWBCIPL6HU8LHAW2"],
    });
});
router.delete("/:id", (_req, _res) => {
    _res.send();
});

module.exports = router;
