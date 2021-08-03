/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.aniktantra.ist;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 *
 * @author Administrator
 */
public class Logfile
{
    
    DataConnection dataConn = new DataConnection();
    public String createFile()
    {
        String strFileName="";
        try
        {
            java.text.SimpleDateFormat formatter= new SimpleDateFormat("dd/MM/yyyy");
            java.util.Date todaysDate=new java.util.Date();
            String currentDate=formatter.format(todaysDate);
            String dd=currentDate.substring(0,2);
            String mm=currentDate.substring(3,5);
            String yy=currentDate.substring(6,10);
            String dateFolder=dd+mm+yy;           
            String realPath = dataConn.getPath();
            String fileName="errorMessage"+dateFolder+".txt";
            File filePath=new File(realPath+File.separator+"logs"+File.separator+fileName);
            strFileName=filePath.toString();
            //System.out.println("File Name :"+filePath);
            if(!filePath.exists())
            {
                filePath.createNewFile();
            }
        }
        catch(Exception ie)
        {
            System.out.println("createFile() Exception :"+ie.getMessage());

        }
        return strFileName;
    }

    public void writeToLogFile(String errorMessage)
    {
        String filePath="";
        FileWriter fw=null;
        try
        {
            java.util.Date currentDate=new java.util.Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            String errorDate=dateFormat.format(currentDate);
            filePath=createFile();
            fw = new FileWriter(filePath,true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(errorDate.trim());
            bw.write("\t" + errorMessage.trim());
            bw.newLine();
            bw.close();
        }
        catch(Exception ex)
        {
            System.out.println("writeToLogFile() Exception in write to Log File : "+ex.getMessage());
        }
    }

    public String createPaymentLogFile()
    {
        String strFileName="";
        try
        {
            java.text.SimpleDateFormat formatter= new SimpleDateFormat("dd/MM/yyyy");
            java.util.Date todaysDate=new java.util.Date();
            String currentDate=formatter.format(todaysDate);
            String dd=currentDate.substring(0,2);
            String mm=currentDate.substring(3,5);
            String yy=currentDate.substring(6,10);
            String dateFolder=dd+mm+yy;           
            String realPath = dataConn.getPath();
            String fileName="paymentLogMessage"+dateFolder+".txt";
            File filePath=new File(realPath+File.separator+"paymentLogs"+File.separator+fileName);
            strFileName=filePath.toString();
            //System.out.println("File Name :"+filePath);
            if(!filePath.exists())
            {
                filePath.createNewFile();
            }
        }
        catch(Exception ie)
        {
            System.out.println("createPaymentLogFile() Exception :"+ie.getMessage());

        }
        return strFileName;
    }

    public void writeToPaymentLogFile(String errorMessage)
    {
        String filePath="";
        FileWriter fw=null;
        try
        {
            java.util.Date currentDate=new java.util.Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            String errorDate=dateFormat.format(currentDate);
            filePath=createPaymentLogFile();
            fw = new FileWriter(filePath,true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(errorDate.trim());
            bw.write("\t" + errorMessage.trim());
            bw.newLine();
            bw.close();
        }
        catch(Exception ex)
        {
            System.out.println("writeToPaymentLogFile() Exception in write to Log File : "+ex.getMessage());
        }
    }

    public String createMailSMSLogFile()
    {
        String strFileName="";
        try
        {
            java.text.SimpleDateFormat formatter= new SimpleDateFormat("dd/MM/yyyy");
            java.util.Date todaysDate=new java.util.Date();
            String currentDate=formatter.format(todaysDate);
            String dd=currentDate.substring(0,2);
            String mm=currentDate.substring(3,5);
            String yy=currentDate.substring(6,10);
            String dateFolder=dd+mm+yy;            
            String realPath = dataConn.getPath();
            String fileName="emailSMSLogMessage"+dateFolder+".txt";
            File filePath=new File(realPath+File.separator+"smsLogs"+File.separator+fileName);
            strFileName=filePath.toString();
            //System.out.println("File Name :"+filePath);
            if(!filePath.exists())
            {
                filePath.createNewFile();
            }
        }
        catch(Exception ie)
        {
            System.out.println("createMailSMSLogFile() Exception :"+ie.getMessage());

        }
        return strFileName;
    }

    public void writeToMailSMSLogFile(String errorMessage)
    {
        String filePath="";
        FileWriter fw=null;
        try
        {
            java.util.Date currentDate=new java.util.Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            String errorDate=dateFormat.format(currentDate);
            filePath=createMailSMSLogFile();
            fw = new FileWriter(filePath,true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(errorDate.trim());
            bw.write("\t" + errorMessage.trim());
            bw.newLine();
            bw.close();
        }
        catch(Exception ex)
        {
            System.out.println("writeToMailSMSLogFile() Exception in write to Log File : "+ex.getMessage());
        }
    }

    public static void main(String arg[])
    {
        Logfile logFileDemo = new Logfile();
        logFileDemo.writeToLogFile("Welcome to Logfile.java");
    }


}
