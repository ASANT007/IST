<%-- 
    Document   : viewCashFlowExcelFile
    Created on : 13 Jan, 2021, 7:12:23 AM
    Author     : Suraj Jadhav
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="cashFlowBean" class="com.aniktantra.ist.CashFlowManager"/>
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
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="menu/menu.css" rel="stylesheet" type="text/css">

<link href="vendor/hover/effects.min.css" rel="stylesheet">
<script src="js/jquery-latest.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/clientValidation.js"></script>
<script src="js/serverValidation.js"></script><script src="js/common.js"></script>
<link rel="preconnect" href="https://fonts.gstatic.com">

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
<%
            String attachment =(String)session.getAttribute("attach");
            System.out.println("#### fileName "+attachment);
            
            boolean isInserted = false;
            
            cashFlowBean.makeConnection();
            boolean isDelete = cashFlowBean.deleteTempTableData(userId);           
            cashFlowBean.breakConnection();
            
            cashFlowBean.makeConnection();
            isInserted = cashFlowBean.insertDataIntoTempTable(attachment,userId);
            System.out.println("#### isInserted "+isInserted);
            cashFlowBean.breakConnection();
            
    %>
<div class="container">
  <div class="row">
    <div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"> </div>
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
   <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
  </div>
  
 
  <!-- Modal -->
     <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
         <div class="modal-dialog" role="document">
             <div class="modal-content modelstyle">
                  <div class="modal-header">
                     <h5 class="modal-title modalheader text-center">Data inserted Successfully!!</h5>
                  </div>
                  <div class="modal-footer">
                   <button type="button" class="btn btn-danger btnmodals" data-dismiss="modal" onclick="returnToCashFlowMainPage();" >Ok</button>
                   <!--<button type="button" class="btn btn-danger btnmodals" data-dismiss="modal">No</button>-->
                  </div>
              </div>
          </div>
      </div>
    <!-- End Modal -->
  
    <!-- Modal -->
     <div class="modal fade" id="failModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
             <div class="modal-content modelstyle">
                  <div class="modal-header">
                     <h5 class="modal-title modalheader text-center">Data submission Failure.</h5>
                     <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button> -->
                  </div>
                  <div class="modal-footer">
                   <button type="button" class="btn btn-danger btnmodals" data-dismiss="modal" >Ok</button>
                   <!-- <button type="button" class="btn btn-danger btnmodals" data-dismiss="modal">No</button> -->
                  </div>
              </div>
          </div>
      </div>
    <!-- End Modal -->
  
  <h2 class="page-heading">Cash Flow Details</h2>
  <div id="rec-report-table" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;">
    <div id="errordiv" align="center" style="color: red;"></div>
    <div id="allTranReportResult" class="row" style="margin: 0;">
      <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0" class="table tbl-report">
        <tr>
          <th width="5%" align="center" valign="middle" class="table-heading">Sr.No</th>
          <th width="35%" align="center" valign="middle" class="table-heading">Scheme</th>
          <th width="6%" align="center" valign="middle" class="table-heading">Deal No</th>
          <th width="30%" align="center" valign="middle" class="table-heading">Instrument Name</th>
          <th width="5%" align="center" valign="middle" class="table-heading">Trans.Type</th>
          <th width="5%" align="center" valign="middle" class="table-heading">Maturity</th>
          <th width="5%" align="center" valign="middle" class="table-heading">Trade Date</th>
          <th width="25%" align="center" valign="middle" class="table-heading">Total Deal Value(Inst Ccy) </th>
          <th width="45%" align="center" valign="middle" class="table-heading">Counterparty </th>
          <th width="10%" align="center" valign="middle" class="table-heading">YTM</th>
          <th width="20%" align="center" valign="middle" class="table-heading">Mandatory Remarks</th>
          <th width="10%" align="center" valign="middle" class="table-heading">Asset Class</th>
        
        </tr>
 

<%  
                                 
    try
    {
        boolean isDataFound = false;
        String trColour = "";
        int i=1, count = 0, sr_no = 0;
        String scheme="", deal_no="", instrument_name="", trans_type="", maturity="", trade_date="";
        String total_deal_value="",counterparty="",ytm="", mandatory_remarks="",asset_class="",status="";
        boolean flag;
        
        DateFormat oldFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat  newFormat= new SimpleDateFormat("dd-MMM-yyyy");
        
             
            ResultSet iaResultSet = null; 
            cashFlowBean.makeConnection();
            iaResultSet = cashFlowBean.getUploadedExcelData();
            if( iaResultSet.next())
            {
                
                isDataFound =  true;
               do{
                    //sr_no=iaResultSet.getInt("sr_no");
                    scheme = checkNull(iaResultSet.getString("scheme"));
                    deal_no = checkNull(iaResultSet.getString("deal_no"));
                    instrument_name = checkNull(iaResultSet.getString("instrument_name"));
                    trans_type = checkNull(iaResultSet.getString("trans_type"));
                    
                    maturity =  newFormat.format(oldFormat.parse(checkNull(iaResultSet.getString("maturity"))));//converted sql date to new format date
                    trade_date =  newFormat.format(oldFormat.parse(checkNull(iaResultSet.getString("trade_date"))));//converted sql date to new format date
                    
                    
                    total_deal_value =  checkNull(iaResultSet.getString("total_deal_value"));
                    counterparty = checkNull(iaResultSet.getString("counterparty"));
                    ytm = checkNull(iaResultSet.getString("ytm"));
                    mandatory_remarks = checkNull(iaResultSet.getString("mandatory_remarks"));
                    asset_class = checkNull(iaResultSet.getString("asset_class"));
                    flag = iaResultSet.getBoolean("flag");
                    status=checkNull(iaResultSet.getString("status"));
                    
                    /**/
                    count ++;
                    //System.out.println("#### count "+count);
                    
                    %>
                <tr valign="top">
                    <%if(flag){
                        trColour = "#FFFFFF";
                    }
                    else 
                    {
                        trColour = "#ebebeb";
                        trColour = "red";
                        
                    }%>
                        <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=i%></td>
                        <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=scheme%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=deal_no%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=instrument_name%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=trans_type%></td>
                                             
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=maturity%></td>                       
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=trade_date%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=total_deal_value%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=counterparty%></td>                       
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=ytm%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=mandatory_remarks%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=asset_class%></td>
                        
                  </tr>
            <%
               i++;}while(iaResultSet.next());%>
            <tr>
                <td colspan="6" align="center" bgcolor="#FFFFFF" class="error-message"><button type="button"  onclick="submitDataToTable(this);">Submit Uploaded Data</button></td>
                <td colspan="8" align="center" bgcolor="#FFFFFF" class="error-message"><a href="uploadCashFlowExcelFile.jsp"><button type="button" >Go back and upload new excel</button></a></td>
           </tr>
           <script>
               
    function createHTTPObj()
   {
       var http = null;
       if(window.XMLHttpRequest)
           http = new XMLHttpRequest();
       else if (window.ActiveXObject)
           http = new ActiveXObject("Microsoft.XMLHTTP");
       return http;
   }


    function submitDataToTable(element){
        element.disabled = true;
     var http = createHTTPObj();
     
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           {    
                       element.disabled = false;
               var response = http.responseText.toString().trim();
              // response.length();
                var status=response.split(" ")[0];
                if(status ==='success'){
                document.getElementById('maxBatchId').value=response.split(" ")[1];
                $("#successModal").modal(); 
               }else{
                $("#failModal").modal(); 
               }
           } 
        };

        http.open('POST','addCashFlowData.jsp',true);
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        http.send();  
}
function returnToCashFlowMainPage(){
    window.location.href="uploadCashFlowExcelFile.jsp"
}

function triggerMail(){
   
    //mail is triggered if data is submitted successfully.
    var maxId=document.getElementById('maxBatchId').value;
      var http = createHTTPObj();
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           {     var response = JSON.parse(http.responseText);          
               alert(response.batchId);
                
           } 
        };

        http.open('POST','triggerMailToManager.jsp',true);
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        http.send('maxBatchId='+encodeURIComponent(maxId));  
  
    
}
   
           </script>

               <%}%>
           <% cashFlowBean.breakConnection();
            %>
                    <%if(isDataFound){
             isDataFound = false;
         }
         else{%>
             <td colspan="8" align="center" bgcolor="#FFFFFF" class="error-message">No details found</td>
         <%}%>  
   <% }catch(Exception e){
       e.printStackTrace();
        out.print(e.getMessage());
    }%>
                                      
                                       

    </table>
    <input type="hidden" id="maxBatchId">
    </div>
  </div>
  <div class="row" style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:80px;">
    <h6>&copy PGIM India Asset Management Private Limited</h6>
  </div>
</div>
</body>
</html>

<%!
public String checkNull(String input)
{
    if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
    input = "";
    return input.trim();    
}
%>

