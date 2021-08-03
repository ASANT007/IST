/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 
package com.aniktantra.ist;
  
import java.io.*;
import java.sql.*;

public class DataConnection {

    FileEncryption fe = new FileEncryption();
    private String[] parameter = new String[8];
    String rdline = "", str = "", mesg = "";
    int start = 0, i = 0;
    Connection con = null;
    Statement stat = null;
    ResultSet rs = null;
    
    public String getPath()
    {
         String filePath = null;
         java.net.URL path = DataConnection.class.getResource("/");
         filePath = path.toString();       
         /*filePath for linux*/
         //filePath = filePath.substring(filePath.lastIndexOf(":")+1,filePath.indexOf("classes"));
         //filePath = filePath.substring(filePath.lastIndexOf(":/")+1,filePath.indexOf("WEB-INF"));//PGIMMF
         /*filePath for windows*/
         filePath = filePath.substring(filePath.lastIndexOf(":/")-1,filePath.indexOf("WEB-INF"));//PGIMMF
         //filePath = filePath.substring(filePath.lastIndexOf(":")-1,filePath.indexOf("classes"));
         System.out.print("#### filePath ["+filePath+"]");
         return filePath;
    }
    public String[] readConfig() throws IOException 
    {        
        String  filepath = ""; i = 0;
        filepath = getPath() +"incidencemgmtdb";        
        File f = new File(filepath);
        FileInputStream fs = new FileInputStream(f);
        BufferedInputStream bs = new BufferedInputStream(fs);
        BufferedReader br = new BufferedReader(new InputStreamReader(bs));
        while ((rdline = br.readLine()) != null) 
        {
            start = rdline.indexOf("=");
            start += 1;
            str = rdline.substring(start, rdline.length());
            parameter[i] = str;            
            i++;
        }
        br.close();
        return parameter;
    }

    public String makeConnection() throws SQLException, IOException, ClassNotFoundException 
    {
        try 
        {
            String[] conndetails;            
            conndetails = readConfig();           
            String password = "";
           
            password=fe.Decrypt(conndetails[4]);
            Class.forName(conndetails[7]);
            con = DriverManager.getConnection(conndetails[5], conndetails[3], password);
            stat = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            mesg = "ok";

        } catch (ClassNotFoundException ex) {
            System.out.println("Connection Failed !!!");
            System.out.println("Message : " + ex.getMessage());
            mesg = "Class Not Found";
        } catch (SQLException ex) {
            System.out.println("Connection Failed !!!");
            System.out.println("Error code:" + ex.getMessage());
            mesg = "SQLException ";
        } catch (Exception ex) {
            System.out.println("Connection Failed !!!");
            System.out.println("Message : " + ex.getMessage());
            mesg = "IO Exception ";
        }
        return mesg;
    }

    public ResultSet getData(String sql) throws SQLException, Exception, NullPointerException
    {
        System.out.println(" sql ["+sql+"]");
        try {
            makeConnection();
            rs = stat.executeQuery(sql);
             
        } catch (SQLException se) {
            System.out.println("SQL Exception");
            System.out.println("Error Message :" + se.getMessage());
        } catch (NullPointerException ne) {
            System.out.println("NullPointer Exception");
            System.out.println("Error Message :" + ne.getMessage());
        } catch (Exception ex) {
            System.out.println("Exception");
            System.out.println("Error Message :" + ex.getMessage());
        }
        return rs;
    }

    public boolean handleData(PreparedStatement prpdst) throws SQLException, Exception, NullPointerException 
    {
        boolean succ = false;
        try 
        {
            con.setAutoCommit(false);
            prpdst.executeUpdate();
            con.commit();
            succ = true;
        } catch (SQLException e) {
            con.rollback();
            succ = false;
            System.out.println("Error Message :" + e.getCause());
            System.out.println("Error Message :" + e.getMessage());
        } catch (Exception e) {
            con.rollback();
            succ = false;
            System.out.println("Error Message :" + e.getMessage());
        }
        return succ;
    }

    public void closeConnection() throws SQLException, Exception, NullPointerException 
    {
        if(stat != null){
            stat.close();
            stat = null;
        }
        if(con != null){
            con.close();  
            con = null;
        }
              
    }

    public static void main(String args[]) throws SQLException, Exception 
    {
        DataConnection s = new DataConnection();
        s.makeConnection();
    }
}
