var express= require('express');
var app=express();
var router=require('./controller/router.js');

app.use(router);
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:false}));

app.listen(8080,()=>{
  console.log("hii");
});