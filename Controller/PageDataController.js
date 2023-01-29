const express = require("express");
const router = express.Router();
const { getList } = require("../Service/PageDataService")

router.get("/getList", async (req, res) => {
    try {
        const response = await getList(req.query.page)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;