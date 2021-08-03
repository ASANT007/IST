<%-- 
    Document   : logout
    Created on : 17 Apr, 2017, 12:25:33 PM
    Author     : anik-pc7
--%>
<%
    session.removeAttribute("username");
    session.removeAttribute("role");
    session.removeAttribute("userfullname");
    session.invalidate();
    response.sendRedirect("login.jsp");
%>
