<%-- 
    Document   : sessionInvalidate
    Created on : 28 Jan, 2021, 1:08:12 PM
    Author     : Suraj Jadhav
--%>

<%
    session.removeAttribute("username");
    session.removeAttribute("role");
    session.removeAttribute("userfullname");
    session.invalidate();
    //out.println();
%>