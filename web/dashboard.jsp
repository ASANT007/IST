
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="lrmTrans5" class="com.aniktantra.ist.LRMTransManager"/>
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

<div class="pending_ist_contianer">
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
  <h2 class="page-heading">Pending IST Details</h2>
  <div id="rec-report-table" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;">
    <div id="errordiv" align="center" style="color: red;"></div>
    <div id="allTranReportResult" class="row" style="margin: 0;">
      <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0" class="table tbl-report">
        <tr>
          <th width="2%" align="center" valign="middle" class="table-heading">Sr.No</th>
          <th width="5%" align="center" valign="middle" class="table-heading">IST Request Id</th>
          <th width="5%" align="center" valign="middle" class="table-heading">IST Type</th>
          <th width="15%" align="center" valign="middle" class="table-heading">Security Name</th>
          <th width="15%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>
          <th width="15%" align="center" valign="middle" class="table-heading">Transferee Scheme </th>
          <%if(role.equals("IA")){%>
          <th width="15%" align="center" valign="middle" class="table-heading">Status</th>
          <%}else{%>
          <th width="10%" align="center" valign="middle" class="table-heading">Action</th>
          <%if(role.equals("FM")){%>
          <th width="33%" align="center" valign="middle" class="table-heading">Remark</th>
          <%}%>
          
          
         <%}%>
        </tr>
 

<%  
                                 
    try
    {
        boolean isDataFound = false;
        String trColour = "";
        int i=1, count = 0, tansferorScheme = 0, transfereeScheme = 0;
        String requestId = "", istType = "", securityName = "", isinNo = "", transferorSchemeName = "", transfereeSchemeName = "";
        //String transferorCategory = "", transferorSubCategory = "", transfereeCategory = "", transfereeSubCategory = "";
        String nextLevel = "", status = "",  appType = "", pendingUser = "";
        System.out.println("#### Role ["+role+"]");
        if(role.equals("IA")) 
        {      
            ResultSet iaResultSet = null; 
            lrmTrans.makeConnection();
            iaResultSet = lrmTrans.getPendingISTDetailsCreatedByIA(userId);//ist_details Join with Tracking table
            if( iaResultSet.next())
            {                
               isDataFound =  true;
               do{
                    requestId = checkNull(iaResultSet.getString("ist_request_id"));
                    istType = checkNull(iaResultSet.getString("ist_type"));
                    securityName = checkNull(iaResultSet.getString("security_name"));
                    isinNo = checkNull(iaResultSet.getString("security_isin_no"));
                    tansferorScheme =  iaResultSet.getInt("transferor_scheme");
                    transfereeScheme = iaResultSet.getInt("transferee_scheme");                                    
                    nextLevel = checkNull(iaResultSet.getString("next_level"));
                    status = checkNull(iaResultSet.getString("status"));
                    
                    lrmTrans5.makeConnection();
                    transferorSchemeName =  lrmTrans5.getSchemeNames(tansferorScheme);
                    lrmTrans5.breakConnection();
                    
                    lrmTrans5.makeConnection();
                    transfereeSchemeName = lrmTrans5.getSchemeNames(transfereeScheme);
                    lrmTrans5.breakConnection();
                    
                    
                    lrmTrans5.makeConnection();
                    pendingUser =  lrmTrans5.getPendingUser(requestId,nextLevel,status,tansferorScheme,transfereeScheme,"dashboard");
                    lrmTrans5.breakConnection();
                    /**/
                    count ++;
                    //System.out.println("#### count "+count);
                    appType = "IA"; 
                   
                    %>
                <tr valign="top">
                    <%if(i%2==1){
                        trColour = "#FFFFFF";
                    }
                    else if(i%2==0)
                    {
                        trColour = "#ebebeb";
                    }%>
                        <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=i%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><a onclick="displayISTDetails('<%=requestId%>')" style="cursor: pointer;"><%=requestId%></a></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=istType%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=securityName%><span class="tab">(<%=isinNo%>)</span></td>
                                             
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transferorSchemeName%></td>                       
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transfereeSchemeName%></td>
                        <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;">Awaiting approval by <span class="user-name"><%=pendingUser%></span></td>
                       
                  </tr>
            <%
               i++;}while(iaResultSet.next());
            }
            
            lrmTrans.breakConnection();
            
        }else
        {
            System.out.println("Else Role is FM and Above");
            if(role.equals("FM"))
            {     
                 //Seller START
                ResultSet fmSellerResultSet = null; 
                lrmTrans.makeConnection();
                fmSellerResultSet = lrmTrans.getISTDetailsForFMSeller(userId);
                if( fmSellerResultSet.next())
                {
                    //System.out.println("#### FM 159");
                    isDataFound =  true;
                   do{
                        requestId = checkNull(fmSellerResultSet.getString("ist_request_id"));
                        istType = checkNull(fmSellerResultSet.getString("ist_type"));
                        securityName = checkNull(fmSellerResultSet.getString("security_name"));
                        isinNo = checkNull(fmSellerResultSet.getString("security_isin_no"));
                        tansferorScheme =  fmSellerResultSet.getInt("transferor_scheme");
                        transfereeScheme = fmSellerResultSet.getInt("transferee_scheme"); 

                        lrmTrans5.makeConnection();
                        transferorSchemeName =  lrmTrans5.getSchemeNames(tansferorScheme);
                        lrmTrans5.breakConnection();

                        lrmTrans5.makeConnection();
                        transfereeSchemeName = lrmTrans5.getSchemeNames(transfereeScheme);
                        lrmTrans5.breakConnection();

                        appType = "seller"; //functionaly used.
                        count ++;
                        %>
                   <tr valign="top">
                        <%if(i%2==1){
                            trColour = "#FFFFFF";
                        }
                        else if(i%2==0)
                        {
                            trColour = "#ebebeb";
                        }%>
                            <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=i%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><a onclick="displayISTDetails('<%=requestId%>')" style="cursor: pointer;"><%=requestId%></a></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=istType%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=securityName%><span class="tab">(<%=isinNo%>)</span></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transferorSchemeName%></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transfereeSchemeName%></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;">
                            <select class="form-control ist-pending-select" id='approveRejectDD<%=count%>' name='approveRejectDD<%=count%>' onchange="">
                                <option value="" selected="selected" >--Select Action--</option>
                                <option value="Approve">Approve as Seller</option>
                                <option value="Reject">Reject as Seller</option>
                            </select>
                            </td>
                            <td> <textarea maxlength="1000" class="form-control" type ='text' id='rejection_remarks<%=count%>' name='rejection_remarks<%=count%>' style="display:block"placeholder="remark" rows="5" cols="30"></textarea>
                            <input style="margin-top:10px;" type="button" class="btn btn-primary" value="Done" onclick="this.disabled=true;this.value='Submitting...';approved('<%=requestId%>','<%=status%>','<%=appType%>','<%=count%>','<%=role%>','<%=istType%>')">                           
                            </td>
                      </tr>
                <%
                   i++;}while(fmSellerResultSet.next());
                }
                lrmTrans.breakConnection();
            //Seller END

             //Buyer START
             ResultSet fmBuyerResultSet = null;        
             lrmTrans.makeConnection();
             fmBuyerResultSet =  lrmTrans.getRecommendedISTDetails(userId);
             //
             //System.out.println("#### 196");
             if( fmBuyerResultSet.next())
             {
                 isDataFound =  true;
                do{

                    requestId = checkNull(fmBuyerResultSet.getString("ist_request_id"));
                    istType = checkNull(fmBuyerResultSet.getString("ist_type"));
                    securityName = checkNull(fmBuyerResultSet.getString("security_name"));
                    isinNo = fmBuyerResultSet.getString("security_isin_no");
                    tansferorScheme =  fmBuyerResultSet.getInt("transferor_scheme");
                    transfereeScheme = fmBuyerResultSet.getInt("transferee_scheme");

                    lrmTrans5.makeConnection();
                    transferorSchemeName =  lrmTrans5.getSchemeNames(tansferorScheme);
                    lrmTrans5.breakConnection();

                    lrmTrans5.makeConnection();
                    transfereeSchemeName = lrmTrans5.getSchemeNames(transfereeScheme);
                    lrmTrans5.breakConnection();

                    appType = "buyer";
                    count ++;
                    %>
                <tr valign="top">
                     <%if(i%2==1){
                         trColour = "#FFFFFF";
                     }
                     else if(i%2==0)
                     {
                         trColour = "#ebebeb";
                     }%>
                         <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=i%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><a onclick="displayISTDetails('<%=requestId%>')" style="cursor: pointer;"><%=requestId%></a></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=istType%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=securityName%><span class="tab">(<%=isinNo%>)</span></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transferorSchemeName%></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transfereeSchemeName%></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;">
                                <select class="form-control ist-pending-select" id='approveRejectDD<%=count%>' name='approveRejectDD<%=count%>' onchange="">
                                    <option value="" selected="selected" >--Select Action--</option>
                                    <option value="Approve">Approve as Buyer</option>
                                    <option value="Reject">Reject as Buyer</option>
                                </select>
                            </td>
                            <td>
                                <textarea maxlength="1000" class="form-control" type ='text' id='rejection_remarks<%=count%>' name='rejection_remarks<%=count%>' style="display: block"placeholder="remark" rows="5" cols="30"></textarea>
                                <input style="margin-top:10px;" type="button" class="btn btn-primary" value="Done" onclick="this.disabled=true;this.value='Submitting...';approved('<%=requestId%>','<%=status%>','<%=appType%>','<%=count%>','<%=role%>','<%=istType%>')">                           
                            </td>
                   </tr>
             <%
                i++;}while(fmBuyerResultSet.next());
             }
             lrmTrans.breakConnection();
             //Buyer END
            }
            else
            {
                System.out.println("Else Role is Above FM ");
                lrmTrans.makeConnection();
                int current_level = lrmTrans.getCurrentSessionUserLevel(userId,role);
                lrmTrans.breakConnection();

                ResultSet rsZones = null;
                lrmTrans.makeConnection();
                rsZones= lrmTrans.getISTDetailsBasedOnRole(current_level);
                if(rsZones.next())
                {
                    isDataFound = true;
                    do{
                        requestId = checkNull(rsZones.getString("ist_request_id"));
                        istType = checkNull(rsZones.getString("ist_type"));
                        securityName = checkNull(rsZones.getString("security_name"));
                        isinNo = checkNull(rsZones.getString("security_isin_no"));
                        tansferorScheme =  rsZones.getInt("transferor_scheme");
                        transfereeScheme = rsZones.getInt("transferee_scheme");

                        lrmTrans5.makeConnection();
                        transferorSchemeName =  lrmTrans5.getSchemeNames(tansferorScheme);
                        lrmTrans5.breakConnection();

                        lrmTrans5.makeConnection();
                        transfereeSchemeName = lrmTrans5.getSchemeNames(transfereeScheme);
                        lrmTrans5.breakConnection();

                        appType = "other";
                        count ++;
                        %>
                    <tr valign="top">
                         <%if(i%2==1){
                             trColour = "#FFFFFF";
                         }
                         else if(i%2==0)
                         {
                             trColour = "#ebebeb";
                         }%>
                             <td align="center" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=i%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><a onclick="displayISTDetails('<%=requestId%>')" style="cursor: pointer;"><%=requestId%></a></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=istType%></td>
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=securityName%><span class="tab">(<%=isinNo%>)</span></td>

                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transferorSchemeName%></td>                       
                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=transfereeSchemeName%></td>                       

                            <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;">
                            <select class="form-control ist-pending-select" id='approveRejectDD<%=count%>' name='approveRejectDD<%=count%>' onchange="showHideRemark('<%=count%>','<%=role%>')">
                                <option value="" selected="selected" >--Select Action--</option>
                                <option value="Approve">Approve</option>
                                <option value="Reject">Reject</option>
                            </select>

                                <textarea maxlength="1000" class="form-control" type ='text' id='rejection_remarks<%=count%>' name='rejection_remarks<%=count%>' style="display: none"placeholder="rejection remark" rows="5" cols="28"></textarea>
                                <input style="margin-top:10px;" type="button" class="btn btn-primary" value="Done" onclick="this.disabled=true;this.value='Submitting...';approved('<%=requestId%>','<%=status%>','<%=appType%>','<%=count%>','<%=role%>','<%=istType%>')">                           
                            </td>
                       </tr>
                     <%
                    i++;}while(rsZones.next());
                }
                lrmTrans.breakConnection();
            } //Condition END 2 
        } 

         if(isDataFound){
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