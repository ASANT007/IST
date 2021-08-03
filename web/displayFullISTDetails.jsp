<%-- 
    Document   : displayFullISTDetails
    Created on : 23 Dec, 2020, 6:39:35 PM
    Author     : amols
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="lrmTrans1" class="com.aniktantra.ist.LRMTransManager"/>

<%
String userId = (String)session.getAttribute("username");
String role = (String)session.getAttribute("role");
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
} 
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
    
<div class="row" style="font-size:16px; padding:5px 15px;">
    <div class="col-md-12 col-sm-12" style="text-align:right;">Welcome <span class="user-name"><%=fullname%></span>. You  are logged in as <span  class="user-name"><%=role%></span> </div>                               
</div>

    <h2>IST Details</h2>            
</div>
        
        <div class="container label-name report_name" style="padding:25px;margin:10px auto 30px auto;background: #fff;border: 1px solid #ccc;">
       
<%
    System.out.println("#### displayFullISTDetails.jsp");
    String requestId = checkNull((String) request.getParameter("requestId"));
    
    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
    SimpleDateFormat formatter1 = new SimpleDateFormat("dd-M-yyyy hh:mm:ss"); 
    
    String istType = "", createdBy = "",securityName = "" ,isin = "", lineAvl = "", lineAvlRmrk = "", optMixLowDurPaper = "";
    String userName = "", fmSellerRemark = "", fmBuyerRemark = "", rejRemark = "", istStatus = "", pendingUser = "", nextLevel = "";
    
    int  transferorSchemeNo = 0, transfereeSchemeNo = 0;
    String transferorSchemeName = "", transfereeSchemeName = "";
    String sellerCategory = "", sellerSubCategory = "", buyerCategory = "", buyerSubCategory = "";
    float sellerMinLrm = 0, buyerMinLrm = 0, sellerNetcashPos = 0, buyerNetcashPos = 0, secProcUtilized = 0 ;
    
    int sellerPreTrd  = 0, buyerPreTrd = 0, sellerPostTrd = 0, buyerPostTrd = 0;
    String sellerInterestRate = "", buyerInterestRate = "", rfqFile = "";
    
    float sellerIsuuerPrecon = 0, sellerSectorPrecon = 0, sellerGroupPrecon = 0;
    float buyerIsuuerPrecon = 0, buyerSectorPrecon = 0, buyerGroupPrecon = 0;
    float sellerIsuuerSebilimit = 0, sellerSectorSebilimit = 0, sellerGroupSebilimit = 0;
    float buyerIsuuerSebilimit = 0, buyerSectorSebilimit = 0, buyerGroupSebilimit = 0;
    float sellerIsuuerPoscon = 0, sellerSectorPoscon = 0, sellerGroupPoscon = 0;
    float buyerIsuuerPoscon = 0, buyerSectorPoscon  = 0, buyerGroupPoscon = 0;
    String creationDate = "",istDate = "";
    
    ResultSet rs = null;
    lrmTrans.makeConnection();
    rs = lrmTrans.getISTDetailsById(requestId);
    
    if(rs.next())
    {
        istType = checkNull(rs.getString("ist_type"));        
        userName = checkNull(rs.getString("firstname"))+" "+checkNull(rs.getString("lastname"));  
        creationDate = formatter.format( rs.getDate("created_date"));
        istDate = formatter.format( rs.getDate("ist_datetime"));
        securityName = checkNull(rs.getString("security_name"));
        isin = checkNull(rs.getString("security_isin_no"));
        fmSellerRemark = checkNull(rs.getString("fm_seller_approve_remarks"));
        fmBuyerRemark = checkNull(rs.getString("fm_buyer_approve_remarks"));
        rejRemark = checkNull(rs.getString("rejection_remarks"));
        istStatus = checkNull(rs.getString("status"));         
        transferorSchemeNo = rs.getInt("transferor_scheme");
        transfereeSchemeNo = rs.getInt("transferee_scheme");
        
        lrmTrans1.makeConnection();
        transferorSchemeName =  lrmTrans1.getSchemeNames(transferorSchemeNo);
        lrmTrans1.breakConnection();
        
        lrmTrans1.makeConnection();
        transfereeSchemeName = lrmTrans1.getSchemeNames(transfereeSchemeNo);
        lrmTrans1.breakConnection();
        
        
        
        if(istStatus.equals("New") || istStatus.equals("Recommended"))
        {            
            lrmTrans1.makeConnection();
            nextLevel = lrmTrans1.getNextLevel(requestId);
            lrmTrans1.breakConnection();
            
            lrmTrans1.makeConnection();
            pendingUser =  lrmTrans1.getPendingUser(requestId,nextLevel,istStatus,transferorSchemeNo,transfereeSchemeNo,"linkview");
            lrmTrans1.breakConnection();
        }
        
        ResultSet sellerCategoryRs = null;
        ResultSet buyerCategoryRs = null;
        
        lrmTrans1.makeConnection();
        sellerCategoryRs = lrmTrans1.getCategories(transferorSchemeNo);
        if(sellerCategoryRs.next()){
            sellerCategory = checkNull(sellerCategoryRs.getString("scheme_category"));
            sellerSubCategory = checkNull(sellerCategoryRs.getString("scheme_sub_category"));
        }
        lrmTrans1.breakConnection();
        
        lrmTrans1.makeConnection();
        buyerCategoryRs = lrmTrans1.getCategories(transfereeSchemeNo);
        if(buyerCategoryRs.next()){
            buyerCategory = checkNull(buyerCategoryRs.getString("scheme_category"));
            buyerSubCategory = checkNull(buyerCategoryRs.getString("scheme_sub_category"));
        }
        lrmTrans1.breakConnection();
        
        if(istType.equals("LRM")){
            sellerMinLrm = rs.getFloat("transferror_min_lrm");
            buyerMinLrm = rs.getFloat("transferee_min_lrm");
            sellerNetcashPos = rs.getFloat("transferror_netcash_position");
            buyerNetcashPos = rs.getFloat("transferee_netcash_position");       
            secProcUtilized = rs.getFloat("securities_proceeds_utilized");
            lineAvl = checkNull(rs.getString("line_available"));
            lineAvlRmrk = checkNull(rs.getString("line_borrowing_not_utilize_remark"));
            optMixLowDurPaper = checkNull(rs.getString("optimal_mix_of_low_duration_paper"));
            rfqFile = checkNull(rs.getString("rfq_filename"));
            
        }else if(istType.equals("Duration Rebalancing")){
            sellerPreTrd = rs.getInt("transferror_pretrade_duration");
            buyerPreTrd = rs.getInt("transferee_pretrade_duration");
            sellerPostTrd = rs.getInt("transferror_posttrade_duration");
            buyerPostTrd = rs.getInt("transferee_posttrade_duration");
            sellerInterestRate = checkNull(rs.getString("transferror_interestrate_view"));
            buyerInterestRate = checkNull(rs.getString("transferee_interestrate_view"));
            rfqFile = checkNull(rs.getString("rfq_filename"));
        }else if(istType.equals("Issuer/Sector/Group Rebalancing")){
            
            sellerIsuuerPrecon = rs.getFloat("transferror_issuer_pretrade_concentration"); 
            sellerSectorPrecon = rs.getFloat("transferror_sector_pretrade_concentration"); 
            sellerGroupPrecon = rs.getFloat("transferror_group_pretrade_concentration");
            
            buyerIsuuerPrecon = rs.getFloat("transferee_issuer_pretrade_concentration"); 
            buyerSectorPrecon = rs.getFloat("transferee_sector_pretrade_concentration"); 
            buyerGroupPrecon = rs.getFloat("transferee_group_pretrade_concentration"); 
            
            sellerIsuuerSebilimit = rs.getFloat("transferror_issuer_sebilimit");  
            sellerSectorSebilimit = rs.getFloat("transferror_sector_sebilimit");  
            sellerGroupSebilimit = rs.getFloat("transferror_group_sebilimit"); 
            
            buyerIsuuerSebilimit =  rs.getFloat("transferee_issuer_sebilimit"); 
            buyerSectorSebilimit =  rs.getFloat("transferee_sector_sebilimit"); 
            buyerGroupSebilimit =   rs.getFloat("transferee_group_sebilimit");            
            
            sellerIsuuerPoscon = rs.getFloat("transferror_issuer_posttrade_concentration");
            sellerSectorPoscon = rs.getFloat("transferror_sector_posttrade_concentration"); 
            sellerGroupPoscon = rs.getFloat("transferror_group_posttrade_concentration");
            
            buyerIsuuerPoscon = rs.getFloat("transferee_issuer_posttrade_concentration");
            buyerSectorPoscon = rs.getFloat("transferee_sector_posttrade_concentration");
            buyerGroupPoscon = rs.getFloat("transferee_group_posttrade_concentration");
            
            rfqFile = checkNull(rs.getString("rfq_filename")); 
        }
        
    }
    lrmTrans.breakConnection();
    %>   
      
     
      <div class="row  form-group"> 
           <div class="col-md-2">
              <label> IST Id : </label> <%=requestId%>
          </div>
          <div class="col-md-3">
              <label> IST Type : </label> <%=istType%>
          </div> 
          <div class="col-md-3">
              <label> Created By : </label> <%=userName%>
          </div>
         
          <div class="col-md-4">
            <label class="res-display">Date of ISTs </label><%=istDate%>        
          </div>
          
          <!-- Commented by Amol S. on 07-06-2021-->
            <!--<div class="col-md-2">
              <label> Creation Date: </label> <%=creationDate%>
          </div>-->
          
      </div>
      
    <div class="row">
      <div class="form-group col-sm-4 col-md-4">        
        <label> Security Name : </label> <%=securityName%>
      </div> 
          
      <div class="form-group col-sm-4 col-md-4">
        <label class="res-display">ISIN :</label><%=isin%>        
      </div>
     
      <div class="form-group col-sm-4 col-md-4">
        <label class="res-display">Status :</label>
        <%if(istStatus.equals("New") || istStatus.equals("Recommended")){%>
            Awaiting approval by <span class="user-name"><%=pendingUser%></span>
        <%}else{%>
           <span class="user-name"><%=istStatus%></span>
        <%}%>     
      </div>
      
    </div>
      
    <div class="row form-group row-bg">
      <div class="col-md-4 col-sm-4">
       Particular
      </div>
         <div class="col-md-4 col-sm-4">
        Transferor
      </div>
         <div class="col-md-4 col-sm-4">
        Transferee
      </div>
    </div>
      
    
    <div class="row form-group text-center" >
      <div class="col-md-4 col-sm-4">
       <label class="scheme">Scheme  </label>
      </div>
         <div class="col-md-4 col-sm-4 mbtm"><label class="transferor-scheme">Transferor Scheme  :</label>
             
            <div style="position:relative;padding: 0 0 10px 0;"><%=transferorSchemeName%></div>
               <div><span class="user-name" style="display:inline-block;margin: 10px 20px 0 0"><%=sellerCategory%></span>
                   <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0"><%=sellerSubCategory%></span></div>
      </div>
         <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Transferee Scheme  :</label>
            
             <div style="position:relative;padding: 0 0 10px 0;"><%=transfereeSchemeName%></div>
               <div> <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0"><%=buyerCategory%></span>
               <span class="user-name" style="display:inline-block;margin: 10px 20px 0 0"><%=buyerSubCategory%></span></div>
      </div>
    </div>
    
    
    <%if(istType.equals("LRM")){%>
    
    <div class="row form-group">
      <div class="col-md-6 col-sm-4">
       <label class="scheme">LRM minimum cash & cash equivalent required (Rs. in Cr) :</label>
      </div>
         <div class="col-md-3 col-sm-4  mbtm"> <label class="transferor-scheme">LRM minimum cash & cash equivalent required (Transferor) (Rs. in Cr) :</label>
         <%=sellerMinLrm%>
      </div>
         <div class="col-md-3 col-sm-4"> <label class="transferee-scheme">LRM minimum cash & cash equivalent required (Transferee) (Rs. in Cr) :</label>
          <%=buyerMinLrm%>
      </div>
    </div>
      
     <div class="row form-group">
      <div class="col-md-6 col-sm-4">
       <label class="scheme">Net cash position after projected inflow and outflow (Rs. in Cr) : </label>
      </div>
         <div class="col-md-3 col-sm-4  mbtm"><label class="transferor-scheme">Net cash position after projected inflow and outflow  (Transferor)(Rs. in Cr) : </label>
        <%=sellerNetcashPos%>
      </div>
         <div class="col-md-3 col-sm-4"><label class="transferee-scheme">Net cash position after projected inflow and outflow (Transferee) (Rs. in Cr) : </label>
        <%=buyerNetcashPos%>
      </div>
    </div>
    
     <div class="row">
      <div class="form-group col-md-6">
        <label>Sale proceeds of the securities utilized (Rs. in Cr) :</label><%=secProcUtilized%>
      </div>
    </div> 
      
    <div class="row form-group">
        <div class="col-md-4">
           <%if("Y".equals(lineAvl)){%>   
          <input type="radio" name="lineBrorrowingUtilized" class="radio-btn" checked>
              <label>Line available and borrowing utilized </label>      
          <%}else{%>        
           <input type="radio" name="lineBrorrowingUtilized" class="radio-btn" checked>
              <label>Line available and borrowing not utilized</label>
              
             <%}%>
        </div>
        
    </div>
    
        <div class="row form-group">
            <%if("Y".equals(lineAvl)){
            }else{%>
        <div class="col-md-12" style="text-align:justify;">
            <label>Justification :</label><span ><%=lineAvlRmrk%></span>
        </div>  
         <%}%>
        </div>
     <%if(optMixLowDurPaper.length() > 0){%>  
        <div class="row  form-group">
            <div class="col-md-12" style="text-align:justify;">
                <label>If all above is not sufficient then ISTs of optimal mix of low duration paper with highest quality paper and so on :</label>
                                </br>

                <span><%=optMixLowDurPaper%></span>
            </div> 

        </div>
    <%}%>  
    
    <%}else if(istType.equals("Duration Rebalancing")){%>
    
    <div class="row form-group">
      <div class="col-md-6 col-sm-4">
       <label class="scheme">Pre trade duration of scheme  (In Years):</label>
      </div>
         <div class="col-md-3 col-sm-4 mbtm"><label class="transferor-scheme">Pre trade duration of scheme Transferor(In Years) :</label>
             <%=sellerPreTrd%>
             
      </div>
         <div class="col-md-3 col-sm-4"><label class="transferee-scheme">Pre trade duration of scheme Transferee(In Years) </label>
             <%=buyerPreTrd%>
      </div>
    </div>
            
    <div class="row form-group">
      <div class="col-md-6 col-sm-4">
       <label class="scheme">Post trade duration of scheme (In Years):</label>
      </div>
         <div class="col-md-3 col-sm-4 mbtm"><label class="transferor-scheme">Post trade duration of scheme Transferor (In Years):</label>
              <%=sellerPostTrd%>
      </div>
         <div class="col-md-3 col-sm-4"><label class="transferee-scheme">Post trade duration of scheme Transferee (In Years) :</label>
              <%=buyerPostTrd%>
      </div>
    </div>
    
      
      <div class="row">
        <div class="form-group col-md-4">
            <label class="scheme">Transferor Interest rate view of Fund Manager  : </label>
        </div>  
          <div class="form-group col-md-8" align="justify">
           <%=sellerInterestRate%>
        </div>  
    </div>
        
        <div class="row">
        <div class="form-group col-md-4">
            <label class="scheme">Transferee Interest rate view of Fund Manager  : </label>
        </div>  
          <div class="form-group col-md-8" align="justify">
           <%=buyerInterestRate%>
        </div>  
    </div>
      
     
    <%}else if(istType.equals("Issuer/Sector/Group Rebalancing")){%>    
    
    <div class="row form-group name-group" style="text-align: center;">
      <div class="col-md-4 col-sm-4">
      </div>
         <div class="col-md-4 col-sm-4 mbtm">
             <div><span class="ist-min-width"><label>Issuer</label></span>
             <span class="ist-min-width"><label>Sector</label></span>
             <span class="ist-min-width"><label>Group</label></span></div>
      </div>
         <div class="col-md-4 col-sm-4">
        <div><span class="ist-min-width"><label>Issuer</label></span>
             <span class="ist-min-width"><label>Sector</label></span>
             <span class="ist-min-width"><label>Group</label></span>
        </div>      
         </div>
         
    </div> 
    
    <div class="row form-group">
    <div class="col-md-4 col-sm-4">
     <label class="scheme">Pre trade concentration</label>
    </div>        
    <div class="col-md-4 col-sm-4 mbtm"><label class="transferor-scheme">Pre trade concentration</label>
    <div class="tbl-post-trade"  style="text-align: center;"><span class="ist-min-width"><%=sellerIsuuerPrecon%></span>
        <span class="ist-min-width"><%=sellerSectorPrecon%></span>
        <span class="ist-min-width"><%=sellerGroupPrecon%></span>
    </div></div>
        
    <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Pre trade concentration</label>
    <div class="tbl-post-trade"  style="text-align: center;"> <span class="ist-min-width"><%=buyerIsuuerPrecon%></span>
        <span class="ist-min-width"><%=buyerSectorPrecon%></span>
        <span class="ist-min-width"><%=buyerGroupPrecon%></span>
    </div></div>         
    </div>
      
    <div class="row form-group">
      <div class="col-md-4 col-sm-4">
       <label class="scheme">Limit specified in SEBI Regulations/circular/ guidelines</label>
      </div>
        <div class="col-md-4 col-sm-4 mbtm"><label class="transferor-scheme">Limit specified in SEBI Regulations/circular/ guidelines</label>
       <div style="text-align: center;"><span class="ist-min-width"><%=sellerIsuuerSebilimit%></span>
            <span class="ist-min-width"><%=sellerSectorSebilimit%></span>
            <span class="ist-min-width"><%=sellerGroupSebilimit%></span>
       </div></div>
       <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Limit specified in SEBI Regulations/circular/ guidelines</label>
        <div class="tbl-post-trade"  style="text-align: center;"><span class="ist-min-width"><%=buyerIsuuerSebilimit%></span>
             <span class="ist-min-width"><%=buyerSectorSebilimit%></span>
             <span class="ist-min-width"><%=buyerGroupSebilimit%></span>
        </div></div>
    </div>              
                 
    <div class="row form-group">
      <div class="col-md-4 col-sm-4">
       <label class="scheme">Post trade concentration</label>
      </div>
         <div class="col-md-4 col-sm-4 mbtm"><label class="transferor-scheme">Post trade concentration</label>
             <div class="tbl-post-trade" style="text-align: center;"><span class="ist-min-width"><%=sellerIsuuerPoscon%></span>
            <span class="ist-min-width"><%=sellerSectorPoscon%></span>
            <span class="ist-min-width"><%=sellerGroupPoscon%></span>
      </div></div>
         <div class="col-md-4 col-sm-4"><label class="transferee-scheme">Post trade concentration</label>
       <div class="tbl-post-trade text-center" ><span class="ist-min-width"><%=buyerIsuuerPoscon%></span>
            <span class="ist-min-width"><%=buyerSectorPoscon%></span>
            <span class="ist-min-width"><%=buyerGroupPoscon%></span>
       </div></div>
    </div>
    
    
       
    <%}%>
    <%if(fmSellerRemark.length() > 0){%>
    <div class="row">
        <div class="form-group col-md-4">
            <label class="scheme">Transferor Fund Manager Remark : </label>
        </div>  
          <div class="form-group col-md-8">
           <%=fmSellerRemark%>
        </div>  
    </div>
    <%}%>
    
    <%if(fmBuyerRemark.length() > 0){%>
    <div class="row">
        <div class="form-group col-md-4">
            <label class="scheme">Transferee Fund Manager Remark : </label>
        </div>
        <div class="form-group col-md-8">
           <%=fmBuyerRemark%>
        </div> 
    </div>
    <%}%>
    
    <%if(rejRemark.length() > 0){%>
    <div class="row">
        <div class="form-group col-md-4">
            <label class="scheme">Rejection Remark : </label>
        </div> 
        <div class="form-group col-md-8">
           <%=rejRemark%>
        </div> 
    </div>
    <%}%>
    
    <%
    //Part 2 START
    int count = 0;
    String fromUser = "", toUser = "", status = "", actionDate = "";
    String fromUserName = "", toUserName = "";
    
    ResultSet trackingRs = null;    
    lrmTrans.makeConnection();
    trackingRs = lrmTrans.getTrackingDetailsById(requestId);  
    
    if(trackingRs.next()){ %>

    <table class="table" style="width:75%" align="center">
          <thead>
              <tr>
                  <th scope="col" colspan="5" class="heading-bg">Tracking Details</th>

            </tr>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">From User</th>
              <th scope="col">To User</th>
              <th scope="col">Action Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
                <%do{
                    count++;
                    fromUser = checkNull(trackingRs.getString("from_user"));
                    toUser = checkNull(trackingRs.getString("to_user"));
                    actionDate = checkNull(trackingRs.getString("action_date"));                
                    System.out.print("#### actionDate "+actionDate);
                    status = checkNull(trackingRs.getString("status"));

                    lrmTrans1.makeConnection();                
                    fromUserName = lrmTrans1.getFullName(fromUser);
                    lrmTrans1.breakConnection();

                    lrmTrans1.makeConnection();  
                    toUserName = lrmTrans1.getFullName(toUser);
                    lrmTrans1.breakConnection();
                %>
                <tr>
                <th scope="row"><%=count%></th>
                    <td><%=fromUserName%></td>
                    <td><%=toUserName%></td>
                    <td><%=actionDate%></td>
                    <td><%=status%></td>
                </tr>
               <% }while(trackingRs.next());

               %>
            </tbody>
        </table>      
           <% }
        lrmTrans.breakConnection();
        
        //Part 2 END
        %> 
        
        <!-- Part 3 START -->
        <div class="row"> 
        <div class="col-md-2">
            <label style="font-size:15px;">Supporting Documents</label>

        </div> 
        <div class="col-md-10">
           <a href="RFQScreenshots/<%=rfqFile%>" target="_blank"><%=rfqFile%></a>
        </div>
        </div>
       <!-- Part 3 END -->
       
    <!-- Added by Amol S. on 07-06-2021 START-->
    <div class="row">
        <div class="col-md-12" style="padding-top:20px;">
          <label class="user-name">Declaration:</label>       
      </div>      
    </div>
    
     <div class="row">
      <div class="form-group col-md-12"><ol class="list-decl"  style="padding: 0 0 0 12px;">
       <li> IST is in the interest of unit holders. </li>
         <li>  Quality of security under ISTs is not suspect i.e. no adverse news or rumors in the mainstream media about the said security, nor any credit alert for last four months. </li>
          <li> Fund Manager of transferee scheme confirms that he/she has done full credit risk assessment of security before buying the same through ISTs, and the same is documented. </li></ol>
      </div>      
    </div>
    <!-- Added by Amol S. on 07-06-2021 END -->
    
        <div class="row">
            <div class="col-md-12 text-center">          
              <input class="btn btn-primary" type="button" onClick="saveToPDF('<%=requestId%>')" value="Save TO PDF">  
              <input class="btn btn-primary"  type="button"  style = "margin-left: 20px;" onclick="closeWin()" value="Close"/>
            </div>      
        </div> 
        <!--<div class="row">
            <div class="col-md-12" style="text-align:right;">
                <input class="btn btn-primary" style="align:left;" type="button"  onclick="closeWin()" value="Close"/>
            </div>
        </div>--->
        
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