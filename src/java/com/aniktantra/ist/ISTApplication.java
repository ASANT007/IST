package com.aniktantra.ist;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.nio.file.*;


/**
 *
 * @author Madhur
 */
public class ISTApplication 
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
     
    public void connobj() throws SQLException, IOException, ClassNotFoundException 
    {
        try 
        {
            this.conndetails = this.datacon.readConfig();
            final String password = this.fe.Decrypt(this.conndetails[4]);
            Class.forName(this.conndetails[7]);
            (this.conn = DriverManager.getConnection(this.conndetails[5], this.conndetails[3], password)).createStatement(1003, 1007);
            //this.log.writeToLogFile("IST Connection Established");
            this.mesg = "ok";
        }
        catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("IST Database Connection Failed !!!");
            this.log.writeToLogFile("IST Message : " + ex.getMessage());
            this.mesg = "Class Not Found";
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("IST Database Connection Failed !!!");
            this.log.writeToLogFile("IST Error code:" + ex2.getErrorCode());
            this.mesg = " SQLException ";
        }
        catch (Exception ex3) {
            this.log.writeToLogFile("IST Database Connection Failed !!!");
            this.log.writeToLogFile("IST Message : " + ex3.getMessage());
            this.mesg = " IO Exception ";
        }
        this.log.writeToLogFile(this.mesg);
    }
    
    public boolean makeConnection() throws SQLException, Exception, NullPointerException 
    {
        try 
        {
            this.conStr = this.datacon.makeConnection();
            if (this.conStr.equals("ok")) {
                this.connectionFlag = true;
            }
            else {
                this.connectionFlag = false;
            }
        }
        catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("IST Database Connection Failed " + ex);
            this.log.writeToLogFile("IST Database Message : " + ex.getMessage());
        }
        catch (SQLException ex2) {
            this.log.writeToLogFile("IST Database Connection Failed " + ex2);
            this.log.writeToLogFile("IST Message : " + ex2.getMessage());
        }
        catch (NullPointerException ex3) {
            this.log.writeToLogFile("IST Database Connection Failed " + ex3);
            this.log.writeToLogFile("IST Message : " + ex3.getMessage());
        }
        catch (Exception e) {
            this.log.writeToLogFile("IST Database Connection Failed" + e);
            this.log.writeToLogFile("IST Message : " + e.getMessage());
        }
        return this.connectionFlag;
    }
    
    public void breakConnection() throws SQLException, Exception, NullPointerException {
        this.datacon.closeConnection();
    }       
    public String authenticateUser(String userid, String password) throws Exception {
        String pass ="", role ="", fisrtName = "", lastName = "";
        String userDetails = "";
        boolean flag=false;
        try {
            //pass = fe.Encrypt(password);
            sql = "select * from pgimmf_usermaster where";
            sql = sql + " userid='"+userid+"' and password ='"+password+"'";
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
            System.out.println("SQLException authenticateUser() : " + se.getMessage());
            System.out.println("SQLException authenticateUser() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException authenticateUser() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException authenticateUser() : " + e.getMessage());
        }
       
        return userDetails;
    }


/*public boolean insertLRM(final String ist_request_id,final String ist_type, final String security_isin_no, final String security_name, final String ist_datetime, final String transferror_security_category, 
        final String transferee_security_category, final String transferror_min_lrm, final String transferee_min_lrm, 
        final String transferror_netcash_position, final String transferee_netcash_position, final String line_available,
        final String securities_proceeds_utilized, final String optimal_mix_of_low_duration_paper,final String created_by,final String created_onbehalf,
        final String status,String transferror_scheme_subcategory,String transferee_scheme_subcategory,String line_borrowing_not_utilize_remark) throws SQLException, NullPointerException, Exception */
    //Commented by Amol S. on 07-06-2021
   // public boolean insertLRM(HashMap<String,String> istDetailsHashMap,final String ist_datetime, String attach)  throws SQLException, NullPointerException, Exception
     public boolean insertLRM(HashMap<String,String> istDetailsHashMap, String attach)  throws SQLException, NullPointerException, Exception
    {
        System.out.println("#### attach "+attach);
        boolean insert = false;
        String sqlQuery = "";
        String fileName = "";
        int srno = -1;
        try {
            fileName = getFileName (attach,istDetailsHashMap); 
            
            this.connobj();
            final Object recommendedDate = new Timestamp(new Date().getTime());
            
            //Commented by Amol S. on 07-06-2021
            /*Date date1 =new SimpleDateFormat("dd-MM-yyyy").parse(ist_datetime);
            java.sql.Date sqlISTDatetime = new java.sql.Date(date1.getTime());                       
            System.out.println("#### sqlISTDatetime "+sqlISTDatetime);  */        
                   
            sqlQuery = "insert into pgimmf_ist_details (ist_request_id,ist_type,security_isin_no,security_name,ist_datetime,";
            sqlQuery = sqlQuery + "transferor_scheme,transferee_scheme,created_by,created_date,created_onbehalf,status,"; //11
            
            if("LRM".equals(istDetailsHashMap.get("ist_type"))){
                
                sqlQuery = sqlQuery +"transferror_min_lrm,transferee_min_lrm,transferror_netcash_position,transferee_netcash_position,line_available,";
                sqlQuery = sqlQuery +"line_borrowing_not_utilize_remark,securities_proceeds_utilized,optimal_mix_of_low_duration_paper,rfq_filename";//9
                sqlQuery = sqlQuery +") values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                        
            }else if("Duration Rebalancing".equals(istDetailsHashMap.get("ist_type"))){
                
                sqlQuery = sqlQuery + "transferror_pretrade_duration,transferror_posttrade_duration,transferee_pretrade_duration,";
                sqlQuery = sqlQuery + "transferee_posttrade_duration,transferror_interestrate_view,transferee_interestrate_view,rfq_filename";                
                sqlQuery = sqlQuery +") values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                
            }else if("Issuer/Sector/Group Rebalancing".equals(istDetailsHashMap.get("ist_type"))){
                
                sqlQuery = sqlQuery + "transferror_issuer_pretrade_concentration,transferror_sector_pretrade_concentration,transferror_group_pretrade_concentration,";
                sqlQuery = sqlQuery + "transferee_issuer_pretrade_concentration,transferee_sector_pretrade_concentration,transferee_group_pretrade_concentration,";
                sqlQuery = sqlQuery + "transferror_issuer_posttrade_concentration,transferror_sector_posttrade_concentration,transferror_group_posttrade_concentration,";
                sqlQuery = sqlQuery + "transferee_issuer_posttrade_concentration,transferee_sector_posttrade_concentration,transferee_group_posttrade_concentration,";
                sqlQuery = sqlQuery + "transferror_issuer_sebilimit,transferror_sector_sebilimit,transferror_group_sebilimit,";
                sqlQuery = sqlQuery + "transferee_issuer_sebilimit,transferee_sector_sebilimit,transferee_group_sebilimit,";
                sqlQuery = sqlQuery + "rfq_filename";
                
                sqlQuery = sqlQuery +") values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            }
                System.out.println(sqlQuery);
                this.prpd = this.conn.prepareStatement(sqlQuery);
                
                this.prpd.setString(1, checkNull(istDetailsHashMap.get("ist_request_id")));
                this.prpd.setString(2, checkNull(istDetailsHashMap.get("ist_type")));
                this.prpd.setString(3, checkNull(istDetailsHashMap.get("security_isin_no")));
                this.prpd.setString(4, checkNull(istDetailsHashMap.get("security_name")));
                //Commented by Amol S. on 07-06-2021
                //this.prpd.setObject(5, sqlISTDatetime);
                this.prpd.setObject(5, recommendedDate);
                this.prpd.setInt(6, getIntValue(istDetailsHashMap.get("transferor_scheme")));
                this.prpd.setInt(7, getIntValue(istDetailsHashMap.get("transferee_scheme")));
                this.prpd.setString(8, checkNull(istDetailsHashMap.get("created_by")));
                this.prpd.setObject(9, recommendedDate);
                this.prpd.setString(10, checkNull(istDetailsHashMap.get("created_onbehalf")));
                this.prpd.setString(11, checkNull(istDetailsHashMap.get("status")));
            
            if("LRM".equals(istDetailsHashMap.get("ist_type"))){
                this.prpd.setFloat(12, getFloatValue(istDetailsHashMap.get("transferror_min_lrm")));
                this.prpd.setFloat(13, getFloatValue(istDetailsHashMap.get("transferee_min_lrm")));
                this.prpd.setFloat(14,getFloatValue(istDetailsHashMap.get("transferror_netcash_position")));
                this.prpd.setFloat(15,getFloatValue(istDetailsHashMap.get("transferee_netcash_position")));
                this.prpd.setString(16, checkNull(istDetailsHashMap.get("line_available")));
                this.prpd.setString(17, checkNull(istDetailsHashMap.get("line_borrowing_not_utilize_remark")));
                this.prpd.setFloat(18, getFloatValue(istDetailsHashMap.get("securities_proceeds_utilized")));
                this.prpd.setString(19, checkNull(istDetailsHashMap.get("optimal_mix_of_low_duration_paper")));               
                this.prpd.setString(20, fileName);
                
            }else if("Duration Rebalancing".equals(istDetailsHashMap.get("ist_type"))){
                
                this.prpd.setInt(12, getIntValue(istDetailsHashMap.get("transferror_pretrade_duration")));
                this.prpd.setInt(13, getIntValue(istDetailsHashMap.get("transferror_posttrade_duration")));
                this.prpd.setInt(14, getIntValue(istDetailsHashMap.get("transferee_pretrade_duration")));
                this.prpd.setInt(15, getIntValue(istDetailsHashMap.get("transferee_posttrade_duration")));
                this.prpd.setString(16, istDetailsHashMap.get("transferror_interestrate_view"));
                this.prpd.setString(17, istDetailsHashMap.get("transferee_interestrate_view"));
                this.prpd.setString(18, fileName);
                
            }else if("Issuer/Sector/Group Rebalancing".equals(istDetailsHashMap.get("ist_type"))){
                                
                this.prpd.setFloat(12, getFloatValue(istDetailsHashMap.get("transferror_issuer_pretrade_concentration")));
                this.prpd.setFloat(13, getFloatValue(istDetailsHashMap.get("transferror_sector_pretrade_concentration")));
                this.prpd.setFloat(14, getFloatValue(istDetailsHashMap.get("transferror_group_pretrade_concentration")));
                this.prpd.setFloat(15, getFloatValue(istDetailsHashMap.get("transferee_issuer_pretrade_concentration")));
                this.prpd.setFloat(16, getFloatValue(istDetailsHashMap.get("transferee_sector_pretrade_concentration")));
                this.prpd.setFloat(17, getFloatValue(istDetailsHashMap.get("transferee_group_pretrade_concentration")));
                this.prpd.setFloat(18, getFloatValue(istDetailsHashMap.get("transferror_issuer_posttrade_concentration")));
                this.prpd.setFloat(19, getFloatValue(istDetailsHashMap.get("transferror_sector_posttrade_concentration")));
                this.prpd.setFloat(20, getFloatValue(istDetailsHashMap.get("transferror_group_posttrade_concentration")));
                this.prpd.setFloat(21, getFloatValue(istDetailsHashMap.get("transferee_issuer_posttrade_concentration")));
                this.prpd.setFloat(22, getFloatValue(istDetailsHashMap.get("transferee_sector_posttrade_concentration")));
                this.prpd.setFloat(23, getFloatValue(istDetailsHashMap.get("transferee_group_posttrade_concentration")));
                this.prpd.setFloat(24, getFloatValue(istDetailsHashMap.get("transferror_issuer_sebilimit")));
                this.prpd.setFloat(25, getFloatValue(istDetailsHashMap.get("transferror_sector_sebilimit")));
                this.prpd.setFloat(26, getFloatValue(istDetailsHashMap.get("transferror_group_sebilimit")));
                this.prpd.setFloat(27, getFloatValue(istDetailsHashMap.get("transferee_issuer_sebilimit")));
                this.prpd.setFloat(28, getFloatValue(istDetailsHashMap.get("transferee_sector_sebilimit")));
                this.prpd.setFloat(29, getFloatValue(istDetailsHashMap.get("transferee_group_sebilimit")));
                this.prpd.setString(30, fileName);
            }
            
            
            final int test = this.prpd.executeUpdate();
            
            this.log.writeToLogFile("insertLRM : " + test);
            if (test > 0) {
                insert = true;
                if(checkNull(attach).length() > 0){
                      renameFile(attach, istDetailsHashMap.get("ist_request_id"));   
                }
                                              
            }
        }
        catch (SQLException se) {           
            System.out.println("#### SQLException insertLRM" + se.getMessage());
            System.out.println("#### Exception At IST insertLRM() : " + se.getErrorCode());
        }
        catch (NullPointerException ne) {
            System.out.println("#### NullPointerException : " + ne.getMessage());            
        }
        catch (Exception e) {
            e.printStackTrace();
            //System.out.println("#### GeneralException : " + e.getMessage());
        }
        finally {
            this.breakConnection();
        }
        return insert;
    }
    public boolean insertTrackingTable(final String ist_request_id, final String from_user, final String to_user, final String status) throws SQLException, NullPointerException, Exception 
    {
        
        System.out.println("#### insertTrackingTable ...");   
        boolean insert = false;
        int srno = -1;
        try 
        {
            this.connobj();
            
            final Object actiondatetime = new Timestamp(new Date().getTime());           
            this.prpd = this.conn.prepareStatement("insert into pgimmf_ist_tracking_table (ist_request_id,from_user,to_user,action_date,status) values(?,?,?,?,?)");
            this.prpd.setString(1, ist_request_id);
            this.prpd.setString(2, from_user);
            this.prpd.setString(3, to_user);
            this.prpd.setObject(4, actiondatetime);
            this.prpd.setString(5, status);
            final int test = this.prpd.executeUpdate();
            this.log.writeToLogFile("IST insert status insertTrackingTable() while recommending : " + test);
            if (test > 0) 
            {
                insert = true;
            }
        }
        catch (SQLException se) {           
            System.out.println("SQLException IST insertTrackingTable() : " + se.getMessage());
            System.out.println("Exception At IST insertTrackingTable() : " + se.getErrorCode());
        }
        catch (NullPointerException ne) {
            System.out.println("NullPointerException IST insertTrackingTable() : " + ne.getMessage());
        }
        catch (Exception e) {
            System.out.println("GeneralException IST insertTrackingTable() : " + e.getMessage());
        }
        finally {
            this.breakConnection();
        }
        System.out.println("#### insert "+insert);
        return insert;
    }
    public ResultSet getISTDetails(String status) throws SQLException, Exception 
    {
        try 
        {
            this.sql = "select * from pgimmf_ist_details where status='"+status+"'";               
            this.rs = this.datacon.getData(this.sql);           
        }
      catch (NullPointerException ne) {
            //log.writeToLogFile("client", "getResponseDetails", ne.getMessage(), "NullPointerException", 0);
        }
        catch (Exception e) {
            //log.writeToLogFile("client", "getResponseDetails", e.getMessage(), "GeneralException", 0);
        }
        return this.rs;
    }
    

    public boolean insertRoutingTable(final String ist_request_id, final int current_level, final int next_level, final String status) throws SQLException, NullPointerException, Exception 
    {
        boolean insert = false;       
        int srno = -1;
        try 
        {
          
            this.connobj();
            final Object actiondatetime = new Timestamp(new Date().getTime());           
            this.prpd = this.conn.prepareStatement("insert into pgimmf_ist_routing_table (ist_request_id,current_level,next_level,status) values(?,?,?,?)");
            this.prpd.setString(1, ist_request_id);
            this.prpd.setInt(2, current_level);
            this.prpd.setInt(3, next_level);
            this.prpd.setString(4, status);
            final int test = this.prpd.executeUpdate();
            this.log.writeToLogFile("IST insert status insertRoutingTable() while recommending : " + test);
            if (test > 0) {
                insert = true;
            }
        }
        catch (SQLException se) {            
            System.out.println("SQLException IST insertRoutingTable() : " + se.getMessage());
            System.out.println("Exception At IST insertRoutingTable() : " + se.getErrorCode());
        }
        catch (NullPointerException ne) {
            System.out.println("NullPointerException IST insertRoutingTable() : " + ne.getMessage());
        }
        catch (Exception e) {
            System.out.println("GeneralException IST insertRoutingTable() : " + e.getMessage());
        }
        finally {
            this.breakConnection();
        }
        return insert;
    }    
    
    public int updateStatusTransactionTable(final String requestId, final String status, final String remark,String role, String appType, String remarkType) throws SQLException, Exception {
        System.out.println("#### updateStatusTransactionTable "+requestId+" status "+status+" remark "+remark);
        int i = 0;
        boolean isUpdate = false;
        String sqlQuery = "";
        String colName = "";
        PreparedStatement prepareStatement = null;
        
        
        try
        {
            if(remarkType.equals("Rejection")){
                colName = "rejection_remarks";                
            }else{
                if(role.equals("FM")){
                    if(appType.equals("seller")){
                     colName = "fm_seller_approve_remarks";
                    }else{
                        colName = "fm_buyer_approve_remarks";
                    }
                
                }else{
                    colName = "rejection_remarks"; // Wii update Empty data
                }
            }
            
        sqlQuery ="update pgimmf_ist_details set status=?, "+colName+"=? where ist_request_id=?";
        connobj();
        prepareStatement = this.conn.prepareStatement(sqlQuery);
        prepareStatement.setString(1, status);
        prepareStatement.setString(2, remark);
        prepareStatement.setString(3, requestId);
        isUpdate = datacon.handleData(prepareStatement);            
        if(isUpdate){
          i++;  
        }
            
        }
        catch (SQLException ex) {
            System.out.println("#### SQLException : updateStatusTransactionTable()"+ex);
        }
        catch (NullPointerException ex2) {
        System.out.println("#### NullPointerException : updateStatusTransactionTable()"+ex2);
        }
        catch (Exception ex3) {
        System.out.println("#### Exception : updateStatusTransactionTable()"+ex3);
        }
        return i;
    }
    
    public int updateStatusRoutingTable(final String ist_request_id, final String status,final int current_level, final int next_level) throws SQLException 
    {
        
        System.out.println("##### ISTApplication :: updateStatusRoutingTable : "+ist_request_id);
        System.out.println("#### next_level "+next_level);
        int i = 0;
        try {
            final PreparedStatement ps = this.conn.prepareStatement("UPDATE pgimmf_ist_routing_table SET current_level=?,next_level=?,STATUS=? WHERE ist_request_id=?");
            ps.setInt(1, current_level);
            ps.setInt(2, next_level);
            ps.setString(3, status);
            ps.setString(4, ist_request_id);
            i = ps.executeUpdate();
        }
        catch (SQLException ex) {
            System.out.println("#### SQLException : updateStatusRoutingTable"+ex);
        }
        catch (NullPointerException ex2) {
        System.out.println("#### NullPointerException :updateStatusRoutingTable"+ex2);
        }
        catch (Exception ex3) {
        System.out.println("#### Exception : updateStatusRoutingTable"+ex3);
        }
        return i;
    }
    public String getFromUser(String ist_request_id, String appType) throws Exception {
        String fromUser = "";
        appType = checkNull(appType);
        try {
            if(appType.equals("seller"))
            {
                sql = "select created_by from pgimmf_ist_details where ist_request_id = '"+ist_request_id+"'";
            }else{
                sql = "select to_user from pgimmf_ist_tracking_table where ist_request_id = '"+ist_request_id+"' order by ist_tracking_id desc limit 1;";
            }
            
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                if(appType.equals("seller")){
                    fromUser = rs1.getString("created_by");
                }else{
                    fromUser = rs1.getString("to_user");
                }
                
            }
        }
        catch (SQLException se) {
            System.out.println("SQLException getCurrentUser() : " + se.getMessage());
            System.out.println("SQLException getCurrentUser() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getCurrentUser() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getCurrentUser() : " + e.getMessage());
        }
        System.out.println("#### fromUser : "+fromUser);
        return fromUser;
    }
    
    public String getUserBasedOnRole(String role) throws Exception {
        String nextuser="";
        try {
            sql = "select userid from pgimmf_usermaster where role='"+role+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                nextuser=rs1.getString("currentuser");
            }
        }
        catch (SQLException se) {
            System.out.println("SQLException getCurrentUser() : " + se.getMessage());
            System.out.println("SQLException getCurrentUser() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("NullPointerException getCurrentUser() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("GeneralException getCurrentUser() : " + e.getMessage());
        }
       
        return nextuser;
    }
    
    public ResultSet getISTDetailsBasedOnRole(int level) throws SQLException, Exception 
    {       
        try
        { 
            this.sql = "select a.* from pgimmf_ist_details a,pgimmf_ist_routing_table b,pgimmf_usermaster c where a.ist_request_id=b.ist_request_id and b.next_level=c.level and c.level='"+level+"' group by ist_request_id";                
            this.rs = this.datacon.getData(this.sql);
        }
        catch (NullPointerException ne) {
           System.out.println("#### NullPointerException getISTDetailsBasedOnRole() : " + ne.getMessage());
        }
        catch (Exception e) {
            System.out.println("#### Exception getISTDetailsBasedOnRole() : " + e.getMessage());
        }
        return this.rs;
    }
    
    
    public String getThreeDigitsNumWithCurrentDate(String maxnum){
        if(maxnum == ""){
          maxnum="000";
        }
        final Object recommendedDate = new Timestamp(new Date().getTime());
        String date=""+recommendedDate;
        String nextnum=date.substring(0,4)+date.substring(5,7)+date.substring(8,10)+String.format("%03d", (Integer.parseInt(maxnum)+1));
        System.out.println("#### getThreeDigitsNumWithCurrentDate"+nextnum);
        return nextnum;
    }
    
     public String getMaxRequestId() throws Exception {
        String max="";
        try {
           
            sql = "select max(ist_request_id) as ist_request_id from pgimmf_ist_details";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                max=rs1.getString("ist_request_id");
            }
        }
        catch (SQLException se) {
            System.out.println("#### SQLException getMaxRequestId() : " + se.getMessage());
            System.out.println("#### SQLException getMaxRequestId() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException getMaxRequestId() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException getMaxRequestId() : " + e.getMessage());
        }
       
        return max;
    }
     
     public int getCurrentSessionUserLevel(String userid,String role) throws Exception {
        int level=0;
        try {            
            sql = "select level from pgimmf_usermaster where userid='"+userid+"' and role='"+role+"'";
            rs1 = datacon.getData(sql);
            if(rs1.next())
            {
                level=rs1.getInt("level");
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
       
        return level;
    }
     public void deleteFromRoutingTable(final String ist_routing_id) {
        final boolean flag = false;
        try {
            this.sql = "delete from pgimmf_ist_routing_table where ist_request_id='" + ist_routing_id + "'";
            System.out.println("sql=" + this.sql);
            final Statement st = this.conn.createStatement();
            st.executeUpdate(this.sql);
        }
        catch (SQLException se) {
            System.out.println("#### SQLException==" + se.getMessage());
        }
        catch (NullPointerException ne) {
            System.out.println("#### NullPointerException==" + ne.getMessage());
        }
        catch (Exception e) {
            System.out.println("#### Exception==" + e.getMessage());
        }
    }
    private int getIntValue(String val) {
        int num = 0;
        if(checkNull(val).length() > 0 ){
            num = Integer.parseInt(val);
        }
        return num;
        
    }
    private float getFloatValue(String val) {
        float num = 0;
        if(checkNull(val).length() > 0 ){
            num = Float.parseFloat(val);
        }
        return num;
        
    }
    public String checkNull(String input)
    {
        if(input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input))
        input = "";
        return input.trim();    
    }

    private void renameFile(String attach,String requestId) {
       
        try{
            //System.out.println(attach);
                
                String application = attach.substring(0, attach.indexOf("tempUploads"));
                String img = "", ext = "";      
                img = attach.substring(attach.indexOf("tempUploads")+13,attach.length() );
                if(img.contains(".")){                        
                    ext =  img.substring(img.indexOf("."), img.length()); 
                }   
                String fileName = "//"+requestId+ext;
                String newFile = application+"tempUploads"+fileName;
                String newLocation = application+"RFQScreenshots"+fileName;
                File oldName = new File(attach);          
                File newName =   new File(newFile); 
                if (oldName.renameTo(newName)){
                     System.out.println("Renamed successfully");
                     System.out.println("newFile "+newFile);
                     System.out.println("newLocation "+newLocation);
                     moveFile(newFile, newLocation);
                }
                else {
                    System.out.println("##### Error in File Rename "); 
                }
                    
        }catch(NullPointerException ne){
            ne.printStackTrace();
       }catch(Exception e){
            e.printStackTrace();
       }
    }

    private void moveFile(String sourceStr, String targetStr)
    {   
       try{
         
        //System.out.println("sourceStr "+sourceStr);
        //System.out.println("targetStr "+targetStr); 
        
        Path source = Paths.get(sourceStr);
        Path target = Paths.get(targetStr);
        
        Files.move(source, target);
        System.out.println("Moved successfully");
       }catch(IOException io){
            io.printStackTrace();
       }catch(NullPointerException ne){
            ne.printStackTrace();
       }catch(Exception e){
            e.printStackTrace();
       }
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

    private String getFileName(String attach, HashMap<String, String> istDetailsHashMap) {
       
        String img = "", ext = "", fileName = ""; 
        System.out.println("#### attach "+attach);
        try
        {
            if(checkNull(attach).length() > 0)
            {
                img = attach.substring(attach.indexOf("tempUploads")+13,attach.length() );
                System.out.println("#### img "+img);
                if(img.contains(".")){                        
                    ext =  img.substring(img.indexOf("."), img.length()); 
                }                    
                fileName = istDetailsHashMap.get("ist_request_id")+ext;
                System.out.println("#### screenshot "+fileName);
            }
            
        }catch(Exception e){
            e.printStackTrace();
        }
        return fileName;
    }
    
}
