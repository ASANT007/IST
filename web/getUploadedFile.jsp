<%-- 
    Document   : getUploadedFile
    Created on : 25 Dec, 2020, 2:37:35 PM
    Author     : amols
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String attachment = request.getParameter("attach"); 
    System.out.print("##### getUploadedFile "+attachment);
    out.print(attachment);
%>