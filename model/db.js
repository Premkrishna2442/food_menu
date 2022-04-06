const mysql=require('mysql2');
const connect=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Prem@2442',
    database:'fsd',
    port:'3306'
});
module.exports=connect;
