<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/custom.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<script src="https://code.jquery.com/jquery-latest.js"></script>
<link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
<script src="js/clientValidation.js"></script>
<script language="JavaScript" src="js/trim_all.js"></script>
<script language = "javascript">
function resetFileds(){
    $('#username').html("");
    $('#password').html("");
}
function checkenter(e)
{
    var charCode = (navigator.appName == "Netscape") ? e.which : e.keyCode;
    if (charCode == 13)
    {
        login_validation();               
    }
    return true;
}
function login_validation()
{
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    if(username==""){
        document.getElementById("valid").innerHTML="<div class='error-message'>Please enter username</div>";
        document.frm.username.focus();
    }
    else if(password==""){
        document.getElementById("valid").innerHTML="<div class='error-message'>Please enter password</div>";
        document.frm.password.focus();
    }
    else{
        document.getElementById("valid").innerHTML="";
        checkLogin(username,password);
    }
}

function createHTTPObj()
{
    var http = null;
    if(window.XMLHttpRequest)
        http = new XMLHttpRequest();
    else if (window.ActiveXObject)
        http = new ActiveXObject("Microsoft.XMLHTTP");
    return http;
}

function checkLogin(username,password){
    //Id= 'valid';
    //ImageLoading(Id);
   // alert(username);
   // alert(password);
    var http = createHTTPObj();
    http.onreadystatechange = function()
    {
        if(http.readyState == 4){
            var response = http.responseText
            document.getElementById('valid').innerHTML = response; 
            //alert(response);
            if(response.indexOf("success") > 0)
            {
                document.getElementById('valid').innerHTML="";
                window.location.href="dashboard.jsp";
            }
            else if(response.indexOf("False") > 0)
            {
                document.getElementById('valid').innerHTML="<div class='error-message'>Login Information Is Incorrect</div>";
                document.frm.username.focus();
            }
        }
    };
    http.open('POST','checkLogin.jsp',true);
    http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    http.send('username=' + encodeURIComponent(username) +'&password=' + encodeURIComponent(password));

}
function resetDiv(){
	document.getElementById('valid').innerHTML='';
}

</script>
</head>
<body>
<!--header start-->
<div class="container">
  <div class="row">
    <div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"> </div>
    <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
    <div style="background-color:#07245d; height:20px; clear:both"></div>
    <!--header end-->
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-xs-12 top20px">
      <div class="login-box">
      <h2>
        <p class="product-heading-cg" style="text-align:center; width:100%; margin:0; ">Login Here<span></span></p>
      </h2>
      <br/>
      <div id="valid"  style="color: red" ></div>
      <form name="frm" method="post" autocomplete="off">
        <div class="form-group">
          <p>
            <label>Username:</label>
            <input name="username" id="username" class="form-control" type="text" maxlength="20" onKeyPress="return checkenter(event)"/>
          </p>
        </div>
        <p>
          <label>Password: </label>
          <input name="password" id="password" class="form-control" type="password" maxlength="30" onKeyPress="return checkenter(event)"/>
        </p>
        <p class="text-center" style="margin:25px 0 0 0">
          <input type="button" class="btn btn-primary" style="margin-top:-6px;" value="Login " onClick ="login_validation()" />
          <input type="button" class="btn btn-primary" style="margin-top:-6px;" value="Reset " onClick ="resetFileds()" />
        </p>
        
      </form></div></div></div>
      
  <div class="row" style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:30px;">
    <h6>© PGIM India Asset Management Private Limited</h6>
  </div>    
      
      
      </div>
   
</body>
</html>
