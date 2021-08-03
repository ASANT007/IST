<%-- 
    Document   : uploadCashFlowExcelFile
    Created on : 12 Jan, 2021, 11:24:00 AM
    Author     : Suraj Jadhav
--%>
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


<%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.ArrayList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

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
    <!--header start-->
<div class="container">
 <div class="row">
    <div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"> </div>
    <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
  </div>
<div style="background-color:#07245d; height:30px; clear:both"> 
    <div  id="load_menu_ist"></div>
</div>
<div class="row" style="font-size:16px; padding:5px 15px;">
    <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
</div>
  
  <div class="row"><div class="col-md-12">
<h2 class="page-heading">Cash-Flow Upload </h2>
</div>
</div>
<script  type="text/javascript">
function createHTTPObj()
{
        var http = null;
        if(window.XMLHttpRequest)
              http = new XMLHttpRequest();
        else if (window.ActiveXObject)
        http = new ActiveXObject("Microsoft.XMLHTTP");
        return http;
}
function validation()
{

    var file = document.getElementById("attach").value;
    var lastInd = file.lastIndexOf('.');
    var ext = file.substring(lastInd+1,file.length);	
    ext = ext.toLowerCase();

    if(document.getElementById("attach").value=="")
    {
        alert("Please upload file");
       
   }else if(ext==="xlsx" || ext==='xls'){
        uploadFile(file);
    }
    else
    {
         alert("Please select excel file");
    }
}
function uploadFile(filename){
    //Id='msg';
    // ImageLoading(Id);
    var http = createHTTPObj();
    http.onreadystatechange = function()
    {
        if(http.readyState == 4){
            var response = http.responseText
            document.frm.submit();
        }
    };
    http.open('POST','uploadCashFlowExcelFile.jsp',true);
    http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    http.send('filename=' + encodeURIComponent(filename));
}

function viewExcel(){
    window.location.href="viewCashFlowExcelFile.jsp";
}
</script>


<form name="frm" method="post" action="servlet/UploadCashFlowFileServlet" enctype="multipart/form-data">
<table width="100%" border="0" cellpadding="1" cellspacing="0" bgcolor="#FFFFFF">
<tr><form name="frm" method="post" action="servlet/UploadCashFlowFileServlet" enctype="multipart/form-data">

     <td colspan="2" align="left">&nbsp; </td>
</tr>
<tr>
<td><input type="file" id="attach" name="attach" accept=".xlsx,.xlx" /></td>
<td><input type="button" class="btn btn-primary" onclick="validation()" value="Upload"></td>
</tr>
    
<%
    
System.out.println("#### UploadCashFlowFileServlet  ");
String ft = checkNull(request.getParameter("firstTime"));
ArrayList<String> FileData = null;
System.out.println("#### firstTime : 171 ["+ft+"]");
int firstTime = 0;
if(ft.length() > 0) 
{
    firstTime = Integer.parseInt(ft);
}
System.out.println("#### firstTime : 177 ["+ft+"]");

String attachment="";
if(firstTime==0)
    {
%>

<%
}
else if(firstTime==1)
{
    String fileName = "";
    String trColour = "#FFFFFF";
    attachment = request.getParameter("attach"); 
    session.setAttribute("attach", attachment);
    System.out.println("#### attach"+attachment);
    if(checkNull(attachment).length() > 0){
        fileName = attachment.substring(attachment.indexOf("tempUploads")+13, attachment.length()); 
    }    
%>

 <tr>
     <td  align="left">File Uploaded : <%=fileName%> </td>
     <td><input type="button" class="btn btn-primary" onclick="viewExcel()" value="View Uploaded File"></td>
</tr>
 <%-- <tr> <%--main row where excel file data is shown
   <div id="rec-report-table" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;">
    <div id="errordiv" align="center" style="color: red;"></div>
    <div id="allTranReportResult" class="row" style="margin: 0;">
      <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0" class="table tbl-report">
       <%-- <tr>
          <th width="5%" align="center" valign="middle" class="table-heading">Sr.No</th>
          <th width="5%" align="center" valign="middle" class="table-heading">IST Request Id</th>
          <th width="6%" align="center" valign="middle" class="table-heading">IST Type</th>
          <th width="15%" align="center" valign="middle" class="table-heading">Security Name</th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferee Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferee Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferee Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferee Scheme </th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>
          
          <th width="20%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>
          
        </tr>
 

 <%
     
            String[] cellData=null;
                        %>
                        <tr valign="top">
                         <%   cellData=FileData.get(0).split("~");
                            for (String cell : cellData) {%>
                            <th width="5%" align="center" valign="middle" class="table-heading"><%=cell%></th>       
                               
             <%}
        %>
                        </tr>
        <%
     
           
                        for (int i = 1; i < FileData.size(); i++) {%>
                        <tr valign="top">
                         <%   cellData=FileData.get(i).split("~");
                            for (String cell : cellData) {
                         if(i%2==1){
                        trColour = "#FFFFFF";
                    }
                    else if(i%2==0)
                    {
                        trColour = "#ebebeb";
                    }
                         %>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=cell%></td>       
                               <% }
            %> </tr>
             <%}
        %>
               
        
    </table>
    </div>
  </div>
        
    </tr>--%> <%--main row where excel file data is shown end here--%>
 <%}

%>
<input name="attached_pdf" id="attached_pdf" type="hidden" readonly="true" value="<%=attachment%>"> 
</table>
 </form>
</div><%-- container div--%>
</body>
</html>
<%!
//Added by AMOL S. om 09-Sep-2020 START
    public String checkNull(String input)
    {
        if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
        input = "";
        return input.trim();    
    }
    //Added by AMOL S. om 09-Sep-2020 END
%>
