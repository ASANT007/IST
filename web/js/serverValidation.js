/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function createHTTPObj()
{
    var http = null;
    if(window.XMLHttpRequest)
        http = new XMLHttpRequest();
    else if (window.ActiveXObject)
        http = new ActiveXObject("Microsoft.XMLHTTP");
    return http;
}

function getTransferorCategoriesAndSubCategories(obj){
    
    var scheme = $('#transferor_scheme').val();

    var http = createHTTPObj();
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           { 
               var response = JSON.parse(http.responseText);
               document.getElementById('transferror_scheme_category').innerHTML = response.category;
               document.getElementById('transferror_scheme_subcategory').innerHTML = response.subCategory;
           } 
        };

        http.open('POST','getCategoriesAndSubCategories.jsp',true);
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        http.send('schemeName='+encodeURIComponent(scheme));  
}

function getTransfereeCategoriesAndSubCategories(obj){
    
    var scheme = $('#transferee_scheme').val();

    var http = createHTTPObj();
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           {  
               var response = JSON.parse(http.responseText);
               document.getElementById('transferee_scheme_category').innerHTML = response.category;
               document.getElementById('transferee_scheme_subcategory').innerHTML = response.subCategory;
           } 
        };

        http.open('POST','getCategoriesAndSubCategories.jsp',true);
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        http.send('schemeName='+encodeURIComponent(scheme)); 
}
function insertTrackingTable(requestId,status,appType,remark,istType)
{
    //alert('insertTrackingTable'+status);
    //var str = insertStr;
    var xmlhttp = createRequestObject();
  
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            //alert(xmlhttp.responseText);
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
                alert('Data Approved Successfuly.')
                window.location.reload();
                //window.varificationform.submit();
                //window.confirmForm.submit();
            }
            else if(xmlhttp.responseText.match("Failure"))
            {
                //document.getElementById("result").innerHTML="Your details failed to submit";
                alert('Your details failed to submit.')
            }
            else if(xmlhttp.responseText.match("LinkSucc"))
            {
                alert('Data Approved Successfuly.')
                window.close();
            }
            else if(xmlhttp.responseText.match("LinkFail"))
            {
                alert('Your details failed to submit.')
                window.close();
            }
        }
    }
    xmlhttp.open('POST','insertTrackingTable.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('requestId='+encodeURIComponent(requestId)+"&status="+encodeURIComponent(status)
            +"&appType="+encodeURIComponent(appType)+"&remark="+encodeURIComponent(remark)+"&istType="+encodeURIComponent(istType));
}
function rejectISTDetails(requestId, rejRemark,appType,istType){
    //alert(requestId +' '+rejRemark);
    var xmlhttp = createHTTPObj();
        xmlhttp.onreadystatechange = function()
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
                    alert('Data Rejected Successfuly.')
                    window.location.reload();

                }
                else if(xmlhttp.responseText.match("Failure"))
                {
                   alert('Unable to Reject.')
                }
                else if(xmlhttp.responseText.match("LinkSucc"))
                {
                    alert('Data Rejected Successfuly.')
                    window.close();
                }
                else if(xmlhttp.responseText.match("LinkFail"))
                {
                    alert('Unable to Reject.')
                    window.close();
                }
            }
           
        }

        xmlhttp.open('POST','rejectISTDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send('requestId='+encodeURIComponent(requestId)+"&rejRemark="+encodeURIComponent(rejRemark)
                +"&appType="+encodeURIComponent(appType)+"&istType="+encodeURIComponent(istType)); 
}

function getISTDetails(reqISTType, istStatus, istFromDate, istToDate){
    //var category = $('#transfereeSchemeCategory').val();

    var http = createHTTPObj();
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           {               
               var response = http.responseText
               document.getElementById('searchDiv').innerHTML = response;               
           } 
        };

        http.open('POST','getISTDetailsByFilter.jsp',true);
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        http.send('reqISTType='+encodeURIComponent(reqISTType)+"&istStatus="+encodeURIComponent(istStatus)
                +"&istFromDate="+encodeURIComponent(istFromDate)+"&istToDate="+encodeURIComponent(istToDate));  
}

function uploadRFQFile(uplaodRFQFile){
   
    var http = createHTTPObj();
        http.onreadystatechange = function()
        {
           if(http.readyState == 4)
           {               
               //var response = http.responseText
               document.getElementById('fileDiv').innerHTML = "File Uplaoded Successfully";               
           } 
        };
        http.open('POST','servlet/UploadRFQFileServlet',true)
        http.setRequestHeader('Content-Type','multipart/form-data');
        http.send("uplaodRFQFile="+encodeURIComponent(uplaodRFQFile));
        //http.open('POST','uploadRFQFile.jsp',true);
        //http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //http.send("uploadAction="+encodeURIComponent("upload")+"uplaodRFQFile="+encodeURIComponent(uplaodRFQFile));
    
}

function saveToPDF(requestId){
    //alert(requestId);
   var xmlhttp = createHTTPObj();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 )
            {   
                var filePath = xmlhttp.responseText.trim();
                
                var link = document.createElement('a'); 
                //link.href = 'tempreqPDFs/'+filePath;
                link.href = 'ISTPDFs/'+filePath;
                //alert(link.href);
                link.download = filePath;
                link.dispatchEvent(new MouseEvent('click'));                
                
            }
           
        }
        xmlhttp.open('POST','addISTDetailsToHTML.jsp',true);       
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send("requestId="+encodeURIComponent(requestId));  
}