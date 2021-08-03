/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


 //document.getElementById("result").innerHTML="";
   // var regex = /^[a-zA-Z]*$/;
//    var mob = /^[1-9]{1}[0-9]{9}$/;
//    var numeric = /^[0-9]*$/;
//    var alphanumeric = /^[a-zA-Z0-9\-\s]+$/;
//    var units = /^-{0,1}\d*\.{0,1}\d+$/;
//    var schemeCode = "";
//    var minAggregation="",agrAmt="";
//    minAggregation=parseInt(document.getElementById("recAmount").value)*6;

//    if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
//        && (document.getElementById("fundType").value != "Select")
//       && (document.getElementById("schemeCode").value != "Select"))
//    {
//        schemeCode = document.getElementById("schemeCode").value;
//    }

//   else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
//        && (document.getElementById("fundType").value=="Select"))
//    {
//        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Fund Type </span>";
//        document.getElementById("fundType").focus();
//    }
//    else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
//        && (document.getElementById("schemeCode").value=="Select"))
//    {
//        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Scheme </span>";
//        document.getElementById("schemeCode").focus();
//      //alert(document.getElementById("recAmount").value) ;
//
//}
//    else if(document.getElementById("recAmount").value=="")
//    {
//        alert("amount");
//        document.getElementById("result").innerHTML=
//        "<span style='color: red;'>Please Enter Amount</span> ";
//        document.getElementById("recAmount").focus();
//    }
//    else if(units.test(document.getElementById("recAmount").value)==false)
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Amount should be Numeric Only</span>";
//        document.getElementById("recAmount").focus();
//    }
//    else if(parseInt(document.getElementById("recAmount").value)<=0)
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'><span style='color: red;'>Please Enter Valid Amount</span>";
//        document.getElementById("recAmount").focus();
//    }
//       else if( (switchOrRedemption.match("Switch"))
//          && (parseFloat(document.getElementById("recAmount").value)<parseFloat(document.getElementById("so_minimum_amount").value)))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Min Amount should be "
//            +document.getElementById("so_minimum_amount").value+"</span> ";
//        document.getElementById("recAmount").focus();
//    }
    else if( (switchOrRedemption.match("Redeem"))
          && (parseFloat(document.getElementById("recAmount").value)<parseFloat(document.getElementById("redemption_minimum_amount").value)))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Min Amount should be "
            +document.getElementById("redemption_minimum_amount").value+"</span> ";
        document.getElementById("recAmount").focus();
    }
//     else if(document.getElementById("sipFeq").value=="0")
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select SIP Frequency</span>";
//    }
//    else if(document.getElementById("dateRadio").value=="0")
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select SIP Date </span>";
//    }
//    else if(document.getElementById("month").value == "Select")
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select Start Date </span>";
//    }
//    else if(document.getElementById("year").value == "Select")
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select Start Date </span>";
////    }
//   else if(document.getElementById("sipperiod1").checked)
//    {
//        alert(document.getElementById("sipperiod1").checked)
//        //alert("sipAggregation : "+parseInt(document.getElementById("sipAggregation").value));
//        if(document.getElementById("sipFeq").value.match('Daily'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                    (parseInt(document.getElementById("sipAggregation").value)+1));
//            //alert("Daily agrAmt : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Weekly'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                ((parseInt(document.getElementById("sipAggregation").value))+1));
//            //alert("Weekly agrAmt : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Fortnightly'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                ((parseInt(document.getElementById("sipAggregation").value))+1));
//            //alert("Fortnightly agrAmt : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Monthly'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                    (parseInt(document.getElementById("sipAggregation").value)+1));
//            //alert("Monthly agrAmt : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Quarterly'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                ((parseInt(document.getElementById("sipAggregation").value)/3)+1));
//            //alert("Quarterly agrAmt /3 : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Half Yearly'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                ((parseInt(document.getElementById("sipAggregation").value)/6)+1));
//            //alert("Half Yearly agrAmt /6 : "+agrAmt);
//        }
//        else if(document.getElementById("sipFeq").value.match('Annually'))
//        {
//            agrAmt=(parseInt(document.getElementById("recAmount").value)*
//                ((parseInt(document.getElementById("sipAggregation").value)/12)+1));
//            //alert("Annually agrAmt /12 : "+agrAmt);
//        }
//   }
////    else if(document.getElementById("sipperiod2").checked)
//    {
//        alert(document.getElementById("sipperiod2").checked)
//        agrAmt=(parseInt(document.getElementById("recAmount").value)*
//            (parseInt(document.getElementById("txtsipperiod").value)+1));
//    }


//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Daily'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 01 Day </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Weekly'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 07 Days </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Fortnightly'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 14 Days </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Monthly'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Quarterly'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Half Yearly'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
//    }
//    else if(document.getElementById("sipdateValidation").value == "Invalid"
//            && document.getElementById("sipFeq").value.match('Annually'))
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>SIP Date should be greater than 360 Days </span>";
//    }
//    else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select SIP Period </span>";
//    }
//    else if(document.getElementById("sipperiod1").checked
//            && document.getElementById("sipperiodmonth").value=="Select")
//    {
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Please Select Duration of STP </span>";
//    }
//    else if(document.getElementById("sipperiod1").checked
//            && document.getElementById("sipperiodyear").value=="Select")
//    {
//         document.getElementById("result").innerHTML=
//             "<span style='color: red;'>Please Select Duration of STP </span>";
//    }
    else if((document.getElementById("sipperiod1").checked)
            && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>STP Date and STP Period Month and Year should not be same </span>";
    }
    else if((document.getElementById("sipperiod1").checked)
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
&& (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>STP Date Should not be greater than STP Period </span>";
    }
    else if((document.getElementById("sipperiod1").checked)
            &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
&& (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>STP Date Should not be greater than STP Period </span>";
    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Daily')
//            && (parseInt(document.getElementById("sipAggregation").value) <5 ))
//    {
//        //alert("Daily <5 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Weekly')
//            && (parseInt(document.getElementById("sipAggregation").value) <15 ))
//    {
//        //alert("Weekly <15 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Fortnightly')
//        && (parseInt(document.getElementById("sipAggregation").value) <30 ))
//    {
//        //alert("Fortnightly <30 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Monthly')
//            && (parseInt(document.getElementById("sipAggregation").value) <5 ))
//    {
//        //alert("Monthly <5 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Quarterly')
//            && (parseInt(document.getElementById("sipAggregation").value) <15 ))
//    {
//        //alert("Quarterly <15 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Half Yearly')
//        && (parseInt(document.getElementById("sipAggregation").value) <30 ))
//    {
//        //alert("Half Yearly <30 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Annually')
//        && (parseInt(document.getElementById("sipAggregation").value) <60 ))
//    {
//        //alert("Annually <60 : "+(parseInt(document.getElementById("sipAggregation").value)));
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
//    }
//    else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
//    {
//         document.getElementById("result").innerHTML=
//             "<span style='color: red;'>Please Select Number of Installments </span>";
//    }
//    else if(document.getElementById("sipperiod2").checked
//            && (!numeric.test(document.getElementById("txtsipperiod").value.trim())))
//    {
//         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
//         document.getElementById("result").innerHTML=
//             "<span style='color: red;'>Number of Installments Should be Number Only </span>";
//    }
//    else if(document.getElementById("sipperiod2").checked
//            && parseInt(document.getElementById("txtsipperiod").value)<5)
//    { alert("installements");
//         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
//         document.getElementById("result").innerHTML=
//             "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
//    }
//    else if(parseInt(agrAmt)<parseInt(minAggregation))
//    {
//
//        document.getElementById("result").innerHTML=
//            "<span style='color: red;'>Aggregate amount is insufficient </span>";
//    }

//    else
//    {
//        alert("Done")
//        if(switchOrRedemption.match("Switch"))
//        {
//            document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
//        }
//        
//        insertStpSwpDetails(switchOrRedemption,nfoType);
//    }

  /*else
    {
        var str="";
        if((nfoType.match("No")) && (switchOrRedemption.match("Switch")))
        {
            document.addForm.fullSchemeName.value =
                document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
            str="schemeCode="+document.addForm.schemeCode.selectedIndex;
        }

        if((nfoType.match("No")) & (switchOrRedemption.match("Redeem")))
        {
            str="schemeCode="+document.addForm.existingSchemeCode.value;
        }

            str=str+"&transactionType=PartialAmount&partialAmount="
                    +document.getElementById("recAmount").value;
            var str1=str;
            alert("stpSwpValidation (:---------:) "+str1);
            validateMinValueForStpSwpSR(str1,switchOrRedemption,nfoType);
    }*/
    /*else
      {
         if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
         {
              document.addForm.fullSchemeName.value =
                  document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
         }
      }*/