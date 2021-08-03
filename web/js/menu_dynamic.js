
$(document).ready(function(){
$(function () {
    var bar = '';
    bar +='<div class="top_nav">';
    bar +='<span class="top_nav_trigger">Menu</span>';
    bar +='<nav class="top_nav_links">';
    bar +='<ul>';
    bar +='<li><a class="topnav_home" href="add-new-entry.html">Add Transaction</a></li>';
    bar +='<li class="has_child"><a href="javascript:void(0);">Channel Details<span class="submenu-trigger"></span></a><ul><li><a href="bulkUploadForChannel.html">Bulk Upload</a></li> <li><a href="viewChannelUpload.html">View Upload</a></li></ul></li>';
	bar +='<li class="has_child"><a href="javascript:void(0);">View Transaction<span class="submenu-trigger"></span></a><ul><li><a href="viewBriefAllTransactions.html">Brief View</a></li><li><a href="getTransactionForCycleNotComplete.html">Cycle Not Complete</a></li><li><a href="setBankAndLocationFilterIRDS.html">IRDS Report</a></li></ul></li>';
	bar +='<li class="has_child"><a href="javascript:void(0);">Reports<span class="submenu-trigger"></span></a> <ul> <li><a href="viewCollectionReport.html">Bank Collection Report</a></li><li><a href="CashFlowReport.html">Intraday Cash Flow Report</a></li><li><a href="redemptionReport.html">Redemption Report</a></li><li><a href="switchReport.html">Switch Report</a></li><li><a href="inflowReportSchemeWiseLocationWise.html">Inflow Report</a></li><li><a href="getEScanReports.html">EScan Report</a></li><li><a href="getPayInSlipReport.html">Payin Slip Report</a></li></ul></li>';
	bar +='<li class="has_child"><a href="javascript:void(0);">CAMS Info<span class="submenu-trigger"></span></a> <ul><li><a href="viewBriefForCAMSForward.html">Current</a></li><li><a href="getDateForCAMSForward.html">By Date</a></li></ul></li>';
	bar +='<li class="has_child"><a href="javascript:void(0);">Reconcilation<span class="submenu-trigger"></span></a> <ul><li><a href="UploadFileForReconcilation.html">Upload File</a></li><li><a href="ReconcilationDetails.html">Reconcilation</a></li><li><a href="MismatchReportDetails.html">Missmatch Report</a></li><li><a href="ViewReconcilationReport.html">Reconcilation Report</a></li></ul></li>';
	bar +='<li class="has_child"><a href="javascript:void(0);">MIS Report<span class="submenu-trigger"></span></a><ul><li class="has_child_dropdown right-menu"><a href="javascript:void(0);">Excess Credit<span></span></a><ul><li><a href="upload-excess-credit-file.html">Upload Excess Credit File</a></li><li><a href="ProcessExcessCredit.html">Process Excess Credit</a></li><li><a href="getExcessCreditTransactionReport.html">View Excess Credit Report</a></li></ul></li><li class="has_child_dropdown right-menu"><a href="javascript:void(0);">Upload Unposted <br>2 Lacks and above<span></span></a><ul class="actuators_list"><li><a href="#">Upload Unposted<br> 2 Lacks and above</a></li><li><a href="TransactionReceivedReportOperation.html">View Transction Report</a></li></ul></li></ul></li>';
	bar += '<li class="has_child"><a href="javascript:void(0);">Timestamp Mgmt<span class="submenu-trigger"></span></a><ul><li><a href="addTimeStampNumber.html">Add Time Stamp No</a></li> <li><a href="ViewTimestampReport.html">View Time Stamp No</a></li> </ul> </li>';
    bar += '</ul>';
    bar += '</nav>';
    bar += '</div>';
    $("#main-bar").html(bar);

});

function getValueByName(name) {
    var url = document.getElementById('nav-bar').getAttribute('src');
    var param = new Array();
    if (url.indexOf("?") != -1) {
        var source = url.split("?")[1];
        items = source.split("&");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var parameters = item.split("=");
            if (parameters[0] == "id") {
                return parameters[1];
            }
        }
    }
}

      $(document).on('click', '.top_nav_trigger', function(){
              $('.top_nav_links').slideToggle(300);
        });


   /*******Top Navigation Slide for Mobile Start****************/
   
 $(document).on('click', '.has_child > a', function(){
       var wWidth = $(window).width();
       if(wWidth < 1000){
          var target = $(this).next('ul').css('display');
                        if(target == 'none'){
                           $('.has_child ul').slideUp(500);
                           $(this).next('ul').slideDown(500);
                           $('.has_child ul').parent().removeClass('submenu_open');
                           $(this).parent().addClass('submenu_open');
                        }
                        else {
                           $(this).next('ul').slideUp(500);
                           $(this).parent().removeClass('submenu_open');
                        }
       }
      });

 $(document).on('click','.has_child_dropdown a', function(){
       var wWidth = $(window).width();
       if(wWidth < 1000){
          var target = $(this).next('ul').css('display');
                        if(target == 'none'){
                           $('.has_child_dropdown ul').slideUp(500);
                           $(this).next('ul').slideDown(500);
                           $('.has_child_dropdown ul').parent().removeClass('submenu_open');
                           $(this).parent().addClass('submenu_open');
                        }
                        else {
                           $(this).next('ul').slideUp(500);
                           $(this).parent().removeClass('submenu_open');
                        }
       }
      });

   $.ajax({
        url: "header.html",
        success: function(result) {
         $("#load_header").html(result);

        }
    });

   $.ajax({
        url: "footer.html",
        success: function(result) {
         $("#load_footer").html(result);

        }
    });
	
	
	  /******* Windows Resize Function ****************/
      
   $(window).resize(function(){
         var wWidth = $(window).width();
           if(wWidth > 960){
               $( ".has_child" ).removeClass( "submenu_open" );
     
               }
            
          
      
   });
	
	

});


