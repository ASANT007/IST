<%-- 
    Document   : checkAdminLogin
    Created on : 10 Jan, 2020, 4:39:24 PM
    Author     : uaer
--%>

<%@page import="java.sql.SQLException"%>
<jsp:useBean id="ifaref" class="com.aniktantra.ist.ISTApplication"/>
<jsp:useBean id="encrip" class="com.aniktantra.ist.FileEncryption"/>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <title>PGIM India Mutual Fund</title>
    </head>
    <body>
       <%
try{
		String password="";
		String username="";
		String role="-1";
                String json = "";
               
		System.out.println("------checkAdmin-----");
			username=request.getParameter("username");
			password=request.getParameter("password");                        
			ifaref.makeConnection();
			role = ifaref.authenticateUser(username,password);
			ifaref.breakConnection();
			if(!role.equals(""))
			{
                            String arr[] = role.split("~");
                            session = request.getSession(true);
                            session.setAttribute("username",username);
                            session.setAttribute("role",arr[0]);
                            session.setAttribute("userfullname",arr[1]+" "+arr[2]);
                            System.out.println("##### userfullname "+arr[1]+" "+arr[2]);
                            role="success";
                            out.println(role);
                            //out.print("True");
                          
			}
			else
			{
	   			out.print("False");
			} 	
		}
       
        catch(NullPointerException ne){
            out.println("Nullpointer Exception "+ ne.getMessage());
        }
        catch(Exception e){
            out.println("General Exception "+ e.getMessage());
        }
%>
    </body>
</html>
