<%-- 
    Document   : dashboard
    Created on : May 30, 2017, 11:02:06 AM
    Author     : Administrator
--%>

<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
String fullName = (String)session.getAttribute("userfullname");

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
 
%>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">

<link href="menu/menu.css" rel="stylesheet" type="text/css">
<link href="css/custom.css" rel="stylesheet" type="text/css">
<link href="vendor/hover/effects.min.css" rel="stylesheet">
<script src="js/jquery-latest.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/clientValidation.js"></script><script src="js/common.js"></script>
<script src="js/serverValidation.js"></script>
<script type="text/javascript" src="js/autoComplete-JS-CSS/jquery.js"></script>
<script language="javascript" src="js/autoComplete-JS-CSS/jquery-ui.js"></script>
<link href="js/autoComplete-JS-CSS/jquery-ui.css" rel="stylesheet" type="text/css">

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

	var istFromDate;
        var istToDate
	function doOnLoad() {
		istFromDate = new dhtmlXCalendarObject(["istFromDate"]);
                istToDate = new dhtmlXCalendarObject(["istToDate"]);
                istFromDate.setDateFormat("%d/%m/%Y");
                istToDate.setDateFormat("%d/%m/%Y");
	}

	
</script>
<link href="calendar/roboto.css" rel="stylesheet" type="text/css"><link href="css/style.css" rel="stylesheet" type="text/css">

<link href="calendar/dhtmlxcalendar.css" rel="stylesheet" type="text/css">
<script src="calendar/dhtmlxcalendar.js"></script>
</head>

<body onLoad="doOnLoad();">
 
<form action="getISTDetailsByFilter.jsp" method="POST"  name="getISTFrm">   
<div class="container">
 
<div class="row">
  <div class="col-md-6 col-sm-6  centerdiv"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"></div>
  <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
</div>
    
<div style="background-color:#07245d; height:30px; clear:both">
<%if(role.equals("IA")){
%>
<div id ="load_menu_ist"></div>
<%}else{%>
 <div  id="load_menu_seller"></div>
<%}%>

</div>
 
<div class="row" style="font-size:16px; padding:5px 15px;">
   <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullName%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
</div>
 
<h2 class="page-heading">View IST Details </h2>
<div class="row">     
        <div id ="errorDiv" align="center" style="color:red" class="error-message"></div>                    
</div>
<div class="row">
<div class="col-md-12 col-sm-12">
  <div class="label-name" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc; margin-bottom:20px;padding:0 30PX 30px 30px;">
  
  
  <div class="row">
      <div class="form-group col-md-4 view-detail-col"  style="padding: 0 0 0 10px;">
       <label>IST Type : </label> 
            <select class="form-control" id="ist_type" name="ist_type" style="width:240px;display:inline-block">
            <option value="">Please Select IST Type</option>
             <option value="LRM">LRM</option>
            <option value="Duration Rebalancing">Duration Rebalancing</option>
            <option value="Issuer/Sector/Group Rebalancing">Issuer/Sector/Group Rebalancing</option>
            </select>   
        
      </div>
      <div class="form-group ist-detail-col col-md-4" style="margin: 5px 0 0 0;">
       <label>IST Status: </label>
        <input class="radio-btn1" type="radio" id="istStatus" name="istStatus" value="Recommended" /> Recommended          
        <input class="radio-btn1" type="radio" id="istStatus" name="istStatus" value="Approved" /> Approved       
        <input class="radio-btn1" type="radio" id="istStatus" name="istStatus" value="Rejected" /> Rejected 
        <input class="radio-btn1" type="radio" id="istStatus" name="istStatus" value="" /> All   
      </div>
      
      <div class="form-group  col-md-4" style="padding:0">
         <input class="form-control input-width mbtm" id="istFromDate" style="background: url(calendar/calendar.gif)no-repeat 100%;width:125px" name="ist_datetime" type="text" placeholder="From Date" readonly>
            <input class="form-control input-width" id="istToDate" style="background: url(calendar/calendar.gif)no-repeat 100%;width:125px" name="ist_datetime" type="text" placeholder="To Date" readonly>     
   <input style="margin-left:10px;" type="button" name="bttn" class="btn btn-primary" value='Search' onClick="validateISTFilterReports()">
        <input type="Reset" name="bttn1" value="Reset" class="btn btn-primary" onClick="clearISTFilterReport()"> 
      </div>
      
      
    </div>
  
<div class="row">
      <div class="form-group col-md-12 text-center">
         <div id="searchDiv" style="min-height:350px; border:#d2d2d2 1px solid;  text-align:center; vertical-align:middle"></div>
      </div>
    </div>
  
  </div></div></div>
 <div class="row" style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:80px;">
    <h6>© PGIM India Asset Management Private Limited</h6>
  </div> 
 </div>
 
</body>
</html>