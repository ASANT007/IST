<%-- 
    Document   : addISTDetailsToHTML
    Created on : 12 Jan, 2021, 12:42:48 PM
    Author     : amols
--%>
<%@page import="java.net.Socket"%>
<%@page import="java.net.UnknownHostException"%>
<%@page import="java.net.InetAddress"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.File"%>
<%@ page  import="org.zefer.pd4ml.PD4ML" %>
<%@ page  import="org.zefer.pd4ml.PD4Constants" %>
<%@ page  import="java.awt.*" %>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URLConnection"%>
<%@page import="java.net.URL"%>
<jsp:useBean id="lrmTrans" class="com.aniktantra.ist.LRMTransManager"/>
<%
 String userId = (String)session.getAttribute("username");
 String requestId = request.getParameter("requestId");
 //Local url
 //String jspUrl = "http://localhost:8084/CrossTradingWorkflow/istFullDetailsForPDF.jsp?requestId="+requestId;
 //UAT url
 String jspUrl = "http://projects.aniktantra.com/CrossTradingWorkflow/istFullDetailsForPDF.jsp?requestId="+requestId;
 try
 {
    /*InetAddress id = null;
     try {  
      id = InetAddress.getLocalHost();  
      
    } catch (UnknownHostException e) {  
        e.printStackTrace();
    }  
    System.out.println("#### host ["+ id.getHostAddress()+"]"); 
    Socket socket = new Socket();
    System.out.println("####  Port number: "+socket.getLocalPort()); */
    
    String htmlFilePath = "";
    String fileName = userId+"_"+requestId+".pdf";
    URL url = new URL(jspUrl);

    URLConnection con = url.openConnection();

    HttpURLConnection httpConnection =(HttpURLConnection)con;
    httpConnection.setRequestMethod("POST");
    httpConnection.setDoInput(true);
    httpConnection.setDoOutput(true);
    httpConnection.setRequestProperty ("Content-Type","application/x-www-form-urlencoded");
    String content = "requestId=" + URLEncoder.encode(requestId,"UTF-8")+"&user_id="+userId;

    httpConnection.connect();

    int responseCode = httpConnection.getResponseCode();
    InputStream in = con.getInputStream();
    if( responseCode == 200)
    {
        String filePath = application.getRealPath("/WEB-INF/");             
        htmlFilePath = filePath.substring(0, filePath.indexOf("WEB-INF"))+"\\"+userId+"_"+requestId+".html";  
        System.out.print("#### htmlFilePath : "+htmlFilePath);
        OutputStream outf = new FileOutputStream(htmlFilePath);
        int c = -1;
        byte buf[] = new byte[1024];
        int len;

        while((len = in.read(buf)) > 0) 
        {
            outf.write(buf,0,len);
        }
        outf.close();
        in.close();
    }
    
    request.setCharacterEncoding("UTF-8"); 
    System.out.print("#### PdfFilePath Gen ");
    String PdfFilePath = lrmTrans.getPathForPDF("ISTPDFs"); 
    PdfFilePath = PdfFilePath+fileName;
    System.out.print("#### PdfFilePath : "+PdfFilePath);
    File f = new File(PdfFilePath);	
    java.io.FileOutputStream fos = new java.io.FileOutputStream(f);	
    OutputStream sos = System.out;
    File fz = new File(htmlFilePath);
    java.io.FileInputStream fis = new java.io.FileInputStream(fz);
    System.out.println("#### fis"+fis.toString());
    InputStreamReader isr = new InputStreamReader( fis, "UTF-8" );
    System.out.println("#### isr"+isr.toString());
    PD4ML html = new PD4ML();
    html.setPageSize( new Dimension(PD4ML.A4) );
    html.setPageInsets( new Insets(1,1,1,1) );
    html.setHtmlWidth(1004);
    html.enableImgSplit(false);
    html.render( isr, fos);

    System.out.println("#### fileName "+fileName);
    out.print(fileName);
    
    //Delete html and pdf after download
     
 }catch(Exception e){
     
     e.printStackTrace();
 }
%>