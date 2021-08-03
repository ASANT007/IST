/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aniktantra.ist;
import java.lang.*;
import java.io.*;
import java.sql.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import java.util.Properties;
/**
 *
 * @author amols
 */
public class Mailing {
    private Connection conn;
    private String sql = "";
    private String conStr = "";
    private PreparedStatement prpdst;
    private ResultSet rs;
    private String[] conndetails; 
    private String mesg = "";
    boolean connectionFlag = false;
    boolean flag = false;
  
    private DataConnection datacon = new DataConnection();
    private FileEncryption fe = new FileEncryption();
    private Logfile log = new Logfile();
    
    public static void main(String [] args){
        
        String host = "smtp.zoho.in";
        String subject = "IST Request sent for Approval";
	String from = "amol.sant@aniktantra.com";
	String to = "amol.sant@aniktantra.com";
        String body = "Hi,<br><br> ";
	body = body + "IST Request No: 2020210002 of IST Type : LRM has been sent for your approval.<br> ";
	
        Mailing mailing = new Mailing();
        try{
            //mailing.sendERIntimationMail(from, subject, host, to, body);
            mailing.sendISTIntimationMail(subject, to, body);
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }
    
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
            this.log.writeToLogFile("Mailing Database Connection Failed !!!");
            this.log.writeToLogFile("Mailing Message : " + ex.getMessage());
            this.mesg = "Class Not Found";
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("Mailing Database Connection Failed !!!");
            this.log.writeToLogFile("Mailing Error code:" + ex2.getErrorCode());
            this.mesg = " SQLException ";
        }
        catch (Exception ex3) {
            this.log.writeToLogFile("Mailing Database Connection Failed !!!");
            this.log.writeToLogFile("Mailing Message : " + ex3.getMessage());
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
            this.log.writeToLogFile("Mailing Database Connection Failed " + ex);
            this.log.writeToLogFile("Mailing Database Message : " + ex.getMessage());
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("Mailing Database Connection Failed " + ex2);
            this.log.writeToLogFile("Mailing Message : " + ex2.getMessage());
        }
        catch (NullPointerException ex3) {
            this.log.writeToLogFile("Mailing Database Connection Failed " + ex3);
            this.log.writeToLogFile("Mailing Message : " + ex3.getMessage());
        }
        catch (Exception e) {
            this.log.writeToLogFile("Mailing Database Connection Failed" + e);
            this.log.writeToLogFile("Mailing Message : " + e.getMessage());
        }
        return this.connectionFlag;
    }
    
    public void breakConnection() throws SQLException, Exception, NullPointerException {
        this.datacon.closeConnection();
    }
    
    public String getMailServerInfo() throws SQLException,Exception
    {
        String smtphost = "";
        String sql = "select smtphost from ew_mailserverdetails";
        rs = datacon.getData(sql);

        if(rs.next())
        {
          smtphost = rs.getString("smtphost");
        }
        return smtphost;
    }
    
    public boolean sendISTIntimationMail(String subject,String to ,String body) throws SQLException,Exception
    {
            System.out.print("#### Sending to "+to);
            
            String from = "", host = "", login = "", encryptPass = "",pass = "";
            int port = 0;
            boolean flag= false;
            java.util.Date dt= new java.util.Date();
            java.sql.Date sdt= new java.sql.Date(dt.getTime());
            String strdate= sdt.toString();

            String dd = strdate.substring(8,10);
            String  mm = strdate.substring(5,7);
            String  yy = strdate.substring(2,4);
            String str_date= dd+mm+yy;
            
            ResultSet rs = null;
            makeConnection();
            rs = getMailingDetails();
            if(rs.next()){
                host = checkNull(rs.getString("smtp_host"));
                from = checkNull(rs.getString("email_id"));                
                port = rs.getInt("port");//Port
                encryptPass = checkNull(rs.getString("password"));
                pass = fe.Decrypt(encryptPass);
            }
            System.out.println("#### host "+host);
            System.out.println("#### port "+port);
            System.out.println("#### pass "+pass);
            if(rs != null){                
                rs.close();
                rs = null;
            }
            breakConnection();
            login = from;
            //String login = "amol.sant@aniktantra.com";
            //String pass = "***********";

            try
            {
                Properties prop = System.getProperties();
                prop.put("mail.smtp.host",host);
                prop.put("mail.smtp.port", port); // Added by AMOL 
                prop.put("mail.smtp.starttls.enable", "true");// Added by AMOL
                
                /*Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(login, pass);
			}
		};
		//Session session = Session.getInstance(props, auth);
                Session ses1  = Session.getDefaultInstance(prop,auth);*/
                
                Session ses1  = Session.getDefaultInstance(prop,null);

                MimeMessage msg = new MimeMessage(ses1);
                msg.setFrom(new InternetAddress(from));
                msg.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
                msg.setSubject(subject);
                //msg.setContentType("text/html");
                // Create the message part
                MimeBodyPart messageBodyPart = new MimeBodyPart();

                // Fill the message
                //messageBodyPart.setText(body);//commented by SURAJ JADHAV
                messageBodyPart.setText(body,"UTF-8","html");//Changed by SURAJ JADHAV 

               
                Multipart multipart = new MimeMultipart(); //Added by SURAJ JADHAV START
                multipart.addBodyPart(messageBodyPart);    //Added By SURAJ JADHAV END
                
               
                //msg.setContent(body,"html/text");  //commented by SURAJ JADHAV
                msg.setContent(multipart);           //Added by SURAJ JADHAV
                
                //Commented and Changed by AMOL S  START
                //https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html
                // Reason : com.sun.mail.smtp.SMTPSendFailedException: 530 5.5.1 Authentication Required.
                //Transport.send(msg); 
                Transport tr = ses1.getTransport("smtp");
                tr.connect(host, login, pass);
                msg.saveChanges();      // don't forget this
                tr.sendMessage(msg, msg.getAllRecipients());
                tr.close();
                 //Commented and Changed by AMOL S  END
                flag = true;
            }
            catch(javax.mail.MessagingException me)
            {
                me.printStackTrace();
                flag = false;
            }
            System.out.println("#### Mail Sent ["+flag+"]");
           return flag;
    }
    
    public ResultSet getMailingDetails()
    {
        try 
        { 
           this.sql = "select * from mailing_config where app_name = 'cross_trade' and status = 'Active' order by sr_no desc";

           this.rs = this.datacon.getData(this.sql);

        }
        catch (NullPointerException ne) {
            ne.printStackTrace();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return this.rs;
        
    }
    public String checkNull(String input)
    {
        if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input) )
        input = "";
        return input.trim();    
    }
    
    
}
