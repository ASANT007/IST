<jsp:useBean id="ist" class="com.aniktantra.ist.ISTApplication"/>
<jsp:useBean id="ist1" class="com.aniktantra.ist.ISTApplication"/>
<jsp:useBean id="mail" class="com.aniktantra.ist.Mailing"/>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="fileEnc" class="com.aniktantra.ist.FileEncryption"/>
<%@page import="java.util.HashMap" %>
<%@page import="java.net.URLEncoder"%>
<%
String userId = checkNull((String)session.getAttribute("username"));
String role = checkNull((String)session.getAttribute("role"));
String fullname = (String)session.getAttribute("userfullname");
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
}%>
<html lang="en-US">
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/custom.css" rel="stylesheet" type="text/css">
<link href="vendor/hover/effects.min.css" rel="stylesheet"><link href="menu/menu.css" rel="stylesheet" type="text/css">

<script src="js/jquery-latest.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/clientValidation.js"></script>
<script src="js/serverValidation.js"></script>

<script src="js/common.js"></script>


<script type="text/javascript" src="js/autoComplete-JS-CSS/jquery.js"></script>
<script language="javascript" src="js/autoComplete-JS-CSS/jquery-ui.js"></script>
<link href="js/autoComplete-JS-CSS/jquery-ui.css" rel="stylesheet" type="text/css">
<link href="calendar/roboto.css" rel="stylesheet" type="text/css">
<link href="calendar/dhtmlxcalendar.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<script src="calendar/dhtmlxcalendar.js"></script>
</head>
<body>
<div class="container">
    
<div class="row">
  <div class="col-md-6 col-sm-6  centerdiv"> <img src="images/pgim-mf-logo.png" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg"></div>
  <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
</div>
    
<div style="background-color:#07245d; height:30px; clear:both">
 <div  id="load_menu_ist"></div>
</div>
    
<div class="row" style="font-size:16px; padding:5px 15px;">
    <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
</div>

<div class="row">
<div class="col-md-12 col-sm-12">
  <div class="label-name" style="background-color:#fff; box-shadow: 0 5px 5px 1px #ccc;  margin-bottom:20px;padding:0 30px 30px 30px;">
<%
    //Use field ID to get Data. Because form tag is used. 
    HashMap<String, String> istDetailsHashMap = new HashMap();
    
       
    String attach = "", aprrovestatus = "", sellerId = "";
    String ist_type = checkNull(request.getParameter("ist_type"));    
    //String ist_datetime = checkNull(request.getParameter("ist_datetime"));//Commented by Amol S. on 07-06-2021
    
    /*if(ist_type.equals("Duration Rebalancing") || ist_type.equals("Issuer/Sector/Group Rebalancing") ){
        attach  = checkNull((String)session.getAttribute("attach"));
    }*/ 
    attach  = checkNull((String)session.getAttribute("attach")); // For all Type.
    
    System.out.println("#### attach : "+attach);
    istDetailsHashMap.put("ist_type", ist_type);
    istDetailsHashMap.put("security_isin_no", checkNull(request.getParameter("security_isin_no")));
    istDetailsHashMap.put("security_name", checkNull(request.getParameter("security_name")));
    istDetailsHashMap.put("transferor_scheme", checkNull(request.getParameter("transferor_scheme")));
    istDetailsHashMap.put("transferee_scheme", checkNull(request.getParameter("transferee_scheme")));
    
    if("LRM".equals(ist_type)){
        //LRM Data START
        istDetailsHashMap.put("transferror_min_lrm", checkNull(request.getParameter("transferror_min_lrm")));
        istDetailsHashMap.put("transferee_min_lrm", checkNull(request.getParameter("transferee_min_lrm")));
        istDetailsHashMap.put("transferror_netcash_position", checkNull(request.getParameter("transferror_netcash_position")));
        istDetailsHashMap.put("transferee_netcash_position", checkNull(request.getParameter("transferee_netcash_position")));
        istDetailsHashMap.put("line_available", checkNull(request.getParameter("lineBrorrowingUtilized"))); // Not used
        istDetailsHashMap.put("securities_proceeds_utilized", checkNull(request.getParameter("securities_proceeds_utilized")));
        istDetailsHashMap.put("optimal_mix_of_low_duration_paper", checkNull(request.getParameter("optimal_mix_of_low_duration_paper")));
        istDetailsHashMap.put("line_borrowing_not_utilize_remark", checkNull(request.getParameter("notUtilizedRemark")));
        //Added on 05-08-2021 START
        istDetailsHashMap.put("line_available_val", checkNull(request.getParameter("line_available_val")));
        istDetailsHashMap.put("borrowing_utilized", checkNull(request.getParameter("borrowing_utilized")));
        //Added on 05-08-2021 END
        //LRM Data END
    }else if("Duration Rebalancing".equals(ist_type)){
        //Duration Rebalancing START
        istDetailsHashMap.put("transferror_pretrade_duration", checkNull(request.getParameter("transferror_pretrade_duration")));
        istDetailsHashMap.put("transferror_posttrade_duration", checkNull(request.getParameter("transferror_posttrade_duration")));
        istDetailsHashMap.put("transferee_pretrade_duration", checkNull(request.getParameter("transferee_pretrade_duration")));
        istDetailsHashMap.put("transferee_posttrade_duration", checkNull(request.getParameter("transferee_posttrade_duration")));
        istDetailsHashMap.put("transferror_interestrate_view", checkNull(request.getParameter("transferror_interestrate_view")));
        istDetailsHashMap.put("transferee_interestrate_view", checkNull(request.getParameter("transferee_interestrate_view")));
        //Duration Rebalancing END
    }else if("Issuer/Sector/Group Rebalancing".equals(ist_type)){
        //Issuer/Sector/Group Rebalancing START
        istDetailsHashMap.put("transferror_issuer_pretrade_concentration", checkNull(request.getParameter("transferror_issuer_pretrade_concentration")));
        istDetailsHashMap.put("transferror_sector_pretrade_concentration", checkNull(request.getParameter("transferror_sector_pretrade_concentration")));
        istDetailsHashMap.put("transferror_group_pretrade_concentration", checkNull(request.getParameter("transferror_group_pretrade_concentration")));
        
        istDetailsHashMap.put("transferee_issuer_pretrade_concentration", checkNull(request.getParameter("transferee_issuer_pretrade_concentration")));
        istDetailsHashMap.put("transferee_sector_pretrade_concentration", checkNull(request.getParameter("transferee_sector_pretrade_concentration")));
        istDetailsHashMap.put("transferee_group_pretrade_concentration", checkNull(request.getParameter("transferee_group_pretrade_concentration")));
        
        istDetailsHashMap.put("transferror_issuer_posttrade_concentration", checkNull(request.getParameter("transferror_issuer_posttrade_concentration")));
        istDetailsHashMap.put("transferror_sector_posttrade_concentration", checkNull(request.getParameter("transferror_sector_posttrade_concentration")));
        istDetailsHashMap.put("transferror_group_posttrade_concentration", checkNull(request.getParameter("transferror_group_posttrade_concentration")));
        
        istDetailsHashMap.put("transferee_issuer_posttrade_concentration", checkNull(request.getParameter("transferee_issuer_posttrade_concentration")));
        istDetailsHashMap.put("transferee_sector_posttrade_concentration", checkNull(request.getParameter("transferee_sector_posttrade_concentration")));
        istDetailsHashMap.put("transferee_group_posttrade_concentration", checkNull(request.getParameter("transferee_group_posttrade_concentration")));
        
        istDetailsHashMap.put("transferror_issuer_sebilimit", checkNull(request.getParameter("transferror_issuer_sebilimit")));
        istDetailsHashMap.put("transferror_sector_sebilimit", checkNull(request.getParameter("transferror_sector_sebilimit")));
        istDetailsHashMap.put("transferror_group_sebilimit", checkNull(request.getParameter("transferror_group_sebilimit")));
        
        istDetailsHashMap.put("transferee_issuer_sebilimit", checkNull(request.getParameter("transferee_issuer_sebilimit")));
        istDetailsHashMap.put("transferee_sector_sebilimit", checkNull(request.getParameter("transferee_sector_sebilimit")));
        istDetailsHashMap.put("transferee_group_sebilimit", checkNull(request.getParameter("transferee_group_sebilimit")));
        //Issuer/Sector/Group Rebalancing END
    } 
  
    boolean flag = false;
    ist.makeConnection();
    String maxRequestId = ist.getMaxRequestId(); // Need to Change Logic
    ist.breakConnection();
    
    System.out.println("#### maxRequestId : "+maxRequestId);
    if(maxRequestId == null){        
        maxRequestId="000";
    }else{
        maxRequestId=maxRequestId.substring(maxRequestId.length()-3,maxRequestId.length());
    }
    String ist_request_id = checkNull(ist.getThreeDigitsNumWithCurrentDate(maxRequestId));
   
    System.out.println("#### ist_request_id : "+ist_request_id);
    istDetailsHashMap.put("ist_request_id", ist_request_id);
    istDetailsHashMap.put("created_onbehalf", "FM");
    istDetailsHashMap.put("status", "New");
    istDetailsHashMap.put("created_by", userId);
    
    ist.makeConnection();
    //flag = ist.insertLRM(istDetailsHashMap,ist_datetime,attach); //Commented by Amol S. on 07-06-2021       
    flag = ist.insertLRM(istDetailsHashMap,attach);        
    ist.breakConnection(); 
    
    %>
     <div class="row">   
    <%if(flag){
        ist1.makeConnection();
        int current_level=ist1.getCurrentSessionUserLevel(userId, role);
        ist1.breakConnection();
        
        ist1.makeConnection(); 
        flag = ist1.insertRoutingTable(ist_request_id,current_level,current_level+1,"New");
        ist1.breakConnection();
        
        //Mail START
        boolean sentSucc = false;
        String subject = "IST Request sent for Approval";
        /*String host = "smtp.zoho.in";        
	String from = "amol.sant@aniktantra.com";*/
        
        int srno = 0;
        if(checkNull(request.getParameter("transferor_scheme")).length() > 0){
            srno = Integer.parseInt(request.getParameter("transferor_scheme"));
        }
       
        lrmTrans.makeConnection();
        sellerId = lrmTrans.getUserIdBySchemeRefNo(srno);
        lrmTrans.breakConnection();  
         
        lrmTrans.makeConnection();
        String to = lrmTrans.getEmailId(srno,"");
        lrmTrans.breakConnection();  
        //Local url 
        //String url = "http://localhost:8084/CrossTradingWorkflow/openISTRequestForApproval.jsp?";
        //UAT url 
        String url = "http://projects.aniktantra.com/CrossTradingWorkflow/openISTRequestForApproval.jsp?";
        String encISTId = fileEnc.Encrypt(ist_request_id);
        String encodedISTid = URLEncoder.encode(encISTId);
        String encUserId = fileEnc.Encrypt(sellerId);
        String encodedUserId = URLEncoder.encode(encUserId);
        String encISTApprStatus = fileEnc.Encrypt("Approve");
        String encodedApprStatus = URLEncoder.encode(encISTApprStatus);
        String encISTRejStatus = fileEnc.Encrypt("Reject");
        String encodedRejStatus = URLEncoder.encode(encISTRejStatus);
        
        String encISTappType = fileEnc.Encrypt("seller");
        String encodedappType = URLEncoder.encode(encISTappType);
        
        String strTansferorScheme = "",strTransferee_scheme = "", transferorSchemeName = "",transfereeSchemeName = "";
        int tansferorScheme = 0, transfereeScheme = 0;
        strTansferorScheme =  checkNull(request.getParameter("transferor_scheme"));
        System.out.println("#### strTansferorScheme "+strTansferorScheme);
        strTransferee_scheme = checkNull(request.getParameter("transferee_scheme"));
         System.out.println("#### strTransferee_scheme "+strTransferee_scheme);
        if(strTansferorScheme.length() > 0){
            tansferorScheme = Integer.parseInt(strTansferorScheme);
        }
        if(strTransferee_scheme.length() > 0){
            transfereeScheme = Integer.parseInt(strTransferee_scheme);
        }
        lrmTrans.makeConnection();
        transferorSchemeName =  lrmTrans.getSchemeNames(tansferorScheme);
        lrmTrans.breakConnection();

        lrmTrans.makeConnection();
        transfereeSchemeName = lrmTrans.getSchemeNames(transfereeScheme);
        lrmTrans.breakConnection();
        
        String apprLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedApprStatus;
        String rejLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedRejStatus;
        //String rejLink = "http://localhost:8084/CrossTradingWorkflow/openISTRequestForApproval.jsp?requestId="+fileEnc.Encrypt(ist_request_id)+"&userid="+fileEnc.Encrypt(sellerId)+"&aprrovestatus="+fileEnc.Encrypt("Reject")+"&appType="+fileEnc.Encrypt("seller");
        //URLEncoder.encode(apprLink);
        
	String approveUrl = "<a href='"+apprLink+"'>Click Here To Approve</a>";
        String RejectUrl = "<a href='"+rejLink+"'>Click Here To Reject</a>";
        
        String body = "Hi,<br><br> ";
	body = body + "<b>IST Request No: </b>"+ist_request_id+ " of <b> IST Type :</b> " + ist_type+ " has been sent for your approval.<br><br> ";
	body = body + "<b>Security name - </b> "+request.getParameter("security_name")+".<br><br>";
        body = body + "<b>Selling scheme - </b>"+transferorSchemeName+" <b>Buying scheme - </b>"+transfereeSchemeName+".<br><br>";
        //body = body + "Kindly do the needfull.<br>";
	body = body + "Please "+approveUrl+" or "+RejectUrl+"the trade, in case you are in office.";
        
        //Commented on 07-2021
        /*
        mail.makeConnection();       
        sentSucc = mail.sendISTIntimationMail(subject, to, body);        
        mail.breakConnection();
        */
        //Added on 07-08-2021 START TO get email id for all FM START
        lrmTrans.makeConnection();
        String toEmailList = lrmTrans.getSellerEmailList(srno,null);
        lrmTrans.breakConnection();
        mail.makeConnection();
        try
        {
            System.out.println("#### toEmailList ["+toEmailList+']');
            if(toEmailList.contains(","))
            {
                String strArr [] = toEmailList.split(",");
                for(String emailId : strArr)
                {
                    System.out.println("#### sending Mail id ["+emailId+']');
                    sentSucc = mail.sendISTIntimationMail(subject,emailId, body);
                }

            }else{
                System.out.println("#### sending Mail id ["+toEmailList+']');
                sentSucc = mail.sendISTIntimationMail(subject, toEmailList, body);
            }           

        }catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("#### Mail sent "+sentSucc);
        mail.breakConnection();
        //Added on 07-08-2021 START TO get email id for all FM END
        
    %>
        
        <div class="alert alert-success" style="text-align: center;max-width: 420px;margin: 15px auto 0 auto;">
            IST Details Are Registered Successfully <span style="display: block;">Please note the transaction id for future reference <strong><%=ist_request_id%></strong></span>
        </div>        
        
    <%}else{%>
    <div class="alert alert-danger" style="text-align: center;max-width: 420px;margin: 15px auto 0 auto;">
        IST Details Cannot Be Registered Successfully        
    </div>
       
    <%}%>
    </div> 
    
    <div class="row text-center" style="margin-top: 10px">
       <%if(ist_type.equals("LRM")){%>
                <a href="liquidityRequirementMaintenance.jsp">Click here to Add New Transaction</a>
            <%}else if(ist_type.equals("Duration Rebalancing")){%>
                 <a href="durationRebalancing.jsp">Click here to Add New Transaction</a>
            <%}else if(ist_type.equals("Issuer/Sector/Group Rebalancing")){%>
               <a href="IssuerSectorGroupRebalancing.jsp">Click here to Add New Transaction</a>
            <%}%>
    </div>
  </div>
</div>
</div>
<div  style="text-align:center; color:#2a3642; padding:7px 20px;clear:both;border-top:1px solid #2a3642;margin-top:80px;">
    <h6>© PGIM India Asset Management Private Limited</h6>
</div>
</div>
</body>
</html>
<%!
public String checkNull(String input)
{
    if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
    input = "";
    return input.trim();    
}
%>