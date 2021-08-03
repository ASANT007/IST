/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aniktantra.ist;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

public class CashFlowManager {

    Connection conn;
    boolean connectionFlag = false;
    boolean flag = false;
    int responseCodeScheme = 0;
    Statement stat = null;
    Statement st;
    ResultSet rs = null;
    ResultSet rs1 = null;
    PreparedStatement prpd = null;
    String conStr = "";
    String sql = "";
    String mesg = "";
    String[] conndetails;
    private String[] parameter = new String[8];
    DataConnection datacon = new DataConnection();
    FileEncryption fe = new FileEncryption();
    Logfile log = new Logfile();

    public static void main(String... strings) {

    }

    public void connobj() throws SQLException, IOException, ClassNotFoundException {
        try 
        {
            this.conndetails = this.datacon.readConfig();
            final String password = this.fe.Decrypt(this.conndetails[4]);
            Class.forName(this.conndetails[7]);
            (this.conn = DriverManager.getConnection(this.conndetails[5], this.conndetails[3], password)).createStatement(1003, 1007);
            //this.log.writeToLogFile("FRT Connection Established");
            this.mesg = "ok";
        } catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed !!!");
            this.log.writeToLogFile("ReadExcelFile Message : " + ex.getMessage());
            this.mesg = "Class Not Found";
        } catch (SQLException ex2) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed !!!");
            this.log.writeToLogFile("ReadExcelFile Error code:" + ex2.getErrorCode());
            this.mesg = " SQLException ";
        } catch (Exception ex3) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed !!!");
            this.log.writeToLogFile("ReadExcelFile Message : " + ex3.getMessage());
            this.mesg = " IO Exception ";
        }
        this.log.writeToLogFile(this.mesg);
    }

    public boolean makeConnection() throws SQLException, Exception, NullPointerException {
        try {
            this.conStr = this.datacon.makeConnection();
            if (this.conStr.equals("ok")) {
                this.connectionFlag = true;
            } else {
                this.connectionFlag = false;
            }
        } catch (ClassNotFoundException ex) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed " + ex);
            this.log.writeToLogFile("ReadExcelFile Database Message : " + ex.getMessage());
        } catch (SQLException ex2) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed " + ex2);
            this.log.writeToLogFile("ReadExcelFile Message : " + ex2.getMessage());
        } catch (NullPointerException ex3) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed " + ex3);
            this.log.writeToLogFile("ReadExcelFile Message : " + ex3.getMessage());
        } catch (Exception e) {
            this.log.writeToLogFile("ReadExcelFile Database Connection Failed" + e);
            this.log.writeToLogFile("ReadExcelFile Message : " + e.getMessage());
        }
        return this.connectionFlag;
    }

    public void breakConnection() throws SQLException, Exception, NullPointerException {
        this.datacon.closeConnection();
    }
    
    /*public void closeConnection() throws SQLException, Exception, NullPointerException {
        if(this.st != null){
            this.st.close();
            this.st = null;
        }
        if(this.conn != null){
            this.conn.close();
            this.conn = null;
        }
        
        
        System.out.println("Connection closed");
    }*/
    public boolean insertDataIntoTempTable(String attachment, String userId) {
        boolean error = false;
        File file = null;
        FileReader inputFileReader = null;
        BufferedReader br = null;
        String line = "";
        String scheme = "", deal_no = "", instrument_name = "", trans_type = "", maturity = "", trade_date = "";
        String total_deal_value = "", counterparty = "", ytm = "", mandatory_remarks = "", asset_class = "", status = "";
        boolean flag;

        String field[] = null;
                

        System.out.println("#### CashFlowManager :: insertDataIntoTempTable : ");
        System.out.println("#### CashFlowManager :: attachment : " + attachment);
        System.out.println("#### CashFlowManager :: userId : " + userId);
        try {
            synchronized (this) {

                Object upload_date = new java.sql.Timestamp(new java.util.Date().getTime());

                int maxBatchId = getMaxBatchIdFromMainTable();
                int currentBatchId = maxBatchId + 1;

                //String path = "D:\\10.230.11.68\\D\\AnikTantra\\AMOL_BKP\\7_ChannelBulkUpload\\Upload file for channel Credits.csv";
                Workbook workbook = WorkbookFactory.create(new File(attachment));
                // Retrieving the number of sheets in the Workbook
                System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");

                //Iterating over all the sheets in the workbook (Multiple ways)
                for (Sheet sheet : workbook) {
                    System.out.println("=> " + sheet.getSheetName());
                }

                //Iterating over all the rows and columns in a Sheet
                // Getting the Sheet at index zero
                Sheet sheet = workbook.getSheetAt(0);

                // Create a DataFormatter to format and get each cell's value as String
                DataFormatter dataFormatter = new DataFormatter();
                for (Row row : sheet) {
                    int first_row = row.getRowNum();
                    if (first_row == 0) {
                        continue;
                    }
                    //totalRecords ++;
                    int dataCell = 0;
                    for (Cell cell : row) {

                        String cellValue = dataFormatter.formatCellValue(cell);
                        //System.out.print(cellValue + "\t");
                        System.out.print(cellValue);
                        dataCell++;
                        if (dataCell == 1) {
                            scheme = checkNull(cellValue);
                        } else if (dataCell == 2) {
                            deal_no = checkNull(cellValue);
                        } else if (dataCell == 3) {
                            instrument_name = checkNull(cellValue);
                        } else if (dataCell == 4) {
                            trans_type = checkNull(cellValue);
                        } else if (dataCell == 5) {
                           maturity = checkNull(cellValue);
                           java.util.Date date = new SimpleDateFormat("dd-MMM-yyyy").parse(maturity);
                           maturity = new java.sql.Date(date.getTime()).toString();
                        } else if (dataCell == 6) {
                            trade_date = checkNull(cellValue);
                         
                        java.util.Date date1 = new SimpleDateFormat("dd-MMM-yyyy").parse(trade_date);
                        trade_date = new java.sql.Date(date1.getTime()).toString();

                          
                        } else if (dataCell == 7) {
                            total_deal_value = checkNull(cellValue);
                            total_deal_value = total_deal_value.replaceAll(",", "");
                        } else if (dataCell == 8) {
                            counterparty = checkNull(cellValue);
                        } else if (dataCell == 9) {
                            ytm = checkNull(cellValue);
                        } else if (dataCell == 10) {
                            mandatory_remarks = checkNull(cellValue);
                        } else if (dataCell == 11) {
                            asset_class = checkNull(cellValue);
                        }

                    }

                    status = validateUploadData(scheme, deal_no, instrument_name, trans_type, maturity, trade_date,
                            total_deal_value, counterparty, ytm, mandatory_remarks, asset_class);
                    if ("Successful".equals(status)) {
                        flag = true;
                    } else {
                        flag = false;
                    }

                    // srNo++;                   
                    connobj();

                    String sqlQuery = "insert into pgimmf_cashdeployment_table_temp(scheme, deal_no, instrument_name, trans_type, maturity, trade_date,\n"
                            + "                             total_deal_value, counterparty, ytm, mandatory_remarks, asset_class,flag,status,upload_date,upload_batch_id,uploaded_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    PreparedStatement preparedStatement = null;
                    ResultSet resultSet = null;

                    preparedStatement = conn.prepareStatement(sqlQuery);
                    // preparedStatement.setInt(1,srNo);
                    preparedStatement.setString(1, scheme);
                    preparedStatement.setString(2, deal_no);
                    preparedStatement.setString(3, instrument_name);
                    preparedStatement.setString(4, trans_type);
                    preparedStatement.setString(5, maturity);

                    preparedStatement.setString(6, trade_date);
                    preparedStatement.setString(7, total_deal_value);
                    preparedStatement.setString(8, counterparty);
                    preparedStatement.setString(9, ytm);
                    preparedStatement.setString(10, mandatory_remarks);
                    preparedStatement.setString(11, asset_class);
                    preparedStatement.setBoolean(12, flag);
                    preparedStatement.setString(13, status);
                    preparedStatement.setObject(14, upload_date);
                    preparedStatement.setInt(15, currentBatchId);
                    preparedStatement.setString(16, userId);

                    preparedStatement.executeUpdate();

                }

            }

        } catch (Exception e) {
            error = false;
            System.out.println("ReadExcelFile storage Failed !!!");
            e.printStackTrace();
        }finally
        {
            try
            {
                this.breakConnection();
            }catch(Exception e){
                e.printStackTrace();
            }
        }

        return error;
    }

    public String validateUploadData(String scheme, String deal_no, String instrument_name, String trans_type, String maturity, String trade_date,
            String total_deal_value, String counterparty, String ytm, String mandatory_remarks, String asset_class) {
        String status = "";

        try {
            if (scheme.length() > 0 && deal_no.length() > 0 && instrument_name.length() > 0 && trans_type.length() > 0 && maturity.length() > 0 && trade_date.length() > 0
                    && total_deal_value.length() > 0 && counterparty.length() > 0 && ytm.length() > 0 && mandatory_remarks.length() > 0 && asset_class.length() > 0) {

                try {
                    total_deal_value = total_deal_value.replaceAll(",", "");
                    double total_deal = Double.parseDouble(total_deal_value);

                } catch (NumberFormatException e) {
                    status = status + " " + "Invalid total_deal_value";

                }

                try {
                    double ytmvlue = Double.parseDouble(ytm);

                } catch (NumberFormatException e) {
                    status = status + " " + "Invalid ytmvlue";

                }

            } else {
                status = status + " " + "Data is missing";
            }
        } catch (Exception e) {
            status = "Exception occured";
            e.printStackTrace();
        }
        if (status.length() == 0) {
            status = "Successful";
        }
        System.out.print("#### status " + status);
        return status;
    }

    public String insertTempTabletoMainTable(String userid) throws SQLException, Exception{
        String isSuccess = "";
        PreparedStatement preparedStatement = null;
         
        String sqlQuery = "insert into pgimmf_cashdeployment_table (scheme, deal_no, instrument_name, trans_type, maturity, trade_date,\n"
                + "total_deal_value, counterparty, ytm, mandatory_remarks, asset_class,uploaded_by,upload_date,upload_batch_id) select scheme, deal_no, instrument_name, trans_type, maturity, trade_date,\n"
                + "total_deal_value, counterparty, ytm, mandatory_remarks, asset_class,uploaded_by,upload_date,upload_batch_id from pgimmf_cashdeployment_table_temp where flag = true and uploaded_by= '"+userid+"' ";
 
        int batch_id = getCurrentBatchId(userid);       
        try 
        {
            connobj();
            preparedStatement = conn.prepareStatement(sqlQuery);            
            int result = preparedStatement.executeUpdate();
            if (result > 0) {
                isSuccess="success";
            }
        } catch (SQLException se) {
            isSuccess = "fail";
            se.printStackTrace();
        } catch (Exception e) {
            isSuccess = "fail";
            e.printStackTrace();
        }
        finally {
            this.breakConnection();
        }
        return isSuccess + " " + batch_id;
    }

    public ResultSet getUploadedExcelData() {
        try {
            sql = "select * from pgimmf_cashdeployment_table_temp";
            this.rs = this.datacon.getData(this.sql);

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this.rs;
    }

    public ResultSet getUploadedSchemeswithFMs(String batchId) {
        try {
            sql = "select concat(um.Firstname,' ',um.Lastname) as FMname ,um.emailid ,um.userid,cd.* FROM pgimmf_cashdeployment_table cd inner join pgimmf_schememaster sm on cd.scheme=sm.scheme_name  \n"
                    + "inner join pgimmf_scheme_fm_mapping fm on fm.scheme_refno=sm.srno \n"
                    + "inner join pgimmf_usermaster um on um.userid=fm.fm_userid\n"
                    + "where cd.upload_batch_id=" + batchId;

            this.rs = this.datacon.getData(this.sql);

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this.rs;
    }

    public ResultSet getSchemesFMs(String batchId) {
        try {
            sql = "select um.userid,um.emailid from pgimmf_cashdeployment_table cd inner join pgimmf_schememaster sm on cd.scheme=sm.scheme_name  \n"
                    + "inner join pgimmf_scheme_fm_mapping fm on fm.scheme_refno=sm.srno \n"
                    + "inner join pgimmf_usermaster um on um.userid=fm.fm_userid\n"
                    + "where cd.upload_batch_id=" + batchId + " group by um.userid";

            this.rs = this.datacon.getData(this.sql);

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this.rs;
    }

    public boolean deleteTempTableData(String userId) throws SQLException, Exception
    {
        boolean succ = true;
        try 
        {
            connobj();
            prpd = conn.prepareStatement("delete from pgimmf_cashdeployment_table_temp where uploaded_by=?");
            prpd.setString(1, userId);
            prpd.executeUpdate();
        } catch (SQLException ex) {
            System.out.println("SQL Exception For truncating table: " + ex);
            ex.printStackTrace();
            succ = false;
        } catch (Exception ex) {
            System.out.println("General Exception For truncating table:" + ex);
            succ = false;
        }
        finally {
            this.breakConnection();
        }
        return succ;
    }

    private int getMaxBatchIdFromMainTable() {
        int srNo = 0;

        String sqlStr = "select max(upload_batch_id) from pgimmf_cashdeployment_table";
        try {
            connobj();
            prpd = conn.prepareStatement(sqlStr);
            rs = prpd.executeQuery();
            if (rs != null && rs.next()) {
                srNo = rs.getInt(1);
            }

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (NullPointerException ne) {
            ne.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally 
        {
            try
            {
                this.breakConnection();
            }catch(Exception e){
                e.printStackTrace();
            }
        }

        return srNo;
    }

    private int getCurrentBatchId(String userid) 
    {
        int srNo = 0;
        String sqlStr = "select max(upload_batch_id) from pgimmf_cashdeployment_table_temp where uploaded_by='"+userid+"'";
        try 
        {
            rs = datacon.getData(sqlStr);
            if (rs != null && rs.next()) 
            {
                srNo = rs.getInt(1);
            }
            //connobj();
            /*prpd = conn.prepareStatement(sqlStr);
            rs = prpd.executeQuery();
            if (rs != null && rs.next()) {
                srNo = rs.getInt(1);
            }*/

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (NullPointerException ne) {
            ne.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        /*finally {
            if (this.conn != null) {
                try{
                    this.closeConnection();
                }catch(Exception e){
                    e.printStackTrace();
                }
                
            }
        }*/
        System.out.println("#### getCurrentBatchId :: srNo "+srNo);
        return srNo;
    }

    public int updateCashFlowTable(String processed_by, String status, Object processed_datetime, String sr_no) throws SQLException {

        int i = 0;
        try {
            connobj();
            java.sql.Statement statement = conn.createStatement();
            String sqlquery = "update pgimmf_cashdeployment_table SET processed_by='" + processed_by + "',status='" + status + "',processed_datetime='" + processed_datetime + "' WHERE sr_no IN(" + sr_no + ")";
            System.out.println(sqlquery);

            i = statement.executeUpdate(sqlquery);
        } catch (SQLException ex) {
            System.out.println("#### SQLException : update_pgimmf_cashdeployment_table" + ex);
        } catch (NullPointerException ex2) {
            System.out.println("#### NullPointerException :update_pgimmf_cashdeployment_table" + ex2);
        } catch (Exception ex3) {
            System.out.println("#### Exception : update_pgimmf_cashdeployment_table" + ex3);
        }
        finally 
        {
            try
            {
                this.breakConnection();
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return i;
    }

    public int rejectSchemesDetails(String processed_by, String status, Object processed_datetime, String sr_no, String rejRemarks) throws SQLException {

        int i = 0;
        try {
            connobj();
            java.sql.Statement statement = conn.createStatement();
            String sqlquery = "update pgimmf_cashdeployment_table SET processed_by='" + processed_by + "',status='" + status + "',processed_datetime='" + processed_datetime + "' , rejection_remark='" + rejRemarks + "' WHERE sr_no IN(" + sr_no + ")";
            System.out.println(sqlquery);
            i = statement.executeUpdate(sqlquery);
        } catch (SQLException ex) {
            System.out.println("#### SQLException : update_pgimmf_cashdeployment_table_reject_scheme" + ex);
        } catch (NullPointerException ex2) {
            System.out.println("#### NullPointerException :update_pgimmf_cashdeployment_table_reject_scheme" + ex2);
        } catch (Exception ex3) {
            System.out.println("#### Exception : update_pgimmf_cashdeployment_table" + ex3);
        }
        finally 
        {
            try
            {
                this.breakConnection();
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return i;
    }

    public boolean isSchemeProcessed(String sr_no) {
        boolean isProcessed = true;
        try {
            sql = "select sr_no  from pgimmf_cashdeployment_table  where sr_no IN(" + sr_no + ") and (status=''  or status='NEW')";
            rs = datacon.getData(sql);
            if (rs.next()) {
                isProcessed = false;
            }
        } catch (SQLException se) {
            System.out.println("#### SQLException isSchemeProcessed() : " + se.getMessage());
            System.out.println("#### SQLException isSchemeProcessed() : " + se.getErrorCode());
        } catch (NullPointerException ne) {
            System.out.println("#### NullPointerException isSchemeProcessed() : " + ne.getMessage());
        } catch (Exception e) {
            System.out.println("#### GeneralException isSchemeProcessed() : " + e.getMessage());
        }
        System.out.println("#### isSchemeProcessed () : " + isProcessed);
        return isProcessed;
    }

    public ResultSet getSchemesSr_no(String batchId, String userId) {
        try 
        {          
            sql = "select cd.sr_no FROM pgimmf_cashdeployment_table cd inner join pgimmf_schememaster sm on cd.scheme=sm.scheme_name  \n"
                    + "inner join pgimmf_scheme_fm_mapping fm on fm.scheme_refno=sm.srno \n"
                    + "inner join pgimmf_usermaster um on um.userid=fm.fm_userid\n"
                    + "where cd.upload_batch_id=" + batchId + " and  um.userid='" + userId + "'"+" and (cd.status=''  or cd.status='NEW')";

            this.rs = this.datacon.getData(this.sql);

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this.rs;
    }

    public String checkNull(String input) {
        if (input == null || "null".equalsIgnoreCase(input) || "undefined".equalsIgnoreCase(input)) {
            input = "";
        }
        return input.trim();
    }
}
