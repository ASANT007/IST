package com.aniktantra.ist;


import com.aniktantra.ist.DataConnection;
import com.aniktantra.ist.FileEncryption;
import com.aniktantra.ist.Logfile;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.ArrayList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author amols
 */
public class LRMTransManager
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
    
    public static void main(String...strings){
        
    }
    public void connobj() throws SQLException, IOException, ClassNotFoundException {
        try {
            this.conndetails = this.datacon.readConfig();
            final String password = this.fe.Decrypt(this.conndetails[4]);
            Class.forName(this.conndetails[7]);
            (this.conn = DriverManager.getConnection(this.conndetails[5], this.conndetails[3], password)).createStatement(1003, 1007);
            //this.log.writeToLogFile("IST Connection Established");
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
    
    public ResultSet getAllSchemes() throws Exception 
    {         
        
        try 
        {                       
            sql = "select srno,scheme_name from pgimmf_schememaster where status = 'Active'";            
            this.rs = this.datacon.getData(this.sql);                     
        }
        catch (SQLException se) {
            System.out.println("SQLException getAllSchemes() : " + se.getMessage());
            System.out.println("SQLException getAllSchemes() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getAllSchemes() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getAllSchemes() : " + e.getMessage());
        }
       
        return this.rs;
    }
    
    public ResultSet getCategories(int srNo) throws Exception 
    {
        try
        {
            sql = "select scheme_category, scheme_sub_category from pgimmf_schememaster where status = 'active' and srno ='"+srNo+"'";
            this.rs = this.datacon.getData(this.sql);             
        }
        catch (SQLException se) {
            System.out.println("SQLException getSubCategories() : " + se.getMessage());
            System.out.println("SQLException getSubCategories() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getSubCategories() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getSubCategories() : " + e.getMessage());
        }
       
        return this.rs;
    }    
    
    
    public String getCategoryScheme(String category, String subCategory) throws Exception 
    {
        String schemeName = "";
        category = checkNull(category);
        subCategory = checkNull(subCategory);               
        
        try 
        {
           
            sql = "select scheme_name from pgimmf_schememaster where status = 'active' and scheme_category ='"+category+"' and scheme_sub_category = '"+subCategory+"'";            
            rs = datacon.getData(sql);
            if(rs.next())
            {
                schemeName = checkNull(rs.getString("scheme_name"));
            }
                       
        }
        catch (SQLException se) {
            System.out.println("SQLException getCategoryScheme() : " + se.getMessage());
            System.out.println("SQLException getCategoryScheme() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getCategoryScheme() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getCategoryScheme() : " + e.getMessage());
        }
       
        return schemeName;
    }
    
    public ResultSet getISINSecurityDetails(String alpha)
    {
      try 
      {
        sql = "select isin, security_desc from pgimmf_securitymaster where status = 'active' and security_desc like '%"+alpha+"%'";            
        this.rs = this.datacon.getData(this.sql);                       
      }
      catch (SQLException se) 
      {
            System.out.println("SQLException getSubCategories() : " + se.getMessage());
            System.out.println("SQLException getSubCategories() : " + se.getErrorCode());
      }
      catch (NullPointerException ne) 
      {
            System.out.println("NullPointerException getSubCategories() : " + ne.getMessage());
      } 
      catch (Exception e) 
      {
            System.out.println("GeneralException getSubCategories() : " + e.getMessage());
      }
       
      return this.rs;  
    }
    
    public ResultSet getISTDetailsForFMSeller(String userId)
    {
        try
        {            
            sql = "select t4.* from  pgimmf_scheme_fm_mapping t1 ,pgimmf_schememaster t2, pgimmf_ist_routing_table t3 , pgimmf_ist_details t4 where \n" +
            "t2.srno = t1.scheme_refno and t2.srno = t4.transferor_scheme \n" +
            "and t2.status ='Active' and t3.next_level=2 and t3.status='New' and t4.status='New' and t4.ist_request_id=t3.ist_request_id \n" +
            "and t1.fm_userid='"+checkNull(userId)+"'";
            
            this.rs = this.datacon.getData(this.sql);
            
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }
        return this.rs;  
    }
    
    public ResultSet getRecommendedISTDetails(String userId){
                
        try
        {
            
            sql = "select t4.* from  pgimmf_scheme_fm_mapping t1 ,pgimmf_schememaster t2, pgimmf_ist_routing_table t3 , pgimmf_ist_details t4 where \n" +
            "t2.srno = t1.scheme_refno AND t2.srno = t4.transferee_scheme \n" +
            "and t2.status ='Active' and t3.next_level=2 and t3.status='Recommended' and t4.status='Recommended' and t4.ist_request_id=t3.ist_request_id \n" +
            "and t1.fm_userid='"+checkNull(userId)+"'";
            
            this.rs = this.datacon.getData(this.sql);
            
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }
        return this.rs;  
    }
    
    public int getCurrentSessionUserLevel(String userid,String role) throws Exception {
        int level=0;
        try
        {
            sql = "select level from pgimmf_usermaster where userid='"+userid+"' and role='"+role+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                level=rs1.getInt("level");
            }
        }
        catch (SQLException se) {
            System.out.println("SQLException getCurrentSessionUserLevel() : " + se.getMessage());
            System.out.println("SQLException getCurrentSessionUserLevel() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getCurrentSessionUserLevel() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getCurrentSessionUserLevel() : " + e.getMessage());
        }
       
        return level;
    }
    
    public ResultSet getISTDetailsBasedOnRole(int level) throws SQLException, Exception 
    {
        try 
        { 
            this.sql = "select a.* from pgimmf_ist_details a,pgimmf_ist_routing_table b,pgimmf_usermaster c where a.ist_request_id=b.ist_request_id and b.next_level=c.level and c.level='"+level+"' group by ist_request_id";                
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
    
    public ResultSet getPendingISTDetailsCreatedByIA(String userId)
    {
        try
        {  
            sql = "select t1.ist_request_id,t1.ist_type, t1.security_name ,t1.security_isin_no, t1.transferor_scheme,t1.transferee_scheme,"
                    + "t2.next_level,t2.status from pgimmf_ist_details t1, pgimmf_ist_routing_table t2 \n" +
                    "where t1.ist_request_id = t2.ist_request_id  and t1.created_by ='"+checkNull(userId)+"'";         
            this.rs = this.datacon.getData(this.sql);
            
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }
        return this.rs;    
    }
        
    public String getPendingUser(String requestId, String nextLevel, String  status, int transferorScheme, int transfereeScheme,String forType)
    {
        String userList = "";
        //System.out.println("#### nextLevel "+nextLevel +" status : "+status);
        
        if(nextLevel.equals("2") && status.equals("New"))
        {           
            userList = getPendingFM(transferorScheme, forType);
            
        }else if(nextLevel.equals("2") && status.equals("Recommended"))
        {   
            userList = getPendingFM(transfereeScheme, forType);
            
        }else if(nextLevel.equals("3") || nextLevel.equals("4"))
        {           
            userList = getUserFromLevel(nextLevel, forType);            
        }
        //System.out.println("#### getPendingUser :: userList :"+userList);
        return userList;
    }
    private String getPendingFM(int scheme, String forType) {
        String userId = "";
        try 
        {
            if("email".equals(forType)){
                sql = "select t1.fm_userid from  pgimmf_scheme_fm_mapping t1, pgimmf_schememaster t2 where t1.scheme_refno ='"+scheme+"' and t2.srno = t1.scheme_refno and t1.status='Active'";
            }else{
                sql = "select t3.firstname,t3.lastname from pgimmf_scheme_fm_mapping t1, pgimmf_schememaster t2, pgimmf_usermaster t3 where t1.scheme_refno ='"+scheme+"' and t2.srno = t1.scheme_refno and t1.status='Active' and t3.userid = t1.fm_userid";
            }            
            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                if("email".equals(forType)){
                    userId = checkNull(rs1.getString("fm_userid"));
                }else{
                    userId = checkNull(rs1.getString("firstname")) +" "+checkNull(rs1.getString("lastname"));
                }
            }
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getCurrentSessionUserLevel() : " + se.getMessage());
            System.out.println("#### SQLException getCurrentSessionUserLevel() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getCurrentSessionUserLevel() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getCurrentSessionUserLevel() : " + e.getMessage());
        }
        System.out.println("#### getPendingFM :: userId : " + userId);
        return userId;
    }   
    
    private String getUserFromLevel(String nextLevel, String forType) {
     String userId = "";    
     
        try {
           if("email".equals(forType)){
            sql = "select userid from pgimmf_usermaster where level = '"+checkNull(nextLevel)+"' and status = 'Active'";
           }else{
            sql = "select firstname,lastname from pgimmf_usermaster where level = '"+checkNull(nextLevel)+"' and status = 'Active'";
           }
            rs1 = datacon.getData(sql);
            while(rs1.next())
            {
                if("email".equals(forType)){
                    userId = userId +","+checkNull(rs1.getString("userid"));
                }else{
                    userId = userId +","+checkNull(rs1.getString("firstname")) +" "+checkNull(rs1.getString("lastname"));
                    
                }
                //System.out.println("#### userId 348 "+userId);
            }
            if(userId.length() > 0){
                userId = userId.substring(1, userId.length());
            }
           // System.out.println("#### userId 350 "+userId);            
            
        }
        catch (SQLException se) {
            System.out.println("SQLException getCurrentSessionUserLevel() : " + se.getMessage());
            System.out.println("SQLException getCurrentSessionUserLevel() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getCurrentSessionUserLevel() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getCurrentSessionUserLevel() : " + e.getMessage());
        }
        System.out.println("#### UserId List "+userId);
        return userId;  
    }
    public String getNextLevel(String requestId){
        String nextLvl = "";
        
        try {
           
            sql = "select next_level from pgimmf_ist_routing_table where ist_request_id ='"+checkNull(requestId)+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                nextLvl = checkNull(rs1.getString("next_level"));
            }
        }
        catch (SQLException se) {
            System.out.println("SQLException getNextLevel() : " + se.getMessage());
            System.out.println("SQLException getNextLevel() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getNextLevel() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getNextLevel() : " + e.getMessage());
        }
        return nextLvl;
        
    }
    public String getSchemeNames(int srNo){
      String schemeName = "";
      try {
           
            sql = "select scheme_name from pgimmf_schememaster where srno  = '"+srNo+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                schemeName = checkNull(rs1.getString("scheme_name"));
                //System.out.println("#### schemeName 403 "+schemeName);                
            }
            
        }
        catch (SQLException se) {
            System.out.println("SQLException getSchemeNames() : " + se.getMessage());
            System.out.println("SQLException getSchemeNames() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getSchemeNames() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getSchemeNames() : " + e.getMessage());
        }
        
        return schemeName;    
    }
    //Filter Report START
   public ResultSet getFilterReportData(String userId, String role, String istFromDate, String istToDate, String istStatus, String reqISTType){
       try{
            java.sql.Date FromDate = getDBDateValue(istFromDate);
            java.sql.Date ToDate = getDBDateValue(istToDate);
            String userColumn = "";
            
            if(role.equals("IA")){
                userColumn = "from_user";
            }else{
                userColumn = "to_user";
            }
            
            this.sql = "select t1.ist_request_id,t1.ist_type, t1.security_name ,t1.security_isin_no, t1.transferor_scheme,t1.transferee_scheme ,t1.created_by,t1.created_date,t1.status from pgimmf_ist_details t1,\n" +
            "pgimmf_ist_tracking_table t2  where t1.ist_request_id = t2.ist_request_id and t2."+userColumn+"='"+checkNull(userId)+"' and \n" +
            "t1.created_date between '"+FromDate+" 00:00:00' and '"+ToDate+" 23:59:59'";
            
            if(checkNull(istStatus).length() > 0){
               this.sql = this.sql +" and t1.status = '"+istStatus+"'"; 
            }
            if(checkNull(reqISTType).length() > 0){
               this.sql = this.sql +" and t1.ist_type = '"+reqISTType+"'"; 
            }
            this.rs = this.datacon.getData(this.sql);
            
       }catch(Exception e){
           e.printStackTrace();
       }
        return this.rs;
   }
    public ResultSet getISTDetailsById(String requestId){
        try 
        { 
           this.sql = "select t1.*, t2.firstname, t2.lastname from pgimmf_ist_details t1, pgimmf_usermaster t2  where t1.ist_request_id = '"+checkNull(requestId)+"' and t2.userid = t1.created_by";

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
    public ResultSet getTrackingDetailsById(String requestId){
        try 
        { 
           this.sql = "select from_user,to_user, date_format(action_date, '%d/%m/%Y %H:%i') as action_date , status from pgimmf_ist_tracking_table where ist_request_id = '"+checkNull(requestId)+"' order by ist_tracking_id";

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
    
    public String getFullName(String userId){
    String name = "";
    try {
           
            sql = "select firstname, lastname from pgimmf_usermaster where userid  = '"+checkNull(userId)+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                name = checkNull(rs1.getString("firstname")) +" "+ checkNull(rs1.getString("lastname"));
                            
            }
            
        }
        catch (SQLException se) {
            System.out.println("SQLException getSchemeNames() : " + se.getMessage());
            System.out.println("SQLException getSchemeNames() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getSchemeNames() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getSchemeNames() : " + e.getMessage());
        }
    return name;
    }
    
    public int getSchemeNo(String reqId, String colName)
    { 
    System.out.println("#### getSchemeNo ....");
    int schemeNo = 0;
    try {
           
            sql = "select "+colName+" from pgimmf_ist_details where ist_request_id = '"+reqId+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                schemeNo = rs1.getInt(colName);
                            
            }
            
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getSchemeNo() : " + se.getMessage());
            System.out.println("#### SQLException getSchemeNo() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getSchemeNo() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getSchemeNo() : " + e.getMessage());
        }
    return schemeNo;
    }
    public String getEmailId(int srNo, String userId){
    String emailId = "";
    try {
           if(checkNull(userId).length() > 0 ){
               sql = "select emailid from pgimmf_usermaster where userid ='"+checkNull(userId)+"'";
           }else{
               sql = "select t1.emailid from pgimmf_usermaster t1, pgimmf_scheme_fm_mapping t2 where t1.userid = t2.fm_userid and t2.scheme_refno ='"+srNo+"'";
           }
            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                emailId = checkNull(rs1.getString("emailid"));
                            
            }
            
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getEmailId() : " + se.getMessage());
            System.out.println("#### SQLException getEmailId() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getEmailId() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getEmailId() : " + e.getMessage());
        }
    return emailId;
    }
    
    public String getFromUserList(String requestId)
    {
        String userId = "";
        try
        {
            sql = "select from_user from pgimmf_ist_tracking_table where ist_request_id = '"+checkNull(requestId)+"'";
            rs1 = datacon.getData(sql);
            while(rs1.next())
            {
                userId = userId +","+checkNull(rs1.getString("from_user"));  
            }
            if(userId.length() > 0){
                userId = userId.substring(1, userId.length());
            }
                System.out.println("#### userId 350 "+userId);
        }catch (SQLException se)
        {
            System.out.println("#### SQLException getFromUserList() : " + se.getMessage());
            System.out.println("#### SQLException getFromUserList() : " + se.getErrorCode());
        }catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getFromUserList() : " + ne.getMessage());
        }catch (Exception e) {
            System.out.println("#### GeneralException getFromUserList() : " + e.getMessage());
        }
        return userId;
    }
    
    public String getUserIdBySchemeRefNo(int srno)
    {    
        String userId = "";    
        try 
        {
           sql = "select  t3.userid from  pgimmf_scheme_fm_mapping t1, pgimmf_schememaster t2, pgimmf_usermaster t3 where t1.scheme_refno = "+srno+" and t2.srno = t1.scheme_refno and t1.status='Active' and t3.userid = t1.fm_userid";            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                userId = checkNull(rs1.getString("userid"));                            
            }
            
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getUserIdBySchemeRefNo() : " + se.getMessage());
            System.out.println("#### SQLException getUserIdBySchemeRefNo() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getUserIdBySchemeRefNo() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getUserIdBySchemeRefNo() : " + e.getMessage());
        }
    return userId;
    }
    
    public String getUserDetails(String userId)
    {
    
    String userDetails = "";
    String role ="", fisrtName = "", lastName = "";
    try {
           sql = "select firstname, lastname, role from pgimmf_usermaster where userId = '"+checkNull(userId)+"'";            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                role = rs1.getString("role");
                fisrtName = rs1.getString("firstname");
                lastName = rs1.getString("lastname"); 
                userDetails = role+"~"+fisrtName+"~"+lastName;
                            
            }
            
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getUserDetails() : " + se.getMessage());
            System.out.println("#### SQLException getUserDetails() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getUserDetails() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getUserDetails() : " + e.getMessage());
        }
    return userDetails;
    }
    
    public boolean isRecordProcessed(String requestId, String userId){
        boolean isProcessed = false;
        try{
            sql = "select to_user from pgimmf_ist_tracking_table where ist_request_id ='"+checkNull(requestId)+"' and to_user = '"+checkNull(userId)+"'";            
            rs = datacon.getData(sql);
            if(rs.next())
            {   
               isProcessed = true;             
            }
        }catch (SQLException se) {
            System.out.println("#### SQLException getUserDetails() : " + se.getMessage());
            System.out.println("#### SQLException getUserDetails() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getUserDetails() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getUserDetails() : " + e.getMessage());
        }
        System.out.println("#### isRecordProcessed () : " + isProcessed);
        return isProcessed;
    }
    private java.sql.Date getDBDateValue(String dateStr){
        java.sql.Date date = null;
        int dd,mm,yy;        
        if(checkNull(dateStr).length() > 0){
            dd = Integer.parseInt(dateStr.substring(0,2));
            mm = Integer.parseInt(dateStr.substring(3,5))-1;
            yy = Integer.parseInt(dateStr.substring(6,10))-1900;                
            date = new java.sql.Date(yy,mm,dd);
        
        return date;
        
        }else{
            return date;
        }
        
    }
    //Filter Report END
    public String getSecurityName(String requestId)
    {    
        String securityName = "";
    
        try 
        {
            sql = "select security_name from pgimmf_ist_details where ist_request_id ='"+checkNull(requestId)+"'";            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                securityName = rs1.getString("security_name");  
            }

        }
        catch (SQLException se) {
            System.out.println("#### SQLException getSecurityName() : " + se.getMessage());
            System.out.println("#### SQLException getSecurityName() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getSecurityName() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getSecurityName() : " + e.getMessage());
        }
        return securityName;
    }
    public String checkNull(String input)
    {
        if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input))
        input = "";
        return input.trim();    
    }
    
    public String getPathForPDF(String folderType)
    {

        /*===============For Windows===============*/
        //String SLASH="masters\\expenseWorkflow\\reqDocs/";
       String SLASH =folderType+"/";
        /*================For Linux===============*/
       // String SLASH="masters"+File.separator+"expenseWorkflow"+File.separator+"requisitionMgmt"+File.separator+folderType+File.separator;
        boolean flag = false;
        String dirForFiles = "";
        dirForFiles = datacon.getPath();
        dirForFiles = dirForFiles+SLASH;

        return dirForFiles;
    }    
      
   
}
