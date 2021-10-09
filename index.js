const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
//To call json file to json object
const userdata = JSON.parse(fs.readFileSync("user.json", "utf8"));

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "home.html");
});
router.get("/home", (req, res) => {
  res.send("This is home router");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
  fs.readFile("./user.json", "utf8", (err, jsonString) => {
    if (err) {
      res.send("File read failed:", err);
      return;
    }
    res.send("This is profile router\n" + jsonString);
    res.end();
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  if (
    userdata.username === req.query.name &&
    userdata.password === req.query.password
  ) {
    res.json({
      status: true,
      message: "User Is valid",
    });
  } else if (userdata.username !== req.query.name) {
    res.json({
      status: false,
      message: "User Name is invalid",
    });
  } else if (userdata.password !== req.query.password) {
    res.json({
      status: false,
      message: "Password is invalid",
    });
  }
  res.end();
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout", (req, res) => {
  res.send(`<b>${userdata.username} successfully logout.</b>`);
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
