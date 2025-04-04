# Animal Shleter

## [See the App!](www.your-deploy-url-here.com)

![App Logo](https://res.cloudinary.com/dh8naz2ht/image/upload/v1743757502/animal-shelter-app/zd0ei0nkli6iha3yhb0y.jpg)

## Description

Website created with React, which provides a list of animals available for adoption by type and pages with details about each one, as well as a list of events in which customers can participate. In addition to viewing the list, the administrator can add, delete, or edit elements.

#### [Client Repo here](https://github.com/xMrAvocado/animal-shelter-client)
#### [Server Repo here](https://github.com/xMrAvocado/animal-shelter-server)

## Backlog Functionalities

**Animals pagination for better order and a profile page for the user**

## Technologies used

**HTML, CSS, Javascript, React, axios, React Context, Cloudinary, Nodemailer**

# Server Structure

## Models

User model

```javascript
{
  name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
}
```

Animal model

```javascript
 {
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
 }
```

Event model

```javascript
 {
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
        default:[]} 
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                                                         | Success status | Error Status | Description                                 |
| ----------- | --------------------------- | -------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}                                              | 201            | 400          | Registers the user in the Database          |
| POST        | `/auth/login`               | {name, password}                                                     | 200            | 400          | Validates credentials, creates and sends Token|
| GET         | `/auth/verify`              |                                                                      | 200            | 401          | Verifies the user Token                     |
| GET         | `/animals`                  |                                                                      | 200            | 400          | Show animals in the DB, only name and images|
| GET         | `/events`                   |                                                                      | 200            | 400          | Show events in the DB, only title and date  |
| POST        | `/animals`                  | {name, type, description, age, gender, race, img, interested, userId}| 201            | 400          | Creates a new animal Document               |
| POST        | `/events`                   | {name, date, time, description, participants, userId}                | 201            | 400          | Creates a new event Document                |
| GET         | `/animals/:animalId`        |                                                                      | 200            | 400, 401     | Sends all animal Details                    |
| GET         | `/events/:eventId`          |                                                                      | 200            | 400, 401     | Sends all event Details                     |
| PUT         | `/animals/:animalId`        |                                                                      | 200            | 400, 401     | Edits animal document                       |
| PUT         | `/events/:eventId`          |                                                                      | 200            | 400, 401     | Edits event document                        |
| DELETE      | `/animals/:animalId`        |                                                                      | 200            | 401          | Deletes animal document                     |
| DELETE      | `/events/:eventId`          |                                                                      | 200            | 401          | Deletes event document                      |
| PATCH       | `/animals/:animalId`        | {interested}                                                         | 200            | 401          | Adds an user to the interested list         |
| PATCH       | `/events/:eventId`          | {participants}                                                       | 200            | 401          | Adds an user to the participants list       |
  
## Links

### Project

[Repository Link Client](https://github.com/xMrAvocado/animal-shelter-client)

[Repository Link Server](https://github.com/xMrAvocado/animal-shelter-server)

[Deploy Link](https://animalshelterapp.netlify.app/)