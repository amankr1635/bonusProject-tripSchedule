const itineraryModel = require("../models/itineraryModel");

const createItinerary= async function(req,res){

    let body = req.body
    body.userId=req.decodedToken
    let createData = await itineraryModel.create(body)
    res.status(201).send({status:true,data:createData})


} 

const getItinerary= async function(req,res){
    let userId= req.params.userId

    let getData =await itineraryModel.find(userId)

    return res.status(200).send({status:true,data:getData})

}

const editItinerary = async (req, res) => {
    let userId = req.decodedToken
    let itineraryId = req.params.itineraryId;
    let destinationId = req.params.destinationId;
    let data = req.body;

    let updateObj = {};
    Object.keys(data).forEach(key => {
        updateObj[`travel.$.${key}`] = data[key];
    });

    let editDes = await itineraryModel.findOneAndUpdate(
        { _id: itineraryId, userId: userId, "travel._id": destinationId },
        { $set: updateObj },
        { new: true }
    );

    return res.status(200).send({ status: true, data: editDes });
};

const editActivity = async (req, res) => {
    let userId = req.decodedToken
    let itineraryId = req.params.itineraryId;
    let destinationId = req.params.destinationId;
    let activityId = req.params.activityId
    let data = req.body;
    
    let updateObj = {};
    Object.keys(data).forEach(key => {
        updateObj[`travel.$[destination].activities.$[activity].${key}`] = data[key];
    });

    let editDes = await itineraryModel.findOneAndUpdate(
        { 
            _id: itineraryId, 
            userId: userId
        },
        { 
            $set: updateObj 
        },
        { 
            new: true,
            arrayFilters: [
                { "destination._id": destinationId },
                { "activity._id": activityId }
            ]
        }
    );

    return res.status(200).send({ status: true, data: editDes });
};


const addDestination = async (req, res) => {
    let userId = req.decodedToken
    let data = req.body
    let itineraryId = req.params.itineraryId
    let addDes = await itineraryModel.findOneAndUpdate({ _id: itineraryId, userId: userId }, { $push: { travel: data } }, { new: true })
    return res.status(200).send({ status: true, data: addDes })
}
 

module.exports= {createItinerary,editItinerary,editActivity,getItinerary,addDestination}