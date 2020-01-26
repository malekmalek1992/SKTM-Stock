//jshint esversion:6
//require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

//  app.use(express.static('build'));
//  app.get("/*",function(req,res){
//    res.sendFile(path.resolve(__dirname, 'build','index.html'));
//  }) 

// app.get('/', (req, res) => {
//   res.sendFile(__dirname, 'build', 'index.html');
// }); 
//app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//mongoose.set("useCreateIndexes", true);
mongoose.connect('mongodb+srv://admin-malek:12345@cluster0-nxgor.mongodb.net/toolsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//******************************************Shcema model for employee ********************** */

const employeeShcema ={
  name:String
};
const Employee = new mongoose.model("Employee",employeeShcema);
// const employee = new Employee({
//   name:"1111"
// })
// employee.save();

//******************************************Shcema model for the items collections********************** */

const listShcema = {
  name: String,
  stock: Number,
  reference:String,
  contract:String,
  location: String,
  description:String
};
const P1List = new mongoose.model("P1List", listShcema);  ///collection for plant 1
const P2List = new mongoose.model("P2List",listShcema);/// collection for plant 2
 
  
//***********************************************schema for the users collection************************* */
const userSchema =new mongoose.Schema( {
  username : String,
  password: String
})
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);// collection for the users  
// const user= new User({
//   username : "0000",
//   password:"0000"
// })
// user.save();
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

///***********************************schema for order request*********** */
const orderShcema = {
  fromPlant: String,
  employeeID:String,
  name1: String,
  quantity1:Number,
  name2: String,
  quantity2:Number,
  name3: String,
  quantity3:Number
};
const Order1 = new mongoose.model("Order1", orderShcema);// Orders Colletion for plant 1
const Order2 = new mongoose.model("Order2", orderShcema);// Orders Colletion for plant 2

///**** *************** Adding employee  *************************************//

app.post("/add",function(req,res){
  const name=req.body.name;
  Employee.findOne({name:name},function(err,user){
    if(user){
      res.json(true)
    } else {
      const employee = new Employee({
        name:name
      })
      employee.save();
      res.json(false);
      
    }
  });
  

})
//*****************************************************************Hnadling Users *********************************/ 

///**** *************** handling regestration ****************************/

app.post("/register", function(req, res){
  Employee.findOne({name:req.body.username},function(err,employee){
    if(!err){
      User.register({username: employee.name }, req.body.password, function(err, user){
              if (err) { 
                console.log(err);
                res.json(false);
              } else {
                passport.authenticate("local")(req, res, function(){
                  res.json(true)
                });
              }
            });
         
    } else {
      res.json(false);
    }
  })
});

//**************************** handling login *********************************/

app.post("/login", function(req, res){
  var isRegisterd = true ;
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      res.json("user not found");
    } else {
      passport.authenticate("local")(req, res, function(err){
        if(!err){
          res.json(isRegisterd)
        }else {
          res.json("user not found");
        }
        
      });
    }
  });

});

////***************************** handling Logout *****************/

app.get("/logout", function(req, res){
  var isRegisterd = false ;
  req.logout();
  res.json(isRegisterd);

//***************************************************** deleteing  User ******************* */

app.post("/userDelete",function(req,res){

  User.deleteOne({ username: req.body.name }, function (err) {    //// deleting from Users collection
    if(!err){
      Employee.deleteOne({ name: req.body.name }, function (err) { //// deleting from Employees collections 
        if(!err){
           res.json("employee deleted")
          }
      });
      }
  });
  
});
});

//***************************************************************Hnadling items ****************************************/

//**************************************** handling get request  ******************************** */

app.get("/:plantName/get", function(req, res) {
  const plantName =req.params.plantName;
  if(plantName === "plant1"){
    P1List.find(function(err, items) {
      if (!err) {
        res.json(items);
      }})
  } else if( plantName === "plant2"){
  P2List.find(function(err, items) {
    if (!err) {
      res.json(items);
    }})
  }
});

//******************************************handling add request ***************************** */

app.post("/:plantName/add", function(req, res) {
  const plantName=req.params.plantName;
  const itemName = req.body.name;
  const itemQuantity = req.body.stock;
  const reference = req.body.reference;
  const location = req.body.location;
  const contract = req.body.contract;
  const description = req.body.description
 if (plantName === "plant1"){
  const list = new P1List({
    name: itemName,
    stock: itemQuantity,
    reference: reference,
    location:location,
    contract:contract,
    description:description
  });
   list.save();
   res.json(list)
} else if(plantName === "plant2"){
  const list = new P2List({
    name: itemName,
    stock: itemQuantity,
    reference: reference,
    location:location,
    contract:contract,
    description:description
  });
   list.save();
   res.json(list)
   }
});
app.get("/operation", function(req, res) {
  res.render("operation");
});
//***********************************   Handling Update request **************************/

app.post("/:plantName/update", function(req, res) {
  const plantName= req.params.plantName;
  const id = req.body._id;
  const itemName = req.body.name;
  const itemQuantity = req.body.stock;
  const reference = req.body.reference;
  const location = req.body.location;
  const contract = req.body.contract;
  const description = req.body.description
  if (plantName === "plant1"){
    P1List.findOneAndUpdate({
    _id: id
  }, {
    name: itemName,
    stock: itemQuantity,
    reference: reference,
    location:location,
    contract:contract,
    description:description
  }, function(err, item) {
    if (!err) {
      P1List.find(function(err, items) {
        if (!err) {
          res.json(items);
        }})
    }
    else{
      console.log("No item with this name");
    }
  });
} else if(plantName === "plant2") {
  P2List.findOneAndUpdate({
    _id: id
  }, {
    name: itemName,
    stock: itemQuantity,
    reference: reference,
    location:location,
    contract:contract,
    description:description
  }, function(err, item) {
    if (!err) {
      P2List.find(function(err, items) {
        if (!err) {
          res.json(items);
        }})
    }
    else{
      console.log("No item with this name");
    }
  });
}
});

//********************************************** handling delete request ********************************* */

app.post("/:plantName/delete",function(req,res){
  const plantName = req.params.plantName;
  const _id = req.body._id;
  if(plantName === "plant1"){
    P1List.findByIdAndRemove(_id,function(err){
      if(!err){
        P1List.find(function(err, items) {
          if (!err) {
            res.json(items);
          }})
      } else{
        res.send(err);
      } 
    })
  } else if(plantName === "plant2"){
    P2List.findByIdAndRemove(_id,function(err){
      if(!err){
        P2List.find(function(err, items) {
          if (!err) {
            res.json(items);
          }})
      } else{
        res.send(err);
      }
    })
  }
})

//********************************************handling orders ********************* *************************/

// ******************** handling get orders for each plant ************************//

app.get("/:plantName/order",function(req,res){

  const plantName =req.params.plantName;
  if(plantName === "plant1"){
    Order1.find(function(err, items) {
      if (!err) {
        res.json(items);
      }})
  } else if( plantName === "plant2"){
  Order2.find(function(err, items) {
    if (!err) {
      res.json(items);
    }})
  }
});

//************************************************* Post and filtering  order  ********************/

app.post("/order",function(req,res){
  const toPlant= req.body.toPlant;
  const fromPlant = req.body.fromPlant;
  const employeeID = req.body.employeeID;
  const name1 = req.body.item1.name;
  const quantity1= req.body.item1.quantity;
  const name2 = req.body.item2.name;
  const quantity2= req.body.item2.quantity;
  const name3 = req.body.item3.name;
  const quantity3= req.body.item3.quantity;
  if (toPlant === "Plant1"){
    const order = new Order1({
      fromPlant: fromPlant,
      employeeID:employeeID,
      name1: name1,
      quantity1:quantity1,
      name2: name2,
      quantity2:quantity2,
      name3: name3,
      quantity3:quantity3,
    });
  order.save();
   res.json(true);
  }else if (toPlant === "Plant2"){
    const order = new Order2({
      fromPlant: fromPlant,
      employeeID:employeeID,
      name1: name1,
      quantity1:quantity1,
      name2: name2,
      quantity2:quantity2,
      name3: name3,
      quantity3:quantity3,
    });
     order.save();
   res.json(true);
  }
  
})

//*************************************** Deleting Orders *************************************** */

app.post("/:plantName/deleteOrder",function(req,res){
  const plantName = req.params.plantName;
  const _id = req.body._id;
  if(plantName === "plant1"){
    Order1.findByIdAndRemove(_id,function(err){
      if(!err){
        Order1.find(function(err, items) {
          if (!err) {
            res.json(items);
          }})
      } else{
        res.send(err);
      }
    })
  } else if(plantName === "plant2"){
    Order2.findByIdAndRemove(_id,function(err){
      if(!err){
        Order2.find(function(err, items) {
          if (!err) {
            res.json(items);
          }})
      } else{
        res.send(err);
      }
    })
  }
})

if(process.env.NODE_ENV ==="production"){
  app.use(express.static('client/build'));
 app.get("*",function(req,res){
   res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
 }) 
}
app.listen(process.env.PORT || 5000, function() {
  console.log("Server started on port 5000");
});    
