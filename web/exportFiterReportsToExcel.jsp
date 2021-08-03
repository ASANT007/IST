<%-- 
    Document   : exportFiterReportsToExcel
    Created on : 5 Jan, 2021, 3:53:08 PM
    Author     : amols
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="lrmTrans2" class="com.aniktantra.ist.LRMTransManager"/>

<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");

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
String reqISTType = checkNull((String) request.getParameter("reqISTType")); //Use for Filter Search
String istFiterStatus = checkNull((String) request.getParameter("istStatus"));
String istFrmDate = checkNull((String) request.getParameter("istFromDate"));
String istToDate = checkNull((String) request.getParameter("istToDate"));
%>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
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
<%
    String fileName = "viewExcelReport.xls";
    response.setContentType("application/vnd.ms-excel");
    response.setHeader("Content-Disposition", "inline; filename=" +fileName);
%>
</head>
<body>

    <div id="allTranReportResult" class="row" style="margin: 0;">
      <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0" class="table tbl-report">
        
        <tr>
          <th width="5%" align="center" valign="middle" class="table-heading">Sr.No</th>
          <th width="5%" align="center" valign="middle" class="table-heading">IST Request Id</th>
          <th width="6%" align="center" valign="middle" class="table-heading">IST Type</th>
          <th width="15%" align="center" valign="middle" class="table-heading">Security Name</th>
          <th width="20%" align="center" valign="middle" class="table-heading">Transferor Scheme </th>          
          <th width="20%" align="center" valign="middle" class="table-heading">Transferee Scheme </th> 
          <th width="20%" align="center" valign="middle" class="table-heading">Created By </th>  
          <th width="20%" align="center" valign="middle" class="table-heading">Created On </th>  
          <th width="15%" align="center" valign="middle" class="table-heading">Status</th>          
        </tr>
<%
                                 
    try
    {
        //Filter will be on below Data.
        
        System.out.println("#### reqISTType "+reqISTType);
        System.out.println("#### istStatus "+istFiterStatus);
        System.out.println("#### istFrmDate "+istFrmDate);
        System.out.println("#### istToDate "+istToDate);
        
        
        boolean isDataFound = false;
        String trColour = "";
        
        int i=1, count = 0, tansferorScheme = 0, transfereeScheme = 0;
        String requestId = "", istType = "", securityName = "", isinNo = "", transferorSchemeName = "", transfereeSchemeName = "";
        String createdBy = "";
        java.util.Date creationDate = null;
        
        String nextLevel = "", status = "",  appType = "", pendingUser = "";
        
             
        ResultSet filterDataResultSet = null; 
        lrmTrans.makeConnection();
        filterDataResultSet = lrmTrans.getFilterReportData(userId,role,istFrmDate,istToDate,istFiterStatus, reqISTType);//ist_details Join with Tracking table
        if( filterDataResultSet.next())
        {

            isDataFound =  true;
           do{
                requestId = checkNull(filterDataResultSet.getString("ist_request_id"));
                istType = checkNull(filterDataResultSet.getString("ist_type"));
                securityName = checkNull(filterDataResultSet.getString("security_name"));
                isinNo = checkNull(filterDataResultSet.getString("security_isin_no"));
                tansferorScheme =  filterDataResultSet.getInt("transferor_scheme");
                transfereeScheme = filterDataResultSet.getInt("transferee_scheme");
                createdBy = checkNull(filterDataResultSet.getString("created_by"));
                creationDate = filterDataResultSet.getDate("created_date");
                //nextLevel = checkNull(filterDataResultSet.getString("next_level"));
                status = checkNull(filterDataResultSet.getString("status"));
                
                
                lrmTrans2.makeConnection();
                transferorSchemeName =  lrmTrans2.getSchemeNames(tansferorScheme);
                lrmTrans2.breakConnection();    
                
                lrmTrans2.makeConnection();
                transfereeSchemeName = lrmTrans2.getSchemeNames(transfereeScheme);
                lrmTrans2.breakConnection(); 
                
                if(status.equals("New") || status.equals("Recommended"))
                { 
                    
                    lrmTrans2.makeConnection();
                    nextLevel = lrmTrans2.getNextLevel(requestId);
                    lrmTrans2.breakConnection();    
                    
                    lrmTrans2.makeConnection();
                    pendingUser =  lrmTrans2.getPendingUser(requestId,nextLevel,status,tansferorScheme,transfereeScheme,"report");
                    lrmTrans2.breakConnection();
                }
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
                    <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=createdBy%></td>  
                    <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=creationDate%></td>
                    <%if(status.equals("New") || status.equals("Recommended")){%>
                       <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;">Awaiting approval by <span class="user-name"><%=pendingUser%></span></td>  
                    <%}else{%>
                    <td align="center" valign="middle" bgcolor="<%=trColour%>" style="border-right: #d4d4d4 1px solid; padding: 5px;"><%=status%></td>  
                    <%}%>
                   

              </tr>
        <%
           i++;}while(filterDataResultSet.next());
        }
        lrmTrans.breakConnection();
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
