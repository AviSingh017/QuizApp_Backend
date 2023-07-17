const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
},{
    versionKey: false,
});

const Usermodel = mongoose.model("user",Userschema);

module.exports = {Usermodel};