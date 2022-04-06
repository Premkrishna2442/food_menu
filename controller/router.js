const { Router } = require('express');
var express=require('express');
const { append } = require('express/lib/response');
var route=express();
var connection=require('../model/db.js');
// route.use(connection);
route.use(express.urlencoded({extended:false}));
var custname;
route.get('/login',(req,res)=>{
    res.render("login",{msg:""});
});
route.get('/signup',(req,res)=>{
    res.render("signup");
});
route.get('/cust',(req,res)=>{
    res.render("custlogin",{msg:""});
});
route.get('/adminorder',(req,res)=>{
    res.render("adminorders");
})
route.get('/sumcart',(req,res)=>{
    res.render("sumcart",{msg:""});
})
route.get('/viewmenu',(req,res)=>{
    connection.query("select * from food_menu   ;",(err,results)=>{
        if(err)
        console.log(err);
        else
        res.render("viewmenu",{msg:results});
    })
    
});
route.get('/cart',(req,res)=>{
    connection.query("select * from food_cart where cust_id=(?) and status ='notdelivered';",[custname],(err,results)=>{
        if(err)
        console.log(err);
        else
        res.render("cart",{msg:results});
    })
    
});


route.get('/sumprice',(req,res)=>{
    
    connection.query(" select sum(iprice*quantity) as total from food_cart  group by cust_id having cust_id=(?)",[custname],(err,results)=>{
       for(let x in results[0]){
          // console.log(total[x]);
       }
    //    console.log(results[0].total])
        //res.render("sumcart",{msg:results});
      // res.send(results[0]);
    })
})


route.post('/dltfromcart',(req,res)=>{
    var oid=req.body.o_id;
    connection.query("delete from food_cart where o_id=(?)",[oid],(err,results)=>{
        connection.query("select * from food_cart where cust_id=(?) and status ='notdelivered';",[custname],(err,results)=>{
            if(err)
            console.log(err);
            else
            res.render("cart",{msg:results});
        })
    })
})



route.post('/addcart',(req,res)=>{
    var fname=req.body.fname;
    var price=req.body.price;
    var qnty=req.body.qnty;
    var iprice=req.body.iprice;
    connection.query("insert into food_cart (f_name,f_price,quantity,cust_id,iprice) values((?),(?),(?),(?),(?)) ",[fname,price,qnty,custname,iprice],(err,results)=>{
        connection.query("select * from food_cart where cust_id=(?) and status='notdelivered';",[custname],(err,results)=>{
            if(err)
            console.log(err);
            else
            res.render("cart",{msg:results});
        })
    })
})

route.post('/dltfood',(req,res)=>{
    console.log(req.body);
    var o_id=req.body.o_id;
    connection.query("update food_cart set status='delivered' where o_id=(?) ",[o_id],(err,results)=>{
        connection.query("select * from food_cart where status='notdelivered'",(err,results)=>{

            res.render("adminorder",{msg:results});
        })
    })
})

route.post('/validatelogin',(req,res)=>{
    var username=req.body.username;
    var pass=req.body.password;

    connection.query("select * from admin where username=(?) and pass=(?)",[username,pass],(err,results)=>{
        if(results.length>0){
            connection.query("select * from food_cart where status='notdelivered'",(err,results)=>{

                res.render("adminorder",{msg:results});
            })
        }
        else{
            res.render('login',{msg:"wrong details"});
        }
    })
})
route.post('/signupsave',(req,res)=>{
    console.log(req.body);
    var username=req.body.username;
    var pass=req.body.pass;
    console.log(req.body.pass);
    var phno=req.body.phno;
    connection.query("insert into signup values((?),(?),(?)) ",[username,pass,phno],(err,results)=>{
        if(results.affectedRows>0){
            res.send("successfully inserted");
        }
    })
})

route.post('/validatecustlogin',(req,res)=>{
     custname=req.body.username;
    var pass=req.body.password;
    
    connection.query("select * from signup where username=(?) and password=(?)",[custname,pass],(err,results)=>{
        if(results.length>0){
            res.render("menu");
        }
        else{
            res.render('custlogin',{msg:"wrong details"});
        }
    })
})


module.exports=route;
