package com.aniktantra.ist;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Suraj Jadhav
 */
public class CashDeployementPOJO {
    
    private String  sr_no,FM_name,FM_email,FM_Id,scheme, deal_no, instrument_name, trans_type, maturity, trade_date,
                             total_deal_value, counterparty, ytm, mandatory_remarks, asset_class;


    public CashDeployementPOJO() {
    }

    public CashDeployementPOJO(String sr_no,String FM_name, String FM_email, String FM_Id, String scheme, String deal_no, String instrument_name, String trans_type, String maturity, String trade_date, String total_deal_value, String counterparty, String ytm, String mandatory_remarks, String asset_class) {
        this.sr_no=sr_no;
        this.FM_name = FM_name;
        this.FM_email = FM_email;
        this.FM_Id = FM_Id;
        this.scheme = scheme;
        this.deal_no = deal_no;
        this.instrument_name = instrument_name;
        this.trans_type = trans_type;
        this.maturity = maturity;
        this.trade_date = trade_date;
        this.total_deal_value = total_deal_value;
        this.counterparty = counterparty;
        this.ytm = ytm;
        this.mandatory_remarks = mandatory_remarks;
        this.asset_class = asset_class;
    }

    public String getSr_no() {
        return sr_no;
    }

    public void setSr_no(String sr_no) {
        this.sr_no = sr_no;
    }

    
    public String getFM_name() {
        return FM_name;
    }

    public void setFM_name(String FM_name) {
        this.FM_name = FM_name;
    }

    public String getFM_email() {
        return FM_email;
    }

    public void setFM_email(String FM_email) {
        this.FM_email = FM_email;
    }

    public String getFM_Id() {
        return FM_Id;
    }

    public void setFM_Id(String FM_Id) {
        this.FM_Id = FM_Id;
    }

    
    
    public String getScheme() {
        return scheme;
    }

    public void setScheme(String scheme) {
        this.scheme = scheme;
    }

    public String getDeal_no() {
        return deal_no;
    }

    public void setDeal_no(String deal_no) {
        this.deal_no = deal_no;
    }

    public String getInstrument_name() {
        return instrument_name;
    }

    public void setInstrument_name(String instrument_name) {
        this.instrument_name = instrument_name;
    }

    public String getTrans_type() {
        return trans_type;
    }

    public void setTrans_type(String trans_type) {
        this.trans_type = trans_type;
    }

    public String getMaturity() {
        return maturity;
    }

    public void setMaturity(String maturity) {
        this.maturity = maturity;
    }

    public String getTrade_date() {
        return trade_date;
    }

    public void setTrade_date(String trade_date) {
        this.trade_date = trade_date;
    }

    public String getTotal_deal_value() {
        return total_deal_value;
    }

    public void setTotal_deal_value(String total_deal_value) {
        this.total_deal_value = total_deal_value;
    }

    public String getCounterparty() {
        return counterparty;
    }

    public void setCounterparty(String counterparty) {
        this.counterparty = counterparty;
    }

    public String getYtm() {
        return ytm;
    }

    public void setYtm(String ytm) {
        this.ytm = ytm;
    }

    public String getMandatory_remarks() {
        return mandatory_remarks;
    }

    public void setMandatory_remarks(String mandatory_remarks) {
        this.mandatory_remarks = mandatory_remarks;
    }

    public String getAsset_class() {
        return asset_class;
    }

    public void setAsset_class(String asset_class) {
        this.asset_class = asset_class;
    }

    @Override
    public String toString() {
        return "CashDeployementPOJO{" + "sr_no=" + sr_no + ", FM_name=" + FM_name + ", FM_email=" + FM_email + ", FM_Id=" + FM_Id + ", scheme=" + scheme + ", deal_no=" + deal_no + ", instrument_name=" + instrument_name + ", trans_type=" + trans_type + ", maturity=" + maturity + ", trade_date=" + trade_date + ", total_deal_value=" + total_deal_value + ", counterparty=" + counterparty + ", ytm=" + ytm + ", mandatory_remarks=" + mandatory_remarks + ", asset_class=" + asset_class + '}';
    }

    

}
