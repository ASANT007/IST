<%-- 
    Document   : dashboard
    Created on : May 30, 2017, 11:02:06 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
String fullname = (String)session.getAttribute("userfullname");

response.setHeader("pragma","no-cache");//HTTP 1.1
response.setHeader("Cache-Control","no-cache");
response.setHeader("Cache-Control","no-store");
response.addDateHeader("Expires", -1);
response.setDateHeader("max-age", 0);
response.setIntHeader ("Expires", -1); //prevents caching at the proxy server
response.addHeader("cache-Control", "private");

if(userId == null || userId.equals("-1") || userId.equals("")) 
{  
     response.sendRedirect("index.html");
     return;
}

System.out.println("##### Role "+role);
%>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">

<link href="css/custom.css" rel="stylesheet" type="text/css">

<link href="css/style.css" rel="stylesheet" type="text/css">

<link href="menu/menu.css" rel="stylesheet" type="text/css">

<link href="vendor/hover/effects.min.css" rel="stylesheet">

<script src="js/jquery-latest.js"></script>
<script src="js/bootstrap.js"></script>

<script src="js/clientValidation.js"></script>
<script src="js/serverValidation.js"></script>
<script src="js/common.js"></script>


<script>
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});
</script>
</head>

<body>

<<!--header start-->
<div class="container">
 
            <div class="row">

<div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;">
<img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"></div>

<div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
            </div>
<div style="background-color:#07245d; height:30px; clear:both"> <div  id="load_menu_ist">
            </div></div>

<div class="row" style="font-size:16px; padding:5px 15px;">
<div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
  </div>

<div class="row"><div class="col-md-12">
<h2 class="page-heading">Add IST Details</h2>
</div>
</div>

<div class="label-name" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;border-top: 1px solid #ccc;padding: 30px;">
    <div id="errordiv" align="center" style="color: red; padding-top: 20px"></div>
<div class="row">
    <div class="col-md-12 text-center" style="padding:0">
        <label class="ist-type">IST Type :</label>
        <select class="form-control" id="ist_type" style="width:280px;" data-size="50" name="ist_type">
            <option value="Select">Please Select IST Type</option>
             <option value="LRM">LRM</option>
            <option value="Duration Rebalancing">Duration Rebalancing</option>
            <option value="Issuer/Sector/Group Rebalancing">Issuer/Sector/Group Rebalancing</option>
        </select>
                <div class="btn-ist">
                    <input class="btn btn-primary" type="button" onClick="addIST()" value="Submit">
                </div>
                 
</div>
</div>
</div>



<div class="row" style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:80px;">
<h6>© PGIM India Asset Management Private Limited</h6>
</div>
</div>

</body>
</html>