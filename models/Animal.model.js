const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const animalSchema = new Schema({

    name: {
        type:String,
        required:[true, "Name is required."]},
    type: {
        type:String,
        enum:["Dog", "Cat", "Fish", "Bird", "Other"],
        required:[true, "Type is required."]},
    description:{
        type:String,
        required:[true, "Description is required."]},
    age:{
        type:Number,
        required:[true, "Age is required."]},
    gender:{
        type:String,
        enum:["Male", "Female"],
        required:[true, "Gender is required."]},
    race:{
        type:String,
        required:[true, "Race is required."]},
    img: {
        type:String,
        required:[true, "Img is required."]},
    interested: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default:[]
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } 
},{
    timestamps: true,
})

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;