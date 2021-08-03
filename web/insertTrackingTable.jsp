<jsp:useBean id="ist" class="com.aniktantra.ist.ISTApplication"/> 
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="mail" class="com.aniktantra.ist.Mailing"/>
<jsp:useBean id="fileEnc" class="com.aniktantra.ist.FileEncryption"/>
<%@page import="java.net.URLEncoder"%>
<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
String fullname = (String)session.getAttribute("userfullname");

String callType = (String)session.getAttribute("callType");
System.out.println("#### userId ["+userId+"]");
System.out.println("#### userId ["+role+"]");
response.setHeader("pragma","no-cache");//HTTP 1.1
response.setHeader("Cache-Control","no-cache");
response.setHeader("Cache-Control","no-store");
response.addDateHeader("Expires", -1);
response.setDateHeader("max-age", 0);
response.setIntHeader ("Expires", -1); //prevents caching at the proxy server
response.addHeader("cache-Control", "private");

if(userId == null) 
{  
response.sendRedirect("index.html");
return;
}

if(userId.equals("-1") || userId.equals("")) 
{ 
  response.sendRedirect("index.html");
  return;
} 
%>

<%
        String remark = "";    
        int nextLevel  = 0;
        String requestId = checkNull(request.getParameter("requestId"));       
        String status = checkNull(request.getParameter("status"));        
        String appType = checkNull(request.getParameter("appType"));//Added by AMOL S.
        String istType = checkNull(request.getParameter("istType"));  
        if("FM".equals(role)){
            remark = checkNull(request.getParameter("remark"));//FMApprove Remark change id. make common as remark
        }
        
        String to_user = userId, from_user = "", statusUpdate="Recommended"; 
        boolean flag = false;
        
        System.out.println("#### appType [ "+appType+" ]");       
        
        ist.makeConnection();
        int current_level = ist.getCurrentSessionUserLevel(to_user,role);
        ist.breakConnection();

        System.out.println("#### current_level "+current_level);
        ////Commented by Amol S. on 07-06-2021
        //if(role.equals("CIO") && current_level == 4)
        if( (role.equals("CM") || role.equals("RM")) && current_level == 4 )
        {
          statusUpdate = "Approved";
        }
       
        ist.makeConnection();
        from_user = ist.getFromUser(requestId,appType);
        ist.breakConnection();
        System.out.println("#### from_user "+from_user);
        System.out.println("#### to_user "+from_user);
        
        ist.makeConnection();
        flag = ist.insertTrackingTable(requestId,from_user,to_user,statusUpdate);
        ist.breakConnection();
        System.out.println("#### flag "+flag);
        
        
        if (flag)
        {
            
            ist.makeConnection();
            int i= ist.updateStatusTransactionTable(requestId, statusUpdate,remark,role,appType,"Approval");
            ist.breakConnection();
            if(i>0)
            {
                String nextuser = "";
                //Commented by Amol S. on 07-06-2021
                //if(role.equals("CIO") && current_level == 4)
                if( (role.equals("CM") || role.equals("RM")) && current_level == 4)
                {
                    ist.makeConnection();
                    ist.deleteFromRoutingTable(requestId);
                    ist.breakConnection();
                }else
                {
                   System.out.println("##### ist_request_id "+requestId);
                   System.out.println("##### statusUpdate "+statusUpdate);
                   System.out.println("##### current_level "+current_level); 
                  
                   if(appType.equals("seller")){
                        nextLevel = current_level;
                        ist.makeConnection();
                       ist.updateStatusRoutingTable(requestId, statusUpdate, current_level, nextLevel);
                       ist.breakConnection();
                   }else{
                       nextLevel = current_level+1;
                       ist.makeConnection();
                       ist.updateStatusRoutingTable(requestId, statusUpdate, current_level,nextLevel);
                       ist.breakConnection();
                   }

                }
                
                
            }
            
         
            //Mail START    
            String subject = "";
            boolean sentSucc = false;
            String toUserList = "";
            //String host = "smtp.zoho.in";
            if(role.equals("FM")){
                subject = "IST Request "+requestId+" has been Approved for ";
                if(appType.equals("seller")){
                    subject = subject +"Selling scheme";
                }else{
                    subject = subject +"Buying scheme";
                }
            }else{
                subject = "IST Request sent for Approval";
            }
            
            
            String body = "", to = "";
            // Encryption and Encoding START
            //Local url 
            /*String loginUrl = "http://localhost:8084/CrossTradingWorkflow/";
            String url = "http://localhost:8084/CrossTradingWorkflow/openISTRequestForApproval.jsp?";*/
            //UAT url 
            String loginUrl = "http://projects.aniktantra.com/CrossTradingWorkflow/";
            String url = "http://projects.aniktantra.com/CrossTradingWorkflow/openISTRequestForApproval.jsp?";
            String encISTId = fileEnc.Encrypt(requestId);
            String encodedISTid = URLEncoder.encode(encISTId);
            
            String encISTApprStatus = fileEnc.Encrypt("Approve");
            String encodedApprStatus = URLEncoder.encode(encISTApprStatus);
            String encISTRejStatus = fileEnc.Encrypt("Reject");
            String encodedRejStatus = URLEncoder.encode(encISTRejStatus);

            String encISTappType = fileEnc.Encrypt("buyer");
            String encodedappType = URLEncoder.encode(encISTappType);

            /*String apprLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedApprStatus;
            String rejLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedRejStatus;    
            String approveUrl = "<a href='"+apprLink+"'>Click Here To Approve</a>";
            String RejectUrl = "<a href='"+rejLink+"'>Click Here To Reject</a>";*/
             // Encryption and Encoding END
            
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
            
            lrmTrans.makeConnection();
            //if(role.equals("CIO"))
            if( (role.equals("CM") || role.equals("RM")) )
            {
                toUserList = lrmTrans.getFromUserList(requestId);
                subject = "IST Request "+requestId+" has been Approved";
                body = "Hi,<br><br> ";
                body = body + "<b>IST Request No: </b>"+requestId+ " of <b>IST Type : </b>" + istType+ " has been Approved by Mr. "+fullname+"<br><br> ";
                body = body + "<b>Security name - </b>"+securityName+".<br><br>";
                body = body + "<b>Selling scheme - </b>"+transferorSchemeName+" <b>Buying scheme - </b>"+transfereeSchemeName+".<br><br>";
                //body = body + "Please <a href='#'>Click Here</a> to continue, in case you are in office.";
            }else
            {
                
                toUserList =  lrmTrans.getPendingUser(requestId,""+nextLevel,statusUpdate,tansferorScheme,transfereeScheme,"email");
                //System.out.println("#### toUserList ["+toUserList+"]");
                String encUserId = fileEnc.Encrypt(toUserList);
                String encodedUserId = URLEncoder.encode(encUserId);
                String apprLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedApprStatus;
                String rejLink = url+"requestId="+encodedISTid+"&userid="+encodedUserId+"&appType="+encodedappType+"&aprrovestatus="+encodedRejStatus;    
                String approveUrl = "<a href='"+apprLink+"'>Click Here To Approve</a>";
                String RejectUrl = "<a href='"+rejLink+"'>Click Here To Reject</a>";
                
                body = "Hi,<br><br> ";
                body = body + "<b>IST Request No: </b>"+requestId+ " of <b>IST Type : </b>" + istType+ " has been sent for your approval.<br><br>";
                body = body + "<b>Security name - </b>"+securityName+".<br><br>";
                if(role.equals("FM")){
                    body = body + "<b>Selling scheme - </b>"+transferorSchemeName+"<br><br>";
                    body = body + "<b>Buying scheme - </b>"+transfereeSchemeName+"<br><br>";
                }
                //body = body + "Kindly do the needfull.<br>";
                //body = body + "Please "+approveUrl+" or "+RejectUrl+", in case you are in office.";
            
            if(appType.equals("seller") && role.equals("FM"))
            {   
                body = body + "Please "+approveUrl+" or "+RejectUrl+" the trade,in case you are in office. <br><br>";       
                //body = body + "Please "+approveUrl+" or "+RejectUrl+", in case you are in office.";       
                //String approveUrl = "<a href='http://localhost:8084/CrossTradingWorkflow/openISTRequestForApproval.jsp?requestId="+fileEnc.Encrypt(requestId)+"&userid="+fileEnc.Encrypt(toUserList)+"&aprrovestatus="+fileEnc.Encrypt("Approve")+"&appType="+fileEnc.Encrypt("buyer")+"' >Click Here To Approve</a>";
                //String RejectUrl = "<a href='http://localhost:8084/CrossTradingWorkflow/openISTRequestForApproval.jsp?requestId="+fileEnc.Encrypt(requestId)+"&userid="+fileEnc.Encrypt(toUserList)+"&aprrovestatus="+fileEnc.Encrypt("Reject")+"&appType="+fileEnc.Encrypt("buyer")+"' >Click Here To Reject</a>";  
                //body = body + "Please "+approveUrl+" "+RejectUrl+", in case you are in office.";    
            }else{
                 String appr = "<a href='"+loginUrl+"'>Click Here</a>";
                 body = body + "Please "+appr+" To Approve/Reject the trade,in case you are in office. <br><br>"; 
            }
            //body = body + "Please <a href='#'>Click Here</a> to continue, in case you are in office.";

            }
            lrmTrans.breakConnection();

            mail.makeConnection();
            try
            {
                System.out.println("#### toUserList ["+toUserList+']');
                if(toUserList.contains(","))
                {
                    String strArr [] = toUserList.split(",");
                    for(String id : strArr)
                    {
                        System.out.println("#### sending Mail id ["+id+']');
                        
                        lrmTrans.makeConnection(); 
                        to = lrmTrans.getEmailId(0,id);
                        lrmTrans.breakConnection();
                        
                        System.out.println("#### sending Mail email ["+to+']');
                        //sentSucc = mail.sendERIntimationMail(from, subject, host, to, body);
                        sentSucc = mail.sendISTIntimationMail(subject, to, body);
                    }

                }else{
                    
                    lrmTrans.makeConnection();                    
                    to = lrmTrans.getEmailId(0,toUserList);
                    lrmTrans.breakConnection();
                    
                    System.out.println("#### sending Mail id ["+toUserList+']');
                    System.out.println("#### sending Mail email ["+to+']');
                    
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
            
        }
        else
        {
            //out.println("");
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