<%-- 
    Document   : addCashFlowData
    Created on : 15 Jan, 2021, 2:41:14 PM
    Author     : Suraj Jadhav
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="cashFlowBean" class="com.aniktantra.ist.CashFlowManager"/>
<jsp:useBean id="mail" class="com.aniktantra.ist.Mailing"/>
<jsp:useBean id="fileEnc" class="com.aniktantra.ist.FileEncryption"/>
<%@page import="com.aniktantra.ist.CashDeployementPOJO"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.stream.Collectors"%>
<%
    String userId = (String) session.getAttribute("username");
    String role = (String) session.getAttribute("role");
    String fullName = (String) session.getAttribute("userfullname");

    response.setHeader("pragma", "no-cache");//HTTP 1.1
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Cache-Control", "no-store");
    response.addDateHeader("Expires", -1);
    response.setDateHeader("max-age", 0);
    response.setIntHeader("Expires", -1); //prevents caching at the proxy server
    response.addHeader("cache-Control", "private");

    if (userId == null || userId.equals("-1") || userId.equals("")) {
        response.sendRedirect("index.html");
        return;
    }
    System.out.println("#### addCashFlowData 35");

%>
<%    
    //String url = "http://localhost:8080/CrossTradingWorkflow/openSchemeForApproval.jsp?";
    String url = "http://projects.aniktantra.com/CrossTradingWorkflow/openSchemeForApproval.jsp?";
    String subject = "CashDeployment Request sent for Approval";
    String commonBody = "", sr_no = "", to = "";
    String encSchemeApprStatus = "", encodedSchemeApprStatus = "", ennSchemeRejStatus = "", encodedSchemeRejStatus = "";
    String encBatchId = "", encodedBatchId = "";
    String userId_ = "", body = "", apprLink = "", rejLink = "", approveUrl = "", rejectUrl = "";
    String link = "", FMuserId = "", encodedFMuserId = "";

    cashFlowBean.makeConnection();
    System.out.println("#### isAdded 48..");
    String isAdded = cashFlowBean.insertTempTabletoMainTable(userId);
    System.out.println("#### isAdded 50"+isAdded);
    cashFlowBean.breakConnection();

    cashFlowBean.makeConnection();
    boolean isDelete = cashFlowBean.deleteTempTableData(userId);
    System.out.println("#### isDelete "+isDelete);
    cashFlowBean.breakConnection();

    String isSuccess = isAdded.split(" ")[0];//check first parameter is success or not
    System.out.println("#### isSuccess "+isSuccess);
    if (isSuccess.equals("success")) {
        String batchId = isAdded.split(" ")[1];
        System.out.println("#### Batch ID from Request : ["+batchId+"]");
        String userName = "";  
        boolean sentSucc = false;
        ResultSet resultSet = null, fmResultSetList = null;
        
        try 
        {                     
            cashFlowBean.makeConnection();
            resultSet = cashFlowBean.getUploadedSchemeswithFMs(batchId);
            List<CashDeployementPOJO> userList = new ArrayList<CashDeployementPOJO>();            
            if (resultSet.next()) 
            {
                do {
                    CashDeployementPOJO cashDeployment_tbl = new CashDeployementPOJO();

                    cashDeployment_tbl.setFM_Id(resultSet.getString("userid"));
                    cashDeployment_tbl.setFM_email(resultSet.getString("emailid"));
                    cashDeployment_tbl.setFM_name(resultSet.getString("FMname"));

                    cashDeployment_tbl.setSr_no(resultSet.getString("sr_no"));
                    cashDeployment_tbl.setScheme(resultSet.getString("scheme"));
                    cashDeployment_tbl.setDeal_no(resultSet.getString("deal_no"));
                    cashDeployment_tbl.setInstrument_name(resultSet.getString("instrument_name"));
                    cashDeployment_tbl.setTrans_type(resultSet.getString("trans_type"));
                    cashDeployment_tbl.setMaturity(resultSet.getString("maturity"));
                    cashDeployment_tbl.setTrade_date(resultSet.getString("trade_date"));
                    cashDeployment_tbl.setTotal_deal_value(resultSet.getBigDecimal("total_deal_value").toString());
                    cashDeployment_tbl.setCounterparty(resultSet.getString("counterparty"));
                    cashDeployment_tbl.setYtm(resultSet.getString("ytm"));
                    cashDeployment_tbl.setMandatory_remarks(resultSet.getString("mandatory_remarks"));
                    cashDeployment_tbl.setAsset_class(resultSet.getString("asset_class"));

                    System.out.println("#### emailId : "+resultSet.getString("emailid"));
                    System.out.println("#### FM : "+resultSet.getString("FMname"));

                    userList.add(cashDeployment_tbl);

                } while (resultSet.next());

            } 
            System.out.println("#### userList : "+userList);
            cashFlowBean.breakConnection();
            System.out.println("#### 102 ");
            //Static Mail Content
            
            //String toUserList = email;

            commonBody = "<html></body> <style> table,th,td {padding: 10px;border: 1px solid black;border-collapse: collapse; }</style><p>Below are the details of the Treps/Repo trade executed for trade date today in the below schemes. <br> Request to approve/reject by clicking  approval/reject as shown below.</p><br>";
            commonBody += "<table>";
            commonBody += "<th>Sr. no</th>";
            commonBody += "<th>Scheme</th>";
            commonBody += "<th>Deal No</th>";
            commonBody += "<th>Instrument Name</th>";
            commonBody += "<th>Trans. Type</th>";
            commonBody += "<th>Maturity</th>";
            commonBody += "<th>Trade Date</th>";
            commonBody += "<th>Total Deal Value (Inst Ccy)</th>";
            commonBody += "<th>Counterparty</th>";
            commonBody += "<th>YTM</th>";
            commonBody += "<th>Mandatory Remarks</th>";
            commonBody += "<th>Asset Class</th>";

            //static  mail content end here. 
            encSchemeApprStatus = fileEnc.Encrypt("approve");
            encodedSchemeApprStatus = URLEncoder.encode(encSchemeApprStatus);
            ennSchemeRejStatus = fileEnc.Encrypt("reject");
            encodedSchemeRejStatus = URLEncoder.encode(ennSchemeRejStatus);
            encBatchId = fileEnc.Encrypt(batchId);
            encodedBatchId = URLEncoder.encode(encBatchId);
            //ArrayList<String> fMListArray=new ArrayList<String>();

            try {
                cashFlowBean.makeConnection();
                fmResultSetList = cashFlowBean.getSchemesFMs(batchId);//List of FundManagers to send the mail.
                if (fmResultSetList.next()) 
                {
                    do
                    {
                        int i = 0;
                        body = ""; userId_ = "";                        
                        apprLink = ""; rejLink = ""; approveUrl = ""; rejectUrl = ""; link = ""; FMuserId = ""; encodedFMuserId = "";

                        body = commonBody;

                        List<CashDeployementPOJO> FMwiseSchemeList = new ArrayList<CashDeployementPOJO>(); //created for every FM
                       
                        userId_ = fmResultSetList.getString("userid");
                        to = fmResultSetList.getString("emailid"); //assigned FM_emailId                        
                        
                        System.out.println("#### userId ["+userId_+"]");
                        System.out.println("#### to ["+to+"]");
                        
                       // List<CashDeployementPOJO> FMwiseSchemeList = userList.stream().filter(o -> o.getFM_Id().equals(userIDforExpression)).collect(Collectors.toList());

                        for (CashDeployementPOJO object : userList) {
                                if (object.getFM_Id().equals(userId_)) {
                                    FMwiseSchemeList.add(object);
                                }
                            }
                        
                        //FM_Schemes in table format for email START
                        for (CashDeployementPOJO scheme : FMwiseSchemeList) {
                            i++;
                            //sr_no = sr_no + scheme.getSr_no() + "~";
                            body += "<tr>";
                            body += "<td>" + i + "</td>";
                            body += "<td>" + scheme.getScheme() + "</td>";
                            body += "<td>" + scheme.getDeal_no() + "</td>";
                            body += "<td>" + scheme.getInstrument_name() + "</td>";
                            body += "<td>" + scheme.getTrans_type() + "</td>";
                            body += "<td>" + scheme.getMaturity() + "</td>";
                            body += "<td>" + scheme.getTrade_date() + "</td>";
                            body += "<td>" + scheme.getTotal_deal_value() + "</td>";
                            body += "<td>" + scheme.getCounterparty() + "</td>";
                            body += "<td>" + scheme.getYtm() + "</td>";
                            body += "<td>" + scheme.getMandatory_remarks() + "</td>";
                            body += "<td>" + scheme.getAsset_class() + "</td>";
                            body += "</tr>";
                        }//FM_Schemes in table format for email END
                        // System.out.println("#### 152 body ["+body+"]");
                        body += "</table>";

                        // Encryption and Encoding START                    
                       
                        //userId_ = "hiteshd";
                        // System.out.println("#### userId ["+userId_+"]");
                        FMuserId = fileEnc.Encrypt(userId_);//setting FM_userId.
                        encodedFMuserId = URLEncoder.encode(FMuserId);

                        System.out.println("#### Encoded UserId  : " + userId_ + " : " + encodedFMuserId);

                        apprLink = url + "aprrovestatus=" + encodedSchemeApprStatus + "&userInfo=" + FMuserId + "&batchId=" + encodedBatchId;
                        rejLink = url + "aprrovestatus=" + encodedSchemeRejStatus + "&userInfo=" + FMuserId + "&batchId=" + encodedBatchId;

                        approveUrl = "<a href='" + apprLink + "'>Click Here To Approve</a>";
                        rejectUrl = "<a href='" + rejLink + "'>Click Here To Reject</a>";

                        System.out.println("Approve URL : " + approveUrl);
                        System.out.println("Reject URL : " + rejectUrl);

                        link = "<br><br> Please " + approveUrl + " or " + rejectUrl + ", in case you are in office. </body></html>";
                        System.out.println("#######link :" + link);
                        body = body + link;
                        System.out.println("Mail body : " + body);
                        
                        // System.out.println("#### body ["+body+"]");
                        mail.makeConnection();
                        sentSucc = mail.sendISTIntimationMail(subject, to, body);
                        System.out.println("#### sentSucc ["+sentSucc+"]");
                        mail.breakConnection();

                    } while (fmResultSetList.next());
                }//end of if 
                cashFlowBean.breakConnection();
            } catch (Exception e) {
                e.printStackTrace();
            }

        } catch (SQLException se) {
            out.println("SQL Exception " + se.getMessage());
        } catch (NullPointerException ne) {
            out.println("Nullpointer Exception " + ne.getMessage());
        } catch (Exception e) {
            out.println("#### Exception " + e);
        }
    }
   
    out.print(isAdded);

%>

<%!
    public String checkNull(String input) {
        if (input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input)) {
            input = "";
        }
        return input.trim();
    }

%>

