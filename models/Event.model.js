const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const eventSchema = new Schema({

    name: {
        type:String,
        required:[true, "Name is required."]},
    date: {
        type:Date,
        required:[true, "Date is required."]},
    time: {
        type:String,
        required:[true, "Time is required."]},
    description:{
        type:String,
        required:[true, "Description is required."]},
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default:null}
},{
    timestamps: true,
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;