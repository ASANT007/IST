/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aniktantra.ist;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author amols
 */
public class TestEncryption 
{
    Connection conn;
    boolean connectionFlag = false;
    boolean flag = false;
    int responseCodeScheme = 0;
    java.beans.Statement stat = null;
    java.beans.Statement st;
    ResultSet rs = null; ResultSet rs1 = null;
    PreparedStatement prpd = null;
    String conStr = "";
    String sql = ""; String mesg = "";
    String[] conndetails;
    private String[] parameter = new String[8];
    DataConnection datacon = new DataConnection();
    FileEncryption fe = new FileEncryption();
    Logfile log = new Logfile();
    Mailing mail = new Mailing();
    
    public void connobj() throws SQLException, IOException, ClassNotFoundException {
        try {
            this.conndetails = this.datacon.readConfig();
            final String password = this.fe.Decrypt(this.conndetails[4]);
            Class.forName(this.conndetails[7]);
            (this.conn = DriverManager.getConnection(this.conndetails[5], this.conndetails[3], password)).createStatement(1003, 1007);
            //this.log.writeToLogFile("FRT Connection Established");
            this.mesg = "ok";
        }
        catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed !!!");
            this.log.writeToLogFile("LRMTransManager Message : " + ex.getMessage());
            this.mesg = "Class Not Found";
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed !!!");
            this.log.writeToLogFile("LRMTransManager Error code:" + ex2.getErrorCode());
            this.mesg = " SQLException ";
        }
        catch (Exception ex3) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed !!!");
            this.log.writeToLogFile("LRMTransManager Message : " + ex3.getMessage());
            this.mesg = " IO Exception ";
        }
        this.log.writeToLogFile(this.mesg);
    }
    
    public boolean makeConnection() throws SQLException, Exception, NullPointerException {
        try {
            this.conStr = this.datacon.makeConnection();
            if (this.conStr.equals("ok")) {
                this.connectionFlag = true;
            }
            else {
                this.connectionFlag = false;
            }
        }
        catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed " + ex);
            this.log.writeToLogFile("LRMTransManager Database Message : " + ex.getMessage());
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed " + ex2);
            this.log.writeToLogFile("LRMTransManager Message : " + ex2.getMessage());
        }
        catch (NullPointerException ex3) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed " + ex3);
            this.log.writeToLogFile("LRMTransManager Message : " + ex3.getMessage());
        }
        catch (Exception e) {
            this.log.writeToLogFile("LRMTransManager Database Connection Failed" + e);
            this.log.writeToLogFile("LRMTransManager Message : " + e.getMessage());
        }
        return this.connectionFlag;
    }
    
    public void breakConnection() throws SQLException, Exception, NullPointerException {
        this.datacon.closeConnection();
    }
    
    public static void main(String [] args) throws SQLException, Exception
    {
        String userId = "";
        TestEncryption te = new TestEncryption();
        te.makeConnection();
        ResultSet FM_List = te.getFMList();
        
        if (FM_List.next()) 
        {
            do {
                te.show(String.valueOf(16));
                // te.show(FM_List.getString("userid"));
                
            }while (FM_List.next());
        }
        te.breakConnection();
    }
    public ResultSet getFMList() throws Exception 
    {
        try 
        {         
            sql = "SELECT userid FROM `pgimmf_usermaster` ;";            
            this.rs = this.datacon.getData(this.sql);                       
        }
        catch (SQLException se) {
            System.out.println("SQLException getFMList() : " + se.getMessage());
            System.out.println("SQLException getFMList() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getFMList() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getFMList() : " + e.getMessage());
        }
       
        return this.rs;
    }
    private void show(String userId) {
        
        String encSchemeApprStatus="" ,encodedSchemeApprStatus="" , ennSchemeRejStatus="" ,encodedSchemeRejStatus="" , apprLink="",rejLink="", approveUrl="", RejectUrl="";
         String encBatchId ="" ,encodedBatchId ="" , FM_userId ="", encodedFM_userId="";
         // Encryption and Encoding START
            String body = "";
            String url = "http://localhost:8080/CrossTradingWorkflow/openSchemeForApproval.jsp?";
             encBatchId = fe.Encrypt("123456");
             encodedBatchId = java.net.URLEncoder.encode(encBatchId);
             FM_userId = fe.Encrypt(userId);//setting FM_userId.
             encodedFM_userId = java.net.URLEncoder.encode(FM_userId);

            System.out.println("Encoded UserId : " + encodedFM_userId);

            encSchemeApprStatus = fe.Encrypt("approve");
            encodedSchemeApprStatus = java.net.URLEncoder.encode(encSchemeApprStatus);
            ennSchemeRejStatus = fe.Encrypt("reject");
            encodedSchemeRejStatus = java.net.URLEncoder.encode(ennSchemeRejStatus);

            apprLink = url + "aprrovestatus=" + encodedSchemeApprStatus + "&userid=" + encodedFM_userId + "&batchId=" + encodedBatchId;
            rejLink = url + "aprrovestatus=" + encodedSchemeRejStatus + "&userid=" + encodedFM_userId + "&batchId=" + encodedBatchId;

            approveUrl = "<a href='" + apprLink + "'>Click Here To Approve</a>";
            RejectUrl = "<a href='" + rejLink + "'>Click Here To Reject</a>";
            
            body = body + "<br><br> Please " + approveUrl + " or " + RejectUrl + ", in case you are in office.";
            String subject = "CashDeployment Request sent for Approval";
            try
            {
                 mail.sendISTIntimationMail(subject, "suraj.jadhav@aniktantra.com", body); 
            }catch(Exception e){
                e.printStackTrace();
            }
            
               
            System.out.println("#### approveUrl"+approveUrl);
            System.out.println("#### RejectUrl"+RejectUrl);
            

       
            
        } 
    
    
        
    
    
    
}
