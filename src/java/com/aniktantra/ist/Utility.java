/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aniktantra.ist;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;

/**
 *
 * @author Madhur
 */
public class Utility {
    
    public static boolean cat_dog(String str){
        int countCat=0;
        int countDog=0;
        for(int i=0;i<str.length();i++){
           if(str.charAt(i) == 'c' && str.charAt(i+1) == 'a' && str.charAt(i+2) == 't')
           {
               countCat++;
           }
           if(str.charAt(i) == 'd' && str.charAt(i+1) == 'o' && str.charAt(i+2) == 'g')
           {
               countDog++;
           }
        }
        if(countCat == countDog){
        return true;
        }else{
        return false;
        }
    }
    
    public static String stringClean(String str){
        String res="";
        for(int i=0;i<str.length();i++){
           if(res.indexOf(str.charAt(i)) < 0){
           res+=str.charAt(i);
           }
        }
        return res;
    }
    
    public static String getThreeDigitsNumWithCurrentDate(String maxnum){
        if(maxnum == ""){
          maxnum="000";
        }
        final Object recommendedDate = new Timestamp(new Date().getTime());
        String date=""+recommendedDate;
        String nextnum=date.substring(0,4)+date.substring(5,7)+date.substring(8,10)+String.format("%03d", (Integer.parseInt(maxnum)+1));
        System.out.println("#### getThreeDigitsNumWithCurrentDate "+nextnum);
        return nextnum;
    }
    
    public static void main(String[] args) {
        
        System.out.println("#### main : "+getThreeDigitsNumWithCurrentDate(""));
    }
}
