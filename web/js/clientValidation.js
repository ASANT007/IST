

function addIST(){
    
    var ist_type=document.getElementById("ist_type").value;
    if(ist_type === 'LRM'){
        window.location.href = "liquidityRequirementMaintenance.jsp";
    }else if(ist_type === 'Duration Rebalancing'){
        window.location.href = "durationRebalancing.jsp";
    }else if(ist_type === 'Issuer/Sector/Group Rebalancing'){
        window.location.href = "IssuerSectorGroupRebalancing.jsp";
    }
}

function addLRM(){
    //alert('['+$('#ist_datetime').val()+']');
    //alert($.trim($('#notUtilizedRemark').val()).length);
    var ist_type = document.getElementById("ist_type").value;
    var security_isin_no = $('#security_isin_no').val();
    var security_name = $('#security_name').val();      
    //var ist_datetime = $('#ist_datetime').val();//Commented by Amol S. on 07-06-2021
    var transferror_category = $('#transferorSchemeCategory').val();
    var transferror_sub_category = $('#transferorSchemeSubCategory').val();     
    var transferee_category = $('#transfereeSchemeCategory').val();
    var transferee_sub_category = $('#transfereeSchemeSubCategory').val();
    
    
     if($('#security_name').val() == ""){
         $("#errorDiv").html("Please select Name of security to be transferred");
     }else if($('#security_isin_no').val() == ""){
          $("#errorDiv").html("ISIN security Number is Empty");
     }else if($('#ist_datetime').val() == ""){
          $("#errorDiv").html("Please select IST Date");
     }else if($('#transferor_scheme').val() == ""){
          $("#errorDiv").html("Please select Transferor Scheme ");
     }else if($('#transferee_scheme').val() == ""){
          $("#errorDiv").html("Please select Transferee Scheme");
     }else if($('#transferor_scheme').val() == $('#transferee_scheme').val()){
          $("#errorDiv").html(" Transferor and Transferee Scheme shoud not be same");
     }
     else{
         if(ist_type == "LRM"){
             validateLRM();
         }else if(ist_type == "Duration Rebalancing"){
             validateDurationRebalancing();
         }else if(ist_type == "Issuer/Sector/Group Rebalancing"){
             validateIssuerSectorGroupRebalancing();
         }  
     }
  
  
}

function validateLRM(){
   var attach = document.getElementById('uploadRFQiframe').contentDocument
						.getElementById('attached_pdf').value;

    var checkBox = document.getElementById("declaration");
    
    
    if($('#transferror_min_lrm').val() == ""){
        
      $("#errorDiv").html("Please Enter Transferor LRM minimum cash");  
    
    }else if(!$('#transferror_min_lrm').val() == "" &&($('#transferror_min_lrm').val() == 0 || $('#transferror_min_lrm').val() < 0) || (!$.isNumeric($('#transferror_min_lrm').val()))){
       
        $("#errorDiv").html("Invalid Transferor LRM minimum cash"); 
    }
    else if($('#transferee_min_lrm').val() == ""){
      
        $("#errorDiv").html("Please Enter Transferee LRM minimum cash"); 
    }
    else if(!$('#transferee_min_lrm').val() == "" &&($('#transferee_min_lrm').val() == 0 || $('#transferee_min_lrm').val() < 0) || (!$.isNumeric($('#transferee_min_lrm').val()))){
       
        $("#errorDiv").html("Invalid Transferee LRM minimum cash"); 
    }
    else if($('#transferror_netcash_position').val() == ""){
      
        $("#errorDiv").html("Please Enter Transferor Net cash position"); 
        
    }else if(!$('#transferror_netcash_position').val() == "" &&($('#transferror_netcash_position').val() == 0 || $('#transferror_netcash_position').val() < 0 || (!$.isNumeric($('#transferror_netcash_position').val())))){
       
        $("#errorDiv").html("Invalid Transferor Net cash position"); 
    }
    else if($('#transferee_netcash_position').val() == ""){
       
        $("#errorDiv").html("Please Enter Transferee Net cash position");
        
    }else if(!$('#transferee_netcash_position').val() == "" &&($('#transferee_netcash_position').val() == 0) || (!$.isNumeric($('#transferee_netcash_position').val()))){
      
        $("#errorDiv").html("Invalid Transferee Net cash position"); 
        
    }else if((!$("#lineBrorrowingUtilized").is(":checked")) && (!$("#lineBrorrowingNotUtilized").is(":checked")) ){
       
        $("#errorDiv").html("Please select Line available and borrowing utilized OR Line available and borrowing not utilized");
        
    }else if(($("#lineBrorrowingUtilized").is(":checked")) && $('#line_available_val').val() == ""){
        
        $("#errorDiv").html("Please Enter value for Line available");
        
    }else if(($("#lineBrorrowingUtilized").is(":checked")) && !$('#line_available_val').val() == "" &&(($('#line_available_val').val() == 0 || $('#line_available_val').val() < 0) || (!$.isNumeric($('#line_available_val').val())))){
        //alert('---Wrng 1----');
        $("#errorDiv").html("Invalid value for Line available");
        
    }else if(($("#lineBrorrowingUtilized").is(":checked")) && $('#borrowing_utilized').val() == ""){
        //alert('---Wrng 2----');
        $("#errorDiv").html("Please Enter value for Borrowing utilized");
        
    }else if(($("#lineBrorrowingUtilized").is(":checked")) && !$('#borrowing_utilized').val() == "" &&(($('#borrowing_utilized').val() == 0 || $('#borrowing_utilized').val() < 0) || (!$.isNumeric($('#borrowing_utilized').val())))){
        //alert('---Wrng 3----');
        $("#errorDiv").html("Invalid value for Borrowing utilized");
        
    }else if(($("#lineBrorrowingNotUtilized").is(":checked")) && $('#line_available_val').val() == ""){
        //alert('---Wrng 4----');
        $("#errorDiv").html("Please Enter value for Line available");
        
    }else if(($("#lineBrorrowingNotUtilized").is(":checked")) && !$('#line_available_val').val() == "" &&(($('#line_available_val').val() == 0 || $('#line_available_val').val() < 0) || (!$.isNumeric($('#line_available_val').val())))){
        //alert('---Wrng 5----');
        $("#errorDiv").html("Invalid value for Line available");
        
    }else if(($("#lineBrorrowingNotUtilized").is(":checked")) && $('#notUtilizedRemark').val() == ""){
        
        $("#errorDiv").html("Please Enter remark for Line available and borrowing not utilized");
        
    }else if(($("#lineBrorrowingNotUtilized").is(":checked")) && ($('#notUtilizedRemark').val() != "") && ($.trim($('#notUtilizedRemark').val()).length > 1000)){
        
        $("#errorDiv").html("Line available and borrowing not utilized, remark can not be more than 1000 characters");
        
    }else if($('#securities_proceeds_utilized').val() == ""){
        
        $("#errorDiv").html("Please Enter Sale proceeds of the securities utilized");
        
    }else if(!$('#securities_proceeds_utilized').val() == "" &&($('#securities_proceeds_utilized').val() == 0 || $('#securities_proceeds_utilized').val() < 0 || (!$.isNumeric($('#securities_proceeds_utilized').val())))){
       
        $("#errorDiv").html("Invalid Sale proceeds of the securities utilized"); 
    }else if(($('#optimal_mix_of_low_duration_paper').val() != "") && ($.trim($('#optimal_mix_of_low_duration_paper').val()).length > 1000)){
		
            $("#errorDiv").html("ISTs of optimal mix of low duration, remark can not be more than 1000 characters"); 
		
    }else if(attach  === ""){
        
        $("#errorDiv").html("Please Upload RFQ Screen-shot");  
        
    }else if(checkBox.checked == false){
        
        $("#errorDiv").html("Please select declaration terms and conditions");
        
    }else{
        
       $("#errorDiv").html(""); 
        window.document.frm.submit();
    }
    
}
function validateDurationRebalancing(){
    var attach = document.getElementById('uploadRFQiframe').contentDocument
                    .getElementById('attached_pdf').value;
    var checkBox = document.getElementById("declaration");
    if($('#transferror_pretrade_duration').val() == ""){
        
        $("#errorDiv").html("Please Enter Pre trade duration of scheme for the Transferor"); 
        
    }else if(!$('#transferror_pretrade_duration').val() == "" &&($('#transferror_pretrade_duration').val() == 0 || $('#transferror_pretrade_duration').val() < 0) || (!$.isNumeric($('#transferror_pretrade_duration').val()))){
       
        $("#errorDiv").html("Invalid Transferor Pre trade duration of scheme"); 
        
    }else if($('#transferee_pretrade_duration').val() == ""){
        
        $("#errorDiv").html("Please Enter Pre trade duration of scheme for the Transferee"); 
        
    }else if(!$('#transferee_pretrade_duration').val() == "" &&($('#transferee_pretrade_duration').val() == 0 || $('#transferee_pretrade_duration').val() < 0) || (!$.isNumeric($('#transferee_pretrade_duration').val()))){
       
        $("#errorDiv").html("Invalid Transferee Pre trade duration of scheme"); 
        
    }else if($('#transferror_posttrade_duration').val() == ""){
        
        $("#errorDiv").html("Please Enter Post trade duration of scheme for the Transferor");
        
    }else if(!$('#transferror_posttrade_duration').val() == "" &&($('#transferror_posttrade_duration').val() == 0 || $('#transferror_posttrade_duration').val() < 0) || (!$.isNumeric($('#transferror_posttrade_duration').val()))){
       
        $("#errorDiv").html("Invalid Transferor Post trade duration of scheme"); 
        
    }else if($('#transferee_posttrade_duration').val() == ""){
        
        $("#errorDiv").html("Please Enter Post trade duration of scheme for the Transferee"); 
        
    }else if(!$('#transferee_posttrade_duration').val() == "" &&($('#transferee_posttrade_duration').val() == 0 || $('#transferee_posttrade_duration').val() < 0) || (!$.isNumeric($('#transferee_posttrade_duration').val()))){
       
        $("#errorDiv").html("Invalid Transferee Post trade duration of scheme"); 
        
    }else if($('#transferror_interestrate_view').val() == ""){
        
        $("#errorDiv").html("Please Enter Interest rate VIEW OF Fund Manager for the Transferor");  
        
    }else if(($('#transferror_interestrate_view').val() != "") && ($.trim($('#transferror_interestrate_view').val()).length > 1000)){
		
            $("#errorDiv").html("Transferor Interest rate VIEW OF Fund Manager can not be more than 1000 characters"); 
		
    }else if($('#transferee_interestrate_view').val() == ""){
        
        $("#errorDiv").html("Please Enter Interest rate VIEW OF Fund Manager for the Transferee");  
        
    }else if(($('#transferee_interestrate_view').val() != "") && ($.trim($('#transferee_interestrate_view').val()).length > 1000)){
		
            $("#errorDiv").html("Transferee Interest rate VIEW OF Fund Manager can not be more than 1000 characters"); 
		
    }else if(attach  === ""){
        
        $("#errorDiv").html("Please Upload RFQ Screen-shot");  
        
    }else if(checkBox.checked == false){
        
        $("#errorDiv").html("Please select declaration terms and conditions");
        
    }/*else if($('#rfq_filename').val() == ""){
        
         $("#errorDiv").html("Please Upload RFQ file Screen-shot");  
         
    }*/else{
        $("#errorDiv").html(""); 
        window.document.frm.submit();
    }
    
}

function validateIssuerSectorGroupRebalancing(){
    //alert($('#attachFile').val());
    
    var attach = document.getElementById('uploadRFQiframe').contentDocument
                    .getElementById('attached_pdf').value;
            
    var checkBox = document.getElementById("declaration");
    
    var sellerIsuuerPrecon = $('#transferror_issuer_pretrade_concentration').val();
    var sellerSectorPrecon = $('#transferror_sector_pretrade_concentration').val();
    var sellerGroupPrecon = $('#transferror_group_pretrade_concentration').val();
    
    var buyerIsuuerPrecon = $('#transferee_issuer_pretrade_concentration').val();
    var buyerSectorPrecon = $('#transferee_sector_pretrade_concentration').val();
    var buyerGroupPrecon = $('#transferee_group_pretrade_concentration').val();
    
    var sellerIsuuerSebilimit = $('#transferror_issuer_sebilimit').val();
    var sellerSectorSebilimit = $('#transferror_sector_sebilimit').val();
    var sellerGroupSebilimit = $('#transferror_group_sebilimit').val();
    
    var buyerIsuuerSebilimit = $('#transferee_issuer_sebilimit').val();
    var buyerSectorSebilimit = $('#transferee_sector_sebilimit').val();
    var buyerGroupSebilimit = $('#transferee_group_sebilimit').val();
    
    var sellerIsuuerPoscon = $('#transferror_issuer_posttrade_concentration').val();
    var sellerSectorPoscon = $('#transferror_sector_posttrade_concentration').val();
    var sellerGroupPoscon = $('#transferror_group_posttrade_concentration').val();
    
    var buyerIsuuerPoscon = $('#transferee_issuer_posttrade_concentration').val();
    var buyerSectorPoscon = $('#transferee_sector_posttrade_concentration').val();
    var buyerGroupPoscon = $('#transferee_group_posttrade_concentration').val();
    
    //alert('['+sellerSectorPrecon+']');
    
    //Part 1
    if(sellerIsuuerPrecon == "" && sellerSectorPrecon == "" && sellerGroupPrecon == "" )
    {
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group");
    }else if((sellerIsuuerPrecon != "" && sellerIsuuerSebilimit == "") ||(sellerSectorPrecon != "" && sellerSectorSebilimit == "")
           ||(sellerGroupPrecon != "" && sellerGroupSebilimit == "") ){
        $("#errorDiv").html("Please select Transferor Limit specified in SEBI Regulations/circular/ guidelines for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon != "" && sellerIsuuerPoscon == "") ||(sellerSectorPrecon != "" && sellerSectorPoscon == "")
           ||(sellerGroupPrecon != "" && sellerGroupPoscon == "") ){
        $("#errorDiv").html("Please select Transferor Post trade concentration for Issuer/Sector/Group ");
        
    }else if((sellerIsuuerPrecon != "" && buyerIsuuerPrecon == "") ||(sellerSectorPrecon != "" && buyerSectorPrecon == "")
           ||(sellerGroupPrecon != "" && buyerGroupPrecon == "") ){
        $("#errorDiv").html("Please select Transferee Pre trade concentration for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon != "" && buyerIsuuerSebilimit == "") ||(sellerSectorPrecon != "" && buyerSectorSebilimit == "")
           ||(sellerGroupPrecon != "" && buyerGroupSebilimit == "") ){
        $("#errorDiv").html("Please select Transferee Limit specified in SEBI Regulations/circular/ guidelines for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon != "" && buyerIsuuerPoscon == "") ||(sellerSectorPrecon != "" && buyerSectorPoscon == "")
           ||(sellerGroupPrecon != "" && buyerGroupPoscon == "") ){
        $("#errorDiv").html("Please select Transferee Post trade concentration for Issuer/Sector/Group ");
    }//Part 2
    else if((sellerIsuuerPrecon == "" && sellerIsuuerSebilimit != "") ||(sellerSectorPrecon == "" && sellerSectorSebilimit != "")
           ||(sellerGroupPrecon == "" && sellerGroupSebilimit != "") ){
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon == "" && sellerIsuuerPoscon != "") ||(sellerSectorPrecon == "" && sellerSectorPoscon != "")
           ||(sellerGroupPrecon == "" && sellerGroupPoscon != "") ){
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group ");
        
    }else if((sellerIsuuerPrecon == "" && buyerIsuuerPrecon != "") ||(sellerSectorPrecon == "" && buyerSectorPrecon != "")
           ||(sellerGroupPrecon == "" && buyerGroupPrecon != "") ){
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon == "" && buyerIsuuerSebilimit != "") ||(sellerSectorPrecon == "" && buyerSectorSebilimit != "")
           ||(sellerGroupPrecon == "" && buyerGroupSebilimit != "") ){
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group ");
    }
    else if((sellerIsuuerPrecon == "" && buyerIsuuerPoscon != "") ||(sellerSectorPrecon == "" && buyerSectorPoscon != "")
           ||(sellerGroupPrecon == "" && buyerGroupPoscon != "") ){
        $("#errorDiv").html("Please select Transferor Pre trade concentration for Issuer/Sector/Group ");
    }
    //part 3 Number filed validation to all 18 fileds START
    else if((sellerIsuuerPrecon != "") && ((sellerIsuuerPrecon == 0 || sellerIsuuerPrecon < 0) || (!$.isNumeric(sellerIsuuerPrecon)))){
        
        $("#errorDiv").html("Invalid Transferor Issuer Pre trade concentration"); 
        
    }else if((sellerSectorPrecon !== "") && ((sellerSectorPrecon == 0 || sellerSectorPrecon < 0) || (!$.isNumeric(sellerSectorPrecon)))){
         
        $("#errorDiv").html("Invalid Transferor Sector Pre trade concentration"); 
        
    }else if((sellerGroupPrecon !== "") && ((sellerGroupPrecon == 0 || sellerGroupPrecon < 0) || (!$.isNumeric(sellerGroupPrecon)))){
        
        $("#errorDiv").html("Invalid Transferor Group Pre trade concentration"); 
        
    }else if((buyerIsuuerPrecon !== "") && ((buyerIsuuerPrecon == 0 || buyerIsuuerPrecon < 0) || (!$.isNumeric(buyerIsuuerPrecon)))){
        
        $("#errorDiv").html("Invalid Transferee Issuer Pre trade concentration"); 
        
    }else if((buyerSectorPrecon !== "") && ((buyerSectorPrecon == 0 || buyerSectorPrecon < 0) || (!$.isNumeric(buyerSectorPrecon)))){
        
        $("#errorDiv").html("Invalid Transferee Sector Pre trade concentration"); 
        
    }else if((buyerGroupPrecon !== "") && ((buyerGroupPrecon == 0 || buyerGroupPrecon < 0) || (!$.isNumeric(buyerGroupPrecon)))){
        
        $("#errorDiv").html("Invalid Transferee Group Pre trade concentration"); 
        
    }else if((sellerIsuuerSebilimit !== "") && ((sellerIsuuerSebilimit == 0 || sellerIsuuerSebilimit < 0) || (!$.isNumeric(sellerIsuuerSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferor Issuer Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((sellerSectorSebilimit !== "") && ((sellerSectorSebilimit == 0 || sellerSectorSebilimit < 0) || (!$.isNumeric(sellerSectorSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferor Sector Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((sellerGroupSebilimit !== "") &&((sellerGroupSebilimit == 0 || sellerGroupSebilimit < 0) || (!$.isNumeric(sellerGroupSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferor Group Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((buyerIsuuerSebilimit !== "") && ((buyerIsuuerSebilimit == 0 || buyerIsuuerSebilimit < 0) || (!$.isNumeric(buyerIsuuerSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferee Issuer Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((buyerSectorSebilimit !== "") && ((buyerSectorSebilimit == 0 || buyerSectorSebilimit < 0) || (!$.isNumeric(buyerSectorSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferee Sector Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((buyerGroupSebilimit !== "") && ((buyerGroupSebilimit == 0 || buyerGroupSebilimit < 0) || (!$.isNumeric(buyerGroupSebilimit)))){
        
        $("#errorDiv").html("Invalid Transferee Group Limit specified in SEBI Regulations/circular/ guidelines"); 
        
    }else if((sellerIsuuerPoscon !== "") && ((sellerIsuuerPoscon == 0 || sellerIsuuerPoscon < 0) || (!$.isNumeric(sellerIsuuerPoscon)))){
        
        $("#errorDiv").html("Invalid Transferor Issuer Post trade concentration"); 
        
    }else if((sellerSectorPoscon !== "") && ((sellerSectorPoscon == 0 || sellerSectorPoscon < 0) || (!$.isNumeric(sellerSectorPoscon)))){
        
        $("#errorDiv").html("Invalid Transferor Sector Post trade concentration"); 
        
    }else if((sellerGroupPoscon !== "") && ((sellerGroupPoscon == 0 || sellerGroupPoscon < 0) || (!$.isNumeric(sellerGroupPoscon)))){
        
        $("#errorDiv").html("Invalid Transferor Group Post trade concentration"); 
        
    }else if((buyerIsuuerPoscon !== "") && ((buyerIsuuerPoscon == 0 || buyerIsuuerPoscon < 0) || (!$.isNumeric(buyerIsuuerPoscon)))){
        
        $("#errorDiv").html("Invalid Transferee Issuer post trade concentration"); 
        
    }else if((buyerSectorPoscon !== "") && ((buyerSectorPoscon == 0 || buyerSectorPoscon < 0) || (!$.isNumeric(buyerSectorPoscon)))){
        
        $("#errorDiv").html("Invalid Transferee Sector post trade concentration"); 
        
    }else if((buyerGroupPoscon !== "") && ((buyerGroupPoscon == 0 || buyerGroupPoscon < 0) || (!$.isNumeric(buyerGroupPoscon)))){
        
        $("#errorDiv").html("Invalid Transferee Group post trade concentration"); 
        
    }
    //Part 3 Number filed validation to all 18 fileds End 
    else if( attach === ""){
        
        $("#errorDiv").html("Please Upload RFQ Screen-shot");  
        
    }
    else if(checkBox.checked == false){
        
        $("#errorDiv").html("Please select declaration terms and conditions");
        
    }else{
       $("#errorDiv").html(""); 
        window.document.frm.submit();
    }
    
}
function createRequestObject()
{
    var tmpXmlHttpObject;
    //depending on what the browser supports, use the right way to create the XMLHttpRequest object
    if (window.XMLHttpRequest) {
    // Mozilla, Safari would use this method ...
    tmpXmlHttpObject = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
    // IE would use this method ...
    tmpXmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
 return tmpXmlHttpObject;
}
//function insertLRM(insertStr)
function insertLRM()
{
    
     window.document.frm.submit(); 
    /*
    var str = insertStr;   
    var xmlhttp = createRequestObject();
   
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.trim() == 'Session expired')
            {
                alert("Session expired");
                window.location.href="index.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else if(xmlhttp.responseText.match("Successful"))
            {
                alert('Data Added Successfuly.')
                window.location.reload();
                //window.varificationform.submit();
                //window.confirmForm.submit();
            }
            else if(xmlhttp.responseText.match("Failure"))
            {
                //document.getElementById("result").innerHTML="Your details failed to submit";
                alert('Your details failed to submit.')
            }
        }
    }
    xmlhttp.open('POST','insertLRM.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
    */
}

function approved(requestId, status, appType, count, role, istType){
    //alert('App/Rej');   
    var selectionID = "approveRejectDD"+count;       
    var val = $('#'+selectionID).val();
    //alert(val+' '+role)
    var rejection_remarks = "rejection_remarks"+count;
    var remark = $.trim($('#'+rejection_remarks).val());
    
    if(val == ""){
        alert('Please Select Action');
    }
    else if((remark != "") && ($.trim($('#'+rejection_remarks).val()).length < 6)){
        alert('Insufficient remark');
    }
    else if( val == "Approve" && role == "FM" && remark == ""){
       
       alert('Please enter remark');
        //$("#errorDiv").html("Please enter remark");
        
    }else if(val == "Approve" && role == "FM" && !remark == ""){        
        
        insertTrackingTable(requestId,status,appType,remark,istType);
        
    }else if( val == "Approve" && role != "FM" ){        
        //alert('Aprroving other');
        insertTrackingTable(requestId,status,appType,remark,istType);
        
    }else if( val == "Reject" ){
        
        reject(requestId,count,appType,istType);
        
    }
    
}

function approveRejectRemark(requestId, role, appType, istType){
    
    
    var remark = $.trim($('#approveRejectRemark').val());
    
    //alert('['+remark+'] requestId ['+requestId+'] role ['+role+'] appType ['+appType+'] istType ['+istType);
   
   
    if(($("#approveRrk").is(":checked")) && (remark == "")){
        
        alert('Please enter Approval remark'); 
    }
    else if(($("#rejectRrk").is(":checked")) && (remark == "")){
        
        alert('Please enter Rejection remark'); 

    }else if(($("#approveRrk").is(":checked")) && (remark != "")){
        
        insertTrackingTable(requestId, 'Approved', appType, remark, istType);

    }else if(($("#rejectRrk").is(":checked")) && (remark != "")){
        
        rejectISTDetails(requestId, remark, appType, istType);

    }
    
    /*
    var val = $('#approveRrk').val();
      if(remark == ""){
       alert('Please enter remark'); 
    }else if(val == "Approve" && role == "FM"){
        insertTrackingTable(requestId,status,appType,remark,istType);
    }else if( val == "Reject" && role == "FM"){
         reject(requestId,count,appType,istType);
    }*/
}

function reject(requestId, count, appType, istType){
    
    var rejection_remarks = "rejection_remarks"+count;
    var rejRemark = $('#'+rejection_remarks).val();
    
    if(rejRemark == ""){
      
      alert('Please enter rejection remark');
       //$("#errorDiv").html("Please enter rejection remark");
       
    }else{        
       
        //$("#errorDiv").html("");
        rejectISTDetails(requestId,rejRemark, appType, istType);
        
    }
}
function showHideRemark(count, role){
    var selectionID = "approveRejectDD"+count;
    var rejection_remarks = "rejection_remarks"+count;    
    var val = $('#'+selectionID).val();
   
    /*if(val == "Approve"){
        $('#'+rejection_remarks).hide();
    }else if(val == "Reject"){
        $('#'+rejection_remarks).show();
    }else{
        $('#'+rejection_remarks).hide();
    }*/
    
    if(val == "Approve" && !role == "FM"){
        $('#'+rejection_remarks).hide();
    }else if(val == "Approve" && role == "FM"){
        $('#'+rejection_remarks).show();
    }else if(val == "Reject"){
        $('#'+rejection_remarks).show();
    }else{
        $('#'+rejection_remarks).hide();
    }
    
}
function hideJustification(){
    $('#notUtilizedRemark_div').hide();
    $('#borrowing_not_utilized_div').hide();//Added on 04-08-2021
    $('#line_available_val_div').show();//Added on 04-08-2021
    $('#borrowing_utilized_div').show();//Added on 04-08-2021
    
    
}

function showJustification(){
    
    $('#notUtilizedRemark_div').show();
    $('#borrowing_utilized_div').hide();//Added on 04-08-2021
    $('#line_available_val_div').show();//Added on 04-08-2021
    $('#borrowing_not_utilized_div').show();//Added on 04-08-2021
}

function validateISTFilterReports(){
    
   var istType = $('#ist_type').val();    
   var status = $('input[name=istStatus]:checked').val();
   var istFromDate = $('#istFromDate').val();
   var istToDate = $('#istToDate').val();
   
   if($('#istFromDate').val() == ""){
       $("#errorDiv").html("Please select From Date");
   }else if($('#istToDate').val() == ""){
       $("#errorDiv").html("Please select To Date");
   }else if(!$('#istFromDate').val() == "" && !$('#istToDate').val() == "" && !checkdate()){
       $("#errorDiv").html("To Date should be greater than From Date");
   }else{
       $("#errorDiv").html("");
       getISTDetails(istType,status,istFromDate, istToDate);
   }
   
}

function clearISTFilterReport(){
    
}


function decimalCheck(e) {
  var t = e.value;
  e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
}

function checkdate()
{
    //alert('checkdate');
    var date_to = document.getElementById('istToDate').value.split('/');
    //alert(date_to);
    date_to = new Date(date_to[2],date_to[1]-1,date_to[0]);
    var date_from = document.getElementById('istFromDate').value.split('/');
    //alert(date_from);
    date_from = new Date(date_from[2],date_from[1]-1,date_from[0]);
    var difference = date_to.getTime() - date_from.getTime();
    var daysDifference = Math.floor(difference/1000/60/60/24);
    //alert(daysDifference);
    if(daysDifference>=0)
        return true;
    else
      return false;
  
}

function onlyNumberKey(evt) { 
         // alert('OnlyNumber')
        // Only ASCII charactar in that range allowed 
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
            return false; 
        return true; 
    }

function displayISTDetails(requestId) {   
    var param = {'requestId' : requestId};
    OpenWindowWithPost("displayFullISTDetails.jsp","height=1000,width=1200,left=6,top=6,status=1,scrollbars=yes","NewFile", param);
    
}
function openISTRequestForApproval(requestId, userid, aprrovestatus){
    var param = {'requestId' : requestIdm};
    OpenWindowWithPost("displayFullISTDetails.jsp","height=1000,width=1200,left=6,top=6,status=1,scrollbars=yes","NewFile", param);
}
function OpenWindowWithPost(url, windowoption, name, params)
{
         var form = document.createElement("form");
         form.setAttribute("method", "post");
         form.setAttribute("action", url);
         form.setAttribute("target", name);

         for (var i in params) {
             if (params.hasOwnProperty(i)) {
                 var input = document.createElement('input');
                 input.type = 'hidden';
                 input.name = i;
                 input.value = params[i];
                 form.appendChild(input);
             }
         }

         document.body.appendChild(form);

         //note I am using a post.htm page since I did not want to make double request to the page
        //it might have some Page_Load call which might screw things up.
         window.open(url, name, windowoption);

         form.submit();

         document.body.removeChild(form);
 }
 
 function closeWin(){
     window.close();
 }
 
 