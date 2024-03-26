const express=require("express")
const {
   handleGenerateNewShortUrl ,
   handleGetAnalytics,handleVIsitHistoryAndUpdate
}=require("../controllers/url")
const router = express.Router();


router.post('/',handleGenerateNewShortUrl)

router.get('/:shortId',handleVIsitHistoryAndUpdate)

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;