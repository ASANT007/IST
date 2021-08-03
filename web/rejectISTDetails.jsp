<%-- 
    Document   : rejectISTDetails
    Created on : 12 Dec, 2020, 10:51:33 AM
    Author     : amols
--%>

<jsp:useBean id="ist" class="com.aniktantra.ist.ISTApplication"/> 
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="mail" class="com.aniktantra.ist.Mailing"/>
<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
String callType = (String)session.getAttribute("callType");
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
    System.out.println("#### rejectISTDetails :: userId : "+userId); 
    String requestId = request.getParameter("requestId");
    String rejRemark = request.getParameter("rejRemark");
    String appType = checkNull(request.getParameter("appType"));
    String istType = checkNull(request.getParameter("istType"));
    String to_user = userId, from_user = "";
    boolean flag = false;

    ist.makeConnection();
    from_user = ist.getFromUser(requestId,appType);
    ist.breakConnection();

    ist.makeConnection();
    flag = ist.insertTrackingTable(requestId,from_user,to_user,"Rejected");
    ist.makeConnection();
    System.out.println("#### toUserList "+from_user);
    if(flag)
    {
        int i= ist.updateStatusTransactionTable(requestId, "Rejected",rejRemark,role,appType,"Rejection");
        ist.breakConnection();
        if(i>0)
        {
            ist.makeConnection();
            ist.deleteFromRoutingTable(requestId);
            ist.breakConnection();
            //
            String securityName = "" , transferorSchemeName = "",transfereeSchemeName = "";
            lrmTrans.makeConnection();
            securityName = lrmTrans.getSecurityName(requestId);
            lrmTrans.breakConnection();
            
            lrmTrans.makeConnection();
            int tansferorScheme = lrmTrans.getSchemeNo(requestId, "transferor_scheme");
            lrmTrans.breakConnection();
            
            lrmTrans.makeConnection();
            int transfereeScheme = lrmTrans.getSchemeNo(requestId, "transferee_scheme");
            lrmTrans.breakConnection();
            
            lrmTrans.makeConnection();
            transferorSchemeName =  lrmTrans.getSchemeNames(tansferorScheme);
            lrmTrans.breakConnection();
            
            lrmTrans.makeConnection();
            transfereeSchemeName = lrmTrans.getSchemeNames(transfereeScheme);
            lrmTrans.breakConnection();
            //
            //Mail START    
            boolean sentSucc = false;
            String toUserList = "";
            //String host = "smtp.zoho.in";
            String subject = "IST Request "+requestId+" Rejected";
            //String from = "amol.sant@aniktantra.com";
            String body = "", to = "";
            body = "Hi,<br><br> ";
            body = body + "<b>IST Request No: </b>"+requestId+ " of <b>IST Type : </b>" + istType+ " has been Rejected.<br><br> ";
            body = body + "<b>Reason for Rejection : </b>"+rejRemark+".<br><br>";;
            body = body + "<b>Security name - </b>"+securityName+".<br><br>";
            body = body + "<b>Selling scheme - </b>"+transferorSchemeName+"<br><br>";
            body = body + "<b>Buying scheme - </b>"+transfereeSchemeName+"<br><br>";
            lrmTrans.makeConnection();             
            toUserList = lrmTrans.getFromUserList(requestId);               
            lrmTrans.breakConnection();
            
            mail.makeConnection();
            try
            {
                if(toUserList.contains(","))
                {
                    String strArr [] = toUserList.split(",");
                    for(String id : strArr)
                    {
                        System.out.println("#### sending Mail To "+id);
                        lrmTrans.makeConnection(); 
                        to = lrmTrans.getEmailId(0,id);
                        lrmTrans.breakConnection();
                        //sentSucc = mail.sendERIntimationMail(from, subject, host, to, body);
                        sentSucc = mail.sendISTIntimationMail(subject, to, body);
                    }

                }else
                {
                    lrmTrans.makeConnection();
                    to = lrmTrans.getEmailId(0,toUserList);
                    lrmTrans.breakConnection();
                    //sentSucc = mail.sendERIntimationMail(from, subject, host, to, body);
                    sentSucc = mail.sendISTIntimationMail(subject, to, body);
                }
                //sentSucc = mail.sendERIntimationMail(from, subject, host, to, body);

            }catch(Exception e){
                e.printStackTrace();
            }
            System.out.println("#### Mail sent "+sentSucc);
            mail.breakConnection();
            //Mail END 
            
            
            //out.println("Successful");
            if("link".equals(callType)){
                out.println("LinkSucc");
            }else{
                out.println("Successful");
            }
        }else{
            //out.println("Failure");
            if("link".equals(callType)){
                out.println("LinkFail");
            }else{
                out.println("Failure");
            }
        }
    }else
    {
        //out.println("Failure");
        if("link".equals(callType)){
                out.println("LinkFail");
            }else{
                out.println("Failure");
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
