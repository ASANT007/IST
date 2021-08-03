<%-- 
    Document   : openSchemeForApproval
    Created on : 18 Jan, 2021, 3:17:40 PM
    Author     : Suraj Jadhav
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="cashFlowBean" class="com.aniktantra.ist.CashFlowManager"/>
<jsp:useBean id="lrmTrans6" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="fileEnc" class="com.aniktantra.ist.FileEncryption"/>

<%

    response.setHeader("pragma", "no-cache");//HTTP 1.1
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Cache-Control", "no-store");
    response.addDateHeader("Expires", -1);
    response.setDateHeader("max-age", 0);
    response.setIntHeader("Expires", -1); //prevents caching at the proxy server
    response.addHeader("cache-Control", "private");

    String userId = fileEnc.Decrypt(checkNull((String) request.getParameter("userInfo")));
    //String userId = checkNull((String) request.getParameter("userid"));
    String aprrovestatus = fileEnc.Decrypt(checkNull((String) request.getParameter("aprrovestatus")));
    //String aprrovestatus = checkNull((String) request.getParameter("aprrovestatus"));
    String batch_id = fileEnc.Decrypt(checkNull((String) request.getParameter("batchId")));

    ResultSet iaResultSet = null;
    //userId=userId.replaceAll("'", "");
    cashFlowBean.makeConnection();
    iaResultSet = cashFlowBean.getSchemesSr_no(batch_id, userId);
    ArrayList<String> sr_nos = new ArrayList<String>();
    if (iaResultSet.next()) {
        do {
            Integer sr_no_int = iaResultSet.getInt("sr_no");
            sr_nos.add(sr_no_int.toString());
        } while (iaResultSet.next());
    }
    cashFlowBean.breakConnection();

    //String sr[] = sr_no.split("~");
    String sr_no_withcomma = String.join(",", sr_nos);
    System.out.println("#### userId [" + userId + "]");

    cashFlowBean.makeConnection();
    boolean isProcessed = false;
    isProcessed = cashFlowBean.isSchemeProcessed(sr_no_withcomma);
    cashFlowBean.breakConnection();

    System.out.println("#### isProcessed [" + isProcessed + "]");

    String role = "", fullname = "";
    lrmTrans6.makeConnection();
    String userDetails = lrmTrans6.getUserDetails(userId);
    lrmTrans6.breakConnection();

    if (checkNull(userDetails).length() > 0) {
        String arr[] = userDetails.split("~");
        role = arr[0];
        fullname = arr[1] + " " + arr[2];
    }
    if ((userId == null || userId.equals("-1") || userId.equals("")) && (role == null || role != "FM")) {
        response.sendRedirect("logout.jsp");
        return;
    }

    session.setAttribute("username", userId);
    session.setAttribute("role", role);
    session.setAttribute("userfullname", fullname);
    session.setAttribute("callType", "link");

%>
<!DOCTYPE html>

<html>
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
        <script src="js/common.js"></script>
        <script src="js/clientValidation.js"></script>
        <script src="js/serverValidation.js"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <style>
            .report_name label {
                font-weight:bold;
                font-weight: bold;
                margin-right: 5px;
                vertical-align: top;
                color: #07639d;
            } 
            .label-name .form-group {
                margin-bottom: 18px;
            }
            .heading-bg  {
                background: #2980b9;
                PADDING: 8PX 6px 9px 14px;
                COLOR: #fff;
                font-size: 22px;
            } 
            textarea.form-control {
                vertical-align: top;
            }
        </style>
    </head>
    <body>


        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"> </div>
                <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
            </div>
            <div style="background-color:#07245d; height:30px; clear:both"></div>
            <%if (isProcessed) {%>

            <div class="row" style="font-size:16px; padding:5px 15px;">
                <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
            </div>
            <div>
                <h2>Cash Deployment Approval</h2>            
            </div>

            <div class="container label-name report_name" style="padding:25px;margin:10px auto 30px auto;background: #fff;border: 1px solid #ccc;">

            <div class="alert alert-success" style="text-align: center;max-width: 420px;margin: 15px auto 0 auto;">
                This Cash Deployment Approval request is already processed. 
            </div>

            <div class="row">
                <div class="col-md-12 text-center">          
                    <input class="btn btn-primary"  type="button"  style = "margin-left: 20px;" onclick="closeSession()" value="Close"/>
                </div>  
            </div> 
            <%
            } else {%>
            <div class="row" style="font-size:16px; padding:5px 15px;">
                <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
            </div>
            <div>
                <h2>Cash Deployment Approval</h2>            
            </div>

            <div class="container label-name report_name" style="padding:25px;margin:10px auto 30px auto;background: #fff;border: 1px solid #ccc;">

                <% if ("approve".equals(aprrovestatus)) {
                        cashFlowBean.makeConnection();
                        Object processed_datetime = new java.sql.Timestamp(new java.util.Date().getTime());
                        int isUpdated = cashFlowBean.updateCashFlowTable(userId, "Approved", processed_datetime, sr_no_withcomma);
                        cashFlowBean.breakConnection();
                        if (isUpdated > 0) {
                %> 
                <div class="alert alert-success" style="text-align: center;max-width: 420px;margin: 15px auto 0 auto;">
                    Schemes approved successfully. 
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">          
                        <input class="btn btn-primary"  type="button"  style = "margin-left: 20px;" onclick="closeSession()" value="Close"/>
                    </div>  
                </div> 
                <% } else {%>
                <div class="alert alert-success" style="text-align: center;max-width: 420px;margin: 15px auto 0 auto;">
                    Schemes approval fail.
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">          
                        <input class="btn btn-primary"  type="button"  style = "margin-left: 20px;" onclick="closeSession()" value="Close"/>
                    </div>  
                </div> 
                <%}%>
                <% } else {


                %>

                <div class="col-md-4 col-sm-6">
                    <label> You have choosen to reject cash deployment deal. Kindly specify your rejection reason.</label>
                    <textarea class="form-control " style="width: 400px;" rows="4" cols ="50" id="approveRejectRemark" name="approveRejectRemark" maxlength="1000"></textarea>
                </div>

                <div class="row">
                    <div class="col-md-12 text-center">          
                        <input class="btn btn-primary" type="button" value="Submit" onClick="return submitRejection('<%=sr_no_withcomma%>', '<%=userId%>');">  
                        <input class="btn btn-primary"  type="button"  style = "margin-left: 20px;" onclick="closeSession()" value="Close"/>
                    </div> 
                </div> 

                <%}%>
            </div>

            <%}%>  
        </div>
        <script>
            function submitRejection(sr_no, FM_name) {
                var remark = $.trim($('#approveRejectRemark').val());
                if (remark == "") {
                    alert('Please enter rejection remark');
                  //  $('#approveRejectRemark').value="";
                    document.getElementById("approveRejectRemark").value = "";
                    document.getElementById("approveRejectRemark").focus();
                    return false;
                }
                rejectSchemeDetails(remark, sr_no, FM_name);
            }

            function closeSession(){
                
                var xmlhttp = createHTTPObj();
                xmlhttp.onreadystatechange = function ()
                {
                    if (xmlhttp.readyState == 4)
                    {
                            window.close();
                    }

                }

                xmlhttp.open('POST', 'sessionInvalidate.jsp', true);
                xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xmlhttp.send();
               
             }
             
            function rejectSchemeDetails(rejRemark, sr_no, FM_name) {
                //alert(rejRemark);
                var xmlhttp = createHTTPObj();
                xmlhttp.onreadystatechange = function ()
                {
                    if (xmlhttp.readyState == 4)
                    {
                        if (xmlhttp.responseText.trim() == 'Session expired')
                        {
                            alert("Session expired");
                            window.location.href = "index.html";
                        } else if (xmlhttp.responseText.match("Activity restricted"))
                        {
                            alert("The Activity you are trying is restricted");
                            //window.location.href = "logout.jsp";
                             closeSession();
                        } else if (xmlhttp.responseText.match("Success"))
                        {
                            alert('Data Rejected Successfuly.')
                            //window.location.href = "logout.jsp";
                             closeSession();

                        } else if (xmlhttp.responseText.match("Failure"))
                        {
                            alert('Unable to Reject.')
                            //window.location.href = "logout.jsp";
                             closeSession();
                        }

                    }

                }

                xmlhttp.open('POST', 'rejectSchemesDetails.jsp', true);
                xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xmlhttp.send("&rejRemark=" + encodeURIComponent(rejRemark)
                        + "&sr_no=" + encodeURIComponent(sr_no) + "&fullname=" + encodeURIComponent(FM_name));
            }
        </script>
    </body>

</html>
<%!
    public String checkNull(String input) {
        if (input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input)) {
            input = "";
        }
        return input.trim();
    }
%>

