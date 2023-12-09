const app = require("./app");
const dotenv = require('dotenv')
dotenv.config();


app.listen(5000,function(){
    console.log("Server run @5000");
});