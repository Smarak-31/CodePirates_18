import express from "express";
import bcrypt from "bcrypt";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,doc,collection,setDoc,getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOy2RBwc1zCuVg_3_sWiy2XsIiJy2DDTs",
  authDomain: "website-19bfc.firebaseapp.com",
  projectId: "website-19bfc",
  storageBucket: "website-19bfc.appspot.com",
  messagingSenderId: "568461186241",
  appId: "1:568461186241:web:36c1a2fa0a14efc3d13040",
  measurementId: "G-N9GS9HBEJH"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db=getFirestore();
const analytics = getAnalytics(app);


//init server
const app= express();
//middlewares
app.use(express.static("public"));
app.use(express.json())//enables form sharing
//routes
//home route
app.get('/',(req,res) => {
    res.sendFile("index.html",{root:"pubic"})

})
//signup
app.get('/signup',(req,res)=> {
    res.sendFile("signup.html",{root:"public"})
})
app.post('/signup',(req,res) =>{
    const{name,email,password,number,tac}=req.body;
    // form validations
if (name.length<3){
    res.json({'alert':'name must be 3 letters long'});
}else if(!email.length){
    res.json({'alert':'enter ur email'});
}else if (password.length<8){
    res.json({'alert':'password must be 8 letters long'});
}else if (!Number(number)||number.length<10){
    res.json({'alert':'invalid number ,please  enter valid number'});
}else if(!tac){
    res.json({'alert':'you must agree  to our terms and conditions'});
}else{
    //store the datain db
    const users=collection(db,"users");
    getDoc(doc(users,email)).then(user=>{
        if(user.exists()){
            return res.json({'alert':'email already exists'})

        }else{
            //encrypt the password
            bcrypt.genSalt(10,(_err,salt) =>{
                bcrypt.hash(password,salt,(_err,hash)=>{
                    req.body.password=hash;
                    req.body.seller=false;
                    //set the doc
                    setDoc(doc(users,email),req.body).then(_data=>{
                        res.json({
                            name:req.body.name,
                            email:req.body.email,
                            seller:req.body.seller,
                        })
                    })
                })
            })
        }
    
    })}
app.get('/login',(req,res)=>{
    res.sendFile("login.html",{root:"public"})

})

// 404 route
app.get('/404', (req,res) => {
    res.sendFile("404.html",{root:"public"})
})
app.use((req,res) =>{
    res.redirect('/404')
})
//routes
//home routes
app.get('/',(req,res) =>{
    res.sendFile("index.html",{root:"public"})
})
app.listen(3000,()=>{
    console.log('listening on port  3000');
})})
