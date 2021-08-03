<%-- 
    Document   : uploadRFQFile
    Created on : 19 Dec, 2020, 5:13:52 PM
    Author     : amols
--%>


<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/custom.css" rel="stylesheet" type="text/css">
<link href="vendor/hover/effects.min.css" rel="stylesheet">
<link href="menu/menu.css" rel="stylesheet" type="text/css">

<script src="js/jquery-latest.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/clientValidation.js"></script>
<script src="js/serverValidation.js"></script>
<script src="js/common.js"></script>
<title>Untitled Document</title>
</head>
<body>
<script  type="text/javascript">
function createHTTPObj()
{
        var http = null;
        if(window.XMLHttpRequest)
              http = new XMLHttpRequest();
        else if (window.ActiveXObject)
        http = new ActiveXObject("Microsoft.XMLHTTP");
        return http;
}
function validation()
{

    var file = document.getElementById("attach").value;
    var lastInd = file.lastIndexOf('.');
    var ext = file.substring(lastInd+1,file.lenght);	
    ext = ext.toLowerCase();

    if(document.getElementById("attach").value=="")
    {
        alert("Please upload file");
    }
    
    else
    {
        uploadFile(file);
    }
}
function uploadFile(filename){
    //Id='msg';
    // ImageLoading(Id);
    var http = createHTTPObj();
    http.onreadystatechange = function()
    {
        if(http.readyState == 4){
            var response = http.responseText
            document.frm.submit();
        }
    };
    http.open('POST','uploadRFQFile.jsp',true);
    http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    http.send('filename=' + encodeURIComponent(filename));
}

</script>


<form name="frm" method="post" action="servlet/UploadRFQFileServlet" enctype="multipart/form-data">
<table width="100%" border="0" cellpadding="1" cellspacing="0" bgcolor="#FFFFFF">
<tr>
     <td colspan="2" align="left">&nbsp; </td>
</tr>
<tr>
<td><input type="file" id="attach" name="attach" accept=".doc,.jpej,.png" /></td>
<td><input type="button" class="btn btn-primary" onclick="validation()" value="Upload"></td>
</tr>
<%
System.out.println("#### UploadRFQFileServlet  ");
String ft = checkNull(request.getParameter("firstTime"));
System.out.println("firstTime : "+ft);
int firstTime = 0;
if(ft.length() > 0) 
{
    firstTime = Integer.parseInt(ft);
}


String attachment="";
if(firstTime==0)
{
%>

<%
}
else if(firstTime==1)
{
    String fileName = "";
    attachment = request.getParameter("attach"); 
    session.setAttribute("attach", attachment);
    System.out.println("#### attach"+attachment);
    
    if(checkNull(attachment).length() > 0){
        fileName = attachment.substring(attachment.indexOf("tempUploads")+13, attachment.length()); 
    }    
    
%>

 <tr>
 <td colspan="2" align="left">File Uploaded : <%=fileName%> </td>
</tr>
<%}

%>
<input name="attached_pdf" id="attached_pdf" type="hidden" readonly="true" value="<%=attachment%>"> 
</table>
 </form>
</body>
</html>
<%!
//Added by AMOL S. om 09-Sep-2020 START
    public String checkNull(String input)
    {
        if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
        input = "";
        return input.trim();    
    }
    //Added by AMOL S. om 09-Sep-2020 END
%>