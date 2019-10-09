const express = require('express');
const user = require('./../db/models').userModel;
const router = express.Router();

router.get('/',(req, res) =>{
    console.log("Hey Its connected");
    res.send("recieving");
});

router.post('/register', (req, res) => {
    user.create({
        Password: req.body.Password,
        Email: req.body.Email
    })
    .then(() => {
        res.send({bool:true});
        res.end();
    })
    .catch((err) => {
        console.err("Error While adding User: ", err);
    });
});

router.post('/login', (req, res) => {
    user.find({
        Password: req.body.Password,
        Email: req.body.Email
    })
        .then((data) => {
            if (data.length) res.send({bool:true});
            else res.send({bool:false});
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.send("ERROR204");
        });
});
router.post('/check',(req,res)=>{
    console.log(req.body.Email);
    user.find({
        Email : req.body.Email    
    })
    .then((data)=>{
        console.log(data);
        if(data.length) res.send({bool:false});
        else res.send({bool:true});
    })
});
router.put('/updateUserInfo',(req,res)=>{
    user.updateOne({
        Email: req.body.Email
    },{
        Name:req.body.Name,
        Age:req.body.Age,
        PhoneNo:req.body.Ph,
        Address:req.body.Address
    }).then(()=>{
        res.send('Submitted');
        res.end();
    }).catch((err)=>{
        res.send(err);
    });
});


module.exports = router;