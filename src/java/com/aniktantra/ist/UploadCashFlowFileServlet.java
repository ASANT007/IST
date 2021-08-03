/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aniktantra.ist;

import com.oreilly.servlet.MultipartRequest;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Suraj
 */
public class UploadCashFlowFileServlet extends HttpServlet {
   DataConnection dataConn = new DataConnection();
   public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        try {
           
            System.out.println("#### UploadCashFlowFileServlet servlet ..");
            //java.net.URL path = UploadCashFlowFileServlet.class.getResource("/");
            
            //Commented by AMOL S START
            /*String filePath = path.toString();
            //System.out.println("#### File Paths 37 "+filePath);
            filePath = filePath.substring(filePath.lastIndexOf(":/") - 1, filePath.indexOf("WEB-INF"));//Windows
             //filePath=filePath.substring(filePath.lastIndexOf(":")+1,filePath.indexOf("WEB-INF")); //Linux
            //System.out.println("#### File Paths 40 "+filePath);*/
            //Commented by AMOL S END
            
            String filePath = "";
            filePath = dataConn.getPath(); //Added by AMOL S
            
            String destinationDir = filePath + "/tempUploads//";
          
            MultipartRequest multi = new MultipartRequest(request, destinationDir, 10 * 1024 * 1024);
            Enumeration files = multi.getFileNames();
            String fileName = (String) multi.getFilesystemName((String) files.nextElement());

            String finalPath = destinationDir + fileName;
            System.out.println("#### finalPath "+finalPath);
            response.sendRedirect(request.getContextPath() + "/uploadCashFlowExcelFile.jsp?firstTime=1&&attach=" + URLEncoder.encode(finalPath));
            
            //Changed by AMOL S. on 11-Nov-2020 END

        } catch (Exception e)
        {
            System.out.println("There was a unrecoverable error uploading your file. Please try again.");
            System.out.println(e);
        } finally 
        {
            System.out.close();
        }
    }
}
