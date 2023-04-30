const express = require("express");
const router= express.Router()
const {CreateUser,userLogin}= require("../controller/userController");
const {authentication}= require("../middleware/middleware");
const {createItinerary,editItinerary,editActivity,getItinerary,addDestination} = require("../controller/itineraryController")


router.get("/test-me",(req,res)=>{
    return res.send({status:true,message:"1 st api is working"})
})

router.post("/signUp",CreateUser);
router.post("/signIn",userLogin);
router.post("/createItinerary",authentication,createItinerary);
router.get("/getAllTravels",authentication, getItinerary); 

router.put("/addDestination/:itineraryId", authentication, addDestination)

router.put("/editDes/:itineraryId/:destinationId", authentication, editItinerary)

router.put("/editDes/:itineraryId/:destinationId/:activityId", authentication, editActivity )

router.all("*",(req,res)=>{
    return res.status(400).send({status:false,message:"invalid http request"})
})

module.exports = router