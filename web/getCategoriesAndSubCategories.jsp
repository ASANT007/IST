<%-- 
    Document   : getCategoriesAndSubCategories
    Created on : 9 Dec, 2020, 2:14:38 PM
    Author     : amols
--%>

<%@page  language="java" import="java.sql.*"  autoFlush="true"%>
<jsp:useBean id="LRMTrans" class="com.aniktantra.ist.LRMTransManager"/>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="org.json.simple.JSONObject"%>

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
%>


<%
    //START
    JSONObject obj = new JSONObject();
    String category = "", subCategory = "";
    String schemeName = checkNull((String) request.getParameter("schemeName"));
    
    if(schemeName.length() > 0 )
    {
        int srno = Integer.parseInt(schemeName);
        ResultSet rs = null;
        LRMTrans.makeConnection();
        rs = LRMTrans.getCategories(srno);
        if(rs.next())
        {
            category = checkNull(rs.getString("SCHEME_CATEGORY"));
            subCategory = checkNull(rs.getString("SCHEME_SUB_CATEGORY"));           
        }
        LRMTrans.breakConnection();
        
        
        obj.put("category", category);
        obj.put("subCategory", subCategory); 
        
        out.println(obj.toString());
    }else{
        obj.put("category", category);
        obj.put("subCategory", subCategory);         
        out.println(obj.toString());
    }
     //END
%>


<%!
public String checkNull(String input)
{
    if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
    input = "";
    return input.trim();    
}
%>
