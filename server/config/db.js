const mongoose = require('mongoose');

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(process.env.MONGODB_URL, dbOptions)
    .then(() => console.log("mongoDB connected ... "))
    .catch(err => console.log(err.message));
