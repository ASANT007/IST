<%-- 
    Document   : istFullDetailsForPDF
    Created on : 8 Jan, 2021, 11:55:28 AM
    Author     : amols
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<jsp:useBean id="lrmTrans1" class="com.aniktantra.ist.LRMTransManager"/>

<%
System.out.println("#### istFullDetailsForPDF.jsp");
String userId = (String)session.getAttribute("username");
String filePath = application.getRealPath("/WEB-INF/");           
String appPath = filePath.substring(0, filePath.indexOf("WEB-INF"))+"\\";
String logoPath = appPath+"images\\pgim-mf-logo.png";
 
%>
<!DOCTYPE html>

<html>
<head>
<title>PGIM India Mutual Fund</title>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
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

.heading {
    font-size: 21px;
    text-align: right;
    padding: 28px 19px 0 0;
    font-weight: bold;
}


h1, .h1, h2, .h2, h3, .h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 30px;
}


.tbl_font{
    font-family: 'Roboto', sans-serif;  
}

</style>


</head>
    <body>
        
        
<div class="container">
    <div class="row">
    <div class="col-md-6 col-sm-6  centerdiv" style="background-color:#ffffff;"> <img src="<%=logoPath%>" style="max-width:280px; margin:20px 15px" class="img-responsive logoimg">  </div>
    <div class="col-md-6 col-sm-6  heading">Inter Scheme Securities Transfer (IST)</div>
   </div>
    <div style="background-color:#07245d; height:30px; clear:both"></div>
    


    <h2>IST Details</h2>            
</div>
        
<div class="container label-name report_name" style="padding:25px;margin:10px auto 30px auto;background: #fff;border: 1px solid #ccc;">
       
<%
    String requestId = checkNull((String) request.getParameter("requestId"));
   
    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
    SimpleDateFormat formatter1 = new SimpleDateFormat("dd-M-yyyy hh:mm:ss"); 
    
    String istType = "", createdBy = "",securityName = "" ,isin = "", lineAvl = "", lineAvlRmrk = "", optMixLowDurPaper = "";
    String userName = "", fmSellerRemark = "", fmBuyerRemark = "", rejRemark = "", istStatus = "", pendingUser = "", nextLevel = "";
    
    int  transferorSchemeNo = 0, transfereeSchemeNo = 0;
    String transferorSchemeName = "", transfereeSchemeName = "";
    String sellerCategory = "", sellerSubCategory = "", buyerCategory = "", buyerSubCategory = "";
    float sellerMinLrm = 0, buyerMinLrm = 0, sellerNetcashPos = 0, buyerNetcashPos = 0, secProcUtilized = 0 ;
    float lineAvlVal = 0, borrowingUtilized = 0;//Added on 05-08-2021
    
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
        
        
        if(istStatus.equals("New") || istStatus.equals("Recommended")){            
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
        if(sellerCategoryRs.next())
        {
            sellerCategory = checkNull(sellerCategoryRs.getString("scheme_category"));
            sellerSubCategory = checkNull(sellerCategoryRs.getString("scheme_sub_category"));
        }
        lrmTrans1.breakConnection();
        
        lrmTrans1.makeConnection();
        buyerCategoryRs = lrmTrans1.getCategories(transfereeSchemeNo);
        if(buyerCategoryRs.next())
        {
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
            lineAvlVal = rs.getFloat("line_available_val");//Added on 05-08-2021
            borrowingUtilized = rs.getFloat("borrowing_utilized");//Added on 05-08-2021
            lineAvlRmrk = checkNull(rs.getString("line_borrowing_not_utilize_remark"));
            optMixLowDurPaper = checkNull(rs.getString("optimal_mix_of_low_duration_paper"));
            
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
      
     
  
    <table width="100%" class="tbl_font" style="font-family:'Roboto', sans-serif; " cellspacing="0">
        <tr valign="top">
          <td width="20%"> <label style="color:#07639d;"> IST Id : </label> <%=requestId%></td>
          <td width="25%"><label style="color:#07639d;"> IST Type : </label> <%=istType%></td>
          <td width="30%"><label style="color:#07639d;"> Created By : </label> <%=userName%></td>
          <td width="25%"><label style="color:#07639d;">Date of IST : </label><%=istDate%> </td>
          <!-- Commented by Amol S. on 07-06-2021-->
          <!--<td width="16.66666667%"><label style="color:#07639d;"> Creation Date: </label> <%=creationDate%></td>-->
        </tr> 
        <tr>
            <td height="10"  colspan="5"></td>
        </tr>
    </table>
        
    <table width="100%"  cellspacing="0" style="font-family:'Roboto', sans-serif; " >
    <tr valign="top">
        <td width="33.33333333%"> <label style="color:#07639d;"> Security Name : </label> <%=securityName%> </td>      
        <td width="33.33333333%"><label style="color:#07639d;">ISIN :</label><%=isin%> </td> 
        <td width="33.33333333%">
            <label style="color:#07639d;">Status :</label>
        <%if(istStatus.equals("New") || istStatus.equals("Recommended")){%>
            Awaiting approval by <span class="user-name"><%=pendingUser%></span>
        <%}else{%>
           <span class="user-name"><%=istStatus%></span>
        <%}%>     
        </td> 
     </tr>
    </table>  
      
   <table width="100%" cellpadding="10"  cellspacing="1" style="font-family:'Roboto', sans-serif; " >
       <tr>
            <td height="3"  colspan="5">
       </tr>
       <tr style="background-color:#e4e7ff;"> 
           <td width="33.33333333%">Particular</td>
           <td width="33.33333333%">Transferor</td>
           <td width="33.33333333%">Transferee</td>
       </tr>
        <tr valign="top">
            <td><label class="scheme">Scheme </label></td>
            <td><%=transferorSchemeName%></td>
            <td><%=transfereeSchemeName%></td>
        </tr>
        
        
    <tr valign="top">
    <td></td>
    <td>
        <table cellspacing="0" width="100%">
            <tr>
                <td style="color:#07639d;"><%=sellerCategory%></td>
                <td style="color:#07639d;"><%=sellerSubCategory%></td>
            </tr>
        </table>        
    </td>
    
    <td>
        <table cellspacing="0" width="100%">
                <tr>
                        <td style="color:#07639d;"><%=buyerCategory%></td>
                        <td style="color:#07639d;"><%=buyerSubCategory%></td>
                </tr>
        </table>
     
    </td>
       
    </tr>
    
    <%if(istType.equals("LRM")){%>
         <tr>
             <td style="color:#07639d;">LRM minimum cash & cash equivalent required (Rs. in Cr) :</td>
             <td> <%=sellerMinLrm%></td>
             <td> <%=buyerMinLrm%></td>
         </tr>
         <tr>
             <td style="color:#07639d;">Net cash position after projected inflow and outflow (Rs. in Cr) : </td>
             <td> <%=sellerNetcashPos%></td>
             <td> <%=buyerNetcashPos%></td>
         </tr>
         <tr>
             <td style="color:#07639d;">Sale proceeds of the securities utilized (Rs. in Cr) :</td>
             <td> <%=secProcUtilized%></td>
             <td> </td>
         </tr>
         <tr>
             <%if("Y".equals(lineAvl)){%>  
             <td>
                <input type="radio" name="lineBrorrowingUtilized" class="radio-btn" checked>
                <label style="color:#07639d;">Line available and borrowing utilized </label>
             </td>
             <td>
                <label>Line available</label>
                <span ><%=lineAvlVal%></span>
             </td>
             <td>
               <label>borrowing utilized</label>
                <span ><%=borrowingUtilized%></span>  
             </td>
                
          <%}else{%>  
          <td>
            <input type="radio" name="lineBrorrowingUtilized" class="radio-btn" checked>
            <label style="color:#07639d;">Line available and borrowing not utilized</label>  
          </td>
          <td>
              <label>Line available</label>
               <span ><%=lineAvlVal%></span>
          </td>
          <td>
              <label>borrowing not utilized</label>
                <span>0.0</span>
          </td>
            
              
             <%}%>
         </tr>
         <tr valign="top">
             <%if("Y".equals(lineAvl)){
            }else{%>
        <td>
            <label style="color:#07639d;">Justification :</label>
        </td>
        <td colspan ="2">
            <span ><%=lineAvlRmrk%></span>
        </td> 
         <%}%>
         </tr>
          <%}%>  
          
        <%if(optMixLowDurPaper.length() > 0){%> 
        <tr valign="top">
            <td><label style="color:#07639d;">If all above is not sufficient then ISTs of optimal mix of low duration paper with highest quality paper and so on :</label>
                                </br></td>

            <td colspan="2">  <span><%=optMixLowDurPaper%></span></td>
        </tr>
          <%}else if(istType.equals("Duration Rebalancing")){%>
          
          <tr>
             <td style="color:#07639d;">Pre trade duration of scheme  (In Years):</td>
             <td> <%=sellerPreTrd%></td>
             <td> <%=buyerPreTrd%></td>
         </tr>
         <tr>
             <td style="color:#07639d;">Post trade duration of scheme (In Years): </td>
             <td> <%=sellerPostTrd%></td>
             <td> <%=buyerPostTrd%></td>
         </tr>
         <tr valign="top">
             <td style="color:#07639d;">Transferor Interest rate view of Fund Manager  : </td>
             <td colspan="2"> <%=sellerInterestRate%></td>
             
         </tr>
         
         <tr valign="top">
             <td style="color:#07639d;">Post trade duration of scheme (In Years): </td>
             <td colspan="2"> <%=buyerInterestRate%></td>
            
         </tr>
          
          <%}else if(istType.equals("Issuer/Sector/Group Rebalancing")){%>
          
         
          <tr>
			<td></td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td style="color:#07639d;">Issuer</td>
						<td style="color:#07639d;">Sector</td>
						<td style="color:#07639d;">Group</td>
					</tr>
				</table>
			</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td style="color:#07639d;">Issuer</td>
						<td style="color:#07639d;">Sector</td>
						<td style="color:#07639d;">Group</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td style="color:#07639d;">Pre trade concentration</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=sellerIsuuerPrecon%></td>
						<td><%=sellerSectorPrecon%></td>
						<td><%=sellerGroupPrecon%></td>
					</tr>
				</table>
			</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=buyerIsuuerPrecon%></td>
						<td><%=buyerSectorPrecon%></td>
						<td><%=buyerGroupPrecon%></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td style="color:#07639d;">Limit specified in SEBI Regulations/circular/ guidelines</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=sellerIsuuerSebilimit%></td>
						<td><%=sellerSectorSebilimit%></td>
						<td><%=sellerGroupSebilimit%></td>
					</tr>
				</table>
			</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=buyerIsuuerSebilimit%></td>
						<td><%=buyerSectorSebilimit%></td>
						<td><%=buyerGroupSebilimit%></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td style="color:#07639d;">Post trade concentration</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=sellerIsuuerPoscon%></td>
						<td><%=sellerSectorPoscon%></td>
						<td><%=sellerGroupPoscon%></td>
					</tr>
				</table>
			</td>
			<td>
				<table cellspacing="0" width="100%">
					<tr>
						<td><%=buyerIsuuerPoscon%></td>
						<td><%=buyerSectorPoscon%></td>
						<td><%=buyerGroupPoscon%></td>
					</tr>
				</table>
			</td>
		</tr>
          
          
          <%}%>
    
    <%if(fmSellerRemark.length() > 0){%>
    <tr>
                <td style="color:#07639d;">Transferor Fund Manager Remark :</td>
                <td><%=fmSellerRemark%></td>
                <td></td>
    </tr>
    
    
    <%}%>
    
    <%if(fmBuyerRemark.length() > 0){%>
    <tr>
            <td style="color:#07639d;">Transferee Fund Manager Remark :</td>
            <td><%=fmBuyerRemark%></td>
            <td></td>
    </tr>
          
        
    <%}%>
    
    <%if(rejRemark.length() > 0){%>
    <tr>
            <td style="color:#07639d;">Rejection Remark :</td>
            <td><%=rejRemark%></td>
            <td></td>
    </tr>
    
    <%}%>
    </table> 
    <%
    //Part 2 START
    int count = 0;
    String fromUser = "", toUser = "", status = "", actionDate = "";
    String fromUserName = "", toUserName = "";
   
    ResultSet trackingRs = null;    
    lrmTrans.makeConnection();
    trackingRs = lrmTrans.getTrackingDetailsById(requestId);  
    
    if(trackingRs.next()){ %>

    <table class="table" cellpadding="5" style="width:75%;font-family:'Roboto', sans-serif;" align="center">
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