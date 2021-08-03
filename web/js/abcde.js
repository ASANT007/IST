/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function validateBankDetailsForNewInvestor(nfoType)
{
    document.getElementById("result").innerHTML="";
    //var alphabet = /^[a-zA-Z]*$/;
    var alphabet = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    var numeric = /^[0-9]*$/;
    var alphanumeric =/^[a-zA-Z0-9\-\s]+$/;
    var alphanumericNPN = /^(?![0-9]*$)[a-zA-Z0-9]+$/;
    var alphanumericNPA = /^(?![a-zA-Z]*$)[a-zA-Z0-9]+$/;
    var eighteenYearsAgo = moment().subtract(18, "years");
    var beforeCurrentDate = moment().subtract(1, "days");
    var gender="", nameTitle="", nationality="", maritalStatus="", politicalExposure="", pob="";
    var bankAccountType="",nomineeRequired="";
    var dob = document.frmverification.dob.value;
    var otherNationality = document.frmverification.otherNationality.value;
    var firstNameFatherSpouse = document.frmverification.firstNameFatherSpouse.value;
    var lastNameFatherSpouse = document.frmverification.lastNameFatherSpouse.value;
    var occupation = document.frmverification.occupation.value;
    var otherOccupation = document.frmverification.otherOccupation.value;
    var incomeSlab = document.frmverification.incomeSlab.value;
    var otherCountry = document.frmverification.otherCountry.value;
    var taxStatus = document.frmverification.taxStatus.value;
    var taxResidencyCountry = document.frmverification.taxResidencyCountry.value;
    var TINno = document.frmverification.TINno.value;
    var bankName = document.frmverification.bankName.value;
    //var bankBranch = document.frmverification.banksrno.value;
    var bankBranchName = document.frmverification.bankBranch.value;
    var bankAccountNumber = document.frmverification.bankAccountNumber.value;
    var reconfirmBankAccountNumber = document.frmverification.reconfirmBankAccountNumber.value;
    var micrCode = document.frmverification.micrCode.value;
    var ifscCode = document.frmverification.ifscCode.value;
    var bankCity = document.frmverification.bankCity.value;
    var firstNameNominee = document.frmverification.firstNameNominee.value;
    var lastNameNominee = document.frmverification.lastNameNominee.value;
    var dobNominee = document.frmverification.dobNominee.value;
    var firstNameGuardian = document.frmverification.firstNameGuardian.value;
    var lastNameGuardian = document.frmverification.lastNameGuardian.value;
    var panGuardian = document.frmverification.panGuardian.value;
    //var dobGuardian = document.frmverification.dobGuardian.value;
    var taxResidencyAddress = document.frmverification.taxResidencyAddress.value;
    var taxResidencycityCode = document.frmverification.taxResidencycityCode.value;
    var taxResidencyState = document.frmverification.taxResidencyState.value;

    if(document.getElementById("Mr").checked) {
        nameTitle = "Mr";
    }
    else if(document.getElementById("Miss").checked) {
        nameTitle = "Miss";
    }
    else if(document.getElementById("Mrs").checked) {
        nameTitle = "Mrs";
    }

    if(document.getElementById("Male").checked) {
        gender = "Male";
    }
    else if(document.getElementById("Female").checked) {
        gender = "Female";
    }

   if(document.getElementById("nationalityIndian").checked) {
        nationality = "Indian";
   }
   else if(document.getElementById("nationalityOther").checked) {
        nationality = "Other";
   }

   if(document.getElementById("Single").checked) {
        maritalStatus = "Single";
    }
    else if(document.getElementById("Married").checked) {
        maritalStatus = "Married";
    }

    if(document.getElementById("PE").checked) {
        politicalExposure = "PE";
    }
    else if(document.getElementById("RPE").checked) {
        politicalExposure = "RPE";
    }
    else if(document.getElementById("NA").checked) {
        politicalExposure = "NA";
    }

    if(document.getElementById("countryIndian").checked) {
        pob = "India";
    }
    else if(document.getElementById("countryOther").checked) {
        pob = "countryOther";
    }

    if(document.getElementById("SB").checked) {
        bankAccountType = "SB";
    }
    else if(document.getElementById("CA").checked) {
        bankAccountType = "CA";
    }
    else if(document.getElementById("NRE").checked) {
        bankAccountType = "NRE";
    }
    else if(document.getElementById("NRO").checked) {
        bankAccountType = "NRO";
    }
    else if(document.getElementById("FCNR").checked) {
        bankAccountType = "FCNR";
    }

    if(document.getElementById("nomineeYes").checked) {
        nomineeRequired = "yes";
    }
    else if(document.getElementById("nomineeNo").checked) {
        nomineeRequired = "no";
    }
    if(dob != "" && dob != null)
    {
        //checkDateDifferenceForBankDetailsNewInvestor(dob,'dob');
        //dob="08/07/2017";
        dob=format(dob);
        var birthday = moment(dob);
        if(beforeCurrentDate.isAfter(birthday))
        {
            document.getElementById('resultdob').value="Valid";
        }
        else
        {
            document.getElementById('resultdob').value="Invalid";
        }
    }

    if((document.getElementById("nomineeYes").checked) && (dobNominee != "" && dobNominee != null))
    {
        dobNominee=format(dobNominee);
        var birthday = moment(dobNominee);
        if(beforeCurrentDate.isAfter(birthday))
        {
            document.getElementById('resultNominee').value="Valid";
        }
        else
        {
            document.getElementById('resultNominee').value="Invalid";
        }
    }

    if(nameTitle == "" || nameTitle == null) {
        document.getElementById("result").innerHTML="Please select your Name Title.";
    }
    else if(gender == "" || gender == null) {
        document.getElementById("result").innerHTML="Please select your Gender.";
    }
    else if(nationality == "" || nationality == null) {
        document.getElementById("result").innerHTML="Please select your Nationality.";
    }
    else if( (nationality == "Other") && (otherNationality == "" || otherNationality == null) )
    {
        document.getElementById("result").innerHTML="Please enter your Nationality.";
        document.frmverification.otherNationality.focus();
    }
    else if(!alphabet.test(nationality))
    {
        document.getElementById("result").innerHTML="Please enter valid Nationality.";
        document.frmverification.otherNationality.focus();
    }
    else if(firstNameFatherSpouse == "" || firstNameFatherSpouse == null) {
        document.getElementById("result").innerHTML="Please enter Father's / Spouse's first name.";
        document.frmverification.firstNameFatherSpouse.focus();
    }
    else if(!alphabet.test(firstNameFatherSpouse))
    {
        document.getElementById("result").innerHTML="Please enter valid Father's / Spouse's first name.";
        document.frmverification.firstNameFatherSpouse.focus();
    }
    else if(lastNameFatherSpouse == "" || lastNameFatherSpouse == null) {
        document.getElementById("result").innerHTML="Please enter Father's / Spouse's last name.";
        document.frmverification.lastNameFatherSpouse.focus();
    }
    else if(!alphabet.test(lastNameFatherSpouse))
    {
        document.getElementById("result").innerHTML="Please enter valid Father's / Spouse's last name.";
        document.frmverification.lastNameFatherSpouse.focus();
    }
    else if(occupation == "0") {
        document.getElementById("result").innerHTML="Please select your Occupation.";
        document.frmverification.occupation.focus();
    }
    else if( ((occupation == "occupationOther")) && (otherOccupation == "" || otherOccupation == null) ) {
        document.getElementById("result").innerHTML="Please enter your Occupation.";
        document.frmverification.otherOccupation.focus();
    }
    else if(maritalStatus == "" || maritalStatus == null) {
        document.getElementById("result").innerHTML="Please select your Marital Status.";
    }
    else if(incomeSlab == "0") {
        document.getElementById("result").innerHTML="Please select your Income Slab.";
        document.frmverification.incomeSlab.focus();
    }
    else if(politicalExposure == "" || politicalExposure == null) {
        document.getElementById("result").innerHTML="Please select one option from Political Exposure.";
    }
    else if( pob == "" || pob == null ) {
        document.getElementById("result").innerHTML="Please select your Place of Birth.";
        document.frmverification.otherCountry.focus();
    }
    else if( (pob == "countryOther") && (otherCountry == "" || otherCountry == null) )
    {
        document.getElementById("result").innerHTML="Please enter your Place of Birth.";
        document.frmverification.otherCountry.focus();
    }
    else if(!alphabet.test(pob))
    {
        document.getElementById("result").innerHTML="Please enter valid Place of Birth.";
        document.frmverification.otherCountry.focus();
    }
    else if(taxStatus == "0") {
        document.getElementById("result").innerHTML="Please select your Tax Status.";
        document.frmverification.taxStatus.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencyAddress == "" || taxResidencyAddress == null))
    {
        document.getElementById("result").innerHTML="Please enter Address of Tax Residency.";
        document.frmverification.taxResidencyAddress.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencyAddress.length >= 40 ))
    {
        document.getElementById("result").innerHTML="Address Should be less than 40 Characters.";
        document.frmverification.taxResidencyAddress.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencycityCode == "" || taxResidencycityCode == null))
    {
        document.getElementById("result").innerHTML="Please enter City Code of Tax Residency.";
        document.frmverification.taxResidencycityCode.focus();
    }
     else if(((taxStatus == "Non Residential Indian Individual")) && (!numeric.test(taxResidencycityCode)))
    {
        document.getElementById("result").innerHTML="Invalid City Code of Tax Residency.";
        document.frmverification.taxResidencycityCode.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencyState == "" || taxResidencyState == null))
    {
        document.getElementById("result").innerHTML="Please enter City of Tax Residency.";
        document.frmverification.taxResidencyState.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (!alphabet.test(taxResidencyState)))
    {
        document.getElementById("result").innerHTML="Invalid State of Tax Residency.";
        document.frmverification.taxResidencyState.focus();
    }
    else if( ((taxStatus == "Non Residential Indian Individual")) && (taxResidencyCountry == "" || taxResidencyCountry == null) ) {
        document.getElementById("result").innerHTML="Please enter Country of Tax Residency.";
        document.frmverification.taxResidencyCountry.focus();
    }
    else if( ((taxStatus == "Non Residential Indian Individual"))
        && (!(taxResidencyCountry == "") || !(taxResidencyCountry == null))
        && (!alphabet.test(taxResidencyCountry)) ) {
        document.getElementById("result").innerHTML="Please enter valid Country of Tax Residency.";
        document.frmverification.taxResidencyCountry.focus();
    }
    else if( ((taxStatus == "Non Residential Indian Individual")) && (TINno == "" || TINno == null) ) {
        document.getElementById("result").innerHTML="Please enter Tax Identification Number (TIN or equivalent).";
        document.frmverification.TINno.focus();
    }
    else if( ((taxStatus == "Non Residential Indian Individual"))
        && ((!TINno == "") || (!TINno == null)) && (!alphanumeric.test(TINno)) ) {
        document.getElementById("result").innerHTML="Please enter valid Tax Identification Number (TIN or equivalent).";
        document.frmverification.TINno.focus();
    }
    else if(bankName == "" || bankName == null || bankName == "0" )
    {
        document.getElementById("result").innerHTML="Please select Bank Name.";
        document.frmverification.bankName.focus();
    }
    else if(bankAccountNumber == "" || bankAccountNumber == null)
    {
        document.getElementById("result").innerHTML="Please enter Bank Account No.";
        document.frmverification.bankAccountNumber.focus();
    }
    else if(!numeric.test(bankAccountNumber))
    {
        document.getElementById("result").innerHTML="Please enter valid Bank Account No.";
        document.frmverification.bankAccountNumber.focus();
    }
    else if((bankAccountNumber.length < 3))
    {
        document.getElementById("result").innerHTML="Please enter valid Bank Account No.";
        document.frmverification.bankAccountNumber.focus();
    }
    else if(reconfirmBankAccountNumber == "" || reconfirmBankAccountNumber == null)
    {
        document.getElementById("result").innerHTML="Please re-enter Account No. to reconfirm.";
        document.frmverification.reconfirmBankAccountNumber.focus();
    }
    else if( (!reconfirmBankAccountNumber == "" || !reconfirmBankAccountNumber == null)
            && (!(reconfirmBankAccountNumber.match(bankAccountNumber))) )
        {
        document.getElementById("result").innerHTML="Re-entered Account No. does not match.";
        document.frmverification.reconfirmBankAccountNumber.focus();
    }
    else if(bankAccountType == "" || bankAccountType == null)
    {
        document.getElementById("result").innerHTML="Please select Bank Account Type.";
    }
    else if(bankBranchName == "" || bankBranchName == null || bankBranchName == "0")
    {
        document.getElementById("result").innerHTML="Please select Bank Branch.";
        document.frmverification.bankBranch.focus();
    }
    else if(ifscCode == "" || ifscCode == null) {

        document.getElementById("result").innerHTML="Please enter IFSC Code.";
        document.frmverification.ifscCode.focus();
    }
    else if(!alphanumericNPA.test(ifscCode)) {

        document.getElementById("result").innerHTML="Please enter valid IFSC Code.";
        document.frmverification.ifscCode.focus();
    }
    else if(micrCode == "" || micrCode == null) {

        document.getElementById("result").innerHTML="Please enter MICR Code.";
        document.frmverification.micrCode.focus();
    }
    else if(!numeric.test(micrCode)) {

        document.getElementById("result").innerHTML="Please enter valid MICR Code.";
        document.frmverification.micrCode.focus();
    }
    else if((micrCode.length < 9) || (micrCode.length > 9)) {

        document.getElementById("result").innerHTML="Please enter 9-digit valid MICR Code.";
        document.frmverification.micrCode.focus();
    }
    else if(bankCity == "" || bankCity == null)
    {
        document.getElementById("result").innerHTML="Please enter Bank City.";
        document.frmverification.bankCity.focus();
    }
    else if(!alphabet.test(bankCity))
    {
        document.getElementById("result").innerHTML="Please enter valid Bank City.";
        document.frmverification.bankCity.focus();
    }
    else if(nomineeRequired == "" || nomineeRequired == null)
        {
          document.getElementById("result").innerHTML="Do you want Register Nominee for this folio or Not?";
        }
    else if((firstNameNominee == "" || firstNameNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee first name.";
        document.frmverification.firstNameNominee.focus();
    }
    else if((!alphabet.test(firstNameNominee)) && (nomineeRequired.match("yes")))
    {
        document.getElementById("result").innerHTML="Please enter valid Nominee first name.";
        document.frmverification.firstNameNominee.focus();
    }
    else if((lastNameNominee == "" || lastNameNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee last name.";
        document.frmverification.lastNameNominee.focus();
    }
    else if((!alphabet.test(lastNameNominee)) && (nomineeRequired.match("yes")))
    {
        document.getElementById("result").innerHTML="Please enter valid Nominee last name.";
        document.frmverification.lastNameNominee.focus();
    }
    else if((dobNominee == "" || dobNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee Date Of Birth.";
        document.frmverification.dobNominee.focus();
    }
    else if((document.getElementById('resultNominee').value == 'Invalid') && (nomineeRequired.match("yes")))  {
        document.getElementById("result").innerHTML="Invalid Nominee DOB.";
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (firstNameGuardian == "" || firstNameGuardian == null) ) {
        document.getElementById("result").innerHTML="Please enter Guardian first name.";
        document.frmverification.firstNameGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(firstNameGuardian)))
    {
        document.getElementById("result").innerHTML="Please enter valid Guardian first name.";
        document.frmverification.firstNameGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (lastNameGuardian == "" || lastNameGuardian == null))
    {
        document.getElementById("result").innerHTML="Please enter Guardian last name.";
        document.frmverification.lastNameGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(lastNameGuardian)))
    {
        document.getElementById("result").innerHTML="Please enter valid Guardian last name.";
        document.frmverification.lastNameGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (panGuardian == "" || panGuardian == null))
    {
        document.getElementById("result").innerHTML="Please enter PAN no. of Guardian.";
        document.frmverification.panGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (!alphanumericNPA.test(panGuardian)))
    {
        document.getElementById("result").innerHTML="Please enter valid PAN no. of Guardian.";
        document.frmverification.panGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes") && (panGuardian.length < 10))
    {
        document.getElementById("result").innerHTML="Please enter valid PAN no. of Guardian.";
        document.frmverification.panGuardian.focus();
    }
    else if((document.getElementById('resultGuardian').value == 'Invalid') ) {
        document.getElementById("result").innerHTML="Invalid Guardian DOB.";
    }
    else
    {
        //window.frmverification.submit();

        var f = document.createElement('form');
        if(nfoType.match("No"))
        {
            f.action='NewInvestorBankDetailsConfirmation.jsp';
        }
        else
        {
            f.action='NewInvestorBankDetailsConfirmationNFO.jsp';
        }
        f.method='POST';

        var frm1=document.createElement('input');
        frm1.type='hidden';frm1.name='nameTitle';frm1.value=nameTitle.trim();
        f.appendChild(frm1);

        var frm4=document.createElement('input');
        frm4.type='hidden';frm4.name='gender';frm4.value=gender.trim();
        f.appendChild(frm4);

        var frm6=document.createElement('input');
        frm6.type='hidden';frm6.name='nationality';frm6.value=nationality.trim();
        f.appendChild(frm6);

        var frm7=document.createElement('input');
        frm7.type='hidden';frm7.name='firstNameFatherSpouse';frm7.value=firstNameFatherSpouse.trim();
        f.appendChild(frm7);

        var frm8=document.createElement('input');
        frm8.type='hidden';frm8.name='lastNameFatherSpouse';frm8.value=lastNameFatherSpouse.trim();
        f.appendChild(frm8);

        var frm9=document.createElement('input');
        frm9.type='hidden';frm9.name='occupation';frm9.value=occupation.trim();
        f.appendChild(frm9);

        var frm10=document.createElement('input');
        frm10.type='hidden';frm10.name='otherOccupation';frm10.value=otherOccupation.trim();
        f.appendChild(frm10);

        var frm11=document.createElement('input');
        frm11.type='hidden';frm11.name='maritalStatus';frm11.value=maritalStatus.trim();
        f.appendChild(frm11);

        var frm12=document.createElement('input');
        frm12.type='hidden';frm12.name='incomeSlab';frm12.value=incomeSlab.trim();
        f.appendChild(frm12);

        var frm13=document.createElement('input');
        frm13.type='hidden';frm13.name='politicalExposure';frm13.value=politicalExposure.trim();
        f.appendChild(frm13);

        var frm14=document.createElement('input');
        frm14.type='hidden';frm14.name='pob';frm14.value=pob.trim();
        f.appendChild(frm14);

        var frm15=document.createElement('input');
        frm15.type='hidden';frm15.name='otherCountry';frm15.value=otherCountry.trim();
        f.appendChild(frm15);

        var frm16=document.createElement('input');
        frm16.type='hidden';frm16.name='TINno';frm16.value=TINno.trim();
        f.appendChild(frm16);

        var frm17=document.createElement('input');
        frm17.type='hidden';frm17.name='ifscCode';frm17.value=ifscCode.trim();
        f.appendChild(frm17);

        var frm18=document.createElement('input');
        frm18.type='hidden';frm18.name='micrCode';frm18.value=micrCode.trim();
        f.appendChild(frm18);

        /*var frm19=document.createElement('input');
        frm19.type='hidden';frm19.name='bankBranch';frm19.value=bankBranch.trim();
        f.appendChild(frm19);*/

        var frm20=document.createElement('input');
        frm20.type='hidden';frm20.name='bankName';frm20.value=bankName.trim();
        f.appendChild(frm20);

        var frm21=document.createElement('input');
        frm21.type='hidden';frm21.name='bankAccountNumber';frm21.value=bankAccountNumber.trim();
        f.appendChild(frm21);

        var frm22=document.createElement('input');
        frm22.type='hidden';frm22.name='bankAccountType';frm22.value=bankAccountType.trim();
        f.appendChild(frm22);

        var frm23=document.createElement('input');
        frm23.type='hidden';frm23.name='taxStatus';frm23.value=taxStatus.trim();
        f.appendChild(frm23);

        var frm26=document.createElement('input');
        frm26.type='hidden';frm26.name='taxResidencyCountry';frm26.value=taxResidencyCountry.trim();
        f.appendChild(frm26);

        var frm27=document.createElement('input');
        frm27.type='hidden';frm27.name='otherNationality';frm27.value=otherNationality.trim();
        f.appendChild(frm27);

        if(nomineeRequired.match("yes"))
            {
        var frm28=document.createElement('input');
        frm28.type='hidden';frm28.name='nameNominee';frm28.value=firstNameNominee.trim()+" "+lastNameNominee.trim();
        f.appendChild(frm28);

        var frm29=document.createElement('input');
        frm29.type='hidden';frm29.name='dobNominee';frm29.value=dobNominee.trim();
        f.appendChild(frm29);
            }

        var frm30=document.createElement('input');
        frm30.type='hidden';frm30.name='nameGuardian';frm30.value=firstNameGuardian.trim()+" "+lastNameGuardian.trim();
        f.appendChild(frm30);


        var frm32=document.createElement('input');
        frm32.type='hidden';frm32.name='minorChkBox';frm32.value=document.getElementById("chkMinor").value;
        f.appendChild(frm32);


        var frm33=document.createElement('input');
        frm33.type='hidden';frm33.name='bankCity';frm33.value=bankCity.trim();
        f.appendChild(frm33);

        var frm34=document.createElement('input');
        frm34.type='hidden';frm34.name='nomineeRegister';frm34.value=nomineeRequired.trim();
        f.appendChild(frm34);

        var frm35=document.createElement('input');
        frm35.type='hidden';frm35.name='taxResidencyAddress';frm35.value=taxResidencyAddress.trim();
        f.appendChild(frm35);

         var frm36=document.createElement('input');
        frm36.type='hidden';frm36.name='taxResidencycityCode';frm36.value=taxResidencycityCode.trim();
        f.appendChild(frm36);

         var frm37=document.createElement('input');
        frm37.type='hidden';frm37.name='taxResidencyState';frm37.value=taxResidencyState.trim();
        f.appendChild(frm37);

        var frm38=document.createElement('input');
        frm38.type='hidden';frm38.name='panGuardian';frm38.value=panGuardian.trim();
        f.appendChild(frm38);

        var frm39=document.createElement('input');
        frm39.type='hidden';frm39.name='bankBranchName';frm39.value=bankBranchName.trim();
        f.appendChild(frm39);

        document.body.appendChild(f);
        f.submit();
    }
}