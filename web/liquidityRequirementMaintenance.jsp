<%-- 
    Document   : dashboard
    Created on : May 30, 2017, 11:02:06 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="java.sql.*"  autoFlush="true"%>
<%@page import="java.util.ArrayList"%>
<%@page import ="java.util.HashMap"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<%@page import = "java.text.SimpleDateFormat" %>
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
%>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/custom.css" rel="stylesheet" type="text/css">
<link href="vendor/hover/effects.min.css" rel="stylesheet"><link href="menu/menu.css" rel="stylesheet" type="text/css">

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

	var myCalendar;
	function doOnLoad() {
		myCalendar = new dhtmlXCalendarObject(["ist_datetime"]);
                //myCalendar.setDateFormat("%Y-%m-%d");//Req for DB
                myCalendar.setDateFormat("%d-%m-%Y");//For UI
	}

	
</script>
<link href="calendar/roboto.css" rel="stylesheet" type="text/css">
<link href="calendar/dhtmlxcalendar.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<script src="calendar/dhtmlxcalendar.js"></script>
</head>

<body onLoad="doOnLoad();">
    <%
    ResultSet rs = null;
    
    //SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
    java.util.Date date = new java.util.Date();
    SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
    %>
    <form action="insertLRM.jsp" method="POST"  name="frm" autocomplete="off">
<div class="container">
<div class="row">
  <div class="col-md-6 col-sm-6  centerdiv"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"></div>
  <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
</div>
<div style="background-color:#07245d; height:30px; clear:both">
 <div  id="load_menu_ist">
            </div>
</div>
<div class="row" style="font-size:16px; padding:5px 15px;">
    <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
</div>
<div class="row">
<div class="col-md-12 col-sm-12">
  <div class="label-name" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;  margin-bottom:20px;padding:0 30px 30px 30px;">
    <h2 class="page-heading">Fill IST Form for LRM </h2>
      <input type="hidden" name="ist_type" id="ist_type" value="LRM">    
           
             
    <div class="row">
      <div class="form-group col-sm-4 col-md-4">
        <label>Name of security  :</label>
        <input type="text" name="security_name" id="security_name" value="" class="form-control input-width" onChange="">
        <script>
                     $("#security_name").autocomplete({
                        source: "getISINSecurityDetails.jsp",
                       //minLength:2,
                       // autoFocus :true,
                        select: function(event, ui) {
                            event.preventDefault();

                            $("#security_name").val(ui.item.label);
                            $("#security_name").attr("data-label", ui.item.label);
                            $("#security_isin_no").val(ui.item.value);
                            $("#security_isin_no").attr("data-value", ui.item.value);
                            
                        },
                        focus: function(event, ui) {
                            event.preventDefault();                                                        
                            $("#security_name").val(ui.item.label);
                            $("#security_isin_no").val(ui.item.value);
                        }
                    });
                 </script>
      </div>
      <div class="form-group col-sm-4 col-md-4">
        <label class="res-display">ISIN :</label>
        <input class="form-control input-width" type="text" name="security_isin_no" id="security_isin_no" value="" readonly>
      </div>
      
      <div class="form-group col-sm-4 col-md-4">
          
        <label class="res-display">Date of IST </label>        
        <input class="form-control input-width" id="ist_datetime" style="background: url(calendar/calendar.gif)no-repeat 100%;width:150px" name="ist_datetime" type="text" placeholder="Enter Date" value="<%=format.format(date)%>" readonly>
          
      </div>
      
    </div>
             
<div class="row form-group row-bg">
      <div class="col-md-4 col-sm-4">
       Particular
      </div>
         <div class="col-md-4 col-sm-4">
        Transferor
      </div>
         <div class="col-md-4 col-sm-4">
        Transferee
      </div>
    </div>
    
    
    <div class="row form-group">
      <div class="col-md-4 col-sm-4">
       <label class="scheme">Scheme  :</label>
      </div>
         <div class="col-md-4 col-sm-4 mbtm"><label class="transferor-scheme">Transferor Scheme  :</label>
             <!--<input class="form-control input-width" type="text"  value="">-->
            <div style="position:relative;padding: 0 0 40px 0;"> <select class="selectDropDownHeight form-control" onfocus='this.size=10;'onblur='this.size=1;'onchange='this.size=1; this.blur();getTransferorCategoriesAndSubCategories(this);' id="transferor_scheme" name="transferor_scheme">
                   <option value="">--Select Scheme--</option>
                   <%               
                
                lrmTrans.makeConnection();
                rs = lrmTrans.getAllSchemes();
                while(rs.next()) 
                {	
                    
                %>
                 <option value='<%=rs.getString("SRNO")%>'><%=rs.getString("SCHEME_NAME")%></option>

                <% }
                lrmTrans.breakConnection();
                %>
                </select></div>
               <div><span class="user-name" style="display:inline-block;margin: 10px 20px 0 0" name ="transferror_scheme_category" id="transferror_scheme_category"></span>
                   <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0" name ="transferror_scheme_subcategory" id="transferror_scheme_subcategory"></span></div>
      </div>
         <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Transferee Scheme  :</label>
             <!--<input class="form-control input-width" type="text" value="">-->
             <div style="position:relative;padding: 0 0 40px 0;"> <select class="selectDropDownHeight form-control" onfocus='this.size=10;'onblur='this.size=1;'onchange='this.size=1; this.blur();getTransfereeCategoriesAndSubCategories(this);' id="transferee_scheme" name="transferee_scheme">
                   <option value="">--Select Scheme--</option>
                  <% lrmTrans.makeConnection();
                rs = lrmTrans.getAllSchemes();
                while(rs.next()) 
                {	
                    
                %>
                 <option value='<%=rs.getString("SRNO")%>'><%=rs.getString("SCHEME_NAME")%></option>

                <% }
                lrmTrans.breakConnection();%>
                 </select></div>
               <div> <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0" name ="transferee_scheme_category" id="transferee_scheme_category"></span>
               <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0" name ="transferee_scheme_subcategory" id="transferee_scheme_subcategory"></span></div>
      </div>
    </div>
    
    
    
      <div class="row form-group">
      <div class="col-md-4 col-sm-4">
       <label class="scheme">LRM minimum cash & cash equivalent required (Rs. in Cr) :</label>
      </div>
         <div class="col-md-4 col-sm-4  mbtm"> <label class="transferor-scheme">LRM minimum cash & cash equivalent required (Transferor) (Rs. in Cr) :</label>
         <input class="form-control input-width" type="text" name="transferror_min_lrm" id="transferror_min_lrm" value="" oninput="decimalCheck(this)" >
      </div>
         <div class="col-md-4 col-sm-4"> <label class="transferee-scheme">LRM minimum cash & cash equivalent required (Transferee) (Rs. in Cr) :</label>
          <input class="form-control input-width" type="text" name="transferee_min_lrm" id="transferee_min_lrm" value="" oninput="decimalCheck(this)">
      </div>
    </div>
     <div class="row form-group">
      <div class="col-md-4 col-sm-4">
       <label class="scheme">Net cash position after projected inflow and outflow (Rs. in Cr) : </label>
      </div>
         <div class="col-md-4 col-sm-4  mbtm"><label class="transferor-scheme">Net cash position after projected inflow and outflow  (Transferor)(Rs. in Cr) : </label>
        <input class="form-control input-width"  type="text" name="transferror_netcash_position" id="transferror_netcash_position" value="" oninput="decimalCheck(this)">
      </div>
         <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Net cash position after projected inflow and outflow (Transferee) (Rs. in Cr) : </label>
        <input class="form-control input-width"  type="text" name="transferee_netcash_position" id="transferee_netcash_position" value="" oninput="decimalCheck(this)">
      </div>
    </div>
    
    
    <div class="row form-group">
      <div class="col-md-4 col-sm-6">
      <input type="radio" id="lineBrorrowingUtilized" name="lineBrorrowingUtilized" value="Y" class="radio-btn" onClick="hideJustification()">
          <label>Line available and borrowing utilized </label>
      </div>
         <div class="col-md-4 col-sm-6">
       <input type="radio" id="lineBrorrowingNotUtilized" name="lineBrorrowingUtilized" value="N" class="radio-btn" onClick="showJustification()">
          <label>Line available and borrowing not utilized</label>
      </div>
         <div class="col-md-4 col-sm-6">
          
      </div>
    </div>
    
    <!-- Added on 04-08-2021 START -->
    <div class="row form-group">
        <div class="col-md-12">
            <div class="col-md-4" id="line_available_val_div" style="display:none" >
            <label>Line available</label>
            <input class="input-width form-control" type="text" id="line_available_val" name ="line_available_val" oninput="decimalCheck(this)"/>
            </div>
            <div class="col-md-5" id="borrowing_utilized_div" style="display:none" >
            <label>Borrowing utilized</label>
            <input class="input-width form-control" type="text" id="borrowing_utilized" name ="borrowing_utilized" oninput="decimalCheck(this)"/>
            </div>
            <div class="col-md-4" id="borrowing_not_utilized_div" style="display:none" >
            <label>Borrowing not utilized</label>
            <input class="input-width form-control" style="width:50px;" type="text" value="0.0" readonly id="borrowing_not_utilized" name ="borrowing_not_utilized"/>
            </div>
            <div class="col-md-4" id="notUtilizedRemark_div"style="display:none" >
            <label>Remarks</label>
            <textarea maxlength="1000" class="form-control input-width" rows="4" cols ="50" id="notUtilizedRemark" name="notUtilizedRemark"></textarea>
            </div>
        </div>
    </div>
     <!-- Added on 04-08-2021 END-->
   <div class="row">
      <div class="form-group col-md-6">
        <label>Sale proceeds of the securities utilized (Rs. in Cr) :</label>
                 <input type="text" class="form-control input-width" name="securities_proceeds_utilized" id="securities_proceeds_utilized" value="" oninput="decimalCheck(this)">

      </div>
    </div> 
    
    
    
  <div class="row">
      <div class="form-group col-md-6">
        <label>If all above is not sufficient then ISTs of optimal mix of low duration paper with highest quality paper and so on :</label>
       
      </div>
      <div class="form-group  col-md-6">
  
  
  <textarea maxlength="1000" class="form-control input-width" rows="2" cols ="30" id="optimal_mix_of_low_duration_paper" name="optimal_mix_of_low_duration_paper"></textarea>
     </div>
    </div>  
    
     <!--Added by AMOL S on 27-Apr-2021 START-->  
     <div class="row">        
        <div class="form-group col-md-4">
            <label style="margin-top: 25px">Upload Request for Quote (RFQ) screen shot</label>                
        </div>     
        <div class="form-group col-md-8">              
            <iframe src="uploadRFQFile.jsp" id="uploadRFQiframe" class="rfqIframe"></iframe>             
        </div> 
    </div> 
     <!--Added by AMOL S on 27-Apr-2021 END-->         
    <div class="row">
      <div class="col-md-12"><input class="radio-btn"  type="checkbox" id="declaration" value=""> 
        <label class="user-name">Declaration:</label>
       
      </div>
      
    </div>
    
     <div class="row">
      <div class="form-group col-md-12"><ol class="list-decl"  style="padding: 0 0 0 12px;">
       <li> IST is in the interest of unit holders. </li>
         <li>  Quality of security under ISTs is not suspect i.e. no adverse news or rumors in the mainstream media about the said security, nor any credit alert for last four months. </li>
          <li> Fund Manager of transferee scheme confirms that he/she has done full credit risk assessment of security before buying the same through ISTs, and the same is documented. </li></ol>
      </div>
      
    </div>
            <div class="row">     
                <div id ="errorDiv" align="center" style="color:red" class="error-message"></div>                    
            </div>
                 
    <div class="row">
      <div class="col-md-12 text-center">          
          <input class="btn btn-primary" type="button" onClick="addLRM()" value="Submit">       
      </div>      
    </div>  
    
    
    
  </div></div>
  <div  style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:80px;">
    <h6>?? PGIM India Asset Management Private Limited</h6>
  </div>
</div></div>
</form>
</body>
</html>