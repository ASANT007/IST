/**
 *
 * @author amols
 */


package com.aniktantra.ist;


import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Enumeration;
import com.oreilly.servlet.MultipartRequest;
import java.net.URLEncoder;
/*
 * @author  anik7
 * @version
 */

public class UploadRFQFileServlet extends HttpServlet {
    DataConnection dataConn = new DataConnection();

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
        response.setContentType("text/html;charset=UTF-8");

        try
        {           
            System.out.println("#### UploadRFQFileServlet servlet ..");
            String filePath = "";
            filePath = dataConn.getPath();
            String destinationDir = filePath + "/tempUploads//";
          
            MultipartRequest multi = new MultipartRequest(request, destinationDir, 10 * 1024 * 1024);
            Enumeration files = multi.getFileNames();
            String fileName = (String) multi.getFilesystemName((String) files.nextElement());

            String finalPath = destinationDir + fileName;
            System.out.println("#### finalPath "+finalPath);
            response.sendRedirect(request.getContextPath() + "/uploadRFQFile.jsp?firstTime=1&&attach=" + URLEncoder.encode(finalPath));            
           

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

