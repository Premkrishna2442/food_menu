document.getElementById("submit").disabled=true;


function validate(){
    let un = document.getElementById("username").value;
    let pass=document.getElementById("pass").value;
    document.getElementById("return").innerHTML="";
    

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(un.match(mailformat)){
    document.getElementById("return").innerHTML="";
    document.getElementById("submit").disabled=false;
}
else{
    document.getElementById("return").innerHTML="email formate is wrong";
    document.getElementById("submit").disabled=true;
}


if(pass.length>8){
document.getElementById("returnpass").innerHTML="";
document.getElementById("submit").disabled=false;
}
else{
document.getElementById("returnpass").innerHTML="must contain atleast 8 characters";
document.getElementById("submit").disabled=true;
}
}