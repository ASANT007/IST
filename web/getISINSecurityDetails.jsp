<%-- 
    Document   : getISINSecurityDetails
    Created on : 9 Dec, 2020, 10:47:27 PM
    Author     : amols
--%>

<%-- <%@ page  language="java" contentType="application/json;charset=UTF-8" autoFlush="true"%> --%>
<%@ page  language="java" contentType="text/html;charset=UTF-8" autoFlush="true"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONValue"%>
<jsp:useBean id="LRMTrans" class="com.aniktantra.ist.LRMTransManager"/>
<%
            response.setHeader("pragma", "no-cache");//HTTP 1.1
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Cache-Control", "no-store");
            response.addDateHeader("Expires", -1);
            response.setDateHeader("max-age", 0);
            response.setIntHeader("Expires", -1); //prevents caching at the proxy server
            response.addHeader("cache-Control", "private");
            response.setContentType("application/json");// Send json
            String userId = (String) session.getAttribute("username");            

            if (userId == null || userId.equals("-1") || userId.equals("")) {%>
            <script language="javascript" type="text/javascript">
                alert("Your session has expired.")
                window.location.href = "index.html";
            </script>
            <%} else {
                try {
                    ResultSet resultSet = null;
                    String securityDesc ="";
                    String isin = "";
                    String alpha = request.getParameter("term");
                    System.out.println("#### alpha : "+alpha);
                    List<String> userList = new ArrayList<String>();
                    if (alpha.length() > 0)
                    {
                        LRMTrans.makeConnection();                        
                        resultSet = LRMTrans.getISINSecurityDetails(alpha);
                       
                        if (resultSet.next()) {
                            do {
                                securityDesc = checkNull(resultSet.getString("SECURITY_DESC"));
                                isin = checkNull(resultSet.getString("ISIN"));
                                
                                userList.add(securityDesc+"~"+isin);
                               
                            } while (resultSet.next());

                        }
                        if( resultSet != null)
                        {
                            resultSet.close();
                        }
                        LRMTrans.breakConnection();
                        
                        JSONArray arr = new JSONArray();
                        JSONObject obj = null;
                        Iterator<String> iterator = userList.iterator();
                       
                        while (iterator.hasNext())
                        {
                            String str = (String) iterator.next();                            
                            String [] arrStr = str.split("~");
                            obj = new JSONObject();
                            obj.put("label",arrStr[0]);
                            obj.put("value",arrStr[1]);
                            arr.add(obj);

                        }
                        out.println(arr.toString());
                        
                    }
                } catch (SQLException se) {
                    out.println("SQL Exception " + se.getMessage());
                } catch (NullPointerException ne) {
                    out.println("Nullpointer Exception " + ne.getMessage());
                } catch (Exception e) {
                    out.println("#### Exception " + e);
                }
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