<%-- 
    Document   : rejectSchemesDetails
    Created on : 19 Jan, 2021, 12:09:45 PM
    Author     : Suraj Jadhav
--%>

<jsp:useBean id="cashFlowBean" class="com.aniktantra.ist.CashFlowManager"/>
<jsp:useBean id="fileEnc" class="com.aniktantra.ist.FileEncryption"/>
<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
String callType = (String)session.getAttribute("callType");
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
<%   
    System.out.println("#### rejectSchemeDetails :: userId : "+userId); 
    String rejRemark = request.getParameter("rejRemark");
    String sr_no = checkNull(request.getParameter("sr_no"));
    String fmID=checkNull(request.getParameter("fullname"));
    
            cashFlowBean.makeConnection();
            Object processed_datetime = new java.sql.Timestamp(new java.util.Date().getTime());
            int isUpdated = cashFlowBean.rejectSchemesDetails(fmID, "Rejected", processed_datetime, sr_no,rejRemark);
            cashFlowBean.breakConnection();
       
          if(isUpdated>0){
                out.println("Success");
            }else{
                out.println("Failure");
            }
    
     
        
  
%>
<%!
public String checkNull(String input)
{
    if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
    input = "";
    return input.trim();    
}
%>
