// ℹ️ Mongoose (ODM) handles the connection to MongoDB and provides schema-based modeling.
const mongoose = require("mongoose");

// ℹ️ Connects to MongoDB using the URI from environment variables.
mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
