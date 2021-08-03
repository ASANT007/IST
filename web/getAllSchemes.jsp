<%-- 
    Document   : getAllSchemes
    Created on : 17 Dec, 2020, 6:52:36 PM
    Author     : amols
--%>
<%@ page  language="java" contentType="text/html;charset=UTF-8" autoFlush="true"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONValue"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<%
            response.setHeader("pragma", "no-cache");//HTTP 1.1
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Cache-Control", "no-store");
            response.addDateHeader("Expires", -1);
            response.setDateHeader("max-age", 0);
            response.setIntHeader("Expires", -1); //prevents caching at the proxy server
            response.addHeader("cache-Control", "private");
            response.setContentType("application/json");// Send json
            String username = (String) session.getAttribute("username");
            String role = (String) session.getAttribute("role");

            if (username == null || username.equals("-1") || username.equals("")) {%>
            <script language="javascript" type="text/javascript">
                alert("Your session has expired.")
                window.location.href = "index.html";
            </script>
            <%} else {
                try {
                    ResultSet resultSet = null;
                    String userName="";
                    String userId = "";
                    //String alpha = request.getParameter("term");
                    //System.out.println("#### alpha : "+alpha);
                    List<String> userList = new ArrayList<String>();
                   // if (alpha.length() > 0) {
                        lrmTrans.makeConnection();                        
                        resultSet = lrmTrans.getAllSchemes();
                       
                        if (resultSet.next()) {
                            do {
                                userId = resultSet.getString("SRNO");
                                userName = resultSet.getString("SCHEME_NAME");
                                
                                userList.add(userName.trim()+"~"+userId.trim());
                               
                            } while (resultSet.next());

                        }
                        if( resultSet != null)
                        {
                            resultSet.close();
                        }
                        lrmTrans.breakConnection();
                        JSONArray arr = new JSONArray();
                        JSONObject obj = null;
                        Iterator<String> iterator = userList.iterator();
                       
                        while (iterator.hasNext()) {
                            String str = (String) iterator.next();
                            // out.println(str);
                            String [] arrStr = str.split("~");
                            obj = new JSONObject();
                            obj.put("label",arrStr[0]);
                            obj.put("value",arrStr[1]);
                            arr.add(obj);

                        }
                        out.println(arr.toString());
                        
                    //}
                } catch (SQLException se) {
                    out.println("SQL Exception " + se.getMessage());
                } catch (NullPointerException ne) {
                    out.println("Nullpointer Exception " + ne.getMessage());
                } catch (Exception e) {
                    out.println("#### Exception " + e);
                }
            }
%>
