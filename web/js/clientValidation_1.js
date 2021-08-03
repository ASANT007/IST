/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
function format(inputDate)
{
    var date = new Date(inputDate);
    var d = date.getDate().toString();
    (d[1]?d:"0"+d[0])

    if (!isNaN(d.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
}*/

function callAadhaarVerification()
{
    var f = document.createElement('form');
    f.action='https://uat2.camsonline.com/InvestorServices/AMCandCPAadhaar.aspx';

    var f1=document.createElement('input');
    f1.type='hidden';f1.name='USER_ID';f1.value='UAL_LNT';
    f.appendChild(f1);

    var f2=document.createElement('input');
    f2.type='hidden';f2.name='PASSWORD';f2.value='Arn$cd45';
    f.appendChild(f2);

    var f3=document.createElement('input');
    f3.type='hidden';f3.name='SESSION_ID';f3.value='';
    f.appendChild(f3);

    var f4=document.createElement('input');
    f4.type='hidden';f4.name='RETN_URL';f4.value='https://uat2.camsonline.com/InvestorServices/AMCandCPAadhaar.aspx';
    f.appendChild(f4);

    var f5=document.createElement('input');
    f5.type='hidden';f5.name='PAN_PEKRN';f5.value=document.aadhaarInfo.panNo.value.trim();
    f.appendChild(f5);

    var f6=document.createElement('input');
    f6.type='hidden';f6.name='REQUEST_TYPE';f6.value='2';
    f.appendChild(f6);

    var f7=document.createElement('input');
    f7.type='hidden';f7.name='AADHAAR_NAME';f7.value=document.aadhaarInfo.firstName.value.trim();
    f.appendChild(f7);

    var f8=document.createElement('input');
    f8.type='hidden';f8.name='DOB';f8.value=document.aadhaarInfo.showdob.value.trim();
    f.appendChild(f8);

    var f9=document.createElement('input');
    f9.type='hidden';f9.name='Gender';f9.value=document.aadhaarInfo.showGender.value.trim();
    f.appendChild(f9);

    var f10=document.createElement('input');
    f10.type='hidden';f10.name='MOBILE_NO';f10.value=document.aadhaarInfo.mobNo.value.trim();
    f.appendChild(f10);

    var f11=document.createElement('input');
    f11.type='hidden';f11.name='EMAIL_ID';f11.value=document.aadhaarInfo.emailId.value.trim();
    f.appendChild(f11);

    document.body.appendChild(f);
    f.submit();
}

/*
* A JavaScript implementation of the SHA256 hash function.
*/

/* SHA256 logical functions */
function rotateRight(n,x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x,y,z) {
	return ((x & y) ^ (~x & z));
}
function majority(x,y,z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j&0x0f] += sha256_sigma1(W[(j+14)&0x0f]) + W[(j+9)&0x0f] +
sha256_sigma0(W[(j+1)&0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
overflow) */
function safe_add(x, y)
{
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	/* Initialize registers with the previous intermediate value */
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

        /* make 32-bit words */
	for(var i=0; i<16; i++)
		W[i] = ((buffer[(i<<2)+3]) | (buffer[(i<<2)+2] << 8) | (buffer[(i<<2)+1]
<< 16) | (buffer[i<<2] << 24));

        for(var j=0; j<64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if(j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
        }

	/* Compute the current intermediate hash value */
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	/* Compute number of bytes mod 64 */
	index = ((count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

	/* Update number of bits */
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	/* Transform as many times as possible */
	for(i=0; i+63<inputLen; i+=64) {
                for(var j=index; j<64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	/* Buffer remaining input */
	for(var j=0; j<remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
        buffer[index++] = 0x80;
        if(index <= 56) {
		for(var i=index; i<56; i++)
			buffer[i] = 0;
        } else {
		for(var i=index; i<64; i++)
			buffer[i] = 0;
                sha256_transform();
                for(var i=0; i<56; i++)
			buffer[i] = 0;
	}
        buffer[56] = (count[1] >>> 24) & 0xff;
        buffer[57] = (count[1] >>> 16) & 0xff;
        buffer[58] = (count[1] >>> 8) & 0xff;
        buffer[59] = count[1] & 0xff;
        buffer[60] = (count[0] >>> 24) & 0xff;
        buffer[61] = (count[0] >>> 16) & 0xff;
        buffer[62] = (count[0] >>> 8) & 0xff;
        buffer[63] = count[0] & 0xff;
        sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
        var j=0;
        var output = new Array(32);
	for(var i=0; i<8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
	var output = new String();
	for(var i=0; i<8; i++) {
		for(var j=28; j>=0; j-=4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

/* Main function: returns a hex string representing the SHA256 value of the
given data */
function sha256_digest(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
        return sha256_encode_hex();
}

/* test if the JS-interpreter is working properly */
function sha256_self_test()
{
	return sha256_digest("message digest") ==
"f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
}


function format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        var day = date.getDate().toString();
        var month = (date.getMonth() + 1).toString();
        // Months use 0 index.

        return (month[1] ? month : '0' + month[0]) + '/' +
           (day[1] ? day : '0' + day[0]) + '/' +
           date.getFullYear();
    }
}

function footers()
{
     var str="";
     var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
            document.getElementById("footerDiv").innerHTML=xmlhttp.responseText;
        }
     }
     xmlhttp.open('POST','footer.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function validate_email(emailStr)
{
    var emailPat=/^(.+)@(.+)$/
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
    var validChars="\[^\\s" + specialChars + "\]"
    var quotedUser="(\"[^\"]*\")"
    var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
    var atom=validChars + '+'
    var word="(" + atom + "|" + quotedUser + ")"
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
    var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
    var matchArray=emailStr.match(emailPat)
    if (matchArray==null)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Email address seems incorrect (check @ and .'s)</span>";
        return false;
    }
    var user=matchArray[1]
    var domain=matchArray[2]
    if (user.match(userPat)==null)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The email id doesn't seem to be valid.</span>";
        return false;
    }
    var IPArray=domain.match(ipDomainPat)
     if (IPArray!=null)
     {
        for (var i=1;i<=4;i++)
        {
            if (IPArray[i]>255)
            {
                document.getElementById("result").innerHTML=
                    "<span style='color: red;'>Destination IP address is invalid!</span>";
                return false;
            }
        }
    }
    var domainArray=domain.match(domainPat)
    if (domainArray==null)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The domain name doesn't seem to be valid.</span>";
            return false;
     }
    var atomPat=new RegExp(atom,"g")
    var domArr=domain.match(atomPat)
    var len=domArr.length
    if (domArr[domArr.length-1].length<2 || domArr[domArr.length-1].length>4)
    {
         document.getElementById("result").innerHTML=
             "<span style='color: red;'>The address must end in a four-letter domain, or two letter country.</span>";
        return false;
    }
    if (len<2)
    {
        var errStr="<span style='color: red;'>This address is missing a hostname!</span>";
        document.getElementById("result").innerHTML=errStr;
        return false;
    }
    else
    {
        return true;
    }
}

function createRequestObject()
{
    var tmpXmlHttpObject;
    //depending on what the browser supports, use the right way to create the XMLHttpRequest object
    if (window.XMLHttpRequest) {
    // Mozilla, Safari would use this method ...
    tmpXmlHttpObject = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
    // IE would use this method ...
    tmpXmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
 return tmpXmlHttpObject;
}


function distributorLoginValidation()
{
    //var alphanumeric =/^[a-zA-Z0-9]+$/;
    document.getElementById("errordiv").innerHTML="";
    if (document.enquiry_form.ARN.value == null || document.enquiry_form.ARN.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please enter the ARN Code";
        document.enquiry_form.ARN.focus();
    }    
    else if (document.enquiry_form.password.value == null || document.enquiry_form.password.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please enter the password";
        document.enquiry_form.password.focus();
    }
    else 
    {        
        //document.enquiry_form.arnCode.value = "ARN-"+document.enquiry_form.arnCode.value;        
        var encryptedPassword =  sha256_digest(document.enquiry_form.password.value);
        //System.out.println(encrypted password is:+encryptedPassword);
        checkLogin(encryptedPassword);        
        //checkLogin();
    }
}


function checkLogin(encryptedPassword)
{    
    var str= "arnCode=" +document.enquiry_form.ARN.value + "&password=" +encryptedPassword;
    //var str= "arnCode=" +document.enquiry_form.ARN.value +"&password="+encryptedPassword;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        //document.getElementById("loginButton").innerHTML='<img alt="loading" src="images/loginloader.gif" style="width:50px;"/>';
         if (xmlhttp.readyState==4)
         {
            if(xmlhttp.responseText.match("login successful"))
            {
                //window.location.href="dashboard.jsp";
                window.location.href="weeklyBusinessSummary.jsp";
                //window.location.href="recommendNFOForExistingInvestors.jsp";
            }
            else if(xmlhttp.responseText.match("notExistsInTable"))
            {
                document.getElementById("errordiv").innerHTML="Your are not registered with our partner online service.<a href='login.html#register' style='color: #009fe3'>click here</a> to register.";
            }
            else
            {
                //document.getElementById("loginButton").innerHTML="";
                document.getElementById("errordiv").innerHTML=xmlhttp.responseText.trim();
            }
         }
    }
    xmlhttp.open('POST','checkDistributorLogin.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function verifyPANForm(nfoType,smartSIP)
{   
    var panNo = document.newInvestorForm.panNo.value;
    var panSubString = panNo.charAt(3);
    //var alphanumeric =/^[a-zA-Z0-9]+$/;
    if (document.newInvestorForm.panNo.value == null || document.newInvestorForm.panNo.value == "")
    {
        document.getElementById("errordiv").innerHTML="<span style='color: red;'>Please enter PAN number</span>";
        document.newInvestorForm.panNo.focus();
    }/*
    else if ( !( panSubString.match("P") || panSubString.match("p") ) )
    {
        //document.getElementById("errordiv").innerHTML=
            //"<span style='color: red;'>Sorry. Your PAN is not Individual.</span>";
        document.getElementById("errordiv").innerHTML =
            "<span style='color: red;'>Sorry, you will not be able to recommend now. "
            +"To send your recommendation, KYC is mandatory.</span>";
        document.newInvestorForm.panNo.focus();
    }*/
    else if (document.newInvestorForm.dob.value == "" || document.newInvestorForm.dob.value == null)
    {
        document.getElementById("errordiv").innerHTML="<span style='color: red;'>Please enter DOB</span>";
        document.newInvestorForm.dob.focus();
    }
    else
    {
        checkDateDifference(nfoType,smartSIP);
    }
}

function checkDateDifference (nfoType,smartSIP)
{
    var str= "dob=" +document.newInvestorForm.dob.value.trim();
    var xmlhttp = createRequestObject();
    var dateValid = "";

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="login.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }
         else
         {
            dateValid = xmlhttp.responseText;
            if (dateValid.match(("InvalidDate")))
            {
                document.getElementById("errordiv").innerHTML = "<span style='color: red;'>Invalid DOB.</span>";
            }
            else
            {
                document.getElementById("errordiv").innerHTML = "";
                verifyPANno(nfoType,smartSIP);
                //getExistingPANValidation();
            }
        }
      }
    }
    xmlhttp.open('POST','checkDateDifference.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function verifyPANno(nfoType,smartSIP)
{
    var str= "panNo=" +document.newInvestorForm.panNo.value.trim()
                + "&dob=" +document.newInvestorForm.dob.value.trim()+"&investorType=new";
    var xmlhttp = createRequestObject();
    
    xmlhttp.onreadystatechange=function()
    {
         document.getElementById("verifyPANnoButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
         if (xmlhttp.readyState==4)
         {
             if (xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if (!xmlhttp.responseText.match("verified"))
             {
                 document.getElementById("verifyPANnoButton").innerHTML="";
                var pan_name=xmlhttp.responseText.trim();
                var pan_name_sub=pan_name.substring(8,pan_name.length);
                str = str +"&panName="+pan_name_sub;
                alert(pan_name_sub);
                //window.location.href="investorRecommendation.jsp?"+str;

                var f = document.createElement('form');
                if(nfoType.match('NonNfo') && smartSIP.match('notSmartSIP'))
                {f.action='investorRecommendation.jsp';}
                else if(nfoType.match('Nfo') && smartSIP.match('notSmartSIP'))
                {f.action='investorRecommendationNFO.jsp';}
                else if(nfoType.match('NonNfo') && smartSIP.match('smartSIP'))
                {f.action='sipComboRecommendation.jsp';}
                f.method='POST';

                var i=document.createElement('input');
                i.type='hidden';i.name='dob';i.value=document.newInvestorForm.dob.value.trim();
                f.appendChild(i);

                var j=document.createElement('input');
                j.type='hidden';j.name='panNo';j.value=document.newInvestorForm.panNo.value.trim();
                f.appendChild(j);
                
                var k=document.createElement('input');
                k.type='hidden';k.name='investorType';k.value='new';
                f.appendChild(k);

                var m=document.createElement('input');
                m.type='hidden';m.name='panName';m.value=pan_name_sub;
                f.appendChild(m);
                
                document.body.appendChild(f);
                f.submit();
             }
             else
             {              
                 //document.getElementById('errordiv').innerHTML=xmlhttp.responseText;
                 document.getElementById("verifyPANnoButton").innerHTML="";
                 document.getElementById('errordiv').innerHTML = ""
                    +"Sorry, you will not be able to recommend now. To send your recommendation, KYC is mandatory. Please download the "
                    +"<a href='http://lntmf.com/lntmf/assets/uploads/downloads/forms/CKYC%20&%20KRA%20KYC%20form%20-%20CL04053.pdf' target='_blank'>CKYC form</a> "
                    +"and submit to the nearest Investor service centre or CAMS service centre to avail the services. ";
                 document.newInvestorForm.panNo.value="";
                 document.newInvestorForm.dob.value="";
             }
         }
    }
    xmlhttp.open('POST','verifyPANDetails.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getExistingPANValidation()
{
    var str= "panNo=" +document.newInvestorForm.panNo.value.trim();
    var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
         //document.getElementById("verifyPANnoButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
         if (xmlhttp.readyState==4)
         {
             if (xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if (xmlhttp.responseText.match("verified"))
             {
                document.getElementById('errordiv').innerHTML = ""
                    +"Your client is an existing L&T Mutual Fund investor. "
                    +"The current service is applicable for New Clients only. "
                    +"To recommend existing investors please click here";
             }             
         }
    }
    xmlhttp.open('POST','investorValidation.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getSchemesByFundType (schemeCodeByFolioNo,nfoType,sweepStatus,maturityStatus)
{
     if(document.getElementById("fundType").value != 'Select')
     {
         var str="";
         document.getElementById("schemeNameDiv").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
         str="fundType="+document.getElementById("fundType").value
            +"&schemesForFolio="+schemeCodeByFolioNo+"&nfoType="+nfoType
            +"&sweepStatus="+sweepStatus+"&maturityStatus="+maturityStatus;
         var xmlhttp = createRequestObject();

         xmlhttp.onreadystatechange=function()
         {            
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Session expired"))
                 {
                    alert("Session expired");
                    window.location.href="login.html";
                 }
                 else
                 {
                    document.getElementById("schemeNameDiv").innerHTML=xmlhttp.responseText;
                 }
            }
         }
         xmlhttp.open('POST','getSchemesByFundType.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }
}

function getSchemesByFundTypeNFO()
{
    var nfoType="Yes", sweepStatus="sweepY",maturityStatus="maturityN";
     if(document.getElementById("fundTypeNFO").value != 'Select')
     {
         var str="";
         document.getElementById("schemeNameDivNFO").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
         str="fundTypeNFO="+document.getElementById("fundTypeNFO").value+"&nfoType="+nfoType
            +"&sweepStatus="+sweepStatus+"&maturityStatus="+maturityStatus;
         var xmlhttp = createRequestObject();

         xmlhttp.onreadystatechange=function()
         {            
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Session expired"))
                 {
                    alert("Session expired");
                    window.location.href="login.html";
                 }
                 else
                 {
                    document.getElementById("schemeNameDivNFO").innerHTML=xmlhttp.responseText;
                 }
            }
         }
         xmlhttp.open('POST','getSchemesByFundTypeNFO.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }
}

function fmpScheme()
{
    //alert("fmpScheme()");
    var schemeCode=document.getElementById("schemeCode").value;
    //alert(schemeCode);
    //if((schemeCode != 'Select') && (schemeCode == '16AGR') || (schemeCode == '16ADP'))
    if( (schemeCode != 'Select') && ( (schemeCode == '17BGR') || (schemeCode == '17BDP') ) )
    {
        document.getElementById("recommendAmtId").innerHTML="<div class='col-md-4 col-sm-4 col-xs-4' style='color:#0cb0e9; padding:10px 0 10px 25px;'></div><div class='col-md-8 col-sm-8 col-xs-8' style='padding:10px 0;'>SIP transaction not allowed for FMP scheme</div>";
        document.getElementById("sipDivShowHide").style.display="none";
    }
    else
    {
        document.getElementById("recommendAmtId").innerHTML="<div class='row'><div class='col-md-4 col-sm-4 col-xs-12' style='color:#0cb0e9; padding:10px 0 10px 40px;'>SIP Amount</div><div class='col-md-8 col-sm-8 col-xs-12' style='padding:10px 0 10px  40px;'><input type='text' name='sipAmount' id='sipAmount'></div>";
        //document.getElementById("recommendAmtId").innerHTML="";
        document.getElementById("sipDivShowHide").style.display="block";
    }
}

function showMaturity()
{
    if(document.getElementById("maturityYes").checked)
    {
        document.getElementById("maturityDiv").style.display = "block";
    }
    else
    {
        document.getElementById("maturityDiv").style.display = "none";
    }
}

function getSchemeCodeNFO(transType)
{
     var fundOptionType="";
     if(document.getElementById("dividendType_payout").checked)
     {
         fundOptionType="Dividend Payout";
     }
     else if(document.getElementById("dividendType_sweep").checked)
     {
         document.getElementById("dividendType_payout").checked = false;
         fundOptionType="Dividend Sweep";
     }

    if(fundOptionType != '')
    {
        var str="fundOptionType="+fundOptionType+"&schemeName="+encodeURIComponent(document.getElementById("schemeName").value);
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                    document.getElementById("NFOSchemeCode").value = xmlhttp.responseText.trim();
                 }

                if((!(document.getElementById("NFOSchemeCode").value == "")) && transType.match("Purchase"))
                {
                    getminAmtValidationforRecommendation('','Yes');
                }
                else if((!(document.getElementById("NFOSchemeCode").value == "")) && transType.match("Switch"))
                {
                    getMinAmtAndUnitsValidationNFO(fundOptionType);
                }
            }
         }
         xmlhttp.open('POST','getSchemeCodeNFO.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }   
}

function getSchemeCodeNFO1(callBack)
{
     var fundOptionType="";
     if(document.getElementById("dividendType_payout").checked)
     {
         fundOptionType="Dividend Payout";
     }
     else if(document.getElementById("dividendType_sweep").checked)
     {
         fundOptionType="Dividend Sweep";
     }

    if(fundOptionType != '')
    {
        var str="fundOptionType="+fundOptionType+"&schemeName="+encodeURIComponent(document.getElementById("schemeName").value);
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                    document.getElementById("NFOSchemeCode").value = xmlhttp.responseText.trim();
                 }

                if(!(document.getElementById("NFOSchemeCode").value == ""))
                {
                    getminAmtValidationforRecommendation('','Yes');
                }
                
            }
         }
         xmlhttp.open('POST','getSchemeCodeNFO.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }
    callBack();
}

/*
function getMinAmtValidationNFO()
{
     var resultArr="";
     var output="";
     var recommendedValue="";
     if(document.getElementById("dividendType_payout").checked)
     {
         recommendedValue="Dividend Payout";
     }
     if(document.getElementById("dividendType_sweep").checked)
     {
         recommendedValue="Dividend Sweep";
     }

    if(recommendedValue != '')
    {
        var str="recommendedValue="+recommendedValue+"&schemeName="+encodeURIComponent(document.getElementById("schemeName").value);
        document.getElementById("btnsendRecommendation").value ="Please Wait.....";
        document.getElementById("btnsendRecommendation").disabled =true;

        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 output=xmlhttp.responseText.trim();
                 resultArr=output.split('|');
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                    document.getElementById("minAmt").value=resultArr[0];
                    document.getElementById("NFOSchemeCode").value=resultArr[1];
                    document.getElementById("btnsendRecommendation").disabled =false;
                    document.getElementById("btnsendRecommendation").value ="Send Recommendation";
                 }
            }
         }
         xmlhttp.open('POST','getMinAmtValidationNFO.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }
}
*/

function getminAmtValidationforRecommendation(schemeCodeByFolioNo,nfoType)
{
     var transactionType="";
     var schemeCode="";
     if(document.getElementById("transactionType_lumpsum").checked)
     {
         transactionType="Lumpsum";
     }     
     else if(document.getElementById("transactionType_sip").checked)
     {
         transactionType="SIP";
     }

     if(nfoType.match("No"))
     {
         schemeCode=document.getElementById("schemeCode").value;
     }
     else
     {
        schemeCode=document.getElementById("NFOSchemeCode").value;        
     }

    if((transactionType != ''))
    {
        var str="SchemeName="+schemeCode+
                "&transType="+transactionType+"&schemesForFolio="+schemeCodeByFolioNo;
        
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                    document.getElementById("minAmt").value=xmlhttp.responseText.trim();
                 }
            }
         }
         xmlhttp.open('POST','getMinAmtValidation.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);         
    }    
}

function getSchemesByFundTypeForSwitch(existingSchemeCode)
{
    
    var investor_type='regular';
    if(document.getElementById("direct").checked){
        investor_type='direct';
    }
    if(!document.getElementById("direct").checked && !document.getElementById("regular").checked){
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select Broker.</span>";
         var selectedOptions = document.getElementById("fundType").selectedOptions;
       for(var i = 0; i < selectedOptions.length; i++)
        selectedOptions[i].selected = false;
    }
    else if(document.getElementById("fundType").value != 'Select')
     {
         var str="";
         str="fundType="+document.getElementById("fundType").value
                +"&investor_type="+investor_type;
         document.getElementById("schemeNameDiv").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
         var xmlhttp = createRequestObject();
         xmlhttp.onreadystatechange=function()
         {
            if (xmlhttp.readyState==4 )
            {
                  document.getElementById("errorMsg").innerHTML="";
                    document.getElementById("schemeNameDiv").innerHTML=xmlhttp.responseText;
                 
            }
         }
         xmlhttp.open('POST','getSchemesByFundTypeForSwitch.jsp',true);
         xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
         xmlhttp.send(str);
    }
}

function getFMPValidation()
{
    var schemeCode=document.getElementById("schemeCode").value;
    if((schemeCode != 'Select') && (schemeCode == '16BGR') || (schemeCode == '16BDP'))
    {
        document.getElementById("fmpBlockHide").style.display = 'none';
        document.getElementById("fmpBlockShow").style.display = 'block';
    }
    else
    {
        document.getElementById("fmpBlockHide").style.display = 'block';
        document.getElementById("fmpBlockShow").style.display = 'none';
    }
}

function getEBFValidation(panNo)
{
    var str="";
    var schemeCode=document.getElementById("schemeCode").value;
    //var panNo=document.getElementById("panNo").value;

    if((schemeCode != 'Select') && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD'))
    {
        str="panNo="+panNo;
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
           if (xmlhttp.readyState==4 )
           {
                document.getElementById("maxAmount").value=xmlhttp.responseText.trim();
           }
        }
        xmlhttp.open('POST','getEBFValidation.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function getEBFValidationSwitchUnits(panNo)
{
    var str="";
    var schemeCode=document.getElementById("schemeCode").value;    
    //var panNo=document.getElementById("panNo").value;

    if((schemeCode != 'Select') && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD'))
    {
        str="panNo="+panNo+"&schemeCode="+schemeCode;
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
           if (xmlhttp.readyState==4 )
           {
                document.getElementById("maximumUnits").value=xmlhttp.responseText.trim();
           }
        }
        xmlhttp.open('POST','getEBFValidationSwitchUnits.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function setSchemeOptVal(optionVal,showSchemeDiviFreqDiv)
{
    if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq1"))
    {
        document.getElementById("bscSchemeOptVal1").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq2"))
    {
        document.getElementById("bscSchemeOptVal2").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq3"))
    {
        document.getElementById("bscSchemeOptVal3").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq1"))
    {
        document.getElementById("escSchemeOptVal1").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq2"))
    {
        document.getElementById("escSchemeOptVal2").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq3"))
    {
        document.getElementById("escSchemeOptVal3").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq1"))
    {
        document.getElementById("exscSchemeOptVal1").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq2"))
    {
        document.getElementById("exscSchemeOptVal2").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq3"))
    {
        document.getElementById("exscSchemeOptVal3").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq1"))
    {
        document.getElementById("mscSchemeOptVal1").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq2"))
    {
        document.getElementById("mscSchemeOptVal2").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq3"))
    {
        document.getElementById("mscSchemeOptVal3").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq1"))
    {
        document.getElementById("diyscSchemeOptVal1").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq2"))
    {
        document.getElementById("diyscSchemeOptVal2").value = optionVal;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq3"))
    {
        document.getElementById("diyscSchemeOptVal3").value = optionVal;
    }
}

function getSchemeOptVal(showSchemeDiviFreqDiv)
{
    var optionVal="";
    if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq1"))
    {
        optionVal = encodeURIComponent(document.getElementById("bscSchemeOptVal1").value);
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq2"))
    {
        optionVal = encodeURIComponent(document.getElementById("bscSchemeOptVal2").value);
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq3"))
    {
        optionVal = encodeURIComponent(document.getElementById("bscSchemeOptVal3").value);
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq1"))
    {
        optionVal = encodeURIComponent(document.getElementById("escSchemeOptVal1").value);
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq2"))
    {
        optionVal = encodeURIComponent(document.getElementById("escSchemeOptVal2").value);
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq3"))
    {
        optionVal = encodeURIComponent(document.getElementById("escSchemeOptVal3").value);
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq1"))
    {
        optionVal = encodeURIComponent(document.getElementById("exscSchemeOptVal1").value);
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq2"))
    {
        optionVal = encodeURIComponent(document.getElementById("exscSchemeOptVal2").value);
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq3"))
    {
        optionVal = encodeURIComponent(document.getElementById("exscSchemeOptVal3").value);
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq1"))
    {
        optionVal = encodeURIComponent(document.getElementById("mscSchemeOptVal1").value);
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq2"))
    {
        optionVal = encodeURIComponent(document.getElementById("mscSchemeOptVal2").value);
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq3"))
    {
        optionVal = encodeURIComponent(document.getElementById("mscSchemeOptVal3").value);
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq1"))
    {
        optionVal = encodeURIComponent(document.getElementById("diyscSchemeOptVal1").value);
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq2"))
    {
        optionVal = encodeURIComponent(document.getElementById("diyscSchemeOptVal2").value);
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq3"))
    {
        optionVal = encodeURIComponent(document.getElementById("diyscSchemeOptVal3").value);
    }
    return optionVal;
}

function getSchemeDiviFreq(schemeName,showSchemeDiviFreqDiv,optionVal)
{
    setSchemeOptVal(optionVal,showSchemeDiviFreqDiv);
    var schemeOptionVal=getSchemeOptVal(showSchemeDiviFreqDiv);

    var str = "schemeName="+encodeURIComponent(schemeName.trim())
        +"&schemeOptionValue="+schemeOptionVal+"&showSchemeDiviFreqDiv="+showSchemeDiviFreqDiv;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
               alert("Session expired");
               window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else
            {
               //document.getElementById(showSchemeDetailsDiv).style.display = "block";
               document.getElementById(showSchemeDiviFreqDiv).innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','getSchemeDiviFreq.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function getSchemeDetails(schemeName,showSchemeOptionValDiv,showSchemeDiviFreqDiv)
{
    var str = "schemeName="+encodeURIComponent(schemeName.trim())
            + "&showSchemeDiviFreqDiv="+showSchemeDiviFreqDiv
            + "&showSchemeOptionValDiv="+showSchemeOptionValDiv;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
               alert("Session expired");
               window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else
            {
               //document.getElementById(showSchemeDetailsDiv).style.display = "block";
               document.getElementById(showSchemeOptionValDiv).innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','getSchemeOptionVal.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function smartSIPComboOptions()
{
    var schemeName1="", schemeName2="", schemeName3="";
    document.getElementById("bscShowSchemeOptionVal1").innerHTML="";
    document.getElementById("bscShowSchemeDiviFreq1").innerHTML="";
    document.getElementById("bscAmt1").value="";
    document.getElementById("bscShowSchemeOptionVal2").innerHTML="";
    document.getElementById("bscShowSchemeDiviFreq2").innerHTML="";
    document.getElementById("bscAmt2").value="";
    document.getElementById("bscShowSchemeOptionVal3").innerHTML="";
    document.getElementById("bscShowSchemeDiviFreq3").innerHTML="";
    document.getElementById("bscAmt3").value="";

    document.getElementById("escShowSchemeOptionVal1").innerHTML="";
    document.getElementById("escShowSchemeDiviFreq1").innerHTML="";
    document.getElementById("escAmt1").value="";
    document.getElementById("escShowSchemeOptionVal2").innerHTML="";
    document.getElementById("escShowSchemeDiviFreq2").innerHTML="";
    document.getElementById("escAmt2").value="";
    document.getElementById("escShowSchemeOptionVal3").innerHTML="";
    document.getElementById("escShowSchemeDiviFreq3").innerHTML="";
    document.getElementById("escAmt3").value="";

    document.getElementById("exscShowSchemeOptionVal1").innerHTML="";
    document.getElementById("exscShowSchemeDiviFreq1").innerHTML="";
    document.getElementById("exscAmt1").value="";
    document.getElementById("exscShowSchemeOptionVal2").innerHTML="";
    document.getElementById("exscShowSchemeDiviFreq2").innerHTML="";
    document.getElementById("exscAmt2").value="";
    document.getElementById("exscShowSchemeOptionVal3").innerHTML="";
    document.getElementById("exscShowSchemeDiviFreq3").innerHTML="";
    document.getElementById("exscAmt3").value="";

    document.getElementById("mscShowSchemeOptionVal1").innerHTML="";
    document.getElementById("mscShowSchemeDiviFreq1").innerHTML="";
    document.getElementById("mscAmt1").value="";
    document.getElementById("mscShowSchemeOptionVal2").innerHTML="";
    document.getElementById("mscShowSchemeDiviFreq2").innerHTML="";
    document.getElementById("mscAmt2").value="";
    document.getElementById("mscShowSchemeOptionVal3").innerHTML="";
    document.getElementById("mscShowSchemeDiviFreq3").innerHTML="";
    document.getElementById("mscAmt3").value="";

    document.getElementById("diyscShowSchemeOptionVal1").innerHTML="";
    document.getElementById("diyscShowSchemeDiviFreq1").innerHTML="";
    document.getElementById("diyscAmt1").value="";
    document.getElementById("diyscShowSchemeOptionVal2").innerHTML="";
    document.getElementById("diyscShowSchemeDiviFreq2").innerHTML="";
    document.getElementById("diyscAmt2").value="";
    document.getElementById("diyscShowSchemeOptionVal3").innerHTML="";
    document.getElementById("diyscShowSchemeDiviFreq3").innerHTML="";
    document.getElementById("diyscAmt3").value="";

    if(document.getElementById("bsc").checked)
    {
        document.getElementById("bscAmt1").value="1000";
        document.getElementById("bscAmt2").value="1000";
        document.getElementById("bscAmt3").value="1000";
        schemeName1 = document.getElementById("bscSchemeName1").value;
        getSchemeDetails(schemeName1,'bscShowSchemeOptionVal1','bscShowSchemeDiviFreq1');
        schemeName2 = document.getElementById("bscSchemeName2").value;
        getSchemeDetails(schemeName2,'bscShowSchemeOptionVal2','bscShowSchemeDiviFreq2');
        schemeName3 = document.getElementById("bscSchemeName3").value;
        getSchemeDetails(schemeName3,'bscShowSchemeOptionVal3','bscShowSchemeDiviFreq3');
    }
    else if(document.getElementById("esc").checked)
    {
        document.getElementById("escAmt1").value="1000";
        document.getElementById("escAmt2").value="1000";
        document.getElementById("escAmt3").value="1000";
        schemeName1 = document.getElementById("escSchemeName1").value;
        getSchemeDetails(schemeName1,'escShowSchemeOptionVal1','escShowSchemeDiviFreq1');
        schemeName2 = document.getElementById("escSchemeName2").value;
        getSchemeDetails(schemeName2,'escShowSchemeOptionVal2','escShowSchemeDiviFreq2');
        schemeName3 = document.getElementById("escSchemeName3").value;
        getSchemeDetails(schemeName3,'escShowSchemeOptionVal3','escShowSchemeDiviFreq3');
    }
    else if(document.getElementById("exsc").checked)
    {
        document.getElementById("exscAmt1").value="1000";
        document.getElementById("exscAmt2").value="1000";
        document.getElementById("exscAmt3").value="1000";
        schemeName1 = document.getElementById("exscSchemeName1").value;
        getSchemeDetails(schemeName1,'exscShowSchemeOptionVal1','exscShowSchemeDiviFreq1');
        schemeName2 = document.getElementById("exscSchemeName2").value;
        getSchemeDetails(schemeName2,'exscShowSchemeOptionVal2','exscShowSchemeDiviFreq2');
        schemeName3 = document.getElementById("exscSchemeName3").value;
        getSchemeDetails(schemeName3,'exscShowSchemeOptionVal3','exscShowSchemeDiviFreq3');
    }
    else if(document.getElementById("msc").checked)
    {
        document.getElementById("mscAmt1").value="1000";
        document.getElementById("mscAmt2").value="1000";
        document.getElementById("mscAmt3").value="1000";
        schemeName1 = document.getElementById("mscSchemeName1").value;
        getSchemeDetails(schemeName1,'mscShowSchemeOptionVal1','mscShowSchemeDiviFreq1');
        schemeName2 = document.getElementById("mscSchemeName2").value;
        getSchemeDetails(schemeName2,'mscShowSchemeOptionVal2','mscShowSchemeDiviFreq2');
        schemeName3 = document.getElementById("mscSchemeName3").value;
        getSchemeDetails(schemeName3,'mscShowSchemeOptionVal3','mscShowSchemeDiviFreq3');
    }
    else if(document.getElementById("diysc").checked)
    {
        document.getElementById("diyscAmt1").value="1000";
        document.getElementById("diyscAmt2").value="1000";
        document.getElementById("diyscAmt3").value="1000";
        getSchemesForDIY('diyscShowSchemes1','diyscShowSchemeOptionVal1','diyscShowSchemeDiviFreq1');
        getSchemesForDIY('diyscShowSchemes2','diyscShowSchemeOptionVal2','diyscShowSchemeDiviFreq2');
        getSchemesForDIY('diyscShowSchemes3','diyscShowSchemeOptionVal3','diyscShowSchemeDiviFreq3');
    }
}

function getSchemesForDIY(diyscShowSchemesDiv,showSchemeOptionValDiv,showSchemeDiviFreqDiv)
{
    var str = "showSchemeOptionValDiv="+showSchemeOptionValDiv
             +"&showSchemeDiviFreqDiv="+showSchemeDiviFreqDiv;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
               alert("Session expired");
               window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else
            {
               document.getElementById(diyscShowSchemesDiv).innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','getSchemesForDIY.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function setFullSchemeName(diviFreq,showSchemeDiviFreqDiv)
{
    if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq1"))
    {
        document.getElementById("bscSchemeDiviFreq1").value = diviFreq;
        document.getElementById("fullSchemeName1").value = document.getElementById("bscSchemeName1").value+"-"
        +document.getElementById("bscSchemeOptVal1").value+"-"+document.getElementById("bscSchemeDiviFreq1").value;
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq2"))
    {
        document.getElementById("bscSchemeDiviFreq2").value = diviFreq;
        document.getElementById("fullSchemeName2").value = document.getElementById("bscSchemeName2").value+"-"
        +document.getElementById("bscSchemeOptVal2").value+"-"+document.getElementById("bscSchemeDiviFreq2").value;
    }
    else if(showSchemeDiviFreqDiv.match("bscShowSchemeDiviFreq3"))
    {
        document.getElementById("bscSchemeDiviFreq3").value = diviFreq;
        document.getElementById("fullSchemeName3").value = document.getElementById("bscSchemeName3").value+"-"
        +document.getElementById("bscSchemeOptVal3").value+"-"+document.getElementById("bscSchemeDiviFreq3").value;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq1"))
    {
        document.getElementById("escSchemeDiviFreq1").value = diviFreq;
        document.getElementById("fullSchemeName1").value = document.getElementById("escSchemeName1").value+"-"
        +document.getElementById("escSchemeOptVal1").value+"-"+document.getElementById("escSchemeDiviFreq1").value;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq2"))
    {
        document.getElementById("escSchemeDiviFreq2").value = diviFreq;
        document.getElementById("fullSchemeName2").value = document.getElementById("escSchemeName2").value+"-"
        +document.getElementById("escSchemeOptVal2").value+"-"+document.getElementById("escSchemeDiviFreq2").value;
    }
    else if(showSchemeDiviFreqDiv.match("escShowSchemeDiviFreq3"))
    {
        document.getElementById("escSchemeDiviFreq3").value = diviFreq;
        document.getElementById("fullSchemeName3").value = document.getElementById("escSchemeName3").value+"-"
        +document.getElementById("escSchemeOptVal3").value+"-"+document.getElementById("escSchemeDiviFreq3").value;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq1"))
    {
        document.getElementById("exscSchemeDiviFreq1").value = diviFreq;
        document.getElementById("fullSchemeName1").value = document.getElementById("exscSchemeName1").value+"-"
        +document.getElementById("exscSchemeOptVal1").value+"-"+document.getElementById("exscSchemeDiviFreq1").value;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq2"))
    {
        document.getElementById("exscSchemeDiviFreq2").value = diviFreq;
        document.getElementById("fullSchemeName2").value = document.getElementById("exscSchemeName2").value+"-"
        +document.getElementById("exscSchemeOptVal2").value+"-"+document.getElementById("exscSchemeDiviFreq2").value;
    }
    else if(showSchemeDiviFreqDiv.match("exscShowSchemeDiviFreq3"))
    {
        document.getElementById("exscSchemeDiviFreq3").value = diviFreq;
        document.getElementById("fullSchemeName3").value = document.getElementById("exscSchemeName3").value+"-"
        +document.getElementById("exscSchemeOptVal3").value+"-"+document.getElementById("exscSchemeDiviFreq3").value;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq1"))
    {
        document.getElementById("mscSchemeDiviFreq1").value = diviFreq;
        document.getElementById("fullSchemeName1").value = document.getElementById("mscSchemeName1").value+"-"
        +document.getElementById("mscSchemeOptVal1").value+"-"+document.getElementById("mscSchemeDiviFreq1").value;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq2"))
    {
        document.getElementById("mscSchemeDiviFreq2").value = diviFreq;
        document.getElementById("fullSchemeName2").value = document.getElementById("mscSchemeName2").value+"-"
        +document.getElementById("mscSchemeOptVal2").value+"-"+document.getElementById("mscSchemeDiviFreq2").value;
    }
    else if(showSchemeDiviFreqDiv.match("mscShowSchemeDiviFreq3"))
    {
        document.getElementById("mscSchemeDiviFreq3").value = diviFreq;
        document.getElementById("fullSchemeName3").value = document.getElementById("mscSchemeName3").value+"-"
        +document.getElementById("mscSchemeOptVal3").value+"-"+document.getElementById("mscSchemeDiviFreq3").value;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq1"))
    {
        document.getElementById("diyscSchemeDiviFreq1").value = diviFreq;
        document.getElementById("fullSchemeName1").value = document.getElementById("diyscSchemeName1").value+"-"
        +document.getElementById("diyscSchemeOptVal1").value+"-"+document.getElementById("diyscSchemeDiviFreq1").value;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq2"))
    {
        document.getElementById("diyscSchemeDiviFreq2").value = diviFreq;
        document.getElementById("fullSchemeName2").value = document.getElementById("diyscSchemeName2").value+"-"
        +document.getElementById("diyscSchemeOptVal2").value+"-"+document.getElementById("diyscSchemeDiviFreq2").value;
    }
    else if(showSchemeDiviFreqDiv.match("diyscShowSchemeDiviFreq3"))
    {
        document.getElementById("diyscSchemeDiviFreq3").value = diviFreq;
        document.getElementById("fullSchemeName3").value = document.getElementById("diyscSchemeName3").value+"-"
        +document.getElementById("diyscSchemeOptVal3").value+"-"+document.getElementById("diyscSchemeDiviFreq3").value;
    }
}

function getSmartSIPcomboMinAmtValidation(fullSchemeName,divNo)
{
    var transactionType="", schemeCodeByFolioNo="", divName="";
    schemeCodeByFolioNo = document.getElementById("schemeCodeByFolioNo").value;

    if(divNo.match("1")) {divName="minAmt1";}
    else if(divNo.match("2")) {divName="minAmt2";}
    else if(divNo.match("3")) {divName="minAmt3";}

    if((fullSchemeName != null) && (fullSchemeName != ''))
    {
        var str="transType=SIP&schemesForFolio="+schemeCodeByFolioNo
               +"&fullSchemeName="+fullSchemeName;

        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                     document.getElementById(divName).value=xmlhttp.responseText.trim();
                 }
            }
        }
        xmlhttp.open('POST','getSmartSIPcomboMinAmtValidation.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function setDIYSchemeName(diyscSchemeName,diyscSchemeOptionVal)
{
    if(diyscSchemeOptionVal.match("diyscShowSchemeOptionVal1"))
    {
        document.getElementById("diyscSchemeName1").value=diyscSchemeName;
    }
    else if(diyscSchemeOptionVal.match("diyscShowSchemeOptionVal2"))
    {
        document.getElementById("diyscSchemeName2").value=diyscSchemeName;
    }
    else if(diyscSchemeOptionVal.match("diyscShowSchemeOptionVal3"))
    {
        document.getElementById("diyscSchemeName3").value=diyscSchemeName;
    }
}

function smartSIPComboValidation()
{
    var selectedValue="";
    var schemeName1="", schemeName2="", schemeName3="", optVal1="", optVal2="", optVal3="";
    var diviFreq1="", diviFreq2="", diviFreq3="", amt1="", amt2="", amt3="";

    if(document.getElementById("bsc").checked)
    {selectedValue="bsc";}
    else if(document.getElementById("esc").checked)
    {selectedValue="esc";}
    else if(document.getElementById("exsc").checked)
    {selectedValue="exsc";}
    else if(document.getElementById("msc").checked)
    {selectedValue="msc";}
    else if(document.getElementById("diysc").checked)
    {selectedValue="diysc";}
    document.getElementById("sipComboTypeSelected").value=selectedValue;
    
    if(selectedValue.match("bsc"))
    {
        schemeName1 = document.getElementById("bscSchemeName1").value;
        schemeName2 = document.getElementById("bscSchemeName2").value;
        schemeName3 = document.getElementById("bscSchemeName3").value;
        optVal1 = Trim(document.getElementById("bscSchemeOptVal1").value);
        optVal2 = Trim(document.getElementById("bscSchemeOptVal2").value);
        optVal3 = Trim(document.getElementById("bscSchemeOptVal3").value);
        diviFreq1 = Trim(document.getElementById("bscSchemeDiviFreq1").value);
        diviFreq2 = Trim(document.getElementById("bscSchemeDiviFreq2").value);
        diviFreq3 = Trim(document.getElementById("bscSchemeDiviFreq3").value);
        amt1 = Trim(document.getElementById("bscAmt1").value);
        document.getElementById("amt1").value=Trim(amt1);
        amt2 = Trim(document.getElementById("bscAmt2").value);
        document.getElementById("amt2").value=Trim(amt2);
        amt3 = Trim(document.getElementById("bscAmt3").value);
        document.getElementById("amt3").value=Trim(amt3);
    }
    else if(selectedValue.match("esc"))
    {
        schemeName1 = document.getElementById("escSchemeName1").value;
        schemeName2 = document.getElementById("escSchemeName2").value;
        schemeName3 = document.getElementById("escSchemeName3").value;
        optVal1 = Trim(document.getElementById("escSchemeOptVal1").value);
        optVal2 = Trim(document.getElementById("escSchemeOptVal2").value);
        optVal3 = Trim(document.getElementById("escSchemeOptVal3").value);
        diviFreq1 = Trim(document.getElementById("escSchemeDiviFreq1").value);
        diviFreq2 = Trim(document.getElementById("escSchemeDiviFreq2").value);
        diviFreq3 = Trim(document.getElementById("escSchemeDiviFreq3").value);
        amt1 = Trim(document.getElementById("escAmt1").value);
        document.getElementById("amt1").value=Trim(amt1);
        amt2 = Trim(document.getElementById("escAmt2").value);
        document.getElementById("amt2").value=Trim(amt2);
        amt3 = Trim(document.getElementById("escAmt3").value);
        document.getElementById("amt3").value=Trim(amt3);
    }
    else if(selectedValue.match("exsc"))
    {
        schemeName1 = document.getElementById("exscSchemeName1").value;
        schemeName2 = document.getElementById("exscSchemeName2").value;
        schemeName3 = document.getElementById("exscSchemeName3").value;
        optVal1 = Trim(document.getElementById("exscSchemeOptVal1").value);
        optVal2 = Trim(document.getElementById("exscSchemeOptVal2").value);
        optVal3 = Trim(document.getElementById("exscSchemeOptVal3").value);
        diviFreq1 = Trim(document.getElementById("exscSchemeDiviFreq1").value);
        diviFreq2 = Trim(document.getElementById("exscSchemeDiviFreq2").value);
        diviFreq3 = Trim(document.getElementById("exscSchemeDiviFreq3").value);
        amt1 = Trim(document.getElementById("exscAmt1").value);
        document.getElementById("amt1").value=Trim(amt1);
        amt2 = Trim(document.getElementById("exscAmt2").value);
        document.getElementById("amt2").value=Trim(amt2);
        amt3 = Trim(document.getElementById("exscAmt3").value);
        document.getElementById("amt3").value=Trim(amt3);
    }
    else if(selectedValue.match("msc"))
    {
        schemeName1 = document.getElementById("mscSchemeName1").value;
        schemeName2 = document.getElementById("mscSchemeName2").value;
        schemeName3 = document.getElementById("mscSchemeName3").value;
        optVal1 = Trim(document.getElementById("mscSchemeOptVal1").value);
        optVal2 = Trim(document.getElementById("mscSchemeOptVal2").value);
        optVal3 = Trim(document.getElementById("mscSchemeOptVal3").value);
        diviFreq1 = Trim(document.getElementById("mscSchemeDiviFreq1").value);
        diviFreq2 = Trim(document.getElementById("mscSchemeDiviFreq2").value);
        diviFreq3 = Trim(document.getElementById("mscSchemeDiviFreq3").value);
        amt1 = Trim(document.getElementById("mscAmt1").value);
        document.getElementById("amt1").value=Trim(amt1);
        amt2 = Trim(document.getElementById("mscAmt2").value);
        document.getElementById("amt2").value=Trim(amt2);
        amt3 = Trim(document.getElementById("mscAmt3").value);
        document.getElementById("amt3").value=Trim(amt3);
    }
    else if(selectedValue.match("diysc"))
    {
        schemeName1 = document.getElementById("diyscSchemeName1").value;
        schemeName2 = document.getElementById("diyscSchemeName2").value;
        schemeName3 = document.getElementById("diyscSchemeName3").value;
        optVal1 = Trim(document.getElementById("diyscSchemeOptVal1").value);
        optVal2 = Trim(document.getElementById("diyscSchemeOptVal2").value);
        optVal3 = Trim(document.getElementById("diyscSchemeOptVal3").value);
        diviFreq1 = Trim(document.getElementById("diyscSchemeDiviFreq1").value);
        diviFreq2 = Trim(document.getElementById("diyscSchemeDiviFreq2").value);
        diviFreq3 = Trim(document.getElementById("diyscSchemeDiviFreq3").value);
        amt1 = Trim(document.getElementById("diyscAmt1").value);
        document.getElementById("amt1").value=Trim(amt1);
        amt2 = Trim(document.getElementById("diyscAmt2").value);
        document.getElementById("amt2").value=Trim(amt2);
        amt3 = Trim(document.getElementById("diyscAmt3").value);
        document.getElementById("amt3").value=Trim(amt3);
    }

    var sipAmount="";
    if((!(amt1 == null || amt1 == '')) && (!(amt2 == null || amt2 == '')) && (!(amt3 == null || amt3 == '')))
    {
        sipAmount = (parseInt(amt1)) + (parseInt(amt2)) + (parseInt(amt3));
    }

    var numeric = /^[0-9]*$/;

    if(selectedValue.match("diysc") && (schemeName1 == null || schemeName1 == ''))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select 1st scheme </span>";
        document.getElementById("schemeName").focus();
    }
    else if(optVal1 == null || optVal1 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Option for "+schemeName1+"</span>";
        document.getElementById("schemeOptionValue").focus();
    }
    else if(diviFreq1 == null || diviFreq1 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Dividend Frequency for "+schemeName1+"</span>";
        document.getElementById("schemeDiviFreq").focus();
    }
    else if(amt1 == null || amt1 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please enter amount for "+schemeName1+"</span>";
    }
    else if(numeric.test(amt1)==false)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Amount should be Numeric Only for "+schemeName1+"</span>";
    }
    else if(parseInt(amt1)<=0)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'><span style='color: red;'>SIP Amount should be greater than Zero "+schemeName1+"</span>";
    }
    else if(parseInt(Trim(amt1))<parseInt(document.getElementById("minAmt1").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Transaction Amount should be minimum "
            +document.getElementById("minAmt1").value+" for "+schemeName1+"</span> ";
    }
    else if(selectedValue.match("diysc") && (schemeName2 == null || schemeName2 == ''))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select 2nd scheme </span>";
        document.getElementById("schemeName").focus();
    }
    else if(optVal2 == null || optVal2 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Option for "+schemeName2+"</span>";
        document.getElementById("schemeOptionValue").focus();
    }
    else if(diviFreq2 == null || diviFreq2 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Dividend Frequency for "+schemeName2+"</span>";
        document.getElementById("schemeDiviFreq").focus();
    }
    else if(amt2 == null || amt2 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please enter amount for "+schemeName2+"</span>";
    }
    else if(numeric.test(amt2)==false)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Amount should be Numeric Only for "+schemeName2+"</span>";
    }
    else if(parseInt(amt2)<=0)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'><span style='color: red;'>SIP Amount should be greater than Zero "+schemeName2+"</span>";
    }
    else if(parseInt(Trim(amt2))<parseInt(document.getElementById("minAmt2").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Transaction Amount should be minimum "
            +document.getElementById("minAmt2").value+" for "+schemeName2+"</span> ";
    }
    else if(selectedValue.match("diysc") && (schemeName3 == null || schemeName3 == ''))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select 3rd scheme </span>";
        document.getElementById("schemeName").focus();
    }
    else if(optVal3 == null || optVal3 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Option for "+schemeName3+"</span>";
        document.getElementById("schemeOptionValue").focus();
    }
    else if(diviFreq3 == null || diviFreq3 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please select Dividend Frequency for "+schemeName3+"</span>";
        document.getElementById("schemeDiviFreq").focus();
    }
    else if(amt3 == null || amt3 == '')
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please enter amount for "+schemeName3+"</span>";
    }
    else if(numeric.test(amt3)==false)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Amount should be Numeric Only for "+schemeName3+"</span>";
    }
    else if(parseInt(amt3)<=0)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'><span style='color: red;'>SIP Amount should be greater than Zero "+schemeName3+"</span>";
    }
    else if(parseInt(Trim(amt3))<parseInt(document.getElementById("minAmt3").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Transaction Amount should be minimum "
            +document.getElementById("minAmt3").value+" for "+schemeName3+"</span> ";
    }
    else if(document.getElementById("transactionType_sip").checked)
    {
        var minAggregation="",agrAmt="";
        minAggregation=(parseInt(sipAmount))*6;

        if(document.getElementById("sipperiod1").checked)
        {
            if(document.getElementById("sipFeq").value.match('Monthly'))
            {
                agrAmt=((parseInt(sipAmount))*(parseInt(document.getElementById("sipAggregation").value)+1));
            }
            else if(document.getElementById("sipFeq").value.match('Quarterly'))
            {
                agrAmt=((parseInt(sipAmount))*((parseInt(document.getElementById("sipAggregation").value)/3)+1));
            }
            else
            {
                agrAmt=((parseInt(sipAmount))*((parseInt(document.getElementById("sipAggregation").value)/6)+1));
            }
        }
        else if(document.getElementById("sipperiod2").checked)
        {
            agrAmt=((parseInt(sipAmount))*(parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        
        if(document.getElementById("sipFeq").value=="0")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        else if(document.getElementById("dateRadio").value=="0")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Date </span>";
        }
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Monthly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Quarterly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Half Yearly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && document.getElementById("sipFeq").value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
            && document.getElementById("sipFeq").value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && (!numeric.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            if(document.getElementById("chkTC").checked)
            {
                document.getElementById("result").innerHTML="<span style='color: red;'>OK</span>";
                insertRecommendationDetailsLumpSip('','','','','','','','','','','smartSIP','');
            }
            else
            {
                document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Accept the Terms and Condition</span>";
            }
        }
    }
}

function validation(smartSIP)
{
    document.getElementById("result").innerHTML="";
    var str = "";
    var regex = /^[a-zA-Z]*$/;
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var alphabet = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    var numeric = /^[0-9]*$/;
    var alphanumeric =/^[a-zA-Z0-9\-\s]+$/;
    var alphanumericNPN = /^(?![0-9]*$)[a-zA-Z0-9]+$/;
    var alphanumericNPA = /^(?![a-zA-Z]*$)[a-zA-Z0-9]+$/;
    
    document.addForm.firstName.value=Trim(document.addForm.firstName.value);
    document.getElementById("mobileNo").value=Trim(document.getElementById("mobileNo").value);
    document.getElementById("emailId").value=Trim(document.getElementById("emailId").value);

    if(document.getElementById("transactionType_lumpsum").checked)
    {
        document.getElementById("lumpsumAmount").value=Trim(document.getElementById("lumpsumAmount").value);
    }
    if(smartSIP.match("notSmartSIP") && document.getElementById("transactionType_sip").checked)
    {
        document.getElementById("sipAmount").value=Trim(document.getElementById("sipAmount").value);
    }

    //document.getElementById("sipAmount").value=Trim(document.getElementById("sipAmount").value);
    var schemeCode="";
    var investorType="";

    if(smartSIP.match("notSmartSIP") && (document.getElementById("fundType").value!="Select" && document.getElementById("schemeCode").value!="Select"))
    {
        schemeCode=document.getElementById("schemeCode").value;
    }

    if((document.getElementById("folioNo").value == "") || (document.getElementById("folioNo").value == null))
    {
        investorType="new";
    }
    if(!(document.getElementById("folioNo").value=="" || document.getElementById("folioNo").value == null))
    {
        investorType="existing";
    }

    var guardianRelation="";
    if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationMother").checked)))
    {
        guardianRelation="Mother";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationFather").checked)))
    {
        guardianRelation="Father";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationOther").checked)))
    {
        guardianRelation="Other";
    }
    
  var nameTitle="", gender="", bankAccountType="", nomineeRequired="";
  var nationality="",maritalStatus="",politicalExposure="",pob="";
  
  if(smartSIP.match("notSmartSIP") && investorType.match("new"))
  {
    if(document.getElementById("Mr").checked) {nameTitle = "Mr";}
    else if(document.getElementById("Miss").checked) {nameTitle = "Miss";}
    else if(document.getElementById("Mrs").checked) {nameTitle = "Mrs";}

    if(document.getElementById("Male").checked) {gender = "Male";}
    else if(document.getElementById("Female").checked) {gender = "Female";}
  
    if(document.getElementById("nationalityIndian").checked) {nationality = "Indian";}
    else if(document.getElementById("nationalityOther").checked) {nationality = "Other";}

    if(document.getElementById("Single").checked) {maritalStatus = "Single";}
    else if(document.getElementById("Married").checked) {maritalStatus = "Married";}
  
    if(document.getElementById("PE").checked) {politicalExposure = "PE";}
    else if(document.getElementById("RPE").checked) {politicalExposure = "RPE";}
    else if(document.getElementById("NA").checked) {politicalExposure = "NA";}
  
    if(document.getElementById("countryIndian").checked) {pob = "India";}
    else if(document.getElementById("countryOther").checked) {pob = "countryOther";}
  
    if(document.getElementById("SB").checked) {bankAccountType = "SB";}
    else if(document.getElementById("CA").checked) {bankAccountType = "CA";}
    else if(document.getElementById("NRE").checked) {bankAccountType = "NRE";}
    else if(document.getElementById("NRO").checked) {bankAccountType = "NRO";}
    else if(document.getElementById("FCNR").checked) {bankAccountType = "FCNR";}
  
    if(document.getElementById("nomineeYes").checked) {nomineeRequired = "yes";}
    else if(document.getElementById("nomineeNo").checked) {nomineeRequired = "no";}
  }

  var dob = "";
  if(smartSIP.match("notSmartSIP"))
  {
      dob = document.getElementById("dob").value;
  }
  
  if(smartSIP.match("notSmartSIP") && investorType.match("new"))
  {
      var dobNominee = document.addForm.dobNominee.value;
      var eighteenYearsAgo = moment().subtract(18, "years");
      var beforeCurrentDate = moment().subtract(1, "days");
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
  }

    if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (nameTitle == null || nameTitle == ""))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Name Title.</span>";
    }
    else if(document.addForm.firstName.value == "")
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Name Should not be blank</span>";
        document.addForm.firstName.focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (gender == "" || gender == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Gender.</span>";
    }
    else if(document.getElementById("mobileNo").value=="")
    {
       document.getElementById("result").innerHTML="<span style='color: red;'>Mobile Number Should not be blank </span>";
       document.getElementById("mobileNo").focus();
    }
    else if(mob.test(document.getElementById("mobileNo").value) == false)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid mobile number.</span> ";
        document.getElementById("mobileNo").focus();
    }
    else if(document.getElementById("emailId").value=="" || document.getElementById("emailId").value==null)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Email Id Should not be blank</span>";
        document.getElementById("emailId").focus();
    }
    else if((investorType.match("new")) && (!validate_email(document.getElementById("emailId").value)))
    {
        document.getElementById("emailId").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (nationality == "" || nationality == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Nationality.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((nationality == "Other") &&
        (document.getElementById("otherNationality").value == ""
        || document.getElementById("otherNationality").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Nationality.</span>";
        document.getElementById("otherNationality").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(nationality)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nationality.</span>";
        document.getElementById("otherNationality").focus();
    }/*
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("firstNameFatherSpouse").value == "" ||
        document.getElementById("firstNameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's first name.</span>";
        document.getElementById("firstNameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(document.getElementById("firstNameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's first name.</span>";
        document.getElementById("firstNameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("lastNameFatherSpouse").value == "" ||
        document.getElementById("lastNameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's last name.</span>";
        document.getElementById("lastNameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(document.getElementById("lastNameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's last name.</span>";
        document.getElementById("lastNameFatherSpouse").focus();
    }*/
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("nameFatherSpouse").value == "" ||
        document.getElementById("nameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(document.getElementById("nameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("occupation").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Occupation.</span>";
        document.getElementById("occupation").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("occupation").value == "occupationOther")) &&
        (document.getElementById("otherOccupation").value == "" || document.getElementById("otherOccupation").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Occupation.</span>";
        document.getElementById("otherOccupation").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (maritalStatus == "" || maritalStatus == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Marital Status.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("incomeSlab").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Income Slab.</span>";
        document.getElementById("incomeSlab").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (politicalExposure == "" || politicalExposure == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select one option from Political Exposure.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ( pob == "" || pob == null ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Place of Birth.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((pob == "countryOther") &&
        (document.getElementById("otherCountry").value == "" || document.getElementById("otherCountry").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Place of Birth.</span>";
        document.getElementById("otherCountry").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(pob)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Place of Birth.</span>";
        document.getElementById("otherCountry").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("taxStatus").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Tax Status.</span>";
        document.getElementById("taxStatus").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyAddress").value == "" || document.getElementById("taxResidencyAddress").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Address of Tax Residency.</span>";
        document.getElementById("taxResidencyAddress").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyAddress").value.length >= 40 )))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Address Should be less than 40 Characters.</span>";
        document.getElementById("taxResidencyAddress").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyCity").value == "" || document.getElementById("taxResidencyCity").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter City of Tax Residency.</span>";
        document.getElementById("taxResidencyCity").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!alphabet.test(document.getElementById("taxResidencyCity").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City of Tax Residency.</span>";
        document.getElementById("taxResidencyCity").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencycityCode").value == "" || document.getElementById("taxResidencycityCode").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }/*
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
         && (!numeric.test(document.getElementById("taxResidencycityCode").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }*/
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
         && (!alphanumericNPA.test(document.getElementById("taxResidencycityCode").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyState").value == "" || document.getElementById("taxResidencyState").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter State of Tax Residency.</span>";
        document.getElementById("taxResidencyState").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!alphabet.test(document.getElementById("taxResidencyState").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid State of Tax Residency.</span>";
        document.getElementById("taxResidencyState").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyCountry").value == "" || document.getElementById("taxResidencyCountry").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Country of Tax Residency.</span>";
        document.getElementById("taxResidencyCountry").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!(document.getElementById("taxResidencyCountry").value == "") || !(document.getElementById("taxResidencyCountry").value == null))
        && (!alphabet.test(document.getElementById("taxResidencyCountry").value)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Country of Tax Residency.</span>";
        document.getElementById("taxResidencyCountry").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("TINno").value == "" || document.getElementById("TINno").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Tax Identification Number (TIN or equivalent).</span>";
        document.getElementById("TINno").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && ((!document.getElementById("TINno").value == "") || (!document.getElementById("TINno").value == null))
        && (!alphanumeric.test(document.getElementById("TINno").value)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Tax Identification Number (TIN or equivalent).</span>";
        document.getElementById("TINno").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("bankName").value == ""
        || document.getElementById("bankName").value == null || document.getElementById("bankName").value == "0" ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Name.</span>";
        document.getElementById("bankName").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("bankAccountNumber").value == ""
        || document.getElementById("bankAccountNumber").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!numeric.test(document.getElementById("bankAccountNumber").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("bankAccountNumber").value.length < 3)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("reconfirmBankAccountNumber").value == ""
        || document.getElementById("reconfirmBankAccountNumber").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please re-enter Account No. to reconfirm.</span>";
        document.getElementById("reconfirmBankAccountNumber").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ( (!document.getElementById("reconfirmBankAccountNumber").value == ""
        || !document.getElementById("reconfirmBankAccountNumber").value == null)
            && (!(document.getElementById("reconfirmBankAccountNumber").value.match(document.getElementById("bankAccountNumber").value))) ))
        {
        document.getElementById("result").innerHTML="<span style='color: red;'>Re-entered Account No. does not match.</span>";
        document.getElementById("reconfirmBankAccountNumber").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (bankAccountType == "" || bankAccountType == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Account Type.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("bankBranch").value == ""
        || document.getElementById("bankBranch").value == null || document.getElementById("bankBranch").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Branch.</span>";
        document.getElementById("bankBranch").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("ifscCode").value == ""
        || document.getElementById("ifscCode").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter IFSC Code.</span>";
        document.getElementById("ifscCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphanumericNPA.test(document.getElementById("ifscCode").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid IFSC Code.</span>";
        document.getElementById("ifscCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("micrCode").value == ""
        || document.getElementById("micrCode").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!numeric.test(document.getElementById("micrCode").value)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("micrCode").value.length < 9)
        || (document.getElementById("micrCode").value.length > 9)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter 9-digit valid MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("bankCity").value == ""
        || document.getElementById("bankCity").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Bank City.</span>";
        document.getElementById("bankCity").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(document.getElementById("bankCity").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank City.</span>";
        document.getElementById("bankCity").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (nomineeRequired == "" || nomineeRequired == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Do you want Register Nominee for this folio or Not?</span>";
    }/*
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("firstNameNominee").value == ""
        || document.getElementById("firstNameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee first name.</span>";
        document.getElementById("firstNameNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((!alphabet.test(document.getElementById("firstNameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee first name.</span>";
        document.getElementById("firstNameNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("lastNameNominee").value == ""
        || document.getElementById("lastNameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee last name.</span>";
        document.getElementById("lastNameNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((!alphabet.test(document.getElementById("lastNameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee last name.</span>";
        document.getElementById("lastNameNominee").focus();
    }*/
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (document.getElementById("nameFatherSpouse").value == "" ||
        document.getElementById("nameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (!alphabet.test(document.getElementById("nameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("nameNominee").value == ""
        || document.getElementById("nameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee full name.</span>";
        document.getElementById("nameNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((!alphabet.test(document.getElementById("nameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee full name.</span>";
        document.getElementById("nameNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((dobNominee == "" || dobNominee == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee Date Of Birth.</span>";
        document.getElementById("cal1").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById('resultNominee').value == 'Invalid') && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid Nominee DOB.</span>";
        document.getElementById("cal1").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("relationNominee").value == ""
        || document.getElementById("relationNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee Relation.</span>";
        document.getElementById("relationNominee").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((!alphabet.test(document.getElementById("relationNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee Relation.</span>";
        document.getElementById("relationNominee").focus();
    }/*
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("firstNameGuardian").value == "" || document.getElementById("firstNameGuardian").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian first name.</span>";
        document.getElementById("firstNameGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("firstNameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian first name.</span>";
        document.getElementById("firstNameGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("lastNameGuardian").value == "" || document.getElementById("lastNameGuardian").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian last name.</span>";
        document.getElementById("lastNameGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("lastNameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian last name.</span>";
        document.getElementById("lastNameGuardian").focus();
    }*/
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("nameGuardian").value == "" || document.getElementById("nameGuardian").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian full name.</span>";
        document.getElementById("nameGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("nameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian full name.</span>";
        document.getElementById("nameGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("panGuardian").value == "" || document.getElementById("panGuardian").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphanumericNPA.test(document.getElementById("panGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("panGuardian").value.length < 10)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!(document.getElementById("selectGuardianRelationMother").checked || document.getElementById("selectGuardianRelationFather").checked
            || document.getElementById("selectGuardianRelationOther").checked)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Guardian Relation.</span>";
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (guardianRelation.match("Other")) && (document.getElementById("relationGuardian").value == null ||
            document.getElementById("relationGuardian").value == "") ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian Relation.</span>";
        document.getElementById("relationGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (guardianRelation.match("Other")) && (!alphabet.test(document.getElementById("relationGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian Relation.</span>";
        document.getElementById("relationGuardian").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && document.getElementById("fundType").value=="Select")
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Fund Type </span>";
        document.getElementById("fundType").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && document.getElementById("schemeCode").value=="Select")
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Scheme </span>";
        document.getElementById("schemeCode").focus();
    }
    else if( ((document.getElementById("transactionType_lumpsum").checked
            && document.getElementById("lumpsumAmount").value==""))
            || ((smartSIP.match("notSmartSIP")) && (document.getElementById("transactionType_sip").checked
            && document.getElementById("sipAmount").value=="")))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Enter Transaction Amount</span> ";
        document.getElementById("lumpsumAmount").focus();
    }
    else if((document.getElementById("transactionType_lumpsum").checked)
        && (numeric.test(document.getElementById("lumpsumAmount").value)==false))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Transaction Amount should be Numeric</span> ";
        document.getElementById("lumpsumAmount").focus();
    }
    else if((document.getElementById("transactionType_lumpsum").checked)
            &&  parseInt(document.getElementById("lumpsumAmount").value)<=0)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Enter Valid Transaction Amount</span> ";
        document.getElementById("lumpsumAmount").focus();
    }
    else if((document.getElementById("transactionType_lumpsum").checked)
        &&  parseInt(document.getElementById("lumpsumAmount").value)<parseInt(document.getElementById("minAmt").value))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Transaction Amount should be minimum "+
            document.getElementById("minAmt").value+"</span> ";
        document.getElementById("lumpsumAmount").focus();
    }
    else if( (document.getElementById("transactionType_lumpsum").checked)
          && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
          && (parseInt(document.getElementById("lumpsumAmount").value)>parseInt(document.getElementById("maxAmount").value)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Suggested Amount for L&T Emerging Businesses Fund cannot be greater than "+
            document.getElementById("maxAmount").value+" for the specific investor</span> ";
        document.getElementById("lumpsumAmount").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (document.getElementById("transactionType_sip").checked)
        && (numeric.test(document.getElementById("sipAmount").value)==false))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Amount should be Numeric Only</span>";
        document.getElementById("sipAmount").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (document.getElementById("transactionType_sip").checked)
            && (parseInt(document.getElementById("sipAmount").value)<=0))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'><span style='color: red;'>SIP Amount should be greater than Zero</span>";
        document.getElementById("sipAmount").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (document.getElementById("transactionType_sip").checked)
            &&  parseInt(Trim(document.getElementById("sipAmount").value))<parseInt(document.getElementById("minAmt").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Transaction Amount should be minimum "
            +document.getElementById("minAmt").value+"</span> ";
        document.getElementById("sipAmount").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && (document.getElementById("transactionType_sip").checked)
          && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
          && (parseInt(document.getElementById("sipAmount").value)>parseInt(document.getElementById("maxAmount").value)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Suggested Amount for L&T Emerging Businesses Fund cannot be greater than "+
            document.getElementById("maxAmount").value+" for the specific investor</span> ";
        document.getElementById("sipAmount").focus();
    }
    else if((smartSIP.match("notSmartSIP")) && document.getElementById("transactionType_sip").checked)
    {
        var minAggregation="",agrAmt="";
        minAggregation=parseInt(document.getElementById("sipAmount").value)*6;

        if(document.getElementById("sipperiod1").checked)
        {
            if(document.getElementById("sipFeq").value.match('Monthly'))
            {
                agrAmt=(parseInt(document.getElementById("sipAmount").value)*
                        (parseInt(document.getElementById("sipAggregation").value)+1));
            }
            else if(document.getElementById("sipFeq").value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.getElementById("sipAmount").value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.getElementById("sipAmount").value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/6)+1));
            }
        }
        else if(document.getElementById("sipperiod2").checked)
        {
            agrAmt=(parseInt(document.getElementById("sipAmount").value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        
        if(document.getElementById("sipFeq").value=="0")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        else if(document.getElementById("dateRadio").value=="0")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Date </span>";
        }
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Monthly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Quarterly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.getElementById("sipFeq").value.match('Half Yearly'))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && document.getElementById("sipFeq").value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
            && document.getElementById("sipFeq").value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && (!numeric.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("result").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            if(smartSIP.match("notSmartSIP"))
            {
                document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
                //document.addForm.fullSchemeName.value = document.addForm.schemeName.value;

                if(investorType.match("new"))
                {
                    if(document.getElementById("chkTC").checked)
                    {
                        insertRecommendationDetailsLumpSip(investorType,nameTitle.trim(),gender.trim(),nationality.trim(),maritalStatus.trim(),politicalExposure.trim(),pob.trim(),bankAccountType.trim(),nomineeRequired,dobNominee.trim(),smartSIP,guardianRelation);
                    }
                    else
                    {
	            	document.getElementById("result").innerHTML=
    	            	"<span style='color: red;'>Please Accept the Terms and Condition</span>";
                    }
                }
                else
                {
                    insertRecommendationDetailsLumpSip('','','','','','','','','','',smartSIP,'');
                }
            }
            else
            {
                smartSIPComboValidation();
            }
        }
    }
    else
    {
        if(smartSIP.match("notSmartSIP"))
        {
            document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
            //document.addForm.fullSchemeName.value = document.addForm.schemeName.value;

            if(investorType.match("new"))
            {
                if(document.getElementById("chkTC").checked)
                {
                    insertRecommendationDetailsLumpSip(investorType,nameTitle.trim(),gender.trim(),nationality.trim(),maritalStatus.trim(),politicalExposure.trim(),pob.trim(),bankAccountType.trim(),nomineeRequired,dobNominee.trim(),smartSIP,guardianRelation);
                }            
                else
                {
                    document.getElementById("result").innerHTML=
                    "<span style='color: red;'>Please Accept the Terms and Condition</span>";
                }
            }
            else
            {
                insertRecommendationDetailsLumpSip('','','','','','','','','','',smartSIP,'');
            }
        }
        else
        {
            smartSIPComboValidation();
        }
    }
}

function insertRecommendationDetailsLumpSip(investorType,nameTitle,gender,nationality,maritalStatus,politicalExposure,pob,bankAccountType,nomineeRequired,dobNominee,smartSIP,guardianRelation)
{
    var str="";
    if(investorType.match("new"))
    {
        str="nameTitle="+nameTitle.trim()+"&gender="+gender.trim()+"&nationality="+nationality.trim()
            +"&nameFatherSpouse="+document.getElementById("nameFatherSpouse").value.trim()
            +"&occupation="+document.getElementById("occupation").value.trim()
            +"&otherOccupation="+document.getElementById("otherOccupation").value.trim()
            +"&maritalStatus="+maritalStatus.trim()+"&politicalExposure="+politicalExposure.trim()
            +"&incomeSlab="+document.getElementById("incomeSlab").value.trim()
            +"&pob="+pob.trim()+"&bankAccountType="+bankAccountType.trim()
            +"&otherCountry="+document.getElementById("otherCountry").value.trim()
            +"&ifscCode="+document.getElementById("ifscCode").value.trim()
            +"&micrCode="+document.getElementById("micrCode").value.trim()
            +"&bankName="+document.getElementById("bankName").value.trim()
            +"&bankAccountNumber="+document.getElementById("bankAccountNumber").value.trim()
            +"&taxStatus="+document.getElementById("taxStatus").value.trim()            
            +"&otherNationality="+document.getElementById("otherNationality").value.trim()
            +"&minorChkBox="+document.getElementById("chkMinor").value;

        if(document.getElementById("taxStatus").value == "Non Residential Indian Individual")
        {
            str=str+"&taxResidencyAddress="+document.getElementById("taxResidencyAddress").value.trim()
                +"&taxResidencyCity="+document.getElementById("taxResidencyCity").value.trim()
                +"&taxResidencycityCode="+document.getElementById("taxResidencycityCode").value.trim()
                +"&taxResidencyState="+document.getElementById("taxResidencyState").value.trim()
                +"&taxResidencyCountry="+document.getElementById("taxResidencyCountry").value.trim()
                +"&TINno="+document.getElementById("TINno").value.trim();
        }

        if(nomineeRequired.match("yes"))
        {
            str=str+"&nameNominee="+document.getElementById("nameNominee").value.trim()
                +"&relationNominee="+document.getElementById("relationNominee").value.trim()
                +"&dobNominee="+dobNominee.trim();
        }

        if(document.getElementById("chkMinor").value == "yes")
        {
            str=str+"&nameGuardian="+document.getElementById("nameGuardian").value.trim()
                +"&panGuardian="+document.getElementById("panGuardian").value.trim();
        }

        if(document.getElementById("chkMinor").value == "yes" && ((guardianRelation.match("Mother")) || (guardianRelation.match("Father"))))
        {str=str+"&relationGuardian="+guardianRelation;}
        else if(document.getElementById("chkMinor").value == "yes" && (guardianRelation.match("Other")))
        {str=str+"&relationGuardian="+document.getElementById("relationGuardian").value.trim();}

        str=str+"&bankCity="+document.getElementById("bankCity").value.trim()
            +"&nomineeRegister="+nomineeRequired.trim()
            +"&bankBranchName="+document.getElementById("bankBranch").value.trim();

        insertInvestorDetails(str,smartSIP);
    }
    else
    {
        insertInvestorDetails('',smartSIP);
    }
}

function insertInvestorDetails(insertBankFormStr,smartSIP)
{
    var investorType="";
    if((document.getElementById("folioNo").value == "") || (document.getElementById("folioNo").value == 'null'))
    {
        investorType="new";
    }
    if(!(document.getElementById("folioNo").value=="" || document.getElementById("folioNo").value== 'null'))
    {
        investorType="existing";
    }
    
     var transactionType="";
   if(document.getElementById("transactionType_lumpsum").checked)
   {
        transactionType="Lumpsum";
   }
   else if(document.getElementById("transactionType_sip").checked)
   {
        transactionType="SIP";
   }

     var xmlhttp = createRequestObject();
     var foliono=document.getElementById("folioNo").value;
     var panNo=document.getElementById("panNo").value;
     var firstName=Trim(document.getElementById("firstName").value);
     var emailId=Trim(document.getElementById("emailId").value);
     var mobileNo=Trim(document.getElementById("mobileNo").value);
     var txnExpiryDays=document.getElementById("txnExpiryDays").value;
     var dob=document.getElementById("dob").value;

     var str="folioNo="+foliono+"&panNo="+panNo+"&investorName="+firstName+"&emailId="+emailId+"&mobileNo="
            +mobileNo+"&transactionType="+transactionType+"&investorType="+investorType+"&txnExpiryDays="
            +txnExpiryDays+"&firstName="+firstName+"&dob="+dob+"&smartSIP="+smartSIP
            +"&nfoType="+document.getElementById("nfoType").value;

    if(investorType.match("new"))
    {        
        str =str+"&"+insertBankFormStr;
    }

    if(document.getElementById("nfoType").value == "No")
    {
        var schemeCode="";
        
        if(smartSIP.match("notSmartSIP"))
        {
            schemeCode=document.getElementById("schemeCode").value;
            str =str +"&schemeCode="+schemeCode;
        }

         if(transactionType == "Lumpsum")
         {
             var lumpsumAmount=Trim(document.getElementById("lumpsumAmount").value);
             str = str+"&lumpsumAmount="+lumpsumAmount;
         }
         else if(transactionType == "SIP")
         {
             if(smartSIP.match("notSmartSIP"))
             {
                 var sipAmount=Trim(document.getElementById("sipAmount").value);
                 str = str+"&sipAmount="+sipAmount;
             }
             else
             {
                 str = str+"&amt1="+document.getElementById("amt1").value
                        +"&amt2="+document.getElementById("amt2").value
                        +"&amt3="+document.getElementById("amt3").value;
             }
             
             str = str+"&sipFeq="+document.getElementById("sipFeq").value
                    +"&date="+document.addForm.dateRadio.value
                    +"&secondMonth="+document.getElementById("month").value
                    +"&secondYear="+document.getElementById("year").value;

            if(document.getElementById("sipperiod1").checked)
            {
                str = str+"&sipType=EndDate"
                        +"&endMonth="+document.getElementById("sipperiodmonth").value
                        +"&endYear="+document.getElementById("sipperiodyear").value;
            }
            else if(document.getElementById("sipperiod2").checked)
            {
                str = str+"&sipType=Installments"
                        +"&installments="+document.getElementById("txtsipperiod").value;
            }
        }

        if(smartSIP.match("notSmartSIP"))
        {
            str =str +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);
        }
        else
        {
            str =str +"&fullSchemeName1="+encodeURIComponent(document.getElementById("fullSchemeName1").value)
                    +"&fullSchemeName2="+encodeURIComponent(document.getElementById("fullSchemeName2").value)
                    +"&fullSchemeName3="+encodeURIComponent(document.getElementById("fullSchemeName3").value)
                    +"&sipComboType="+document.getElementById("sipComboTypeSelected").value;
        }
    }
    else
    {
         var maturityType="";
         var NFOSchemeCode=document.getElementById("NFOSchemeCode").value;
         var schemeName=encodeURIComponent(document.getElementById("schemeName").value);

         str = str+"&NFOSchemeCode="+NFOSchemeCode+"&schemeName="+schemeName;

         if(document.getElementById("dividendType_sweep").checked)
         {
            str = str+"&amount="+Trim(document.getElementById("sweepAmount").value)+"&dividendType=Sweep"
                     //+"&schemeCode="+document.getElementById("schemeCode").value
                     //+"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);
                     +"&schemeCode="+document.getElementById("schemeCodeNFO").value
                     +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeNameNFO.value);            
         }
         else if(document.getElementById("dividendType_payout").checked)
         {
            str = str+"&amount="+Trim(document.getElementById("payoutAmount").value)+"&dividendType=Payout";
         }

         if(document.getElementById("maturityYes").checked)
         {
            str = str+"&maturityType=Yes"
                //+"&schemeCodeNFO="+document.getElementById("schemeCodeNFO").value
                //+"&fullSchemeNameNFO="+encodeURIComponent(document.addForm.fullSchemeNameNFO.value);
                +"&schemeCodeNFO="+document.getElementById("schemeCode").value
                +"&fullSchemeNameNFO="+encodeURIComponent(document.addForm.fullSchemeName.value);
         }
         else if(document.getElementById("maturityNo").checked)
         {str = str+"&maturityType=No";}
    }
    
     document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
     xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
               alert("Session expired");
               window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else
            {
               document.getElementById('purchaseResult').innerHTML=xmlhttp.responseText;
            }
        }
     };
     if(smartSIP.match("notSmartSIP"))
     {
         xmlhttp.open('POST','insertFolioDetails.jsp',true);
     }
     else
     {
         xmlhttp.open('POST','insertSmartSIPComboFolioDetails.jsp',true);
     }
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);    
}

/*
function insertInvestorDetails()
{
    var investorType="";
    if((document.getElementById("folioNo").value == "") || (document.getElementById("folioNo").value == 'null'))
    {
        investorType="new";
    }
    if(!(document.getElementById("folioNo").value=="" || document.getElementById("folioNo").value== 'null'))
    {
        investorType="existing";
    }

     var transactionType="";
   if(document.getElementById("transactionType_lumpsum").checked)
   {
        transactionType="Lumpsum";
   }
   else if(document.getElementById("transactionType_sip").checked)
   {
        transactionType="SIP";
   }

     var xmlhttp = createRequestObject();
     var foliono=document.getElementById("folioNo").value;
     var panNo=document.getElementById("panNo").value;
     var firstName=Trim(document.getElementById("firstName").value);
     var emailId=Trim(document.getElementById("emailId").value);
     var mobileNo=Trim(document.getElementById("mobileNo").value);
     var txnExpiryDays=document.getElementById("txnExpiryDays").value;
     var dob=document.getElementById("dob").value;

     var str="folioNo="+foliono+"&panNo="+panNo+"&investorName="+firstName+"&emailId="+emailId+"&mobileNo="
            +mobileNo+"&transactionType="+transactionType+"&investorType="+investorType+"&txnExpiryDays="
            +txnExpiryDays+"&firstName="+firstName+"&dob="+dob
            +"&nfoType="+document.getElementById("nfoType").value;

    if(document.getElementById("nfoType").value == "No")
    {
         var schemeCode=document.getElementById("schemeCode").value;
         str =str +"&schemeCode="+schemeCode;

         if(transactionType == "Lumpsum")
         {
             var lumpsumAmount=Trim(document.getElementById("lumpsumAmount").value);
             str = str+"&lumpsumAmount="+lumpsumAmount;
         }
         else if(transactionType == "SIP")
         {
             var sipAmount=Trim(document.getElementById("sipAmount").value);
             str = str+"&sipAmount="+sipAmount;
         }
         str =str +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);
    }
    else
    {
         var maturityType="";
         var NFOSchemeCode=document.getElementById("NFOSchemeCode").value;
         var schemeName=encodeURIComponent(document.getElementById("schemeName").value);

         str = str+"&NFOSchemeCode="+NFOSchemeCode+"&schemeName="+schemeName;

         if(document.getElementById("dividendType_sweep").checked)
         {
            str = str+"&amount="+Trim(document.getElementById("sweepAmount").value)+"&dividendType=Sweep"
                     //+"&schemeCode="+document.getElementById("schemeCode").value
                     //+"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);
                     +"&schemeCode="+document.getElementById("schemeCodeNFO").value
                     +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeNameNFO.value);
         }
         else if(document.getElementById("dividendType_payout").checked)
         {
            str = str+"&amount="+Trim(document.getElementById("payoutAmount").value)+"&dividendType=Payout";
         }

         if(document.getElementById("maturityYes").checked)
         {
            str = str+"&maturityType=Yes"
                //+"&schemeCodeNFO="+document.getElementById("schemeCodeNFO").value
                //+"&fullSchemeNameNFO="+encodeURIComponent(document.addForm.fullSchemeNameNFO.value);
                +"&schemeCodeNFO="+document.getElementById("schemeCode").value
                +"&fullSchemeNameNFO="+encodeURIComponent(document.addForm.fullSchemeName.value);
         }
         else if(document.getElementById("maturityNo").checked)
         {   str = str+"&maturityType=No";   }
    }

     document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
     xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
               alert("Session expired");
               window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else
            {
               document.getElementById('purchaseResult').innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','insertFolioDetails.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}*/

function validationNFO()
{
    document.getElementById("result").innerHTML="";
    var investorType="";
    var str = "";
    var regex = /^[a-zA-Z]*$/;
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var alphabet = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    var numeric = /^[0-9]*$/;
    var alphanumeric =/^[a-zA-Z0-9\-\s]+$/;
    var alphanumericNPN = /^(?![0-9]*$)[a-zA-Z0-9]+$/;
    var alphanumericNPA = /^(?![a-zA-Z]*$)[a-zA-Z0-9]+$/;

    document.addForm.firstName.value=Trim(document.addForm.firstName.value);
    document.getElementById("mobileNo").value=Trim(document.getElementById("mobileNo").value);
    document.getElementById("emailId").value=Trim(document.getElementById("emailId").value);

    if(document.getElementById("dividendType_payout").checked)
    {
        document.getElementById("payoutAmount").value=Trim(document.getElementById("payoutAmount").value);
    }
    if(document.getElementById("dividendType_sweep").checked)
    {
        document.getElementById("sweepAmount").value=Trim(document.getElementById("sweepAmount").value);
    }    

    if((document.getElementById("folioNo").value == "") || (document.getElementById("folioNo").value == 'null'))
    {
        investorType="new";
    }
    if(!(document.getElementById("folioNo").value=="" || document.getElementById("folioNo").value== 'null'))
    {
        investorType="existing";
    }

    var NFOtransType="";
    if(investorType.match("new"))
    {
        NFOtransType="Purchase";
    }
    else if(investorType.match("existing") && document.getElementById("modalPopUpType").value=="Switch")
    {
        NFOtransType="Switch";
    }
    else if(investorType.match("existing") && document.getElementById("modalPopUpType").value=="Purchase")
    {
        NFOtransType="Purchase";
    }

    getSchemeCodeNFO(NFOtransType);

    var guardianRelation="";
    if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationMother").checked)))
    {
        guardianRelation="Mother";
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationFather").checked)))
    {
        guardianRelation="Father";
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationOther").checked)))
    {
        guardianRelation="Other";
    }

  var nameTitle="", gender="", bankAccountType="", nomineeRequired="";
  var nationality="",maritalStatus="",politicalExposure="",pob="";

  if(investorType.match("new"))
  {
    if(document.getElementById("Mr").checked) {nameTitle = "Mr";}
    else if(document.getElementById("Miss").checked) {nameTitle = "Miss";}
    else if(document.getElementById("Mrs").checked) {nameTitle = "Mrs";}

    if(document.getElementById("Male").checked) {gender = "Male";}
    else if(document.getElementById("Female").checked) {gender = "Female";}

    if(document.getElementById("nationalityIndian").checked) {nationality = "Indian";}
    else if(document.getElementById("nationalityOther").checked) {nationality = "Other";}

    if(document.getElementById("Single").checked) {maritalStatus = "Single";}
    else if(document.getElementById("Married").checked) {maritalStatus = "Married";}

    if(document.getElementById("PE").checked) {politicalExposure = "PE";}
    else if(document.getElementById("RPE").checked) {politicalExposure = "RPE";}
    else if(document.getElementById("NA").checked) {politicalExposure = "NA";}

    if(document.getElementById("countryIndian").checked) {pob = "India";}
    else if(document.getElementById("countryOther").checked) {pob = "countryOther";}

    if(document.getElementById("SB").checked) {bankAccountType = "SB";}
    else if(document.getElementById("CA").checked) {bankAccountType = "CA";}
    else if(document.getElementById("NRE").checked) {bankAccountType = "NRE";}
    else if(document.getElementById("NRO").checked) {bankAccountType = "NRO";}
    else if(document.getElementById("FCNR").checked) {bankAccountType = "FCNR";}

    if(document.getElementById("nomineeYes").checked) {nomineeRequired = "yes";}
    else if(document.getElementById("nomineeNo").checked) {nomineeRequired = "no";}
  }

  var dob = "";
  if(investorType.match("new"))
  {
      dob = document.getElementById("dob").value;
  }

  if(investorType.match("new"))
  {
      var dobNominee = document.addForm.dobNominee.value;
      var eighteenYearsAgo = moment().subtract(18, "years");
      var beforeCurrentDate = moment().subtract(1, "days");
    if(dob != "" && dob != null)
    {
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
  }

    if((investorType.match("new")) && (nameTitle == null || nameTitle == ""))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Name Title.</span>";
    }
    else if(document.addForm.firstName.value == "")
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Name Should not be blank</span>";
        document.addForm.firstName.focus();
    }
    else if((investorType.match("new")) && (gender == "" || gender == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Gender.</span>";
    }
    else if(document.getElementById("mobileNo").value=="")
    {
       document.getElementById("result").innerHTML="<span style='color: red;'>Mobile Number Should not be blank </span>";
       document.getElementById("mobileNo").focus();
    }
    else if(mob.test(document.getElementById("mobileNo").value) == false)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid mobile number.</span> ";
        document.getElementById("mobileNo").focus();
    }
    else if(document.getElementById("emailId").value=="" || document.getElementById("emailId").value==null)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Email Id Should not be blank</span>";
        document.getElementById("emailId").focus();
    }
    else if((investorType.match("new")) && (!validate_email(document.getElementById("emailId").value)))
    {
        document.getElementById("emailId").focus();
    }
    else if((investorType.match("new")) && (nationality == "" || nationality == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Nationality.</span>";
    }
    else if((investorType.match("new")) && ((nationality == "Other") &&
        (document.getElementById("otherNationality").value == ""
        || document.getElementById("otherNationality").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Nationality.</span>";
        document.getElementById("otherNationality").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(nationality)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nationality.</span>";
        document.getElementById("otherNationality").focus();
    }/*
    else if((investorType.match("new")) && (document.getElementById("firstNameFatherSpouse").value == "" ||
        document.getElementById("firstNameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's first name.</span>";
        document.getElementById("firstNameFatherSpouse").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(document.getElementById("firstNameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's first name.</span>";
        document.getElementById("firstNameFatherSpouse").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("lastNameFatherSpouse").value == "" ||
        document.getElementById("lastNameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's last name.</span>";
        document.getElementById("lastNameFatherSpouse").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(document.getElementById("lastNameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's last name.</span>";
        document.getElementById("lastNameFatherSpouse").focus();
    }*/
    else if((investorType.match("new")) && (document.getElementById("nameFatherSpouse").value == "" ||
        document.getElementById("nameFatherSpouse").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(document.getElementById("nameFatherSpouse").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Father's / Spouse's full name.</span>";
        document.getElementById("nameFatherSpouse").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("occupation").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Occupation.</span>";
        document.getElementById("occupation").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("occupation").value == "occupationOther")) &&
        (document.getElementById("otherOccupation").value == "" || document.getElementById("otherOccupation").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Occupation.</span>";
        document.getElementById("otherOccupation").focus();
    }
    else if((investorType.match("new")) && (maritalStatus == "" || maritalStatus == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Marital Status.</span>";
    }
    else if((investorType.match("new")) && (document.getElementById("incomeSlab").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Income Slab.</span>";
        document.getElementById("incomeSlab").focus();
    }
    else if((investorType.match("new")) && (politicalExposure == "" || politicalExposure == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select one option from Political Exposure.</span>";
    }
    else if((investorType.match("new")) && ( pob == "" || pob == null ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Place of Birth.</span>";
    }
    else if((investorType.match("new")) && ((pob == "countryOther") &&
        (document.getElementById("otherCountry").value == "" || document.getElementById("otherCountry").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter your Place of Birth.</span>";
        document.getElementById("otherCountry").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(pob)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Place of Birth.</span>";
        document.getElementById("otherCountry").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("taxStatus").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select your Tax Status.</span>";
        document.getElementById("taxStatus").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyAddress").value == "" || document.getElementById("taxResidencyAddress").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Address of Tax Residency.</span>";
        document.getElementById("taxResidencyAddress").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyAddress").value.length >= 40 )))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Address Should be less than 40 Characters.</span>";
        document.getElementById("taxResidencyAddress").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyCity").value == "" || document.getElementById("taxResidencyCity").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter City of Tax Residency.</span>";
        document.getElementById("taxResidencyCity").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!alphabet.test(document.getElementById("taxResidencyCity").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City of Tax Residency.</span>";
        document.getElementById("taxResidencyCity").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencycityCode").value == "" || document.getElementById("taxResidencycityCode").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }/*
    else if((smartSIP.match("notSmartSIP")) && (investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
         && (!numeric.test(document.getElementById("taxResidencycityCode").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }*/
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
         && (!alphanumericNPA.test(document.getElementById("taxResidencycityCode").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid City Code of Tax Residency.</span>";
        document.getElementById("taxResidencycityCode").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyState").value == "" || document.getElementById("taxResidencyState").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter State of Tax Residency.</span>";
        document.getElementById("taxResidencyState").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!alphabet.test(document.getElementById("taxResidencyState").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid State of Tax Residency.</span>";
        document.getElementById("taxResidencyState").focus();
    }
    else if((investorType.match("new")) && (((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("taxResidencyCountry").value == "" || document.getElementById("taxResidencyCountry").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Country of Tax Residency.</span>";
        document.getElementById("taxResidencyCountry").focus();
    }
    else if((investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (!(document.getElementById("taxResidencyCountry").value == "") || !(document.getElementById("taxResidencyCountry").value == null))
        && (!alphabet.test(document.getElementById("taxResidencyCountry").value)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Country of Tax Residency.</span>";
        document.getElementById("taxResidencyCountry").focus();
    }
    else if((investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && (document.getElementById("TINno").value == "" || document.getElementById("TINno").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Tax Identification Number (TIN or equivalent).</span>";
        document.getElementById("TINno").focus();
    }
    else if((investorType.match("new")) && ( ((document.getElementById("taxStatus").value == "Non Residential Indian Individual"))
        && ((!document.getElementById("TINno").value == "") || (!document.getElementById("TINno").value == null))
        && (!alphanumeric.test(document.getElementById("TINno").value)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Tax Identification Number (TIN or equivalent).</span>";
        document.getElementById("TINno").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("bankName").value == ""
        || document.getElementById("bankName").value == null || document.getElementById("bankName").value == "0" ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Name.</span>";
        document.getElementById("bankName").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("bankAccountNumber").value == ""
        || document.getElementById("bankAccountNumber").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((investorType.match("new")) && (!numeric.test(document.getElementById("bankAccountNumber").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("bankAccountNumber").value.length < 3)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank Account No.</span>";
        document.getElementById("bankAccountNumber").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("reconfirmBankAccountNumber").value == ""
        || document.getElementById("reconfirmBankAccountNumber").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please re-enter Account No. to reconfirm.</span>";
        document.getElementById("reconfirmBankAccountNumber").focus();
    }
    else if((investorType.match("new")) && ( (!document.getElementById("reconfirmBankAccountNumber").value == ""
        || !document.getElementById("reconfirmBankAccountNumber").value == null)
            && (!(document.getElementById("reconfirmBankAccountNumber").value.match(document.getElementById("bankAccountNumber").value))) ))
        {
        document.getElementById("result").innerHTML="<span style='color: red;'>Re-entered Account No. does not match.</span>";
        document.getElementById("reconfirmBankAccountNumber").focus();
    }
    else if((investorType.match("new")) && (bankAccountType == "" || bankAccountType == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Account Type.</span>";
    }
    else if((investorType.match("new")) && (document.getElementById("bankBranch").value == ""
        || document.getElementById("bankBranch").value == null || document.getElementById("bankBranch").value == "0"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Bank Branch.</span>";
        document.getElementById("bankBranch").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("ifscCode").value == ""
        || document.getElementById("ifscCode").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter IFSC Code.</span>";
        document.getElementById("ifscCode").focus();
    }
    else if((investorType.match("new")) && (!alphanumericNPA.test(document.getElementById("ifscCode").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid IFSC Code.</span>";
        document.getElementById("ifscCode").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("micrCode").value == ""
        || document.getElementById("micrCode").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((investorType.match("new")) && (!numeric.test(document.getElementById("micrCode").value)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("micrCode").value.length < 9)
        || (document.getElementById("micrCode").value.length > 9)) )
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter 9-digit valid MICR Code.</span>";
        document.getElementById("micrCode").focus();
    }
    else if((investorType.match("new")) && (document.getElementById("bankCity").value == ""
        || document.getElementById("bankCity").value == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Bank City.</span>";
        document.getElementById("bankCity").focus();
    }
    else if((investorType.match("new")) && (!alphabet.test(document.getElementById("bankCity").value)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Bank City.</span>";
        document.getElementById("bankCity").focus();
    }
    else if((investorType.match("new")) && (nomineeRequired == "" || nomineeRequired == null))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Do you want Register Nominee for this folio or Not?</span>";
    }/*
    else if((investorType.match("new")) && ((document.getElementById("firstNameNominee").value == ""
        || document.getElementById("firstNameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee first name.</span>";
        document.getElementById("firstNameNominee").focus();
    }
    else if((investorType.match("new")) && ((!alphabet.test(document.getElementById("firstNameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee first name.</span>";
        document.getElementById("firstNameNominee").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("lastNameNominee").value == ""
        || document.getElementById("lastNameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee last name.</span>";
        document.getElementById("lastNameNominee").focus();
    }
    else if((investorType.match("new")) && ((!alphabet.test(document.getElementById("lastNameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee last name.</span>";
        document.getElementById("lastNameNominee").focus();
    }*/
    else if((investorType.match("new")) && ((document.getElementById("nameNominee").value == ""
        || document.getElementById("nameNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee full name.</span>";
        document.getElementById("nameNominee").focus();
    }
    else if((investorType.match("new")) && ((!alphabet.test(document.getElementById("nameNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee full name.</span>";
        document.getElementById("nameNominee").focus();
    }
    else if((investorType.match("new")) && ((dobNominee == "" || dobNominee == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee Date Of Birth.</span>";
        document.getElementById("cal1").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById('resultNominee').value == 'Invalid') && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Invalid Nominee DOB.</span>";
        document.getElementById("cal1").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("relationNominee").value == ""
        || document.getElementById("relationNominee").value == null) && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Nominee Relation.</span>";
        document.getElementById("relationNominee").focus();
    }
    else if((investorType.match("new")) && ((!alphabet.test(document.getElementById("relationNominee").value))
        && (nomineeRequired.match("yes"))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Nominee Relation.</span>";
        document.getElementById("relationNominee").focus();
    }/*
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("firstNameGuardian").value == "" || document.getElementById("firstNameGuardian").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian first name.</span>";
        document.getElementById("firstNameGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("firstNameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian first name.</span>";
        document.getElementById("firstNameGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("lastNameGuardian").value == "" || document.getElementById("lastNameGuardian").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian last name.</span>";
        document.getElementById("lastNameGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("lastNameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian last name.</span>";
        document.getElementById("lastNameGuardian").focus();
    }*/
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("nameGuardian").value == "" || document.getElementById("nameGuardian").value == null) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian full name.</span>";
        document.getElementById("nameGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(document.getElementById("nameGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian full name.</span>";
        document.getElementById("nameGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("panGuardian").value == "" || document.getElementById("panGuardian").value == null)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!alphanumericNPA.test(document.getElementById("panGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("panGuardian").value.length < 10)))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid PAN no. of Guardian.</span>";
        document.getElementById("panGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (!(document.getElementById("selectGuardianRelationMother").checked || document.getElementById("selectGuardianRelationFather").checked
            || document.getElementById("selectGuardianRelationOther").checked)) ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please select Guardian Relation.</span>";
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (guardianRelation.match("Other")) && (document.getElementById("relationGuardian").value == null ||
            document.getElementById("relationGuardian").value == "") ))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter Guardian Relation.</span>";
        document.getElementById("relationGuardian").focus();
    }
    else if((investorType.match("new")) && ((document.getElementById("chkMinor").value == "yes")
        && (guardianRelation.match("Other")) && (!alphabet.test(document.getElementById("relationGuardian").value))))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter valid Guardian Relation.</span>";
        document.getElementById("relationGuardian").focus();
    }
    else if(document.getElementById("dividendType_sweep").checked)
    {
        if(document.getElementById("sweepAmount").value=="")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please enter Investment Amount</span> ";
            document.getElementById("sweepAmount").focus();
        }
        else if(numeric.test(document.getElementById("sweepAmount").value)==false)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Investment Amount should be Numeric</span> ";
            document.getElementById("sweepAmount").focus();
        }
        else if(parseInt(document.getElementById("sweepAmount").value)<=0)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Enter Valid Investment Amount</span> ";
            document.getElementById("sweepAmount").focus();
        }
        else if(parseInt(document.getElementById("sweepAmount").value)<parseInt(document.getElementById("minAmt").value))
        {
            document.getElementById("result").innerHTML="<span style='color: red;'>Investment Amount should be minimum "+
                document.getElementById("minAmt").value+"</span> ";
            document.getElementById("sweepAmount").focus();
        }
        else if(document.getElementById("fundTypeNFO").value=="Select")
        {
            document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Target Fund Type </span>";
            document.getElementById("fundTypeNFO").focus();
        }
        else if(document.getElementById("schemeCodeNFO").value=="Select")
        {
            document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Target Scheme </span>";
            document.getElementById("schemeCodeNFO").focus();
        }
        else
        {
            //maturityValidationNFO();

            if(investorType.match("new"))
            {
                maturityValidationNFO(investorType,nameTitle.trim(),gender.trim(),nationality.trim(),maritalStatus.trim(),politicalExposure.trim(),pob.trim(),bankAccountType.trim(),nomineeRequired,dobNominee.trim(),guardianRelation);
            }
            else
            {
                maturityValidationNFO('','','','','','','','','','','');
                //insertRecommendationDetailsLumpSip('','','','','','','','','','',smartSIP,'');
            }
        }
    }
    else if(document.getElementById("dividendType_payout").checked)
    {
        if(document.getElementById("payoutAmount").value=="")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Enter Investment Amount</span> ";
            document.getElementById("payoutAmount").focus();
        }
        else if(numeric.test(document.getElementById("payoutAmount").value)==false)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Investment Amount should be Numeric</span> ";
            document.getElementById("payoutAmount").focus();
        }
        else if(parseInt(document.getElementById("payoutAmount").value)<=0)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Enter Valid Investment Amount</span> ";
            document.getElementById("payoutAmount").focus();
        }
        else if(parseInt(document.getElementById("payoutAmount").value)<parseInt(document.getElementById("minAmt").value))
        {
            document.getElementById("result").innerHTML="<span style='color: red;'>Investment Amount should be minimum "+
                document.getElementById("minAmt").value+"</span> ";
            document.getElementById("payoutAmount").focus();
        }
        else
        {
            //maturityValidationNFO();

            if(investorType.match("new"))
            {
                maturityValidationNFO(investorType,nameTitle.trim(),gender.trim(),nationality.trim(),maritalStatus.trim(),politicalExposure.trim(),pob.trim(),bankAccountType.trim(),nomineeRequired,dobNominee.trim(),guardianRelation);
            }
            else
            {
                maturityValidationNFO('','','','','','','','','','','');
                //insertRecommendationDetailsLumpSip('','','','','','','','','','',smartSIP,'');
            }
        }
    }
}

function maturityValidationNFO(investorType,nameTitle,gender,nationality,maritalStatus,politicalExposure,pob,bankAccountType,nomineeRequired,dobNominee,guardianRelation)
{
    var str="";
    if(investorType.match("new"))
    {
        str="nameTitle="+nameTitle.trim()+"&gender="+gender.trim()+"&nationality="+nationality.trim()
            +"&nameFatherSpouse="+document.getElementById("nameFatherSpouse").value.trim()
            +"&occupation="+document.getElementById("occupation").value.trim()
            +"&otherOccupation="+document.getElementById("otherOccupation").value.trim()
            +"&maritalStatus="+maritalStatus.trim()+"&politicalExposure="+politicalExposure.trim()
            +"&incomeSlab="+document.getElementById("incomeSlab").value.trim()
            +"&pob="+pob.trim()+"&bankAccountType="+bankAccountType.trim()
            +"&otherCountry="+document.getElementById("otherCountry").value.trim()
            +"&ifscCode="+document.getElementById("ifscCode").value.trim()
            +"&micrCode="+document.getElementById("micrCode").value.trim()
            +"&bankName="+document.getElementById("bankName").value.trim()
            +"&bankAccountNumber="+document.getElementById("bankAccountNumber").value.trim()
            +"&taxStatus="+document.getElementById("taxStatus").value.trim()
            +"&otherNationality="+document.getElementById("otherNationality").value.trim()
            +"&minorChkBox="+document.getElementById("chkMinor").value;

        if(document.getElementById("taxStatus").value == "Non Residential Indian Individual")
        {
            str=str+"&taxResidencyAddress="+document.getElementById("taxResidencyAddress").value.trim()
                +"&taxResidencyCity="+document.getElementById("taxResidencyCity").value.trim()
                +"&taxResidencycityCode="+document.getElementById("taxResidencycityCode").value.trim()
                +"&taxResidencyState="+document.getElementById("taxResidencyState").value.trim()
                +"&taxResidencyCountry="+document.getElementById("taxResidencyCountry").value.trim()
                +"&TINno="+document.getElementById("TINno").value.trim();
        }

        if(nomineeRequired.match("yes"))
        {
            str=str+"&nameNominee="+document.getElementById("nameNominee").value.trim()
                +"&relationNominee="+document.getElementById("relationNominee").value.trim()
                +"&dobNominee="+dobNominee.trim();
        }

        if(document.getElementById("chkMinor").value == "yes")
        {
            str=str+"&nameGuardian="+document.getElementById("nameGuardian").value.trim()
                +"&panGuardian="+document.getElementById("panGuardian").value.trim();
        }

        if(document.getElementById("chkMinor").value == "yes" && ((guardianRelation.match("Mother")) || (guardianRelation.match("Father"))))
        {str=str+"&relationGuardian="+guardianRelation;}
        else if(document.getElementById("chkMinor").value == "yes" && (guardianRelation.match("Other")))
        {str=str+"&relationGuardian="+document.getElementById("relationGuardian").value.trim();}

        str=str+"&bankCity="+document.getElementById("bankCity").value.trim()
            +"&nomineeRegister="+nomineeRequired.trim()
            +"&bankBranchName="+document.getElementById("bankBranch").value.trim();
    }

    if((!document.getElementById("maturityYes").checked) && (!document.getElementById("maturityNo").checked))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Option </span>";
        document.getElementById("maturityYes").focus();
    }
    else if((document.getElementById("maturityYes").checked) && (document.getElementById("fundType").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Fund Type </span>";
        document.getElementById("fundType").focus();
    }
    else if((document.getElementById("maturityYes").checked) && (document.getElementById("schemeCode").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Scheme </span>";
        document.getElementById("schemeCode").focus();
    }
    else
    {
        if(document.getElementById("dividendType_sweep").checked)
        {
            document.addForm.fullSchemeNameNFO.value = document.addForm.schemeCodeNFO[document.addForm.schemeCodeNFO.selectedIndex].text;
        }
        //document.addForm.fullSchemeNameNFO.value = document.addForm.schemeCodeNFO[document.addForm.schemeCodeNFO.selectedIndex].text;
        if(document.getElementById("maturityYes").checked)
        {
            document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
        }

        //insertInvestorDetails('','notSmartSIP');

        if(investorType.match("new"))
        {
            if(document.getElementById("chkTC").checked)
            {
                insertInvestorDetails(str,'notSmartSIP');
            }
            else
            {
                document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Accept the Terms and Condition</span>";
            }
        }
        else
        {
            insertInvestorDetails('','notSmartSIP');
        }
    }
}

function validateExisting(nfoType,smartSIP)
{
    var num = /^[0-9]*$/;
    document.getElementById("selectOne").innerHTML="";
    if ( (document.existingInvestor.folioNo.value == null || document.existingInvestor.folioNo.value == "")
        && (document.existingInvestor.panNo.value == null || document.existingInvestor.panNo.value == "") )
    {
        document.getElementById("selectOne").innerHTML="<span style='color: red;'>Please enter any one option.</span>";
        document.existingInvestor.folioNo.focus();
    }
    else if(!num.test(document.existingInvestor.folioNo.value))
    {
        document.getElementById("selectOne").innerHTML="<span style='color: red;'>Please enter number only for Folio no.</span>";
        document.existingInvestor.folioNo.focus();
    }
    else if(document.existingInvestor.folioNo.value == "0")
    {
        document.getElementById("selectOne").innerHTML="<span style='color: red;'>Please enter valid Folio no.</span>";
        document.existingInvestor.folioNo.focus();
    }
    else
    {
        valid(nfoType,smartSIP);
    }
}

function valid(nfoType,smartSIP)
{
    var xmlhttp = createRequestObject();
    var str = "folioNo="+document.getElementById('folioNo').value.trim();
    str = str + "&panNo="+document.getElementById('panNo').value.trim();

    document.getElementById('selectOne').innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if(xmlhttp.responseText.match("verified"))
             {
//                window.location.href="existingInvestorPurchase.jsp?"
//                                    +"folioNo="+document.getElementById('folioNo').value.trim()
//                                    +"&panNo="+document.getElementById('panNo').value.trim();                  

                    var f = document.createElement('form');
                    if(nfoType.match('NonNfo') && smartSIP.match('notSmartSIP'))
                    {f.action='existingInvestorPurchase.jsp';}
                    else if(nfoType.match('Nfo') && smartSIP.match('notSmartSIP'))
                    {f.action='existingInvestorNFOPurchase.jsp';}
                    else if(nfoType.match('NonNfo') && smartSIP.match('smartSIP'))
                    {f.action='sipComboRecommendation.jsp';}
                    f.method='POST';                    

                    var i=document.createElement('input');
                    i.type='hidden';
                    i.name='folioNo';
                    i.value=document.getElementById('folioNo').value.trim();
                    f.appendChild(i);

                    var j=document.createElement('input');
                    j.type='hidden';
                    j.name='panNo';
                    j.value=document.getElementById('panNo').value.trim();
                    f.appendChild(j);

                    var k=document.createElement('input');
                    k.type='hidden';
                    k.name='investorType';
                    k.value="existing";
                    f.appendChild(k);

                    document.body.appendChild(f);
                    f.submit();
             }
             else
             {
                document.getElementById('selectOne').innerHTML=xmlhttp.responseText;
             }
        }
     };
     xmlhttp.open('POST','investorValidation.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function clearSIPDivs()
{
    document.getElementById("dateRadio00").selected=true;
    document.getElementById("month00").selected=true;
    document.getElementById("year00").selected=true;
    document.getElementById("sipperiod1").checked=false;
    document.getElementById("sipperiod2").checked=false;
    document.getElementById("endMonth00").selected=true;
    document.getElementById("endYear00").selected=true;
    document.getElementById("byDate").style.display="none";
    document.getElementById("txtsipperiod").value="";    
    document.getElementById("byInstallments").style.display="none";
}

function getValidationForSIPDateRecommendation()
{
    var sip_dd_date = document.getElementById("dateRadio").value;
    /*for (var i = 0;i < (document.addForm.dateRadio.length); i++)
    {
         if (document.addForm.dateRadio[i].checked)
         {
            sip_dd_date = document.addForm.dateRadio[i].value;
            break;
         }
    }*/
    
    var str="dd="+sip_dd_date+"&mm="+document.getElementById("month").value
        +"&yyyy="+document.getElementById("year").value
        +"&frequency="+document.getElementById("sipFeq").value
        +"&transType=SIP";

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
             if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                 //alert("sipdateValidation : "+xmlhttp.responseText.trim());
                 document.getElementById("sipdateValidation").value=xmlhttp.responseText.trim();
             }
        }
    }
    xmlhttp.open('POST','getSIPPeriod.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getValidationForSIPDate()
{    
    var sip_dd_date = document.getElementById("dateRadio").value;
    /*for (var i = 0;i < (document.investmentform.dateRadio.length); i++)
    {
         if (document.investmentform.dateRadio[i].checked)
         {
          // do whatever you want with the checked radio
            sip_dd_date = document.investmentform.dateRadio[i].value;

          // only one radio can be logically checked, don't check the rest
          break;
         }
    }*/

    var transType = document.investmentform.transType.value;
    var str="dd="+sip_dd_date+"&mm="+document.getElementById("month").value
        +"&yyyy="+document.getElementById("year").value+"&frequency="+document.getElementById("sipFeq").value
        +"&transType="+transType;

    if(transType.match("SIP Renewal"))
    {
        str=str+"&showFromDate="+document.getElementById("showFromDate").value
        if(document.getElementById("showFromDate").value == 'Invalid')
        {
            str=str+"&selectedFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
            str=str+"&splitFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
        }
        else
        {
            str=str+"&selectedFromDate="+document.investmentform.selectedFromDate.value;
            str=str+"&splitFromDate="+document.investmentform.splitFromDate.value;
        }
    }
    
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
  	{
             if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                 document.getElementById("sipdateValidation").value=xmlhttp.responseText.trim();
             }
        }
    }
    xmlhttp.open('POST','getSIPPeriod.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getValidationForSIPDateInvestment()
{
    var str="", sip_dd_date="";
    var transType = document.getElementById("transType").value;
    if(transType.match("SIP") || transType.match("SIPCombo") || transType.match("STP") || transType.match("SWP"))
    {
        sip_dd_date = document.getElementById("recommendedSipDate").value;
        
        str="dd="+sip_dd_date+"&mm="+document.getElementById("month").value
            +"&yyyy="+document.getElementById("year").value+"&frequency="+document.getElementById("sipFeq").value
            +"&transType="+transType;
    }

    if(transType.match("SIP Renewal"))
    {
        str=str+"&showFromDate="+document.getElementById("showFromDate").value
        if(document.getElementById("showFromDate").value == 'Invalid')
        {
            str=str+"&selectedFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
            str=str+"&splitFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
        }
        else
        {
            str=str+"&selectedFromDate="+document.investmentform.selectedFromDate.value;
            str=str+"&splitFromDate="+document.investmentform.splitFromDate.value;
        }
    }

    if(transType.match("SIP") || transType.match("SIP Renewal") || transType.match("SIPCombo")
         || transType.match("STP") || transType.match("SWP"))
    {
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                 if(xmlhttp.responseText.match("Activity restricted"))
                 {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                 }
                 else
                 {
                     document.getElementById("sipdateValidation").value=xmlhttp.responseText.trim();
                 }
            }
        }
        xmlhttp.open('POST','getSIPPeriod.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function getValidationForSIPRenewalDate()
{
     var sip_dd_date = document.getElementById("dateRadio").value;
    /*for (var i = 0;i < (document.investmentform.dateRadio.length); i++)
    {
         if (document.investmentform.dateRadio[i].checked)
         {
          // do whatever you want with the checked radio
            sip_dd_date = document.investmentform.dateRadio[i].value;

          // only one radio can be logically checked, don't check the rest
          break;
         }
    }*/
    var transType = document.investmentform.transType.value;
    var str="dd="+sip_dd_date+"&mm="+document.getElementById("startmonth").value
        +"&yyyy="+document.getElementById("startyear").value+"&frequency="+document.getElementById("sipFeq").value
        +"&transType="+transType;

    if(transType.match("SIP Renewal")){

        str=str+"&showFromDate="+document.getElementById("showFromDate").value
        if(document.getElementById("showFromDate").value == 'Invalid')
        {
            str=str+"&selectedFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
        }
        else
        {
            str=str+"&selectedFromDate="+document.investmentform.selectedFromDate.value;
        }
        str=str+"&splitFromDate="+document.investmentform.splitFromDate.value;
    }

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
  	{
             if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                 document.getElementById("sipdateValidation").value=xmlhttp.responseText.trim();
             }
        }
    }
    xmlhttp.open('POST','getSIPRenewalPeriod.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function validateAggregationAmtRecommendation()
{
    var sip_dd_date=document.getElementById("dateRadio").value;
    /*for (var i = 0;i < (document.addForm.dateRadio.length); i++)
    {
         if (document.addForm.dateRadio[i].checked)
         {
            sip_dd_date = document.addForm.dateRadio[i].value;
            break;
         }
    }*/
    var str="";
    str="sipperiod="+document.getElementById("sipperiod1").value+"&month="+document.getElementById("month").value+
        "&year="+document.getElementById("year").value+
        "&sipperiodmonth="+document.getElementById("sipperiodmonth").value+
        "&sipperiodyear="+document.getElementById("sipperiodyear").value+
        "&sipDays="+sip_dd_date;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                 //alert("sipAggregation : "+xmlhttp.responseText);
                 document.getElementById("sipAggregation").value=xmlhttp.responseText;
             }
        }
    }
    xmlhttp.open('POST','getValidationForAggregationAmt.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function validateAggregationAmt()
{
    var sip_dd_date=document.getElementById("dateRadio").value;
    /*for (var i = 0;i < (document.investmentform.dateRadio.length); i++)
    {
         if (document.investmentform.dateRadio[i].checked)
         {
            sip_dd_date = document.investmentform.dateRadio[i].value;
            break;
         }
    }*/
    var str="";
    str="sipperiod="+document.getElementById("sipperiod1").value+"&month="+document.getElementById("month").value+
        "&year="+document.getElementById("year").value+
        "&sipperiodmonth="+document.getElementById("sipperiodmonth").value+
        "&sipperiodyear="+document.getElementById("sipperiodyear").value+
        "&sipDays="+sip_dd_date;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                 document.getElementById("sipAggregation").value=xmlhttp.responseText;
             }            
        }
    }
    xmlhttp.open('POST','getValidationForAggregationAmt.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function validateAggregationAmtInvestment()
{
    var transType = document.getElementById("transType").value;    
    if(transType.match("SIP") || transType.match("SIPCombo") || transType.match("STP") || transType.match("SWP"))
    {
        var recommendedSipType = document.getElementById("recommendedSipType").value;
        if(recommendedSipType.match("EndDate"))
        {
            var sip_dd_date = document.getElementById("recommendedSipDate").value;
            var str="";
            str="month="+document.getElementById("month").value+
                "&year="+document.getElementById("year").value+
                "&sipperiodmonth="+document.getElementById("sipperiodmonth").value+
                "&sipperiodyear="+document.getElementById("sipperiodyear").value+
                "&sipDays="+sip_dd_date;
            
            var xmlhttp = createRequestObject();
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 )
                {
                    if(xmlhttp.responseText.match("Activity restricted"))
                     {
                        alert("The Activity you are trying is restricted");
                        window.location.href="logout.jsp";
                     }
                     else
                     {
                         document.getElementById("sipAggregation").value=xmlhttp.responseText;
                     }
                }
            }
            xmlhttp.open('POST','getValidationForAggregationAmt.jsp',true);
            xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlhttp.send(str);
        }
    }
}

function clearDivforInvestmentDetails()
{
    document.getElementById("errorMsg").innerHTML="";
}

function sipperiodValue()
{
    document.getElementById("period2").value=document.investmentform.txtsipperiod.value;
}

function validationForInvest()
{
    var number= /^[0-9]+$/;
    var agrAmt="";
    var minAggregation="";
    document.getElementById("errorMsg").innerHTML="";
    var schemeCode=document.getElementById("schemeCode").value;
    if(document.investmentform.invAmt.value=="")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
        document.getElementById("invAmt").focus();
    }
    else if(!number.test(document.investmentform.invAmt.value.trim()))
    {
        document.investmentform.invAmt.value=document.investmentform.invAmt.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be Numbers </span>";
        document.getElementById("invAmt").focus();
    }
    else if(document.investmentform.invAmt.value.trim() <= 0)
    {
        document.investmentform.invAmt.value=document.investmentform.invAmt.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be greater than zero </span>";
        document.getElementById("invAmt").focus();
    }
    else if(parseInt(document.investmentform.invAmt.value) < parseInt(document.investmentform.minAmt.value))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum Amount of Investment is Rs."
            +document.investmentform.minAmt.value+"</span>";
        document.getElementById("invAmt").focus();
    }
    else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
          && ( (parseInt(document.investmentform.invAmt.value) > parseInt(document.investmentform.maxAmount.value)) ) )
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
            +document.investmentform.maxAmount.value+" for today</span>";
        document.getElementById("invAmt").focus();
    }
    else if (document.investmentform.transType.value=='SIP')
    {
        minAggregation=parseInt(document.investmentform.invAmt.value)*6;
        var recommendedSipType=document.getElementById("recommendedSipType").value;

        if(recommendedSipType.match("EndDate"))
        {
            if(document.investmentform.sipFeq.value.match('Monthly'))
            {

                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                        (parseInt(document.investmentform.sipAggregation.value)+1));
            }
            else if(document.investmentform.sipFeq.value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/6)+1));
            }
        }
        else if(recommendedSipType.match("Installments"))
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }

        if(document.investmentform.sipFeq.value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        /*else if(!document.getElementById("dateRadio1").checked && !document.getElementById("dateRadio2").checked
                && !document.getElementById("dateRadio3").checked && !document.getElementById("dateRadio4").checked
                && !document.getElementById("dateRadio5").checked && !document.getElementById("dateRadio6").checked
                && !document.getElementById("dateRadio7").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
        }*/
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Monthly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Quarterly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Half Yearly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if((!recommendedSipType.match("EndDate")) && (!recommendedSipType.match("Installments")))
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(recommendedSipType.match("EndDate")
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(recommendedSipType.match("EndDate")
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((recommendedSipType.match("EndDate")) && document.investmentform.sipFeq.value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && document.investmentform.sipFeq.value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((recommendedSipType.match("EndDate"))
            && document.investmentform.sipFeq.value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(recommendedSipType.match("Installments") && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(recommendedSipType.match("Installments")
                && (!number.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(recommendedSipType.match("Installments")
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            window.investmentform.submit();
        }
    }
    else if (document.getElementById("transType").value=='SIP Renewal')
    {
        checkDateForSIPRenewal();

        if(document.getElementById("showFromDate").value == 'Invalid')
        {
            minAggregation=parseInt(document.investmentform.invAmt.value)*6;
        }
        if(document.getElementById("showFromDate").value == 'Valid')
        {
            minAggregation=parseInt(document.investmentform.invAmt.value)*5;
        }
        if(document.getElementById("sipperiod1").checked)
        {
            if(document.investmentform.sipFeq.value.match('Monthly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                        (parseInt(document.getElementById("sipAggregation").value)+1));
            }
            else if(document.investmentform.sipFeq.value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/6)+1));
            }
        }
        else if(document.getElementById("sipperiod2").checked)
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        if(document.investmentform.sipFeq.value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        else if(document.getElementById("dateRadio").value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
        }
        else if( (document.getElementById("showFromDate").value == 'Invalid')
                && (document.getElementById("startmonth").value == "Select") )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Renewal Start Month </span>";
        }
        else if( (document.getElementById("showFromDate").value == 'Invalid')
                && (document.getElementById("startyear").value == "Select") )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Renewal Start Year </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Monthly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 30 Days </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Quarterly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 90 Days </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Half Yearly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 180 Days </span>";
        }
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Monthly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Quarterly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Half Yearly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked) && document.investmentform.sipFeq.value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && document.investmentform.sipFeq.value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
            && document.investmentform.sipFeq.value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && (!number.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            window.investmentform.submit();
        }
    }
    else
    {
        window.investmentform.submit();
    }
}

function validationForSmartSIPComboInvest()
{
    var agrAmt="", minAggregation="", fullSchemeName1="", fullSchemeName2="", fullSchemeName3="";
    var number= /^[0-9]+$/;
    document.getElementById("errorMsg").innerHTML="";

    fullSchemeName1=document.getElementById("fullSchemeName1").value;
    fullSchemeName2=document.getElementById("fullSchemeName2").value;
    fullSchemeName3=document.getElementById("fullSchemeName3").value;
    
    if(document.investmentform.invAmt1.value=="")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount for "+fullSchemeName1+"</span>";
        document.investmentform.invAmt1.focus();
    }
    else if(!number.test(document.investmentform.invAmt1.value.trim()))
    {
        document.investmentform.invAmt1.value=document.investmentform.invAmt1.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be Numbers for "+fullSchemeName1+"</span>";
        document.investmentform.invAmt1.focus();
    }
    else if(document.investmentform.invAmt1.value.trim() <= 0)
    {
        document.investmentform.invAmt1.value=document.investmentform.invAmt1.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be greater than zero for "+fullSchemeName1+"</span>";
        document.investmentform.invAmt1.focus();
    }
    else if(parseInt(document.investmentform.invAmt1.value) < parseInt(document.investmentform.minAmt1.value))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum Amount of Investment is Rs."
            +document.investmentform.minAmt1.value+" for "+fullSchemeName1+"</span>";
        document.investmentform.invAmt1.focus();
    }
    else if(document.investmentform.invAmt2.value=="")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount for "+fullSchemeName2+"</span>";
        document.investmentform.invAmt2.focus();
    }
    else if(!number.test(document.investmentform.invAmt2.value.trim()))
    {
        document.investmentform.invAmt2.value=document.investmentform.invAmt2.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be Numbers for "+fullSchemeName2+"</span>";
        document.investmentform.invAmt2.focus();
    }
    else if(document.investmentform.invAmt2.value.trim() <= 0)
    {
        document.investmentform.invAmt2.value=document.investmentform.invAmt2.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be greater than zero for "+fullSchemeName2+"</span>";
        document.investmentform.invAmt2.focus();
    }
    else if(parseInt(document.investmentform.invAmt2.value) < parseInt(document.investmentform.minAmt2.value))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum Amount of Investment is Rs."
            +document.investmentform.minAmt2.value+" for "+fullSchemeName2+"</span>";
        document.investmentform.invAmt2.focus();
    }
    else if(document.investmentform.invAmt3.value=="")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount for "+fullSchemeName3+"</span>";
        document.investmentform.invAmt3.focus();
    }
    else if(!number.test(document.investmentform.invAmt3.value.trim()))
    {
        document.investmentform.invAmt3.value=document.investmentform.invAmt3.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be Numbers for "+fullSchemeName3+"</span>";
        document.investmentform.invAmt3.focus();
    }
    else if(document.investmentform.invAmt3.value.trim() <= 0)
    {
        document.investmentform.invAmt3.value=document.investmentform.invAmt3.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be greater than zero for "+fullSchemeName3+"</span>";
        document.investmentform.invAmt3.focus();
    }
    else if(parseInt(document.investmentform.invAmt3.value) < parseInt(document.investmentform.minAmt3.value))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum Amount of Investment is Rs."
            +document.investmentform.minAmt3.value+" for "+fullSchemeName3+"</span>";
        document.investmentform.invAmt3.focus();
    }
    else if (document.investmentform.transType.value=='SIPCombo')
    {
        document.investmentform.invAmt.value = (parseInt(document.investmentform.invAmt1.value))+
            (parseInt(document.investmentform.invAmt2.value))+(parseInt(document.investmentform.invAmt3.value));
        
        minAggregation=parseInt(document.investmentform.invAmt.value)*6;
        var recommendedSipType=document.getElementById("recommendedSipType").value;
        
        if(recommendedSipType.match("EndDate"))
        {
            if(document.investmentform.sipFeq.value.match('Monthly'))
            {

                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                        (parseInt(document.investmentform.sipAggregation.value)+1));
            }
            else if(document.investmentform.sipFeq.value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/6)+1));
            }
        }
        else if(recommendedSipType.match("Installments"))
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        
        if(document.investmentform.sipFeq.value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        /*else if(!document.getElementById("dateRadio1").checked && !document.getElementById("dateRadio2").checked
                && !document.getElementById("dateRadio3").checked && !document.getElementById("dateRadio4").checked
                && !document.getElementById("dateRadio5").checked && !document.getElementById("dateRadio6").checked
                && !document.getElementById("dateRadio7").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
        }*/
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Monthly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Quarterly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Half Yearly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if((!recommendedSipType.match("EndDate")) && (!recommendedSipType.match("Installments")))
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(recommendedSipType.match("EndDate")
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(recommendedSipType.match("EndDate")
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((recommendedSipType.match("EndDate"))
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((recommendedSipType.match("EndDate")) && document.investmentform.sipFeq.value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((recommendedSipType.match("EndDate"))
                && document.investmentform.sipFeq.value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((recommendedSipType.match("EndDate"))
            && document.investmentform.sipFeq.value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(recommendedSipType.match("Installments") && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(recommendedSipType.match("Installments")
                && (!number.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(recommendedSipType.match("Installments")
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            window.investmentform.submit();
        }
    }
    else
    {
        window.investmentform.submit();
    }
}

/*
function validationForInvest()
{
    var number= /^[0-9]+$/;
    var agrAmt="";
    var minAggregation="";
    document.getElementById("errorMsg").innerHTML="";
    var schemeCode=document.getElementById("schemeCode").value;
    if(document.investmentform.invAmt.value=="")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
    }
    else if(!number.test(document.investmentform.invAmt.value.trim()))
    {
        document.investmentform.invAmt.value=document.investmentform.invAmt.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be Numbers </span>";
    }
    else if(document.investmentform.invAmt.value.trim() <= 0)
    {
        document.investmentform.invAmt.value=document.investmentform.invAmt.value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount should be greater than zero </span>";
    }
    else if(parseInt(document.investmentform.invAmt.value) < parseInt(document.investmentform.minAmt.value))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum Amount of Investment is Rs."
            +document.investmentform.minAmt.value+"</span>";
    }
    else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
          && ( (parseInt(document.investmentform.invAmt.value) > parseInt(document.investmentform.maxAmount.value)) ) )
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
            +document.investmentform.maxAmount.value+" for today</span>";
    }
    else if (document.investmentform.transType.value=='SIP')
    {    
        minAggregation=parseInt(document.investmentform.invAmt.value)*6;
        
        if(document.getElementById("sipperiod1").checked)
        {
            if(document.investmentform.sipFeq.value.match('Monthly'))
            {

                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                        (parseInt(document.investmentform.sipAggregation.value)+1));
            }
            else if(document.investmentform.sipFeq.value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.investmentform.sipAggregation.value)/6)+1));
            }
        }
        else if(document.getElementById("sipperiod2").checked)
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        if(document.investmentform.sipFeq.value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        else if(!document.getElementById("dateRadio1").checked && !document.getElementById("dateRadio2").checked
                && !document.getElementById("dateRadio3").checked && !document.getElementById("dateRadio4").checked
                && !document.getElementById("dateRadio5").checked && !document.getElementById("dateRadio6").checked
                && !document.getElementById("dateRadio7").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
        }
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Monthly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Quarterly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Half Yearly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked) && document.investmentform.sipFeq.value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && document.investmentform.sipFeq.value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
            && document.investmentform.sipFeq.value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && (!number.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            window.investmentform.submit();
        }
    }
    else if (document.getElementById("transType").value=='SIP Renewal')
    {
        checkDateForSIPRenewal();

        if(document.getElementById("showFromDate").value == 'Invalid')
        {
            minAggregation=parseInt(document.investmentform.invAmt.value)*6;
        }
        if(document.getElementById("showFromDate").value == 'Valid')
        {
            minAggregation=parseInt(document.investmentform.invAmt.value)*5;
        }        
        if(document.getElementById("sipperiod1").checked)
        {
            if(document.investmentform.sipFeq.value.match('Monthly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                        (parseInt(document.getElementById("sipAggregation").value)+1));
            }
            else if(document.investmentform.sipFeq.value.match('Quarterly'))
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/3)+1));
            }
            else
            {
                agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    ((parseInt(document.getElementById("sipAggregation").value)/6)+1));
            }
        }
        else if(document.getElementById("sipperiod2").checked)
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                (parseInt(document.getElementById("txtsipperiod").value)+1));
        }
        if(document.investmentform.sipFeq.value=="0")
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
        }
        else if(!document.getElementById("dateRadio1").checked && !document.getElementById("dateRadio2").checked
                && !document.getElementById("dateRadio3").checked && !document.getElementById("dateRadio4").checked
                && !document.getElementById("dateRadio5").checked && !document.getElementById("dateRadio6").checked
                && !document.getElementById("dateRadio7").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
        }
        else if( (document.getElementById("showFromDate").value == 'Invalid')
                && (document.getElementById("startmonth").value == "Select") )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Renewal Start Month </span>";
        }
        else if( (document.getElementById("showFromDate").value == 'Invalid')
                && (document.getElementById("startyear").value == "Select") )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Renewal Start Year </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Monthly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 30 Days </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Quarterly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 90 Days </span>";
        }
        else if(((document.getElementById("showFromDate").value == 'Invalid')) && (document.getElementById("sipdateValidation").value == "Invalid")
                && (document.investmentform.sipFeq.value.match('Half Yearly')))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Renewal Start Date should be greater than 180 Days </span>";
        }
        else if(document.getElementById("month").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("year").value == "Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Date of 2nd installment </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Monthly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Quarterly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
        }
        else if(document.getElementById("sipdateValidation").value == "Invalid"
                && document.investmentform.sipFeq.value.match('Half Yearly'))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
        }
        else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodmonth").value=="Select")
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if(document.getElementById("sipperiod1").checked
                && document.getElementById("sipperiodyear").value=="Select")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Duration of SIP </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
    && (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    && (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
        }
        else if((document.getElementById("sipperiod1").checked) && document.investmentform.sipFeq.value.match('Monthly')
                && (parseInt(document.getElementById("sipAggregation").value) <5 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
                && document.investmentform.sipFeq.value.match('Quarterly')
                && (parseInt(document.getElementById("sipAggregation").value) <15 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if((document.getElementById("sipperiod1").checked)
            && document.investmentform.sipFeq.value.match('Half Yearly')
            && (parseInt(document.getElementById("sipAggregation").value) <30 ))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
        }
        else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
        {
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Please Select Number of Installments </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && (!number.test(document.getElementById("txtsipperiod").value.trim())))
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>Number of Installments Should be Number Only </span>";
        }
        else if(document.getElementById("sipperiod2").checked
                && parseInt(document.getElementById("txtsipperiod").value)<5)
        {
             document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
             document.getElementById("errorMsg").innerHTML=
                 "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
        }
        else if(parseInt(agrAmt)<parseInt(minAggregation))
        {
            document.getElementById("errorMsg").innerHTML=
                "<span style='color: red;'>Aggregate amount is insufficient </span>";
        }
        else
        {
            window.investmentform.submit();
        }
    }
    else
    {
        window.investmentform.submit();
    }
}*/

function getAmtSmartSIPCombo(transAmt1,transAmt2,transAmt3)
{
    document.getElementById("invAmt1").value=transAmt1;
    document.getElementById("invAmt2").value=transAmt2;
    document.getElementById("invAmt3").value=transAmt3;
}

function getAmt(transAmt)
{
    document.getElementById("invAmt").value=transAmt;
}

function visibleByDateDiv()
{
    if(document.getElementById("sipperiod1").value == "SIP End Date")
    {
        document.getElementById("byDate").style.display="block";
        document.getElementById("byInstallments").style.display="none";
        document.getElementById("mode").value="BysipendDate";
    }
}

function HideByDateDiv()
{
    if(document.getElementById("sipperiod2").value == "sipInstallments")
    {
        document.getElementById("byInstallments").style.display="block";
        document.getElementById("txtsipperiod").value="";
        document.getElementById("byDate").style.display="none";
        document.getElementById("mode").value="BysipInstallments";
    }
}

function resendOTPDetails(mobileNo)
{
    var str="srno="+document.varificationform.srno.value.trim()
           +"&mobileNo="+mobileNo;
    var xmlhttp = createRequestObject();
    //document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            var output=xmlhttp.responseText.trim();
            if(output.match("Session expired"))
            {
                alert("Session expired");
                window.location.href="login.html";
            }
            else if(output.match("Activity restricted"))
            {
               alert("The Activity you are trying is restricted");
               window.location.href="logout.jsp";
            }
            else if(output.match("yes"))
            {
                document.getElementById("result").innerHTML='OTP Resent.';
            }
            else if(output.match("no"))
            {
                document.getElementById("result").innerHTML='OTP cannot be sent. Please try again.';
            }
            else
            {
                document.getElementById("result").innerHTML='Error while generating OTP. Please try after some time.';
            }
        }
    }
    xmlhttp.open('POST','resendOTPDetails.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function varifyOTP(mobileNo)
{
    if(document.varificationform.otpcode.value == "" || document.varificationform.otpcode.value == null) {
        document.getElementById("result").innerHTML="Please enter the OTP.";
    }
    else
    {
        var str="otpNo="+document.varificationform.otpcode.value.trim()
               +"&mobileNo="+mobileNo;
        var xmlhttp = createRequestObject();
        document.getElementById("varificationcode").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                var output = xmlhttp.responseText.trim();
                if(output.match("Session expired"))
                {
                    alert("Session expired");
                    window.location.href="login.html";
                }
                else if(output.match("Activity restricted"))
                {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                }
                else if(output.match("yes"))
                {
                    window.varificationform.submit();
                }
                else
                {
                    document.getElementById("result").innerHTML=output;
                }
            }
        }
        xmlhttp.open('POST','varifyOPTDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function confirmBankDetailsForNewInvestor()
{
    if((!document.getElementById("chkconfirmation").checked))
    {
       alert("1");
        document.getElementById("chkresult").innerHTML="<span style='color: red;'>Please Accept the Terms and Condition </span>";
        document.confirmForm.chkconfirmation.focus();
    }
    else
    {
        alert("2");
        var insertStr=""
        +"srno="+document.confirmForm.srno.value
        +"&firstName="+document.confirmForm.firstName.value
        +"&gender="+document.confirmForm.gender.value
        +"&dob="+document.confirmForm.dob.value
        +"&emailId="+document.confirmForm.emailId.value
        +"&mobNo="+document.confirmForm.mobNo.value
        +"&nationality="+document.confirmForm.nationality.value
        +"&nameFatherSpouse="+document.confirmForm.nameFatherSpouse.value
        +"&occupation="+document.confirmForm.occupation.value
        +"&maritalStatus="+document.confirmForm.maritalStatus.value
        +"&incomeSlab="+document.confirmForm.incomeSlab.value
        +"&politicalExposure="+document.confirmForm.politicalExposure.value
        +"&pob="+document.confirmForm.pob.value
        +"&taxStatus="+document.confirmForm.taxStatus.value
        +"&taxResidencyAddress="+document.confirmForm.taxResidencyAddress.value
        +"&taxResidencyCity="+document.confirmForm.taxResidencyCity.value
        +"&taxResidencycityCode="+document.confirmForm.taxResidencycityCode.value
        +"&taxResidencyState="+document.confirmForm.taxResidencyState.value
        +"&taxResidencyCountry="+document.confirmForm.taxResidencyCountry.value
        +"&TINno="+document.confirmForm.TINno.value
        +"&ifscCode="+document.confirmForm.ifscCode.value
        +"&micrCode="+document.confirmForm.micrCode.value
        +"&bankBranch="+document.confirmForm.bankBranch.value
        +"&bankName="+document.confirmForm.bankName.value
        +"&bankCity="+document.confirmForm.bankCity.value
        +"&bankAccountNumber="+document.confirmForm.bankAccountNumber.value
        +"&bankAccountType="+document.confirmForm.bankAccountType.value
        +"&nameNominee="+document.confirmForm.nameNominee.value
        +"&relationNominee="+document.confirmForm.relationNominee.value
        +"&dobNominee="+document.confirmForm.dobNominee.value
        +"&nameGuardian="+document.confirmForm.nameGuardian.value
        +"&relationGuardian="+document.confirmForm.relationGuardian.value
        +"&panGuardian="+document.confirmForm.panGuardian.value;
    
        insertBankDetails(insertStr);
        //window.confirmForm.submit();
    }
}

function varifyOTPForBankDetails(mobileNo)
{
    var insertStr=""
        +"srno="+document.varificationform.srno.value
        +"&firstName="+document.varificationform.firstName.value
        +"&gender="+document.varificationform.gender.value
        +"&dob="+document.varificationform.dob.value
        +"&emailId="+document.varificationform.emailId.value
        +"&mobNo="+document.varificationform.mobNo.value
        +"&nationality="+document.varificationform.nationality.value
        +"&firstNameFatherSpouse="+document.varificationform.firstNameFatherSpouse.value
        +"&occupation="+document.varificationform.occupation.value
        +"&maritalStatus="+document.varificationform.maritalStatus.value
        +"&incomeSlab="+document.varificationform.incomeSlab.value
        +"&politicalExposure="+document.varificationform.politicalExposure.value
        +"&pob="+document.varificationform.pob.value
        +"&taxStatus="+document.varificationform.taxStatus.value
        +"&taxResidencyAddress="+document.varificationform.taxResidencyAddress.value
        +"&taxResidencycityCode="+document.varificationform.taxResidencycityCode.value
        +"&taxResidencyState="+document.varificationform.taxResidencyState.value
        +"&taxResidencyCountry="+document.varificationform.taxResidencyCountry.value
        +"&TINno="+document.varificationform.TINno.value
        +"&ifscCode="+document.varificationform.ifscCode.value
        +"&micrCode="+document.varificationform.micrCode.value
        +"&bankBranch="+document.varificationform.bankBranch.value
        +"&bankName="+document.varificationform.bankName.value
        +"&bankCity="+document.varificationform.bankCity.value
        +"&bankAccountNumber="+document.varificationform.bankAccountNumber.value
        +"&bankAccountType="+document.varificationform.bankAccountType.value
        +"&nameNominee="+document.varificationform.nameNominee.value
        +"&dobNominee="+document.varificationform.dobNominee.value
        +"&nameGuardian="+document.varificationform.nameGuardian.value
        +"&panGuardian="+document.varificationform.panGuardian.value;

    if(document.varificationform.otpcode.value == "" || document.varificationform.otpcode.value == null) {
        document.getElementById("result").innerHTML="Please enter the OTP.";
    }
    else
    {
        var str="otpNo="+document.varificationform.otpcode.value.trim()
               +"&mobileNo="+mobileNo;
        var xmlhttp = createRequestObject();
        document.getElementById("varificationcode").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                var output = xmlhttp.responseText.trim();
                if(output.match("Session expired"))
                {
                    alert("Session expired");
                    window.location.href="login.html";
                }
                else if(output.match("Activity restricted"))
                {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                }
                else if(output.match("yes"))
                {
                    insertBankDetails(insertStr);
                }
                else
                {
                    document.getElementById("result").innerHTML=output;
                }
            }
        }
        xmlhttp.open('POST','varifyOPTDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function insertBankDetails(insertStr)
{
    var str = insertStr;
    var xmlhttp = createRequestObject();
    alert("3");
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.trim() == 'Session expired')
            {
                alert("Session expired");
                window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else if(xmlhttp.responseText.match("Successful"))
            {
                //window.varificationform.submit();
                window.confirmForm.submit();
            }
            else if(xmlhttp.responseText.match("Failure"))
            {
                document.getElementById("result").innerHTML="Your details failed to submit";
            }
        }
    }
    xmlhttp.open('POST','insertBankDetailsForNewInvestor.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function validateConfirmation(nfoType)
{
    document.getElementById("result").innerHTML="";
    var sweepType="";
    var maturityType="";
    if((!document.getElementById("chkconfirmation").checked) || (!document.getElementById("chkconfirmation1").checked))
    {  
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Accept the Term and Condition </span>";
    }
    else
    {
        var str=""
        +"investorType="+document.frmverification.investorType.value
        +"&transType="+document.frmverification.transType.value
        +"&folioNo="+document.frmverification.folioNo.value
        +"&panNo="+document.frmverification.panNo.value
        +"&schemeName="+document.frmverification.schemeName.value
        +"&transAmt="+document.frmverification.transAmt.value
        +"&reinvestmentCode="+document.frmverification.reinvestmentCode.value
        +"&arnCode="+document.frmverification.arnCode.value
        +"&schemeRefNo="+document.frmverification.schemeRefNo.value
        +"&nfoType="+nfoType;

        if(nfoType.match("Yes"))
        {
            sweepType=document.frmverification.sweepType.value;
            str = str + "&sweepType="+sweepType;
            if(sweepType.match("Yes"))
            {
                str = str + "&sweepSchemeRefNo="+document.frmverification.sweepSchemeRefNo.value;
            }
            maturityType=document.frmverification.maturityType.value;
            str = str + "&maturityType="+maturityType;
            if(maturityType.match("Yes"))
            {
                str = str + "&maturitySchemeRefNo="+document.frmverification.maturitySchemeRefNo.value;
            }            
        }

        if((document.frmverification.transType.value.match("SIP")) || (document.frmverification.transType.value.match("SIP Renewal")))
        {
            str = str + ""                        
            +"&SIPFrequencyCode="+document.frmverification.SIPFrequencyCode.value
            +"&sipDate="+document.frmverification.dateRadio.value
            +"&fromDate="+document.frmverification.fromDate.value
            +"&toDate="+document.frmverification.toDate.value;
        }

        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            document.getElementById("result").innerHTML="Please wait while your Transaction Id is being processed.....<br/>Please do not refresh your browser.";
            document.getElementById("trxnIdButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
            if (xmlhttp.readyState==4 )
            {
                if(xmlhttp.responseText.match("Session expired"))
                {
                    alert("Your Session Has Expired. Please close the browser and open the link again from the mail you have received.");
                    window.location.href="logout.jsp";
                }
                else
                {
                    var responseArr="";
                    var outputArr=xmlhttp.responseText.trim();
                    //alert("Output : "+outputArr);
                    responseArr=outputArr.split('|');
                    //alert("responseArr[0] : "+responseArr[0]);
                    //alert("responseArr[1] : "+responseArr[1]);
                    
                    if(responseArr[0].match("failed"))
                    {
                        document.getElementById("result").innerHTML=responseArr[1];
                        document.getElementById("trxnIdButton").innerHTML="";
                    }
                    else if(responseArr[0].match("success"))
                    {
                        document.getElementById("result").innerHTML="Re-directing to Payment Page, Pls wait...<br/>Please do not refresh your browser.";
                        document.getElementById("trxnIdButton").innerHTML="";
                        window.frmverification.submit();
                        //window.location.href="getPaymentDetails.jsp";
                    }
                }
            }
        }
        xmlhttp.open('POST','getTransactionIdForPurchase.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
        
    }
}

function validateConfirmationSmartSIPCombo()
{
    document.getElementById("result").innerHTML="";
    if((!document.getElementById("chkconfirmation").checked))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Accept the Term and Condition </span>";
    }
    else
    {
        var str=""
        +"investorType="+document.frmverification.investorType.value
        +"&transType="+document.frmverification.transType.value
        +"&folioNo="+document.frmverification.folioNo.value
        +"&panNo="+document.frmverification.panNo.value
        +"&sipComboType="+document.frmverification.sipComboType.value
        +"&schemeCode1="+document.frmverification.schemeCode1.value
        +"&schemeCode2="+document.frmverification.schemeCode2.value
        +"&schemeCode3="+document.frmverification.schemeCode3.value
        +"&amt1="+document.frmverification.amt1.value
        +"&amt2="+document.frmverification.amt2.value
        +"&amt3="+document.frmverification.amt3.value
        +"&transAmt="+document.frmverification.transAmt.value
        +"&reinvestmentCode1="+document.frmverification.reinvestmentCode1.value
        +"&reinvestmentCode2="+document.frmverification.reinvestmentCode2.value
        +"&reinvestmentCode3="+document.frmverification.reinvestmentCode3.value
        +"&arnCode="+document.frmverification.arnCode.value
        +"&schemeRefNo1="+document.frmverification.schemeRefNo1.value
        +"&schemeRefNo2="+document.frmverification.schemeRefNo2.value
        +"&schemeRefNo3="+document.frmverification.schemeRefNo3.value;

        if(document.frmverification.transType.value.match("SIPCombo"))
        {
            str = str + ""
            +"&SIPFrequencyCode="+document.frmverification.SIPFrequencyCode.value
            +"&sipDate="+document.frmverification.dateRadio.value
            +"&fromDate="+document.frmverification.fromDate.value
            +"&toDate="+document.frmverification.toDate.value;
        }

        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            document.getElementById("result").innerHTML="Please wait while your Transaction Id is being processed.....<br/>Please do not refresh your browser.";
            document.getElementById("trxnIdButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
            if (xmlhttp.readyState==4 )
            {
                if(xmlhttp.responseText.match("Session expired"))
                {
                    alert("Your Session Has Expired. Please close the browser and open the link again from the mail you have received.");
                    window.location.href="logout.jsp";
                }
                else if(xmlhttp.responseText.match("failed"))
                {
                    document.getElementById("result").innerHTML="Sorry! Your Transaction Id cannot be generated. ";
                    document.getElementById("trxnIdButton").innerHTML="";
                }
                else
                {
                    document.getElementById("result").innerHTML="Re-directing to Payment Page, Pls wait...<br/>Please do not refresh your browser.";
                    document.getElementById("trxnIdButton").innerHTML="";
                    window.frmverification.submit();
                    //window.location.href="getPaymentDetails.jsp";
                }
            }
        }
        xmlhttp.open('POST','getTransactionIdForSmartSIPCombo.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);

    }
}


function getBankMaster(bankpaymentType,smartSIPType)
{
   //var folio_no=document.getPaymentDetails.folio_no.value;
    var str="paymentMode="+bankpaymentType+"&smartSIPType="+smartSIPType+"&folio_no="+document.getPaymentDetails.folio_no.value;
 // alert(str);
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
  	{
            if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else
            {
                document.getElementById("bankMaster").innerHTML=xmlhttp.responseText;
                if(bankpaymentType=="Net Banking")
                {
                    document.getElementById("headingText").innerHTML="<span style='color:#f00;'>*</span> <strong>For Payment via Internet Banking</strong>";
                    document.getElementById("descText").innerHTML="You need to have an internet banking account with the selected bank to make the payment, on successful login to you internet banking account , the amount to be paid will be displayed and post successful payment you will be redirected to the L&T Mutual Fund site where a message on whether your transaction is successful / unsuccessful will be flashed.";
                }
                else if(bankpaymentType=="RuPay Debit Cards")
                {
                    document.getElementById("headingText").innerHTML="<span style='color:#f00;'>*</span> <strong>For Payment via RuPay Debit Cards</strong>";
                    document.getElementById("descText").innerHTML="You need to have the Rupay card details of the selected bank to make the payment,    on successful payment you will be redirected to the L&T Mutual Fund site where a message on whether your transaction is successful / unsuccessful will be flashed.";
                }
                else
                {
                    document.getElementById("headingText").innerHTML="<span style='color:#f00;'>*</span> <strong>For Payment via Debit Cards</strong>";
                    document.getElementById("descText").innerHTML="You need to have the debit card details of the selected bank to make the payment,    on successful payment you will be redirected to the L&T Mutual Fund site where a message on whether your transaction is successful / unsuccessful will be flashed.";
                }
            }
        }
    }
    xmlhttp.open('POST','getBankMaster.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function makePaymentBankValidate()
{
    if( (!document.getElementById("internetBanking").checked)
       && (!document.getElementById("card1").checked)
       && (!document.getElementById("card2").checked)
       && (!document.getElementById("card3").checked) 
       &&  (!document.getElementById("card4").checked)
       &&  (!document.getElementById("card5").checked)
       &&  (!document.getElementById("card6").checked))
    {
        document.getElementById("errorMsg").innerHTML="Please select payment option.";
    }
    else if (document.getElementById("bankCodeforpayment").value == "0")
    {
        document.getElementById("errorMsg").innerHTML="Please select the bank.";
    }
    else
    {
        window.getPaymentDetails.submit();
    }
}

function stpSwpValidation(switchOrRedemption,nfoType)
{
    document.getElementById("result").innerHTML="";   
    var regex = /^[a-zA-Z]*$/;
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var numeric = /^[0-9]*$/;
    var alphanumeric = /^[a-zA-Z0-9\-\s]+$/;    
    var units = /^-{0,1}\d*\.{0,1}\d+$/;
    //var schemeCode = document.getElementById("schemeCode").value;
    var schemeCode = "";

    if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("fundType").value != "Select")
       && (document.getElementById("schemeCode").value != "Select"))
    {
        schemeCode = document.getElementById("schemeCode").value;
    }

    var minAggregation="",agrAmt="";
    minAggregation=parseInt(document.getElementById("recAmount").value)*6;

    if(document.getElementById("sipperiod1").checked)
    {
        //alert("sipAggregation : "+parseInt(document.getElementById("sipAggregation").value));
        if(document.getElementById("sipFeq").value.match('Daily'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                    (parseInt(document.getElementById("sipAggregation").value)+1));
            //alert("Daily agrAmt : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Weekly'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                ((parseInt(document.getElementById("sipAggregation").value))+1));
            //alert("Weekly agrAmt : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Fortnightly'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                ((parseInt(document.getElementById("sipAggregation").value))+1));
            //alert("Fortnightly agrAmt : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Monthly'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                    (parseInt(document.getElementById("sipAggregation").value)+1));
            //alert("Monthly agrAmt : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Quarterly'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                ((parseInt(document.getElementById("sipAggregation").value)/3)+1));
            //alert("Quarterly agrAmt /3 : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Half Yearly'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                ((parseInt(document.getElementById("sipAggregation").value)/6)+1));
            //alert("Half Yearly agrAmt /6 : "+agrAmt);
        }
        else if(document.getElementById("sipFeq").value.match('Annually'))
        {
            agrAmt=(parseInt(document.getElementById("recAmount").value)*
                ((parseInt(document.getElementById("sipAggregation").value)/12)+1));
            //alert("Annually agrAmt /12 : "+agrAmt);
        }
    }
    else if(document.getElementById("sipperiod2").checked)
    {
        agrAmt=(parseInt(document.getElementById("recAmount").value)*
            (parseInt(document.getElementById("txtsipperiod").value)+1));
    }
    
    if(document.addForm.firstName.value == "")
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>First Name Should not be blank</span>";
        document.addForm.firstName.focus();
    }
    else if(document.getElementById("mobileNo").value=="")
    {        
           document.getElementById("result").innerHTML=
               "<span style='color: red;'>Mobile Number Should not be blank </span>";
           document.getElementById("mobileNo").focus();
    }
    else if(mob.test(document.getElementById("mobileNo").value) == false)
    {        
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please enter valid mobile number.</span> ";
        document.getElementById("mobileNo").focus();
    }
    else if(document.getElementById("emailId").value=="" || document.getElementById("emailId").value==null)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Email Id Should not be blank</span>";
        document.getElementById("emailId").focus();
    }
    /*else if (!validate_email(document.getElementById("emailId").value))
    {
        document.getElementById("emailId").focus();
    }*/
    else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("fundType").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Fund Type </span>";
        document.getElementById("fundType").focus();
    }
    else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("schemeCode").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Scheme </span>";
        document.getElementById("schemeCode").focus();
    }
    else if(document.getElementById("recAmount").value=="")
    {
        document.getElementById("result").innerHTML=
        "<span style='color: red;'>Please Enter Amount</span> ";
        document.getElementById("recAmount").focus();
    }
    else if(units.test(document.getElementById("recAmount").value)==false)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Amount should be Numeric Only</span>";
        document.getElementById("recAmount").focus();
    }
    else if(parseInt(document.getElementById("recAmount").value)<=0)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'><span style='color: red;'>Please Enter Valid Amount</span>";
        document.getElementById("recAmount").focus();
    }
    /*else if(parseFloat(document.getElementById("recAmount").value)<parseFloat(document.getElementById("minAmt").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Min Amount should be "
            +document.getElementById("minAmt").value+"</span> ";
        document.getElementById("recAmount").focus();
    }*/
    else if( (switchOrRedemption.match("Switch"))
          && (parseFloat(document.getElementById("recAmount").value)<parseFloat(document.getElementById("so_minimum_amount").value)))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Min Amount should be "
            +document.getElementById("so_minimum_amount").value+"</span> ";
        document.getElementById("recAmount").focus();
    }
    else if( (switchOrRedemption.match("Redeem"))
          && (parseFloat(document.getElementById("recAmount").value)<parseFloat(document.getElementById("redemption_minimum_amount").value)))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Min Amount should be "
            +document.getElementById("redemption_minimum_amount").value+"</span> ";
        document.getElementById("recAmount").focus();
    }
    else if( (switchOrRedemption.match("Switch"))
          && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
          && (parseFloat(document.getElementById("recAmount").value)>parseFloat(document.getElementById("maxAmount").value)) )
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Suggested Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
            +document.getElementById("maxAmount").value+" for specific investor</span> ";
        document.getElementById("recAmount").focus();
    }
    else if(document.getElementById("sipFeq").value=="0")
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select SIP Frequency</span>";
    }
    else if(document.getElementById("dateRadio").value=="0")
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select SIP Date </span>";
    }
    else if(document.getElementById("month").value == "Select")
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select Date of 2nd installment </span>";
    }
    else if(document.getElementById("year").value == "Select")
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select Date of 2nd installment </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Daily'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 01 Day </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Weekly'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 07 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Fortnightly'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 14 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Monthly'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Quarterly'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Half Yearly'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.getElementById("sipFeq").value.match('Annually'))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 360 Days </span>";
    }
    else if(!document.getElementById("sipperiod1").checked && !document.getElementById("sipperiod2").checked)
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select SIP Period </span>";
    }
    else if(document.getElementById("sipperiod1").checked
            && document.getElementById("sipperiodmonth").value=="Select")
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Select Duration of SIP </span>";
    }
    else if(document.getElementById("sipperiod1").checked
            && document.getElementById("sipperiodyear").value=="Select")
    {
         document.getElementById("result").innerHTML=
             "<span style='color: red;'>Please Select Duration of SIP </span>";
    }
    else if((document.getElementById("sipperiod1").checked)
            && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
    }
    else if((document.getElementById("sipperiod1").checked)
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
&& (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
    }
    else if((document.getElementById("sipperiod1").checked)
            &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
&& (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Daily')
            && (parseInt(document.getElementById("sipAggregation").value) <5 ))
    {
        //alert("Daily <5 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Weekly')
            && (parseInt(document.getElementById("sipAggregation").value) <15 ))
    {
        //alert("Weekly <15 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Fortnightly')
        && (parseInt(document.getElementById("sipAggregation").value) <30 ))
    {
        //alert("Fortnightly <30 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Monthly')
            && (parseInt(document.getElementById("sipAggregation").value) <5 ))
    {
        //alert("Monthly <5 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Quarterly')
            && (parseInt(document.getElementById("sipAggregation").value) <15 ))
    {
        //alert("Quarterly <15 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Half Yearly')
        && (parseInt(document.getElementById("sipAggregation").value) <30 ))
    {
        //alert("Half Yearly <30 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((document.getElementById("sipperiod1").checked) && document.getElementById("sipFeq").value.match('Annually')
        && (parseInt(document.getElementById("sipAggregation").value) <60 ))
    {
        //alert("Annually <60 : "+(parseInt(document.getElementById("sipAggregation").value)));
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if(document.getElementById("sipperiod2").checked && document.getElementById("txtsipperiod").value=="")
    {
         document.getElementById("result").innerHTML=
             "<span style='color: red;'>Please Select Number of Installments </span>";
    }
    else if(document.getElementById("sipperiod2").checked
            && (!numeric.test(document.getElementById("txtsipperiod").value.trim())))
    {
         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
         document.getElementById("result").innerHTML=
             "<span style='color: red;'>Number of Installments Should be Number Only </span>";
    }
    else if(document.getElementById("sipperiod2").checked
            && parseInt(document.getElementById("txtsipperiod").value)<5)
    {
         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
         document.getElementById("result").innerHTML=
             "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
    }
    else if(parseInt(agrAmt)<parseInt(minAggregation))
    {
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Aggregate amount is insufficient </span>";
    }
    else
    {
        if(switchOrRedemption.match("Switch"))
        {
            document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
        }
        //insertRecommendationDetailsLumpSip('','','','','','','','','','',smartSIP,'');
        insertStpSwpDetails(switchOrRedemption,nfoType);
    }
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
}

function insertStpSwpDetails(switchOrRedemption,nfoType)
{
    var str="";
    var investorType="existing";
    var recommendedValue="Partial";

     var xmlhttp = createRequestObject();
     var inSchemecode="";
     var foliono=document.getElementById("folioNo").value;
     var panNo = document.getElementById("panNo").value;
     var firstName = document.getElementById("firstName").value;
     var dob = document.getElementById("dob").value;
     var emailId=document.getElementById("emailId").value;
     var mobileNo=document.getElementById("mobileNo").value;

     if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
     {
        inSchemecode=document.getElementById("schemeCode").value;
     }

     var schemeCode=document.getElementById("existingSchemeCode").value;
     var existingSchemeRefNo=document.getElementById("existingSchemeRefNo").value;
     var recAmount="";

     str = str + "transactionType="+switchOrRedemption+"&folioNo="+foliono+"&panNo="+panNo+"&emailId="+emailId+"&mobileNo="+mobileNo+
             "&inSchemecode="+inSchemecode+"&schemeCode="+schemeCode+"&existingSchemeRefNo="+existingSchemeRefNo+
             "&recommendedValue="+recommendedValue+"&investorType="+investorType+"&nfoType="+nfoType;

     str = str+"&sipFeq="+document.getElementById("sipFeq").value
            +"&date="+document.addForm.dateRadio.value
            +"&secondMonth="+document.getElementById("month").value
            +"&secondYear="+document.getElementById("year").value;

    if(document.getElementById("sipperiod1").checked)
    {
        str = str+"&sipType=EndDate"
                +"&endMonth="+document.getElementById("sipperiodmonth").value
                +"&endYear="+document.getElementById("sipperiodyear").value;
    }
    else if(document.getElementById("sipperiod2").checked)
    {
        str = str+"&sipType=Installments"
                +"&installments="+document.getElementById("txtsipperiod").value;
    }

     var schemeName="";
     recAmount=document.getElementById("recAmount").value;
     
     str =str +"&recAmount="+recAmount+"&firstName="+firstName;
     str =str +"&dob="+dob;
     str =str +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);
     
     document.getElementById("result").innerHTML="<img alt='loading' src='images/loader.white.gif'/>";
     xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
                alert("Session expired");
                window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else
            {
               document.getElementById('switchRedeemResult').innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','insertStpSwpFolioDetails.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function switchRedeemValidation(switchOrRedemption,nfoType)
{    
    document.getElementById("result").innerHTML="";   
    var regex = /^[a-zA-Z]*$/;
    var mob = /^[1-9]{1}[0-9]{9}$/;
    var numeric = /^[0-9]*$/;
    var alphanumeric = /^[a-zA-Z0-9\-\s]+$/;    
    var units = /^-{0,1}\d*\.{0,1}\d+$/;
    //var schemeCode = document.getElementById("schemeCode").value;
    var schemeCode = "";

    if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("fundType").value != "Select")
       && (document.getElementById("schemeCode").value != "Select"))
    {
        schemeCode = document.getElementById("schemeCode").value;
    }
    
    if(document.addForm.firstName.value == "")
    {        
        document.getElementById("result").innerHTML="<span style='color: red;'>First Name Should not be blank</span>";
        document.addForm.firstName.focus();
    }
    else if(document.getElementById("mobileNo").value=="")
    {        
           document.getElementById("result").innerHTML=
               "<span style='color: red;'>Mobile Number Should not be blank </span>";
           document.getElementById("mobileNo").focus();
    }
    else if(mob.test(document.getElementById("mobileNo").value) == false)
    {        
        document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please enter valid mobile number.</span> ";
        document.getElementById("mobileNo").focus();
    }
    else if(document.getElementById("emailId").value=="" || document.getElementById("emailId").value==null)
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Email Id Should not be blank</span>";
        document.getElementById("emailId").focus();
    }
    /*else if (!validate_email(document.getElementById("emailId").value))
    {
        document.getElementById("emailId").focus();
    }*/
    else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("fundType").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Fund Type </span>";
        document.getElementById("fundType").focus();
    }
    else if((nfoType.match("No")) && (switchOrRedemption.match("Switch"))
        && (document.getElementById("schemeCode").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Scheme </span>";
        document.getElementById("schemeCode").focus();
    }
  else if (document.getElementById("transactionType_partial").checked)
  {
    if((document.getElementById("transactionType_partial").value=="Partial")
            && (document.getElementById("partialAmountRadio").checked))
    {
        if(document.getElementById("partialAmount").value=="")
        {
            document.getElementById("result").innerHTML=
            "<span style='color: red;'>Please Enter Amount</span> ";
            document.getElementById("partialAmount").focus();
        }
        else if(units.test(document.getElementById("partialAmount").value)==false)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Amount should be Numeric Only</span>";
            document.getElementById("partialAmount").focus();
        }
        else if(parseInt(document.getElementById("partialAmount").value)<=0)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'><span style='color: red;'>Please Enter Valid Amount</span>";
            document.getElementById("partialAmount").focus();
        }
        else if(parseFloat(document.getElementById("partialAmount").value)<parseFloat(document.getElementById("minAmt").value))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Min Amount should be "
                +document.getElementById("minAmt").value+"</span> ";
            document.getElementById("partialAmount").focus();
        }
        else if(parseFloat(document.getElementById("partialAmount").value)>parseFloat(document.getElementById("fullAmount").value))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Amount should not be greater than "
                +document.getElementById("fullAmount").value+"</span> ";
            document.getElementById("partialAmount").focus();
        }
        else if( (switchOrRedemption.match("Switch"))
              && (parseFloat(document.getElementById("partialAmount").value)<parseFloat(document.getElementById("so_minimum_amount").value)))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Amount should not be greater than "
                +document.getElementById("so_minimum_amount").value+"</span> ";
            document.getElementById("partialAmount").focus();
        }
        else if( (switchOrRedemption.match("Switch"))
              && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
              && (parseFloat(document.getElementById("partialAmount").value)>parseFloat(document.getElementById("maxAmount").value)) )
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Suggested Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
                +document.getElementById("maxAmount").value+" for specific investor</span> ";
            document.getElementById("partialAmount").focus();
        }
        else
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
                        +document.getElementById("partialAmount").value;
                var str1=str;
                validateMinValueForSR(str1,switchOrRedemption,nfoType);
                            //insertSwitchRedeemDetails(switchOrRedemption);
        }
    }
    else if(document.getElementById("transactionType_partial").value=="Partial"
            && (document.getElementById("partialUnitsRadio").checked))
    {
        if(document.getElementById("partialUnits").value=="")
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please Enter Units</span> ";
        }
        else if((units.test(document.getElementById("partialUnits").value)==false))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Please enter valid units</span>";
            document.getElementById("partialUnits").focus();
        }
        else if(parseInt(document.getElementById("partialUnits").value)<=0)
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'><span style='color: red;'>Units should be greater than 0</span>";
            document.getElementById("partialUnits").focus();
        }
        else if(parseFloat(document.getElementById("partialUnits").value)>parseFloat(document.getElementById("fullUnits").value))
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Units should not be greater than "
                +document.getElementById("fullUnits").value+"</span> ";
            document.getElementById("partialUnits").focus();
        }
        else if( (switchOrRedemption.match("Switch"))
              && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
              && (parseFloat(document.getElementById("partialUnits").value)>parseFloat(document.getElementById("maximumUnits").value)) )
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Suggested Unit for L&T Emerging Businesses Fund cannot be greater than "
                +document.getElementById("maximumUnits").value+" for specific investor</span> ";
            document.getElementById("partialUnits").focus();
        }
        else
        {
            var str="";
            if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
            {
                document.addForm.fullSchemeName.value =
                    document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
                str="schemeCode="+document.addForm.schemeCode.selectedIndex;
            }
                //document.addForm.toSchemeCode.value=document.addForm.schemeCode.selectedIndex;
            
            if(switchOrRedemption.match("Redeem") && (nfoType.match("No")))
            {
                str="schemeCode="+document.addForm.existingSchemeCode.value;
            }
                               
                str=str+"&transactionType=PartialUnits&partialUnits="
                       +document.getElementById("partialUnits").value;
                var str1=str;
                validateMinValueForSR(str1,switchOrRedemption,nfoType);
                                //insertSwitchRedeemDetails(switchOrRedemption);
        }
    }
  }
  else if (document.getElementById("transactionType_full").checked)
  {
    if((document.getElementById("transactionType_full").value=="Full"))
    {
        var str="";
        if( (switchOrRedemption.match("Switch"))
         && (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD')
         && (parseFloat(document.getElementById("fullAmount").value)>parseFloat(document.getElementById("maxAmount").value)) )
        {
            document.getElementById("result").innerHTML=
                "<span style='color: red;'>Suggested Amount for L&T Emerging Businesses Fund cannot be greater than "
                +document.getElementById("maxAmount").value+" for specific investor</span> ";
        }
        if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
        {
            document.addForm.fullSchemeName.value =
              document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
            str="schemeCode="+document.addForm.schemeCode.selectedIndex;
        }
        if(switchOrRedemption.match("Redeem") && (nfoType.match("No")))
        {
            str="schemeCode="+document.addForm.existingSchemeCode.value;
        }
        
        str=str+"&transactionType=Full&fullAmount="+document.getElementById("fullAmount").value
                   +"&fullUnits="+document.getElementById("fullUnits").value;
        var str1=str;
        validateMinValueForSR(str1,switchOrRedemption,nfoType);
    }
  }
  else
  {
     if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
     {
          document.addForm.fullSchemeName.value =
              document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
     }
                            //insertSwitchRedeemDetails(switchOrRedemption);
  }
}

function insertSwitchRedeemDetails(switchOrRedemption,nfoType)
{
    var str="";          
    var investorType="";
    if(document.getElementById("folioNo").value=="" || document.getElementById("folioNo").value==null) {
        investorType="new";
    }
    else{
        investorType="existing";
    }

     var recommendedValue="";
   if(document.getElementById("transactionType_full").checked)
   {
        recommendedValue="Full";
   }
   else if(document.getElementById("transactionType_partial").checked)
   {
        recommendedValue="Partial";
   }

     var xmlhttp = createRequestObject();
     var inSchemecode="";
     var foliono=document.getElementById("folioNo").value;
     var panNo = document.getElementById("panNo").value;
     var firstName = document.getElementById("firstName").value;
     var dob = document.getElementById("dob").value;
     var emailId=document.getElementById("emailId").value;
     var mobileNo=document.getElementById("mobileNo").value;

     if(switchOrRedemption.match("Switch") && (nfoType.match("No")))
     {
        inSchemecode=document.getElementById("schemeCode").value;
     }
     else if (nfoType.match("Yes"))
     {
         inSchemecode=document.getElementById("NFOSchemeCode").value;
     }

     var schemeCode=document.getElementById("existingSchemeCode").value;
     var existingSchemeRefNo=document.getElementById("existingSchemeRefNo").value;
     var partialAmount="";
     var partialUnits="";

     str = str + "transactionType="+switchOrRedemption+"&folioNo="+foliono+"&panNo="+panNo+"&emailId="+emailId+"&mobileNo="+mobileNo+
             "&inSchemecode="+inSchemecode+"&schemeCode="+schemeCode+"&existingSchemeRefNo="+existingSchemeRefNo+
             "&recommendedValue="+recommendedValue+"&investorType="+investorType+"&nfoType="+nfoType;

     var schemeName="";
     if(nfoType.match("Yes"))
     {
         schemeName=encodeURIComponent(document.getElementById("schemeName").value);
         str = str +"&schemeName="+schemeName;
     }

     if((nfoType.match("Yes")) && (document.getElementById("dividendType_payout").checked))
     {
         str = str + "&dividendType=Payout";
     }
     else if((nfoType.match("Yes")) && (document.getElementById("dividendType_sweep").checked))
     {         
         //var NFOSchemeCode=document.getElementById("NFOSchemeCode").value;
         //str = str +"&NFOSchemeCode="+NFOSchemeCode         

         str = str+"&dividendType=Sweep"+"&sweepSchemeCode="+document.getElementById("schemeCodeNFO").value
                  +"&sweepFullSchemeName="+encodeURIComponent(document.addForm.fullSchemeNameNFO.value);
     }
     
     if((nfoType.match("Yes")) && (document.getElementById("maturityYes").checked))
     {
        str = str+"&maturityType=Yes"
            +"&schemeCodeNFO="+document.getElementById("schemeCode").value
            +"&fullSchemeNameNFO="+encodeURIComponent(document.addForm.fullSchemeName.value);
     }
     else if((nfoType.match("Yes")) && (document.getElementById("maturityNo").checked))
     {
         str = str+"&maturityType=No";
     }
         
     if(recommendedValue == "Full")
     {
         var fullAmount=document.getElementById("fullAmount").value;
         var fullUnits=document.getElementById("fullUnits").value;
         str = str+"&fullAmount="+fullAmount+"&fullUnits="+fullUnits;
     }
     else if(recommendedValue == "Partial")
     { 
        if(document.getElementById("partialAmountRadio").checked)
        {
            partialAmount=document.getElementById("partialAmount").value;
            partialUnits="0.0";
            str = str+"&partialAmount="+partialAmount+"&partialUnits="+partialUnits;
        }
        else if (document.getElementById("partialUnitsRadio").checked)
        {
            partialAmount="0.0";
            partialUnits=document.getElementById("partialUnits").value;
            str = str+"&partialAmount="+partialAmount+"&partialUnits="+partialUnits;
        }
     }     
     str =str +"&firstName="+firstName;
     str =str +"&dob="+dob;
     str =str +"&fullSchemeName="+encodeURIComponent(document.addForm.fullSchemeName.value);

     document.getElementById("result").innerHTML="<img alt='loading' src='images/loader.white.gif'/>";
     xmlhttp.onreadystatechange = function()
     {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.responseText.match("Session expired"))
            {
                alert("Session expired");
                window.location.href="login.html";
            }
            else if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else
            {
               document.getElementById('switchRedeemResult').innerHTML=xmlhttp.responseText;
            }
        }
     };
     xmlhttp.open('POST','insertFolioDetails.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function validationForStpSwpSR()
{
    var number= /^[0-9]+$/;
    var units = /^-{0,1}\d*\.{0,1}\d+$/;
    document.getElementById("errorMsg").innerHTML="";
    var agrAmt="", minAggregation="", recommendedSipType="", transType="", schemeCode="";
    schemeCode = document.getElementById("schemeCode").value;
    transType = document.getElementById("transType").value;
    minAggregation=parseInt(document.investmentform.invAmt.value)*6;
    recommendedSipType=document.getElementById("recommendedSipType").value;

    if(recommendedSipType.match("EndDate"))
    {
        if(document.investmentform.sipFeq.value.match('Monthly'))
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                    (parseInt(document.investmentform.sipAggregation.value)+1));
        }
        else if(document.investmentform.sipFeq.value.match('Quarterly'))
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                ((parseInt(document.investmentform.sipAggregation.value)/3)+1));
        }
        else
        {
            agrAmt=(parseInt(document.investmentform.invAmt.value)*
                ((parseInt(document.investmentform.sipAggregation.value)/6)+1));
        }
    }
    else if(recommendedSipType.match("Installments"))
    {
        agrAmt=(parseInt(document.investmentform.invAmt.value)*
            (parseInt(document.getElementById("txtsipperiod").value)+1));
    }

    if(document.getElementById("invAmt").value=="" || document.getElementById("invAmt").value==null)
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
        document.getElementById("invAmt").focus();
    }
    else if(!units.test(document.getElementById("invAmt").value.trim()))
    {
        document.getElementById("invAmt").value=document.getElementById("invAmt").value.trim();
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Valid Amount</span>";
        document.getElementById("invAmt").focus();
    }
    else if( (parseFloat(document.getElementById("invAmt").value) < parseFloat(document.investmentform.minAmt.value)) ||
             (parseFloat(document.getElementById("invAmt").value) > parseFloat(document.investmentform.maxAmt.value)) )
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount should be between  Rs."
            +document.investmentform.minAmt.value+"  and Rs."+document.investmentform.maxAmt.value+"</span>";
        document.getElementById("invAmt").focus();
    }
    else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'STP')
          && (parseFloat(document.getElementById("invAmt").value) > parseFloat(document.investmentform.maxAmount.value)) )
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
            +document.investmentform.maxAmount.value+" for today</span>";
        document.getElementById("invAmt").focus();
    }
    /*else
    {
        window.investmentform.submit();
    }*/
    else if(document.investmentform.sipFeq.value=="0")
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Frequency</span>";
    }
    /*else if(!document.getElementById("dateRadio1").checked && !document.getElementById("dateRadio2").checked
            && !document.getElementById("dateRadio3").checked && !document.getElementById("dateRadio4").checked
            && !document.getElementById("dateRadio5").checked && !document.getElementById("dateRadio6").checked
            && !document.getElementById("dateRadio7").checked)
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Date </span>";
    }*/
    else if(document.getElementById("month").value == "Select")
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>Please Select Date of 2nd installment </span>";
    }
    else if(document.getElementById("year").value == "Select")
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>Please Select Date of 2nd installment </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.investmentform.sipFeq.value.match('Monthly'))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 30 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.investmentform.sipFeq.value.match('Quarterly'))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 90 Days </span>";
    }
    else if(document.getElementById("sipdateValidation").value == "Invalid"
            && document.investmentform.sipFeq.value.match('Half Yearly'))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date should be greater than 180 Days </span>";
    }
    else if((!recommendedSipType.match("EndDate")) && (!recommendedSipType.match("Installments")))
    {
        document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select SIP Period </span>";
    }
    else if(recommendedSipType.match("EndDate")
            && document.getElementById("sipperiodmonth").value=="Select")
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>Please Select Duration of SIP </span>";
    }
    else if(recommendedSipType.match("EndDate")
            && document.getElementById("sipperiodyear").value=="Select")
    {
         document.getElementById("errorMsg").innerHTML=
             "<span style='color: red;'>Please Select Duration of SIP </span>";
    }
    else if((recommendedSipType.match("EndDate"))
            && (document.getElementById("month").value == document.getElementById("sipperiodmonth").value )
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date and SIP Period Month and Year should not be same </span>";
    }
    else if((recommendedSipType.match("EndDate"))
            && (document.getElementById("year").value == document.getElementById("sipperiodyear").value)
&& (parseInt(document.getElementById("month").value) > parseInt(document.getElementById("sipperiodmonth").value )))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
    }
    else if((recommendedSipType.match("EndDate"))
            &&  (!(document.getElementById("year").value == document.getElementById("sipperiodyear").value))
&& (parseInt(document.getElementById("year").value) > parseInt(document.getElementById("sipperiodyear").value)) )
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>SIP Date Should not be greater than SIP Period </span>";
    }
    else if((recommendedSipType.match("EndDate")) && document.investmentform.sipFeq.value.match('Monthly')
            && (parseInt(document.getElementById("sipAggregation").value) <5 ))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((recommendedSipType.match("EndDate"))
            && document.investmentform.sipFeq.value.match('Quarterly')
            && (parseInt(document.getElementById("sipAggregation").value) <15 ))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if((recommendedSipType.match("EndDate"))
        && document.investmentform.sipFeq.value.match('Half Yearly')
        && (parseInt(document.getElementById("sipAggregation").value) <30 ))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>The number of installments for the scheme should not be less than 6</span>";
    }
    else if(recommendedSipType.match("Installments") && document.getElementById("txtsipperiod").value=="")
    {
         document.getElementById("errorMsg").innerHTML=
             "<span style='color: red;'>Please Select Number of Installments </span>";
    }
    else if(recommendedSipType.match("Installments")
            && (!number.test(document.getElementById("txtsipperiod").value.trim())))
    {
         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
         document.getElementById("errorMsg").innerHTML=
             "<span style='color: red;'>Number of Installments Should be Number Only </span>";
    }
    else if(recommendedSipType.match("Installments")
            && parseInt(document.getElementById("txtsipperiod").value)<5)
    {
         document.getElementById("txtsipperiod").value=document.getElementById("txtsipperiod").value.trim();
         document.getElementById("errorMsg").innerHTML=
             "<span style='color: red;'>The number of installments for the scheme should not be less than 6 </span>";
    }
    else if(parseInt(agrAmt)<parseInt(minAggregation))
    {
        document.getElementById("errorMsg").innerHTML=
            "<span style='color: red;'>Aggregate amount is insufficient </span>";
    }
    else
    {
        window.investmentform.submit();
    }
}

function getCheckedValueSR(recommendedValue)
{
    if(recommendedValue.match("Full"))
    {
        //document.getElementById("partialAmountChecked").style.display="none";
        document.getElementById("partialUnitsChecked").style.display="none";
        document.getElementById("fullChecked").style.display="block";
    }
    else if (recommendedValue.match("Partial"))
    {
        if(document.getElementById("SRUnits").checked)
        {
            document.getElementById("fullChecked").style.display="none";
            document.getElementById("partialUnitsChecked").style.display="block";
            //document.getElementById("partialAmountChecked").style.display="none";
        }
    }
}

function getCheckedValue(recommendedValue,transAmt,transUnits)
{
    if(recommendedValue.match("Full"))
    {
        document.getElementById("partialAmountChecked").style.display="none";
        document.getElementById("partialUnitsChecked").style.display="none";
        document.getElementById("SRAll").checked=true;
        document.getElementById("fullChecked").style.display="block";
    }
    else if (recommendedValue.match("Partial"))
    {
        //if(transUnits.match("0.0"))
        if(transUnits.localeCompare("0.0") == 0)
        {
            document.getElementById("fullChecked").style.display="none";
            document.getElementById("partialUnitsChecked").style.display="none";
            document.getElementById("SRAmount").checked=true;
            document.getElementById("partialAmountChecked").style.display="block";
        }
        else if(transAmt.localeCompare("0.0") == 0)
        {
            document.getElementById("fullChecked").style.display="none";
            document.getElementById("partialAmountChecked").style.display="none";
            document.getElementById("SRUnits").checked=true;
            document.getElementById("partialUnitsChecked").style.display="block";
        }
    }
}

function validationForSR()
{
    var recommendedValue = document.investmentform.SR.value;
    var number= /^[0-9]+$/;
    var units = /^-{0,1}\d*\.{0,1}\d+$/;
    document.getElementById("errorMsg").innerHTML="";
    document.getElementById("recommendedValue").value=recommendedValue;
    var schemeCode = document.getElementById("schemeCode").value;
    var transType = document.getElementById("transType").value;
    //alert(document.getElementById("fromUnits").value);
   
//        if(recommendedValue.match("SRAmount"))
//        //if(document.getElementById("SRAmount").checked)
//        {
//            if(document.getElementById("amountText").value=="" || document.getElementById("amountText").value==null)
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
//            }
//            else if(!units.test(document.getElementById("amountText").value.trim()))
//            {
//                document.getElementById("amountText").value=document.getElementById("amountText").value.trim();
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Valid Amount</span>";
//            }
//            else if( (parseFloat(document.getElementById("amountText").value) < parseFloat(document.investmentform.minAmt.value)) ||
//                     (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmt.value)) )
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount should be between  Rs."
//                    +document.investmentform.minAmt.value+"  and Rs."+document.investmentform.maxAmt.value+"</span>";
//            }
//            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
//                  && (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmount.value)) )
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
//                    +document.investmentform.maxAmount.value+" for today</span>";
//            }
//            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
//                  && (parseFloat(document.getElementById("fromAmt").value) > parseFloat(document.investmentform.maxAmount.value)) )
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
//                    +document.investmentform.maxAmount.value+" for today</span>";
//            }
//            else
//            {
//                window.investmentform.submit();
//            }
//        }
//        else if(recommendedValue.match("SRUnits"))
        var allunit = document.getElementById("fromUnits").value;
        //alert("Current Units : "+allunit);
        //alert("selecte units : "+document.getElementById("unitsText").value.trim())
        if(!document.getElementById("SRUnits").checked && !document.getElementById("SRAll").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Select Units</span>";
        }
         else if(!document.getElementById("SRAll").checked && (document.getElementById("unitsText").value=="" || document.getElementById("unitsText").value==null))
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Units</span>";
            }
            else if(!document.getElementById("SRAll").checked && !units.test(document.getElementById("unitsText").value.trim()))
            {
                document.getElementById("unitsText").value=document.getElementById("unitsText").value.trim();
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Units should be Number</span>";
            }
            else if(!document.getElementById("SRAll").checked &&  (parseFloat(document.getElementById("unitsText").value) < 500))
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Minimum units should be 500.</span>";
            }else if(!document.getElementById("SRAll").checked &&  (parseFloat(document.getElementById("unitsText").value) > parseFloat(allunit)))
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Maximum units should be "+allunit+".</span>";
            }
             else if(!document.getElementById("direct").checked && !document.getElementById("regular").checked)
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please select broker.</span>";
        }
            else if(document.getElementById("fundType").value == 'Select')
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please select fund type.</span>";
            }
            else if(document.getElementById("schemeCode").value == 'Select')
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please select scheme name.</span>";
            }
//            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
//                  && (parseFloat(document.getElementById("unitsText").value) > parseFloat(document.investmentform.maximumUnits.value)) )
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
//                    +document.investmentform.maximumUnits.value+" for today</span>";
//            }
//            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
//                  && (parseFloat(document.getElementById("fromUnits").value) > parseFloat(document.investmentform.maximumUnits.value)) )
//            {
//                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
//                    +document.investmentform.maximumUnits.value+" for today</span>";
//            }
            else
            {
//                if(document.getElementById("SRAll").checked){
//                    var areYouSure = confirm("You have opted to Switch out ALL UNITS, if you are sure click OK else click Cancel to change your preference. ");
//                    if(areYouSure == true)
//                    {
//                      //  window.investmentform.submit();
//                    }                    
//                }else{
                window.investmentform.submit();
           // }
            }
        
    
}

/*
function validationForSR()
{
    var recommendedValue = document.investmentform.SR.value;
    if(recommendedValue.match("SRAll"))
    {
        var areYouSure = confirm("You have opted to Switch out ALL UNITS, if you are sure click OK else click Cancel to change your preference. ");
        if(areYouSure == true)
        {            
            var number= /^[0-9]+$/;
            var units = /^-{0,1}\d*\.{0,1}\d+$/;
            document.getElementById("errorMsg").innerHTML="";
            document.getElementById("recommendedValue").value=recommendedValue;
            var schemeCode = document.getElementById("schemeCode").value;
            var transType = document.getElementById("transType").value;

            if(recommendedValue.match("SRAmount"))
            //if(document.getElementById("SRAmount").checked)
            {
                if(document.getElementById("amountText").value=="" || document.getElementById("amountText").value==null)
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
                }
                else if(!units.test(document.getElementById("amountText").value.trim()))
                {
                    document.getElementById("amountText").value=document.getElementById("amountText").value.trim();
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Valid Amount</span>";
                }
                else if( (parseFloat(document.getElementById("amountText").value) < parseFloat(document.investmentform.minAmt.value)) ||
                         (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmt.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount should be between  Rs."
                        +document.investmentform.minAmt.value+"  and Rs."+document.investmentform.maxAmt.value+"</span>";
                }
                else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                      && (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmount.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
                        +document.investmentform.maxAmount.value+" for today</span>";
                }
                else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                      && (parseFloat(document.getElementById("fromAmt").value) > parseFloat(document.investmentform.maxAmount.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
                        +document.investmentform.maxAmount.value+" for today</span>";
                }
                else
                {
                    window.investmentform.submit();
                }
            }
            else if(recommendedValue.match("SRUnits"))
            //else if(document.getElementById("SRUnits").checked)
            {
                if(document.getElementById("unitsText").value=="" || document.getElementById("unitsText").value==null)
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Units</span>";
                }
                else if(!units.test(document.getElementById("unitsText").value.trim()))
                {
                    document.getElementById("unitsText").value=document.getElementById("unitsText").value.trim();
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Units should be Number</span>";
                }
                else if( (parseFloat(document.getElementById("unitsText").value) < parseFloat(document.investmentform.minUnits.value)) ||
                         (parseFloat(document.getElementById("unitsText").value) > parseFloat(document.investmentform.maxUnits.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Units should be between  "
                        +document.investmentform.minUnits.value+"  and  "+document.investmentform.maxUnits.value+"</span>";
                }
                else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                      && (parseFloat(document.getElementById("unitsText").value) > parseFloat(document.investmentform.maximumUnits.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
                        +document.investmentform.maximumUnits.value+" for today</span>";
                }
                else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                      && (parseFloat(document.getElementById("fromUnits").value) > parseFloat(document.investmentform.maximumUnits.value)) )
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
                        +document.investmentform.maximumUnits.value+" for today</span>";
                }
                else
                {
                    window.investmentform.submit();
                }
            }
            else
            {
                window.investmentform.submit();
            }
        }
    }
    else
    {
        var number= /^[0-9]+$/;
        var units = /^-{0,1}\d*\.{0,1}\d+$/;
        document.getElementById("errorMsg").innerHTML="";
        document.getElementById("recommendedValue").value=recommendedValue;
        var schemeCode = document.getElementById("schemeCode").value;
        var transType = document.getElementById("transType").value;

        if(recommendedValue.match("SRAmount"))
        //if(document.getElementById("SRAmount").checked)
        {
            if(document.getElementById("amountText").value=="" || document.getElementById("amountText").value==null)
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Amount</span>";
            }
            else if(!units.test(document.getElementById("amountText").value.trim()))
            {
                document.getElementById("amountText").value=document.getElementById("amountText").value.trim();
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Valid Amount</span>";
            }
            else if( (parseFloat(document.getElementById("amountText").value) < parseFloat(document.investmentform.minAmt.value)) ||
                     (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmt.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount should be between  Rs."
                    +document.investmentform.minAmt.value+"  and Rs."+document.investmentform.maxAmt.value+"</span>";
            }
            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                  && (parseFloat(document.getElementById("amountText").value) > parseFloat(document.investmentform.maxAmount.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
                    +document.investmentform.maxAmount.value+" for today</span>";
            }
            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                  && (parseFloat(document.getElementById("fromAmt").value) > parseFloat(document.investmentform.maxAmount.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Amount for L&T Emerging Businesses Fund cannot be greater than Rs."
                    +document.investmentform.maxAmount.value+" for today</span>";
            }
            else
            {
                window.investmentform.submit();
            }
        }
        else if(recommendedValue.match("SRUnits"))
        //else if(document.getElementById("SRUnits").checked)
        {
            if(document.getElementById("unitsText").value=="" || document.getElementById("unitsText").value==null)
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Please Enter Units</span>";
            }
            else if(!units.test(document.getElementById("unitsText").value.trim()))
            {
                document.getElementById("unitsText").value=document.getElementById("unitsText").value.trim();
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Units should be Number</span>";
            }
            else if( (parseFloat(document.getElementById("unitsText").value) < parseFloat(document.investmentform.minUnits.value)) ||
                     (parseFloat(document.getElementById("unitsText").value) > parseFloat(document.investmentform.maxUnits.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'>Units should be between  "
                    +document.investmentform.minUnits.value+"  and  "+document.investmentform.maxUnits.value+"</span>";
            }
            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                  && (parseFloat(document.getElementById("unitsText").value) > parseFloat(document.investmentform.maximumUnits.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
                    +document.investmentform.maximumUnits.value+" for today</span>";
            }
            else if( (schemeCode == 'LEBFG' || schemeCode == 'LEBFP' || schemeCode == 'LEBFD') && (transType == 'Switch')
                  && (parseFloat(document.getElementById("fromUnits").value) > parseFloat(document.investmentform.maximumUnits.value)) )
            {
                document.getElementById("errorMsg").innerHTML="<span style='color: red;'> Units for L&T Emerging Businesses Fund cannot be greater than "
                    +document.investmentform.maximumUnits.value+" for today</span>";
            }
            else
            {
                window.investmentform.submit();
            }
        }
        else
        {
            window.investmentform.submit();
        }
    }
}
*/

function panvalidation()
{
    if(document.getElementById("panno").value.trim() == ''){
        document.getElementById("result").innerHTML="<span style='color: red;'>Please enter PAN.</span>";
    }
    else
    {
        var str=""
        +"&folioNo="+document.getElementById("folioNo").value.trim()
        +"&panno="+document.getElementById("panno").value.trim()
        +"&srno="+document.getElementById("srno").value.trim();
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
          //  document.getElementById("result").innerHTML="Please wait while your Transaction is being processed.....<br/>Please do not refresh your browser.";
            document.getElementById("trxnIdButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
            if (xmlhttp.readyState==4 )
            {
                    var responseArr="";
                    var outputArr=xmlhttp.responseText.trim();
                  //  alert("Output : "+outputArr);
                    responseArr=outputArr.split('|');
                    //alert("responseArr[0] : "+responseArr[0]);
                    //alert("responseArr[1] : "+responseArr[1]);
                    
                    if(responseArr[0].match("failed"))
                    {
                        if(!responseArr[1].match("done")){
                        document.getElementById("result").innerHTML=responseArr[1];
                        document.getElementById("trxnIdButton").innerHTML="";
                        }else{
                             document.getElementById("trxnIdButton").innerHTML='';
                           // window.location.href = 'SRDetails.jsp?srno='+document.getElementById("srno").value.trim();
                           window.srform.submit();    
                    }
                        
                    }
                   // }
                }                
            }
        }
        xmlhttp.open('POST','checkPanValidation.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }


function validateSRConfirmation(nfoType)
{
   if((!document.getElementById("chkconfirmation").checked))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please accept the Terms and Conditions above</span>";
    }
    else
    {
        //window.frmverification.submit();
        var str=""
        +"toScheme="+document.frmverification.toScheme.value.trim()
        +"&folioNo="+document.frmverification.folioNo.value.trim()
        +"&scheme="+document.frmverification.scheme.value.trim()
        +"&fromUnits="+document.frmverification.fromUnits.value.trim()
        +"&srno="+document.frmverification.srno.value.trim();
//        var recommendedValue = document.frmverification.recommendedValue.value;
//        if(recommendedValue.match("SRAll")) {
//            //str = str + "&fromAmt="+document.frmverification.fromAmt.value;
//            str = str + "&fromUnits="+document.frmverification.fromUnits.value;
//        }
//        else if(recommendedValue.match("SRUnits")) {
//            str = str + "&partialUnits="+document.frmverification.partialUnits.value;
//        }
        //alert(str);
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            //document.getElementById("result").innerHTML="Please wait while your Transaction is being processed.....<br/>Please do not refresh your browser.";
            document.getElementById("trxnIdButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
            if (xmlhttp.readyState==4 )
            {
                if(xmlhttp.responseText.match("Session expired"))
                {
                    alert("Your Session Has Expired. Please close the browser and open the link again from the mail you have received.");
                    window.location.href="logout.jsp";
                }
                else
                {
                    var responseArr="";
                    var outputArr=xmlhttp.responseText.trim();
                   //alert("Output : "+outputArr);
                    responseArr=outputArr.split('|');
                    //alert("responseArr[0] : "+responseArr[0]);
                    //alert("responseArr[1] : "+responseArr[1]);
                    
                    if(responseArr[0].match("failed"))
                    {
                        document.getElementById("result").innerHTML=responseArr[1];
                        document.getElementById("trxnIdButton").innerHTML="";
                    }
                    else
                    {
                        document.getElementById("result").innerHTML="Your request is in process. Please do not refresh your browser.";
                        document.getElementById("trxnIdButton").innerHTML="";
                        window.frmverification.submit();
                    }
                }                
            }
        }
        xmlhttp.open('POST','getTransactionIdForSR.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function validateStpSwpConfirmation(nfoType)
{
    if((!document.getElementById("chkconfirmation").checked))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Accept the Term and Condition </span>";
    }
    else
    {
        var str=""
        +"nfoType="+nfoType
        +"&transType="+document.frmverification.transType.value
        +"&folioNo="+document.frmverification.folioNo.value
        +"&transAmt="+document.frmverification.transAmt.value
        +"&arnCode="+document.frmverification.arnCode.value
        +"&SIPFrequencyCode="+document.frmverification.SIPFrequencyCode.value
        +"&sipDate="+document.frmverification.dateRadio.value
        +"&fromDate="+document.frmverification.fromDate.value
        +"&toDate="+document.frmverification.toDate.value;
//alert(str);
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            document.getElementById("result").innerHTML="Please wait while your Transaction is being processed.....<br/>Please do not refresh your browser.";
            document.getElementById("trxnIdButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
            if (xmlhttp.readyState==4 )
            {
                if(xmlhttp.responseText.match("Session expired"))
                {
                    alert("Your Session Has Expired. Please close the browser and open the link again from the mail you have received.");
                    window.location.href="logout.jsp";
                }
                else
                {
                    var responseArr="";
                    var outputArr=xmlhttp.responseText.trim();
                    //alert("Output : "+outputArr);
                    responseArr=outputArr.split('|');
                    //alert("responseArr[0] : "+responseArr[0]);
                    //alert("responseArr[1] : "+responseArr[1]);

                    if(responseArr[0].match("failed"))
                    {
                        document.getElementById("result").innerHTML=responseArr[1];
                        document.getElementById("trxnIdButton").innerHTML="";
                    }
                    else
                    {
                        document.getElementById("result").innerHTML="Re-directing to Transaction Completion Page, Pls wait...<br/>Please do not refresh your browser.";
                        document.getElementById("trxnIdButton").innerHTML="";
                        window.frmverification.submit();
                    }
                }
            }
        }
        xmlhttp.open('POST','getTransactionIdForStpSwp.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function fetchSIPExpiryRenewalsRecords()
{
    var days="";
    if(document.getElementById('sip30').checked)
    {
        days="30";
    }
    else if(document.getElementById('sip60').checked)
    {
        days="60";
    }

    if((!document.getElementById('sip30').checked) && (!document.getElementById('sip60').checked))
    {
        document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML="<center><font color='red'> Please select days option. </font></center>";
    }
    else if(document.getElementById('sip30').checked && document.getElementById('expiryCount30Days').value.match("0"))
    {        
        document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML="<center><font color='red'> No SIP Renewals Available for 30 Days</font></center>";
    }
    else if(document.getElementById('sip60').checked && document.getElementById('expiryCount60Days').value.match("0"))
    {       
        document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML="<center><font color='red'> No SIP Renewals Available for 60 Days</font></center>";
    }
    else
    {
        var str= "days=" +days.trim();
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
             document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML='<center><img alt="loading" src="images/loader.white.gif"/></center>';
             if (xmlhttp.readyState==4)
             {
                 if (xmlhttp.responseText.match("Session expired"))
                 {
                    alert("Session expired");
                    window.location.href="login.html";
                 }
                 else if(xmlhttp.responseText.match("Activity restricted"))
                 {
                     alert("The Activity you are trying is restricted");
                     window.location.href="logout.jsp";
                 }
                 else
                 {
                     document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML=xmlhttp.responseText;
                 }
             }
        }
        xmlhttp.open('POST','fetchSIPExpiryRenewalRecords.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function validateSendMailForRenewal()
{
    var count = document.getElementById("count").value;
    var str = "" , i=0 , flag=false;

    for(i=0;i<count;i++)
    {
        if(document.getElementById("sipRenew_"+i).checked)
        {
            flag = true;
            str = str+document.getElementById("sipRenew_"+i).value+",";
        }
    }
    if(!flag)
    {
        document.getElementById("result").innerHTML = "<center><span style='color: red;'>Please select atleast one investor.</span></center>";
    }
    else
    {
        str = "transactionType=sipRenewal&nfoType=No&folioNo=" + str;
        var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
             if (xmlhttp.readyState==4)
             {
                 if (xmlhttp.responseText.match("Session expired"))
                 {
                    alert("Session expired");
                    window.location.href="login.html";
                 }
                 else if(xmlhttp.responseText.match("Activity restricted"))
                 {
                     alert("The Activity you are trying is restricted");
                     window.location.href="logout.jsp";
                 }
                 else
                 {
                     document.getElementById("fetchSIPExpiryRenewalRecords").innerHTML = xmlhttp.responseText;
                 }
             }
        }
        xmlhttp.open('POST','insertFolioDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function getMinAmtAndUnitsValidationNFO(dividendType)
{
    var str="schemeCode="+document.getElementById("NFOSchemeCode").value
            +"&schemeName="+encodeURIComponent(document.getElementById("schemeName").value)
            +"&dividendType="+dividendType;
    
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
             var responseArr="";
             var output=xmlhttp.responseText.trim();
             responseArr=output.split('|');
             
             if(xmlhttp.responseText.match("Activity restricted"))
             {
                 alert("The Activity you are trying is restricted");
                 window.location.href="logout.jsp";
             }
             else
             {
                document.getElementById("minAmt").value=responseArr[0];
                document.getElementById("minUnits").value=responseArr[1];
             }
        }
     }
     xmlhttp.open('POST','getMinAmtAndUnitsValidationNFO.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function validateMinValueForSR(str1,switchOrRedemption,nfoType)
{
    var txt="";
    var str=str1+"&SR="+switchOrRedemption;
    
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.match("Activity restricted"))
            {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
            }
            else if(xmlhttp.responseText.match("invalid"))
            {
                txt = xmlhttp.responseText.trim();
                txt = txt.substring(7,txt.length);
                document.getElementById("result").innerHTML=
                    "<span style='color: red;'>Minimum "+txt+" required. </span> ";
            }
            else
            {
                if(switchOrRedemption.match('Switch'))
                {
                    validationSM(switchOrRedemption,nfoType);
                    //insertSwitchRedeemDetails(switchOrRedemption,nfoType);
                }
                else if(switchOrRedemption.match('Redeem'))
                {
                    validationSM(switchOrRedemption,nfoType);
                    //insertSwitchRedeemDetails(switchOrRedemption,nfoType);
                }                
            }
        }
    }
    xmlhttp.open('POST','getSISchemeDetails.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function validationSM(switchOrRedemption,nfoType)
{
     if(nfoType.match("Yes"))
    {
        if(document.getElementById("dividendType_sweep").checked)
        {
            document.getElementById("dividendType_payout").checked=false;
        }
    if((nfoType.match("Yes")) && (document.getElementById("dividendType_sweep").checked)
        && (document.getElementById("fundTypeNFO").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Target Fund Type </span>";
        document.getElementById("fundTypeNFO").focus();
    }
    else if((nfoType.match("Yes")) && (document.getElementById("dividendType_sweep").checked)
        && (document.getElementById("schemeCodeNFO").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Target Scheme </span>";
        document.getElementById("schemeCodeNFO").focus();
    }
    else if((!document.getElementById("maturityYes").checked) && (!document.getElementById("maturityNo").checked))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Option </span>";
        document.getElementById("maturityYes").focus();
    }
    else if((document.getElementById("maturityYes").checked) && (document.getElementById("fundType").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Fund Type </span>";
        document.getElementById("fundType").focus();
    }
    else if((document.getElementById("maturityYes").checked) && (document.getElementById("schemeCode").value=="Select"))
    {
        document.getElementById("result").innerHTML="<span style='color: red;'>Please Select Switch Upon Maturity Scheme </span>";
        document.getElementById("schemeCode").focus();
    }
    else
    {
        if(document.getElementById("dividendType_sweep").checked)
        {
            document.addForm.fullSchemeNameNFO.value = document.addForm.schemeCodeNFO[document.addForm.schemeCodeNFO.selectedIndex].text;
        }
        if(document.getElementById("maturityYes").checked)
        {
            document.addForm.fullSchemeName.value = document.addForm.schemeCode[document.addForm.schemeCode.selectedIndex].text;
        }
        insertSwitchRedeemDetails(switchOrRedemption,nfoType);
    }
     }
    else
    {
         insertSwitchRedeemDetails(switchOrRedemption,nfoType);
    }
}

function checkDateForSIPRenewal ()
{
    var str = "";
    if(document.getElementById("transType").value=='SIP Renewal')
    {
        if(document.getElementById("showFromDate").value == 'Valid')
        {
            str= "selectedFromDate=" +document.investmentform.selectedFromDate.value.trim();
        }
        else
        {
            str= "selectedFromDate="+document.getElementById("startyear").value+"-"+document.getElementById("startmonth").value+"-"+document.investmentform.dateRadio.value;
        }
    }
    var xmlhttp = createRequestObject();
    var dateValid = "";

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
        dateValid = xmlhttp.responseText;
        if(dateValid.match("Activity restricted"))
        {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
        }
        else if (dateValid.match(("InvalidDate")))
        {
            document.getElementById("errorMsg").innerHTML="<span style='color: red;'>SIP Start Date should be greater than today's date.</span>";
        }
      }
    }
    xmlhttp.open('POST','checkDateDifferenceForSIPRenewal.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}


function validateRecommendationStatus(sipComboValue)
{
    document.getElementById("errordiv").innerHTML="";    
    if (document.recommendationStatus.fromDate.value == null || document.recommendationStatus.fromDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select From Date.";
        document.recommendationStatus.fromDate.focus();
    }
    else if (document.recommendationStatus.toDate.value == null || document.recommendationStatus.toDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select To Date.";
        document.recommendationStatus.toDate.focus();
    }
    else
    {
        var str= "fromDate="+document.recommendationStatus.fromDate.value+
                    "&toDate="+document.recommendationStatus.toDate.value;

        var xmlhttp = createRequestObject();
        var dateValid = "";

       xmlhttp.onreadystatechange=function()
        {
             if (xmlhttp.readyState==4)
             {
                dateValid = xmlhttp.responseText;
                if(dateValid.match("Activity restricted"))
                {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                }
                else if (dateValid.match(("InvalidDate")))
                {
                    document.getElementById("errordiv").innerHTML = "From Date should not be greater than To Date.";
                }
                else
                {
                    recommendationStatus(sipComboValue);
                }
            }
        }
        xmlhttp.open('POST','checkFromToDate.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

/*
function recommendationStatus(sipComboValue)
{
    var str= "fromDate="+document.recommendationStatus.fromDate.value
                +"&toDate="+document.recommendationStatus.toDate.value
                +"&statusType="+document.getElementById('statusType').value;

    if(sipComboValue.match('No')){str=str+"&transType="+document.getElementById('transType').value;}

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="login.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
             document.getElementById("recommendationStatusResult").innerHTML=xmlhttp.responseText.trim();
         }
    }
    if(sipComboValue.match('No')) {
        xmlhttp.open('POST','fetchRecommendationStatus.jsp',true);
    } else if(sipComboValue.match('Yes')) {
        xmlhttp.open('POST','fetchRecommendationSIPComboStatus.jsp',true);
    }
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}
*/

function recommendationStatus()
{
    var str= "fromDate="+document.recommendationStatus.fromDate.value
                +"&toDate="+document.recommendationStatus.toDate.value
                +"&transType="+document.getElementById('transType').value
                +"&statusType="+document.getElementById('statusType').value;

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="login.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
             document.getElementById("recommendationStatusResult").innerHTML=xmlhttp.responseText.trim();
         }
    }
    xmlhttp.open('POST','fetchRecommendationStatus.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function records()
{
    document.getElementById("errorMsg").innerHTML="";
    //var str= "frequency="+document.frequencyForm.frequency.value;
    if(document.frequencyForm.fromDate.value == "" || document.frequencyForm.fromDate.value == null)
    {
        document.getElementById("errorMsg").innerHTML="<span style='color : red'>Please select From Date</span>";
    }
    else if(document.frequencyForm.toDate.value == "" || document.frequencyForm.toDate.value == null)
    {
        document.getElementById("errorMsg").innerHTML="<span style='color : red'>Please select To Date</span>";
    }
    else {
    var str = "fromDate="+document.frequencyForm.fromDate.value+"&toDate="+document.frequencyForm.toDate.value;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
            document.getElementById("AUMReport").innerHTML=xmlhttp.responseText.trim();
         }
    }
    xmlhttp.open('POST','aumChart_1.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
    }
}

function loadExistingSearchList(searchType)
{
     var str="";
     var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                document.getElementById("searchTypeDiv").innerHTML=xmlhttp.responseText;
             }
        }
     }
     xmlhttp.open('POST','loadExistingSearchList.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function  selectedExistingClient()
{
    document.getElementById("errorDiv").innerHTML="";
    var str = "";
    var str = "";
    if(document.completedExistingClientForm.namelist.value == ""
        && document.completedExistingClientForm.foliolist.value == ""
        && document.completedExistingClientForm.panlist.value == "")
    {
        document.getElementById("errorDiv").innerHTML="Please select atleast one option from below and Submit";
    }
    else if(!document.completedExistingClientForm.namelist.value == "")
    {
        var f = document.createElement('form');
        f.action='viewExistingSearchList.jsp';
        f.method='POST';
        var i=document.createElement('input');
        i.type='hidden';i.name='searchType';i.value="Name";
        f.appendChild(i);
        var j=document.createElement('input');
        j.type='hidden';j.name='searchTypeValue';j.value=document.completedExistingClientForm.namelist.value;
        f.appendChild(j);
        var k=document.createElement('input');
        k.type='hidden';k.name='pageNo';k.value="1";
        f.appendChild(k);
        document.body.appendChild(f);
        f.submit();
    }
    else if(!document.completedExistingClientForm.foliolist.value == "")
    {
        var f = document.createElement('form');
        f.action='viewExistingSearchList.jsp';
        f.method='POST';
        var i=document.createElement('input');
        i.type='hidden';i.name='searchType';i.value="FolioNo";
        f.appendChild(i);
        var j=document.createElement('input');
        j.type='hidden';j.name='searchTypeValue';j.value=document.completedExistingClientForm.foliolist.value;
        f.appendChild(j);
        var k=document.createElement('input');
        k.type='hidden';k.name='pageNo';k.value="1";
        f.appendChild(k);
        document.body.appendChild(f);
        f.submit();
    }
    else if(!document.completedExistingClientForm.panlist.value == "")
    {
        var f = document.createElement('form');
        f.action='viewExistingSearchList.jsp';
        f.method='POST';
        var i=document.createElement('input');
        i.type='hidden';i.name='searchType';i.value="PanNo";
        f.appendChild(i);
        var j=document.createElement('input');
        j.type='hidden';j.name='searchTypeValue';j.value=document.completedExistingClientForm.panlist.value;
        f.appendChild(j);
        var k=document.createElement('input');
        k.type='hidden';k.name='pageNo';k.value="1";
        f.appendChild(k);
        document.body.appendChild(f);
        f.submit();
    }
}

function getSelectedSchemeValidation(folioNo,switchRedeem,panNo,nfoType)
{
    var pageName="";
    if(nfoType.match("No"))
    {pageName="getSelectedSchemeValidation.jsp";}
    else
    {pageName="getSelectedSchemeValidationNFO.jsp";}
    var selectedSchemeName = document.getElementById("schemeList").value;
    selectedSchemeName = selectedSchemeName.replace('&', '');
    var str = "selectedSchemeName="+selectedSchemeName+"&folioNo="+folioNo
        +"&switchRedeem="+switchRedeem+"&panNo="+panNo;
    
    var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                document.getElementById("unitsAmountMinDiv").innerHTML=xmlhttp.responseText;
             }
        }
     }
     xmlhttp.open('POST',pageName,true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);    
}

function getSelectedStpSwpSchemeValidation(folioNo,switchRedeem,panNo,nfoType)
{
    var pageName="";
    if(nfoType.match("No"))
    {pageName="getSelectedStpSwpSchemeValidation.jsp";}
    else
    {pageName="getSelectedSchemeValidationNFO.jsp";}
    var selectedSchemeName = document.getElementById("schemeList").value;
    selectedSchemeName = selectedSchemeName.replace('&', '');
    var str = "selectedSchemeName="+selectedSchemeName+"&folioNo="+folioNo
        +"&switchRedeem="+switchRedeem+"&panNo="+panNo;

    var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else
             {
                document.getElementById("unitsAmountMinDiv").innerHTML=xmlhttp.responseText;
             }
        }
     }
     xmlhttp.open('POST',pageName,true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function showGuardianDetails()
{
    var dob = document.getElementById('dob').value;   
    dob=format(dob);
    var eighteenYearsAgo = moment().subtract(18, "years");
    var birthday = moment(dob);
    if(eighteenYearsAgo.isBefore(birthday))
    {
        document.getElementById('chkMinor').value="yes";
        document.getElementById('guardianDiv').style.display="block";
    }
    else
    {
        document.getElementById('chkMinor').value="no";
        document.getElementById('guardianDiv').style.display="none";
    }
}

function newInvestorBankAccTypeShow()
{
    var taxStatus=document.getElementById("taxStatus").value;
    if(taxStatus.match('Non Residential Indian Individual'))
    {
        document.getElementById('accTypeShow').style.display="none";
        document.getElementById('accTypeHide').style.display="block";
    }
    else
    {
        document.getElementById('accTypeShow').style.display="block";
        document.getElementById('accTypeHide').style.display="none";
    }
}

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
    var nameFatherSpouse = document.frmverification.nameFatherSpouse.value;
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
    var nameNominee = document.frmverification.nameNominee.value;
    var dobNominee = document.frmverification.dobNominee.value;
    var relationNominee = document.frmverification.relationNominee.value;
    var nameGuardian = document.frmverification.nameGuardian.value;
    var panGuardian = document.frmverification.panGuardian.value;
    var relationGuardian = document.frmverification.relationGuardian.value;
    //var dobGuardian = document.frmverification.dobGuardian.value;
    var taxResidencyAddress = document.frmverification.taxResidencyAddress.value;
    var taxResidencyCity = document.frmverification.taxResidencyCity.value;
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

    var guardianRelation="";
    if(((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationMother").checked)))
    {
        guardianRelation="Mother";
        relationGuardian="Mother";
    }
    else if(((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationFather").checked)))
    {
        guardianRelation="Father";
        relationGuardian="Father";
    }
    else if(((document.getElementById("chkMinor").value == "yes")
        && (document.getElementById("selectGuardianRelationOther").checked)))
    {
        guardianRelation="Other";
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
    else if(nameFatherSpouse == "" || nameFatherSpouse == null) {
        document.getElementById("result").innerHTML="Please enter Father's / Spouse's full name.";
        document.frmverification.nameFatherSpouse.focus();
    }
    else if(!alphabet.test(nameFatherSpouse))
    {
        document.getElementById("result").innerHTML="Please enter valid Father's / Spouse's full name.";
        document.frmverification.nameFatherSpouse.focus();
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
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencyCity == "" || taxResidencyCity == null))
    {
        document.getElementById("result").innerHTML="Please enter City of Tax Residency.";
        document.frmverification.taxResidencyCity.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (!alphabet.test(taxResidencyCity)))
    {
        document.getElementById("result").innerHTML="Invalid City of Tax Residency.";
        document.frmverification.taxResidencyCity.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencycityCode == "" || taxResidencycityCode == null))
    {
        document.getElementById("result").innerHTML="Please enter City Code of Tax Residency.";
        document.frmverification.taxResidencycityCode.focus();
    }/*
    else if(((taxStatus == "Non Residential Indian Individual")) && (!numeric.test(taxResidencycityCode)))
    {
        document.getElementById("result").innerHTML="Invalid City Code of Tax Residency.";
        document.frmverification.taxResidencycityCode.focus();
    }*/
    else if(((taxStatus == "Non Residential Indian Individual")) && (!alphanumericNPA.test(taxResidencycityCode)))
    {
        document.getElementById("result").innerHTML="Invalid City Code of Tax Residency.";
        document.frmverification.taxResidencycityCode.focus();
    }
    else if(((taxStatus == "Non Residential Indian Individual")) && (taxResidencyState == "" || taxResidencyState == null))
    {
        document.getElementById("result").innerHTML="Please enter State of Tax Residency.";
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
    else if((nameNominee == "" || nameNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee full name.";
        document.frmverification.nameNominee.focus();
    }
    else if((!alphabet.test(nameNominee)) && (nomineeRequired.match("yes")))
    {
        document.getElementById("result").innerHTML="Please enter valid Nominee full name.";
        document.frmverification.nameNominee.focus();
    }
    else if((dobNominee == "" || dobNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee Date Of Birth.";
        document.frmverification.dobNominee.focus();
    }
    else if((document.getElementById('resultNominee').value == 'Invalid') && (nomineeRequired.match("yes")))  {
        document.getElementById("result").innerHTML="Invalid Nominee DOB.";
    }
    else if((relationNominee == "" || relationNominee == null) && (nomineeRequired.match("yes"))) {
        document.getElementById("result").innerHTML="Please enter Nominee Relation.";
        document.frmverification.relationNominee.focus();
    }
    else if((!alphabet.test(relationNominee)) && (nomineeRequired.match("yes")))
    {
        document.getElementById("result").innerHTML="Please enter valid Nominee Relation.";
        document.frmverification.relationNominee.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes") 
        && (nameGuardian == "" || nameGuardian == null) ) {
        document.getElementById("result").innerHTML="Please enter Guardian full name.";
        document.frmverification.nameGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes")
        && (!alphabet.test(nameGuardian)))
    {
        document.getElementById("result").innerHTML="Please enter valid Guardian full name.";
        document.frmverification.nameGuardian.focus();
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
    else if((document.getElementById("chkMinor").value == "yes") && (!(document.getElementById("selectGuardianRelationMother").checked
        || document.getElementById("selectGuardianRelationFather").checked || document.getElementById("selectGuardianRelationOther").checked)))
    {
        document.getElementById("result").innerHTML="Please select Guardian Relation.";
    }
    else if((document.getElementById("chkMinor").value == "yes") && (guardianRelation.match("Other"))
        && (relationGuardian == "" || relationGuardian == null))
    {
        document.getElementById("result").innerHTML="Please enter Guardian Relation.";
        document.frmverification.relationGuardian.focus();
    }
    else if((document.getElementById("chkMinor").value == "yes") && (guardianRelation.match("Other"))
        && (!alphabet.test(relationGuardian)))
    {
        document.getElementById("result").innerHTML="Please enter valid Guardian Relation.";
        document.frmverification.relationGuardian.focus();
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

        var frm2=document.createElement('input');
        frm2.type='hidden';frm2.name='firstName';frm2.value=document.frmverification.firstName.value.trim();
        f.appendChild(frm2);

        var frm3=document.createElement('input');
        frm3.type='hidden';frm3.name='panNo';frm3.value=document.frmverification.panNo.value.trim();
        f.appendChild(frm3);

        var frm4=document.createElement('input');
        frm4.type='hidden';frm4.name='gender';frm4.value=gender.trim();
        f.appendChild(frm4);

        var frm5=document.createElement('input');
        frm5.type='hidden';frm5.name='dob';frm5.value=dob.trim();
        f.appendChild(frm5);

        var frm6=document.createElement('input');
        frm6.type='hidden';frm6.name='nationality';frm6.value=nationality.trim();
        f.appendChild(frm6);

        var frm7=document.createElement('input');
        frm7.type='hidden';frm7.name='nameFatherSpouse';frm7.value=nameFatherSpouse.trim();
        f.appendChild(frm7);

        /*var frm8=document.createElement('input');
        frm8.type='hidden';frm8.name='lastNameFatherSpouse';frm8.value=lastNameFatherSpouse.trim();
        f.appendChild(frm8);*/

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

        var frm24=document.createElement('input');
        frm24.type='hidden';frm24.name='emailId';frm24.value=document.frmverification.emailId.value.trim();
        f.appendChild(frm24);

        var frm25=document.createElement('input');
        frm25.type='hidden';frm25.name='mobNo';frm25.value=document.frmverification.mobNo.value.trim();
        f.appendChild(frm25);

        var frm26=document.createElement('input');
        frm26.type='hidden';frm26.name='taxResidencyCountry';frm26.value=taxResidencyCountry.trim();
        f.appendChild(frm26);
        
        var frm27=document.createElement('input');
        frm27.type='hidden';frm27.name='otherNationality';frm27.value=otherNationality.trim();
        f.appendChild(frm27);

        if(nomineeRequired.match("yes"))
        {
        var frm28=document.createElement('input');
        frm28.type='hidden';frm28.name='nameNominee';frm28.value=nameNominee.trim();
        f.appendChild(frm28);

        var frm29=document.createElement('input');
        frm29.type='hidden';frm29.name='dobNominee';frm29.value=dobNominee.trim();
        f.appendChild(frm29);

        var frm41=document.createElement('input');
        frm41.type='hidden';frm41.name='relationNominee';frm41.value=relationNominee.trim();
        f.appendChild(frm41);
        }

        var frm30=document.createElement('input');
        frm30.type='hidden';frm30.name='nameGuardian';frm30.value=nameGuardian.trim();
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

        var frm40=document.createElement('input');
        frm40.type='hidden';frm40.name='taxResidencyCity';frm40.value=taxResidencyCity.trim();
        f.appendChild(frm40);

        var frm42=document.createElement('input');
        frm42.type='hidden';frm42.name='relationGuardian';frm42.value=relationGuardian.trim();
        f.appendChild(frm42);

        document.body.appendChild(f);
        f.submit();
    }
}

function checkDateDifferenceForBankDetailsNewInvestor (dob,divId)
{
    document.getElementById("resultdob").value = "";
    document.getElementById("resultNominee").value = "";
    document.getElementById("resultGuardian").value = "";
    var str= "selectedFromDate=" +dob.trim();
    var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }
         else
         {
             if(divId.match('dob'))
             {
                document.getElementById("resultdob").value = xmlhttp.responseText;
             }
             else if(divId.match('dobNominee'))
             {
                document.getElementById("resultNominee").value = xmlhttp.responseText;
             }
             else if(divId.match('dobGuardian'))
             {
                document.getElementById("resultGuardian").value = xmlhttp.responseText;
             }
        }
      }
    }
    xmlhttp.open('POST','checkDateDifferenceForNewInvestor.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function frequencyOnchangeValidationforRenewal(frequencytype,showFromDate)
{
    var str= "frequency="+frequencytype;
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }
         var resultDate = xmlhttp.responseText.trim();
         document.getElementById("sipRenewalFromDateResult").innerHTML = resultDate;
         var resultDateMonth = resultDate.substring(3,6);
         var resultDateMonthNumeric = "";
         if(resultDateMonth.match('Jan')) {resultDateMonthNumeric="01";}
         else if (resultDateMonth.match('Feb')) {resultDateMonthNumeric="02";}
         else if (resultDateMonth.match('Mar')) {resultDateMonthNumeric="03";}
         else if (resultDateMonth.match('Apr')) {resultDateMonthNumeric="04";}
         else if (resultDateMonth.match('May')) {resultDateMonthNumeric="05";}
         else if (resultDateMonth.match('Jun')) {resultDateMonthNumeric="06";}
         else if (resultDateMonth.match('Jul')) {resultDateMonthNumeric="07";}
         else if (resultDateMonth.match('Aug')) {resultDateMonthNumeric="08";}
         else if (resultDateMonth.match('Sep')) {resultDateMonthNumeric="09";}
         else if (resultDateMonth.match('Oct')) {resultDateMonthNumeric="10";}
         else if (resultDateMonth.match('Nov')) {resultDateMonthNumeric="11";}
         else if (resultDateMonth.match('Dec')) {resultDateMonthNumeric="12";}

         var selectedFromDate = resultDate.substring(7,11)+"-"+resultDateMonthNumeric+"-"+resultDate.substring(0,2);
         //var selectedFromDate = resultDate.substring(8,10)+"-"+resultDate.substring(4,7)+"-"+resultDate.substring(24,28);
         document.getElementById("selectedFromDate").value = selectedFromDate;
         document.getElementById("splitFromDate").value = selectedFromDate;
      }
    }
    xmlhttp.open('POST','getSIPRenewalFrequencyDate.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getNewInvestorBankList()
{
     var str="";
     var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
                document.getElementById("bankNameDiv").innerHTML=xmlhttp.responseText;
        }
     }
     xmlhttp.open('POST','getNewInvestorBankList.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function getBankNameDetails()
{
    var bankName = document.frmverification.bankName.value;    
     var str="bankName="+bankName;
     var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else
             {
                document.getElementById("bankNameDetailsDiv").innerHTML=xmlhttp.responseText;
             }
        }
     }
     xmlhttp.open('POST','getNewInvestorBankDetailsList.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function showSelectedBranchDetails()
{
     var bankName = document.getElementById("bankName").value;
     //document.frmverification.bankName.value;
     var bankBranch = document.getElementById("bankBranch").value;
     //document.frmverification.bankBranch.value;

     var str="bankName="+bankName+"&bankBranch="+bankBranch;
     var xmlhttp = createRequestObject();
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState==4 )
        {
             /*if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else
             {*/
                document.getElementById("showSelectedBranchDetails").innerHTML=xmlhttp.responseText;
             //}
        }
     }
     xmlhttp.open('POST','showSelectedBranchDetails.jsp',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}

function checkDateDifferenceForMinorNominee (dobNominee)
{
    var str= "dobNominee=" +dobNominee.trim();
    var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }
         else if (xmlhttp.responseText.match(("ValidDate")))
         {
            document.getElementById("result").innerHTML = "<span style='color: red;'>Minor nominee should be 18 years above.</span>";
        }
      }
    }
    xmlhttp.open('POST','checkDateDifferenceForMinorNominee.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

  function Captcha()
  {
      document.getElementById("registerErrorDiv").innerHTML="";
      document.getElementById("txtInput").value="";
      document.getElementById("captchaDiv").style.display="block";
     var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
     var i;
     for (i=0;i<6;i++){
       var a = alpha[Math.floor(Math.random() * alpha.length)];
       var b = alpha[Math.floor(Math.random() * alpha.length)];
       var c = alpha[Math.floor(Math.random() * alpha.length)];
       var d = alpha[Math.floor(Math.random() * alpha.length)];
       var e = alpha[Math.floor(Math.random() * alpha.length)];
       var f = alpha[Math.floor(Math.random() * alpha.length)];
       var g = alpha[Math.floor(Math.random() * alpha.length)];
      }
    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
    document.getElementById("mainCaptcha").value = code
  }

  function newBrokerValidation()
  {
      document.getElementById("registerErrorDiv").innerHTML="";
      var numeric = /^[0-9]*$/;
      var newARN = document.getElementById("newARN").value;
      var captcha = document.getElementById("txtInput").value;
      var arnSuffix,arnPrefix;

      if((!(newARN == "" || newARN == null)) && (newARN.includes("OD") || newARN.includes("od")))
      {
          arnSuffix = newARN.substr(0, 6);
          arnPrefix = newARN.substr(6, newARN.length);
      }
      else if((!(newARN == "" || newARN == null)) && (!(newARN.includes("OD") || newARN.includes("od"))))
      {
          arnSuffix = newARN.substr(0, 4);
          arnPrefix = newARN.substr(4, newARN.length);
      }

      if(newARN == "" || newARN == null)
      {
          document.getElementById("registerErrorDiv").innerHTML="Please enter ARN Code.";
      }
      else if(!(arnSuffix.includes("ARN-OD") || arnSuffix.includes("arn-od") || arnSuffix.includes("ARN-") || arnSuffix.includes("arn-")))
      {
          document.getElementById("registerErrorDiv").innerHTML="ARN Code seems invalid.";
      }
      else if(!(numeric.test(arnPrefix)))
      {
          document.getElementById("registerErrorDiv").innerHTML="ARN Code seems invalid.";
      }
      else if(newARN.length < 8 || newARN.length > 12)
      {
          document.getElementById("registerErrorDiv").innerHTML="Invalid ARN Code.";
      }
      else if(captcha == "" || captcha == null)
      {
          document.getElementById("registerErrorDiv").innerHTML="Please enter Captcha.";
      }
      else
      {
          ValidCaptcha();
      }
  }

  function ValidCaptcha()
  {
      var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
      var string2 = removeSpaces(document.getElementById('txtInput').value);
      if (string1 == string2)
      {
        //return true;
        //document.getElementById("registererrordiv").innerHTML="Valid Captcha";
        checkExistingBrokerCode(document.getElementById("newARN").value);
      }
      else
      {
        //return false;
        document.getElementById("registerErrorDiv").innerHTML="Invalid Captcha";
      }
  }

  function removeSpaces(string)
  {
    return string.split(' ').join('');
  }

  function checkExistingBrokerCode(newARN)
  {
      var str= "arnCode=" +newARN.trim();
      var xmlhttp = createRequestObject();
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
             if(xmlhttp.responseText.match("alreadyExistsInTable"))
             {
                document.getElementById("registerErrorDiv").innerHTML="You are already registered. Please use your existing ARN Code and password to login.";
             }
             else if(xmlhttp.responseText.match("serviceError"))
             {
                document.getElementById("registerErrorDiv").innerHTML="Service to fetch your details cannot be reached.";
             }
             else if(xmlhttp.responseText.match("yes"))
             {                
                document.getElementById("arnDiv").style.display="none";
                document.getElementById("captchaDiv").style.display="none";
                document.getElementById("otpDiv").style.display="block";
                document.getElementById("passwordDiv").style.display="none";
                sendOTPtoRegister(newARN);
             }
             else if(xmlhttp.responseText.match("no"))
             {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="Your contact details cannot be found.";
             }
             else
             {
                document.getElementById("registerErrorDiv").innerHTML="Service to fetch your details cannot be reached.";
             }
         }
      }
      xmlhttp.open('POST','checkNewDistributorLogin.jsp',true);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.send(str);
  }

  function newPasswordValidation()
  {
      document.getElementById("passwordErrorDiv").innerHTML="";
      document.getElementById("arnDiv").style.display="none";
      var registerPassword = document.getElementById("registerPassword").value;
      var confirmRegisterPassword = document.getElementById("confirmRegisterPassword").value;

      if(registerPassword == "" || registerPassword == null)
      {
          document.getElementById("passwordErrorDiv").innerHTML="Please enter password.";
      }
      else if((registerPassword.length < 8) || (registerPassword.length > 15))
      {
          document.getElementById("passwordErrorDiv").innerHTML="Password must be atleast 8-15 characters.";
      }
      else if(confirmRegisterPassword == "" || confirmRegisterPassword == null)
      {
          document.getElementById("passwordErrorDiv").innerHTML="Please re-enter password.";
      }
      else if( (!confirmRegisterPassword == "" || !confirmRegisterPassword == null)
            && (!(confirmRegisterPassword.match(registerPassword))) )
      {
          document.getElementById("passwordErrorDiv").innerHTML="Re-entered password does not match.";
      }
      else
      {
          insertNewDistributorLogin(document.getElementById("newARN").value,document.getElementById("registerPassword").value);
      }
  }

  function insertNewDistributorLogin(newARN,newPassword)
  {
      newPassword = sha256_digest(newPassword);
      var str= "arnCode=" +newARN.trim()+"&password=" +newPassword.trim();
      var xmlhttp = createRequestObject();
      document.getElementById("registerButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
            if(xmlhttp.responseText.match("no"))
            {
                document.getElementById("passwordErrorDiv").innerHTML="Your login id cannot be created.";
            }
            else if(xmlhttp.responseText.match("exists"))
            {
                //document.getElementById("passwordDiv").style.display="none";
                //document.getElementById("newARN").value = "";
                document.getElementById("txtInput").value = "";
                document.getElementById("otpTxt").value = "";
                document.getElementById("registerPassword").value = "";
                document.getElementById("confirmRegisterPassword").value = "";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("successDiv").innerHTML="Your login id already exists. <b><a href='login.html' style='color : red'>Click here</a></b> to login.";
            }
            else if(xmlhttp.responseText.match("serviceError"))
            {
                document.getElementById("txtInput").value = "";
                document.getElementById("otpTxt").value = "";
                document.getElementById("registerPassword").value = "";
                document.getElementById("confirmRegisterPassword").value = "";
                document.getElementById("passwordDiv").style.display="Service to fetch your details cannot be reached, try after sometime.";
                document.getElementById("successDiv").innerHTML="";

            }
            else if(xmlhttp.responseText.match("yes"))
            {
                //document.getElementById("passwordDiv").style.display="none";
                //document.getElementById("newARN").value = "";
                document.getElementById("txtInput").value = "";
                document.getElementById("otpTxt").value = "";
                document.getElementById("registerPassword").value = "";
                document.getElementById("confirmRegisterPassword").value = "";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("successDiv").innerHTML="<p>Congratulations! </p><p>Your online account has been created successfully. You can now avail our distributor online facilities.</p> <p><a href='login.html' style='color : red'>Click to Login</a></p><p style='color: red; '>Please note: Your ARN no is your User ID.</p>";
            }
            else
            {
                document.getElementById("passwordErrorDiv").innerHTML=xmlhttp.responseText.trim();
            }
         }
        }
        xmlhttp.open('POST','insertNewDistributorLogin.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
  }

  function sendOTPtoRegister(newARN)
  {
      var responseArr="";
      var str= "arnCode=" +newARN.trim();
      var xmlhttp = createRequestObject();
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
             var output=xmlhttp.responseText.trim();
             responseArr=output.split('|');

            if(responseArr[0].match("contactNA"))
            {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="<span style='font-size:13px; color:red;'>Your Mobile No. and Email Id is not registered.</span>";
            }
            else if(responseArr[0].match("serviceError"))
            {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="<span style='font-size:13px; color:red;'>Service to fetch your details cannot be reached.</span>";
            }
            else if(responseArr[0].match("yes"))
            {
                //window.location.href="dashboard.jsp";
                //window.location.href="myfolder.jsp";
                document.getElementById("arnDiv").style.display="none";
                document.getElementById("captchaDiv").style.display="none";
                document.getElementById("otpDiv").style.display="block";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("mobileNo").value=responseArr[1];
                //document.getElementById("otpSentDescribeDiv").style.display="block";
                otpSentDescribe(newARN);
            }
            else if(responseArr[0].match("no"))
            {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="<span style='font-size:13px; color:red;'>Error while generating OTP. Please try after some time.</span>";
            }
            else
            {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="<span style='font-size:13px; color:red;'>Service to fetch your details cannot be reached.</span>";
            }
         }
      }
      xmlhttp.open('POST','newRegistrationSendOTP.jsp',true);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.send(str);
  }

  function otpSentDescribe(newARN)
  {
      var str= "arnCode=" +newARN.trim();
      var xmlhttp = createRequestObject();
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
            var output=xmlhttp.responseText.trim();
            if(output.match("noContact"))
            {
                document.getElementById("otpDiv").style.display="block";
                document.getElementById("otpDiv").innerHTML="<span style='font-size:13px; color:red;'>Your Mobile No. and Email Id is not registered.</span>";
            }
            else if(output.match("serviceError"))
            {
                document.getElementById("otpDiv").style.display="block";
                document.getElementById("otpDiv").innerHTML="<span style='font-size:13px; color:red;'>Service to fetch your details cannot be reached.</span>";
            }
            else
            {
                //document.getElementById("otpSentDescribeDiv").style.display="block";
                document.getElementById("otpSentDescribeDiv").innerHTML=xmlhttp.responseText.trim();
                document.getElementById("otpSentNoteDiv").innerHTML = "<span style='color : red'>Note:</span> "
                +"Verification code is valid for only 15 mins from the time you recieve it.<br/>"
                +"<span style='font-size:12px; color:#f00;'>^</span><span style='font-size:13px;'>If your mobile number is outside India, you may not receive the SMS - so please check "
                +"your email instead for the code.</span>";
                //otpSentDescribe();
            }
         }
      }
      xmlhttp.open('POST','otpSentDescribe.jsp',true);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.send(str);
  }

  function newRegistrationVerifyOTP()
  {
    if(document.getElementById("otpTxt").value == "" || document.getElementById("otpTxt").value == null)
    {
        document.getElementById("otpErrorDiv").innerHTML="Please enter OTP.";
    }
    else
    {
        var str="otpNo="+document.getElementById("otpTxt").value.trim()
            +"&mobileNo="+document.getElementById("mobileNo").value.trim()
            +"&actionValue=Registration";
        var xmlhttp = createRequestObject();
        document.getElementById("verifyButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {                
                if(xmlhttp.responseText.match('yes'))
                {
                    document.getElementById("arnDiv").style.display="none";
                    document.getElementById("captchaDiv").style.display="none";
                    document.getElementById("otpDiv").style.display="none";
                    document.getElementById("showArnName").innerHTML = document.getElementById("newARN").value.toUpperCase();
                    document.getElementById("passwordDiv").style.display="block";
                }
                else
                {
                    document.getElementById("arnDiv").style.display="none";
                    document.getElementById("captchaDiv").style.display="none";
                    document.getElementById("otpDiv").style.display="block";
                    document.getElementById("passwordDiv").style.display="none";
                    document.getElementById("otpErrorDiv").innerHTML=xmlhttp.responseText.trim();
                }
            }
        }
        xmlhttp.open('POST','newRegistrationVerifyOTPDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
  }

  function newRegistrationResendOTPDetails()
  {
    var str="arnCode="+document.getElementById("newARN").value.trim();
    var xmlhttp = createRequestObject();
    //document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.match('yes'))
            {
                document.getElementById("otpErrorDiv").innerHTML='OTP Resend.';
            }
            else if(xmlhttp.responseText.match('no'))
            {
                document.getElementById("otpErrorDiv").innerHTML='Error while generating OTP. Please try after some time.';
            }
            else
            {
                document.getElementById("otpErrorDiv").innerHTML='Error while generating OTP. Please try after some time.';
            }
        }
    }
    xmlhttp.open('POST','newRegistrationResendOTPDetails.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
  }

  function forgotPasswordResendOTPDetails()
  {
    var str="arnCode="+document.getElementById("newARN").value.trim();
    var xmlhttp = createRequestObject();
    //document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            if(xmlhttp.responseText.match('yes'))
            {
                document.getElementById("errorMsg").innerHTML='OTP Resend.';
            }
            else if(xmlhttp.responseText.match('serviceError'))
            {
                document.getElementById("errorMsg").innerHTML='Service to fetch your details cannot be reached.';
            }
            else
            {
                document.getElementById("errorMsg").innerHTML='Service to fetch your details cannot be reached.';
            }
        }
    }
    xmlhttp.open('POST','forgotPasswordResendOTPDetails.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
  }

  function resetARNPassword()
  {
      document.getElementById("errorMsg").innerHTML="";
      var numeric = /^[0-9]*$/;
      var newARN = document.getElementById("newARN").value;
      var arnSuffix = newARN.substr(0, 4);
      var arnPrefix = newARN.substr(4, newARN.length);

      if(newARN == "" || newARN == null)
      {
          document.getElementById("errorMsg").innerHTML="Please enter ARN Code.";
      }
      else if(newARN.length < 8 || newARN.length > 10)
      {
          document.getElementById("errorMsg").innerHTML="ARN Code should be between 8 to 10 characters.";
      }
      else if(!(( arnSuffix.match("ARN-") || arnSuffix.match("arn-") )))
      {
          document.getElementById("errorMsg").innerHTML="ARN Code should start with <span style='color : blue'>ARN-</span>";
      }
      else if(!(numeric.test(arnPrefix)))
      {
          document.getElementById("errorMsg").innerHTML="ARN Code should be <span style='color : blue'>ARN-numeric</span> only.";
      }
      else
      {
          checkExistingBrokerCodeForPasswordReset(newARN);
      }
  }

  function checkExistingBrokerCodeForPasswordReset(newARN)
  {
      var str= "arnCode=" +newARN.trim();
      var xmlhttp = createRequestObject();
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
            if(xmlhttp.responseText.match("yes"))
            {
                //sendOTPtoResetPassword(newARN);
                //window.resetPassword_form.submit();

                var f = document.createElement('form');
                f.action='forgotPasswordVerification.jsp';
                f.method='POST';

                var i=document.createElement('input');
                i.type='hidden';i.name='arnCode';i.value=newARN.trim();
                f.appendChild(i);

                document.body.appendChild(f);
                f.submit();
            }
            else
            {
                document.getElementById("errorMsg").innerHTML="You are not registered with our partner online service.<a href='login.html#register'>Click here</a> to register.";
            }
         }
      }
      xmlhttp.open('POST','checkForgotPasswordDistributor.jsp',true);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.send(str);
  }

/*
  function sendOTPtoResetPassword(newARN)
  {
      var str= "arnCode=" +newARN.trim();
      var xmlhttp = createRequestObject();
      xmlhttp.onreadystatechange=function()
      {
         if (xmlhttp.readyState==4)
         {
             var output=xmlhttp.responseText.trim();
            if(output.match("yes"))
            {
                //window.location.href="dashboard.jsp";
                //window.location.href="myfolder.jsp";
                document.getElementById("arnDiv").style.display="none";
                document.getElementById("captchaDiv").style.display="none";
                document.getElementById("otpDiv").style.display="block";
                document.getElementById("passwordDiv").style.display="none";
                //document.getElementById("otpSentDescribeDiv").style.display="block";
                otpSentDescribe(newARN);
            }
            else if(output.match("no"))
            {
                document.getElementById("otpDiv").style.display="none";
                document.getElementById("passwordDiv").style.display="none";
                document.getElementById("registerErrorDiv").innerHTML="ARN details does not exists.";
            }
         }
      }
      xmlhttp.open('POST','newRegistrationSendOTP.jsp',true);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.send(str);
  }
*/

  function resetPasswordVerifyOTP()
  {
      document.getElementById("errorMsg").innerHTML="";
    if(document.getElementById("otpTxt").value == "" || document.getElementById("otpTxt").value == null)
    {
        document.getElementById("errorMsg").innerHTML="Please enter Verification Code.";
    }
    else
    {
        var str="otpNo="+document.getElementById("otpTxt").value.trim()
               +"&mobileNo="+document.getElementById("mobileNo").value.trim()
               +"&actionValue=Reset";
        var xmlhttp = createRequestObject();
        document.getElementById("resetVerifyButton").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 )
            {
                if(xmlhttp.responseText.match('yes'))
                {
                    //verifyResetPassword();
                    document.getElementById("otpDiv").style.display="none";
                    document.getElementById("resetPasswordDiv").style.display="block";
                }
                else
                {
                    document.getElementById("resetPasswordDiv").style.display="none";
                    document.getElementById("errorMsg").innerHTML=xmlhttp.responseText.trim();
                }
            }
        }
        xmlhttp.open('POST','newRegistrationVerifyOTPDetails.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
  }

  function verifyResetPassword()
  {      
      document.getElementById("errorMsg1").innerHTML="";
      var arnCode = document.getElementById("newARN").value;
      var resetPassword = document.getElementById("resetPassword").value;
      var confirmResetPassword = document.getElementById("confirmResetPassword").value;
      var arnName = document.getElementById("arnName").value;
      var validMobileNo = document.getElementById("validMobileNo").value;
      var validEmailId = document.getElementById("validEmailId").value;

      var alphabet = /^[a-zA-Z]*$/;
      var numeric = /^[0-9]*$/;
      var alphanumeric =/^[a-zA-Z0-9\-\s]+$/;
      var specialChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      //var ansc = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
      //var asc = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

      if(resetPassword == "" || resetPassword == null)
      {
          document.getElementById("errorMsg1").innerHTML="Please enter new password.";
          document.resetPasswordVerification_form.resetPassword.focus();
      }
      else if((resetPassword.length < 8) || (resetPassword.length > 15))
      {
          document.getElementById("errorMsg1").innerHTML="New Password must be between 8-15 characters.";
          document.resetPasswordVerification_form.resetPassword.focus();
      }
      else if( ((!(resetPassword == "")) || (!(resetPassword == null)))
            && (!alphanumeric.test(resetPassword)) && (!specialChar.test(resetPassword)) )
      {
          document.getElementById("errorMsg1").innerHTML="(A-N-SC) Please follow the hint to set password.";
          document.resetPasswordVerification_form.resetPassword.focus();
      }
      else if(confirmResetPassword == "" || confirmResetPassword == null)
      {
          document.getElementById("errorMsg1").innerHTML="Please re-enter new password.";
          document.resetPasswordVerification_form.confirmResetPassword.focus();
      }
      else if( ((!(confirmResetPassword == "")) || (!(confirmResetPassword == null)))
            && (!confirmResetPassword.match(resetPassword)) )
      {
          document.getElementById("errorMsg1").innerHTML="Re-entered password does not match.";
          document.resetPasswordVerification_form.confirmResetPassword.focus();
      }
      else
      {
          resetPassword = sha256_digest(resetPassword);

            var f = document.createElement('form');
            f.action='forgotPasswordConfirmation.jsp';
            f.method='POST';

            var frm1=document.createElement('input');
            frm1.type='hidden';frm1.name='arnCode';frm1.value=arnCode.trim();
            f.appendChild(frm1);

            var frm2=document.createElement('input');
            frm2.type='hidden';frm2.name='password';frm2.value=resetPassword.trim();
            f.appendChild(frm2);

            var frm3=document.createElement('input');
            frm3.type='hidden';frm3.name='arnName';frm3.value=arnName.trim();
            f.appendChild(frm3);

            var frm4=document.createElement('input');
            frm4.type='hidden';frm4.name='validMobileNo';frm4.value=validMobileNo.trim();
            f.appendChild(frm4);

            var frm5=document.createElement('input');
            frm5.type='hidden';frm5.name='validEmailId';frm5.value=validEmailId.trim();
            f.appendChild(frm5);

            document.body.appendChild(f);
            f.submit();
      }
  }

  function specifyDateDivVisibility()
  {
      if(document.getElementById("accStmtType4").checked)
      {
          document.getElementById("specifyDateDivVisibility").style.display = "block";
      }
      else
      {
          document.getElementById("specifyDateDivVisibility").style.display = "none";
      }
  }

  function validateAccStmt(requestType)
  {
      document.getElementById("errorMsg").innerHTML="";
      var numeric = /^[0-9]*$/;
      var folioNo = document.getElementById("folioNo").value;      
      var accStmtType="";

      if(document.getElementById("accStmtType1").checked)
      {
          accStmtType="Current";
      }
      else if(document.getElementById("accStmtType2").checked)
      {
          accStmtType="Previous";
      }
      else if(document.getElementById("accStmtType3").checked)
      {
          accStmtType="SinceInception";
      }
      else if(document.getElementById("accStmtType4").checked)
      {
          accStmtType="SpecifyPeriod";
      }
      else
      {
          accStmtType="";
      }
      
      if(folioNo == "" || folioNo == null)
      {
          document.getElementById("errorMsg").innerHTML="<span style='color:red'>Please enter folio no.</span>";
          document.getElementById("folioNo").focus();
      }
      else if( ((folioNo != "") && (folioNo != null)) && (numeric.test(folioNo) == false) )
      {
          document.getElementById("errorMsg").innerHTML="<span style='color:red'>Please enter valid folio no.</span>";
          document.getElementById("folioNo").focus();
      }
      else if(accStmtType == "" || accStmtType == null)
      {
          document.getElementById("errorMsg").innerHTML="<span style='color:red'>Please select period.</span>";
      }
      else if( (accStmtType.match("SpecifyPeriod")) &&
          ((document.accountStmtForm.fromDate.value == "") || (document.accountStmtForm.fromDate.value == "null")) )
      {
          document.getElementById("errorMsg").innerHTML="<span style='color:red'>Please select from date.</span>";
          document.accountStmtForm.fromDate.focus();
      }
      else if( (accStmtType.match("SpecifyPeriod")) &&
          ((document.accountStmtForm.toDate.value == "") || (document.accountStmtForm.toDate.value == "null")) )
      {
          document.getElementById("errorMsg").innerHTML="<span style='color:red'>Please select to date.</span>";
          document.accountStmtForm.toDate.focus();
      }
      else
      {
          //document.getElementById("errorMsg").innerHTML="OK.";
          var str="";
          if(accStmtType.match("SpecifyPeriod"))
          {
              str="folioNo="+folioNo+"&accStmtType="+accStmtType+"&requestType="+requestType
                 +"&fromDate="+document.accountStmtForm.fromDate.value
                 +"&toDate="+document.accountStmtForm.toDate.value;
             checkDateValidationForAccStmt(str,requestType);
          }
          else 
          {
              str= "folioNo=" +folioNo+ "&accStmtType=" +accStmtType+"&requestType="+requestType;
            
                var xmlhttp = createRequestObject();
                xmlhttp.onreadystatechange=function()
                {
                    //document.getElementById("result").innerHTML='<img alt="loading" src="images/loginloader.gif" style="width:50px;"/>';
                     if (xmlhttp.readyState==4)
                     {
                        if(xmlhttp.responseText.match("Session expired"))
                        {
                            window.location.href="logout.jsp";
                        }
                        else if(xmlhttp.responseText.match("failure"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:red'>Failed to Generate Client SOA</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else if(xmlhttp.responseText.match("mailed success"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:blue'>Your Client SOA is successfully Mailed to your client.</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else if(xmlhttp.responseText.match("contactNA"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:red'>Client emailId is not available.</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else if(xmlhttp.responseText.match("investorServiceError"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:red'>Client emailId cannot be fetched from the Service.</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else if(xmlhttp.responseText.match("recordNA"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:red'>Client transaction details are not available.</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else if(xmlhttp.responseText.match("serviceError"))
                        {
                            document.getElementById("errorMsg").innerHTML="<span style='color:red'>Service to fetch Client transaction details is not reachable.</span>";
                            //document.getElementById("result").innerHTML="";
                        }
                        else
                        {
                            //document.getElementById("errorMsg").innerHTML=xmlhttp.responseText.trim();
                            var msg = xmlhttp.responseText.trim();
                          
                            if(requestType.match("downloadpdf"))
                            {
                                document.getElementById("errorMsg").innerHTML="<span style='color:blue'>Your Client SOA is successfully generated. <a href='Account_Statement/"+msg+"' target='_blank'>Click Here</a> to download.</span>";
                                //document.getElementById("result").innerHTML="";
                            }
                        }
                    }
                }
                xmlhttp.open('POST','accStmtEmailDownload.jsp',true);
                xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xmlhttp.send(str);
            }
      }
  }
  
  function checkDateValidationForAccStmt(str,requestType)
  {
      document.getElementById("errorMsg").innerHTML = "";
        var xmlhttp = createRequestObject();
        var dateValid = "";
        var myfromDate = new Date(document.accountStmtForm.fromDate.value);
        var mytoDate = new Date(document.accountStmtForm.toDate.value);
        var today = new Date();

        if(myfromDate>today)
        {
            document.getElementById("errorMsg").innerHTML = "<span style='color:red'>From Date should not be greater than today's date.</span>";
        }
        else if(mytoDate>today)
        {
            document.getElementById("errorMsg").innerHTML = "<span style='color:red'>To Date should not be greater than today's date.</span>";
        }
        else
        {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {
                    dateValid = xmlhttp.responseText.trim();
                    if(dateValid.match("Activity restricted"))
                    {
                        alert("The Activity you are trying is restricted");
                        window.location.href="logout.jsp";
                    }
                    else if (dateValid.match(("InvalidDate")))
                    {
                        document.getElementById("errorMsg").innerHTML = "<span style='color:red'>From Date should not be greater than To Date.</span>";
                    }
                    else
                    {
                        sendAccStmt(str,requestType);
                    }
                }
            }
        xmlhttp.open('POST','checkFromToDate.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
     }
  }

  function sendAccStmt(str,requestType)
  {
      document.getElementById("errorMsg").innerHTML = "";
      var xmlhttp = createRequestObject();
        xmlhttp.onreadystatechange=function()
        {
            document.getElementById("result").innerHTML='<img alt="loading" src="images/loginloader.gif" style="width:50px;"/>';
             if (xmlhttp.readyState==4)
             {
                if(xmlhttp.responseText.match("Session expired"))
                {
                    window.location.href="logout.jsp";
                }
                else if(xmlhttp.responseText.match("failure"))
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color:red'>Failed to Generate Client SOA</span>";
                    document.getElementById("result").innerHTML="";
                }
                else if(xmlhttp.responseText.match("mailed success"))
                {
                    document.getElementById("errorMsg").innerHTML="<span style='color:blue'>Your Client SOA is successfully Mailed to your client.</span>";
                    document.getElementById("result").innerHTML="";
                }
                else
                {
                    //document.getElementById("errorMsg").innerHTML=xmlhttp.responseText.trim();
                    var msg = xmlhttp.responseText.trim();
                    if(requestType.match("downloadpdf"))
                    {
                        document.getElementById("errorMsg").innerHTML="<span style='color:blue'>Your Client SOA is successfully generated. <a href='Account_Statement/"+msg+"' target='_blank'>Click Here</a> to download.</span>";
                        document.getElementById("result").innerHTML="";
                    }
                }
            }
        }
        xmlhttp.open('POST','accStmtEmailDownload.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
  }

   function validateIFA()
    {
        document.getElementById("msg").innerHTML="";
        if( (Trim(document.contact.arnName.value)=="") && (Trim(document.contact.arnNo.value)==""))
         {
             document.getElementById("errorMsg").innerHTML="Please fill atleast an one option. "
         }else
         {
              document.getElementById("errorMsg").innerHTML="";
              var str= "arnName=" +encodeURIComponent(document.contact.arnName.value) + "&arnNo=" +encodeURIComponent(document.contact.arnNo.value);
                var xmlhttp = createRequestObject();
                document.getElementById("msg").innerHTML='<img alt="loading" src="../images/loader.white.gif"  />';

               xmlhttp.onreadystatechange=function(){

                if (xmlhttp.readyState==4 && xmlhttp.status==200)
  		 {

                     document.getElementById("msg").innerHTML=xmlhttp.responseText;
                      $("#msg").find("script").each(function(i) {
                    eval($(this).text());

                });

                }
            }

	    xmlhttp.open('POST','getIFAdetails.jsp',true);
	    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	    xmlhttp.send(str);
         }

    }
    
    
        function validationFortransList()
{
     document.getElementById("errmsg").innerHTML="";
     var  fromDate = document.contact.fromDate.value;
     var  toDate = document.contact.toDate.value ;
     var firstDate =new Date(fromDate);
     var secondDate =new Date(toDate);
     var pageNo=1;
     var numeric = /^[0-9]*$/;
    var rcDateRegularEx = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;

  // document.getElementById("responseResult").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
  if((fromDate==""||fromDate==null) ||(toDate==""||toDate==null))
  {
       document.getElementById("errmsg").innerHTML="Please Select From Date and To Date.";

  }
  else if(!(rcDateRegularEx.test(fromDate)) || !(rcDateRegularEx.test(toDate)))
  {
      document.getElementById("errmsg").innerHTML="Invalid Date.";
   }
  else if(firstDate >= secondDate)
  {
   document.getElementById("errmsg").innerHTML="From Date should be less than To Date.";
  }
  else
  {
    gettransactionList(pageNo);
   }
}

function gettransactionList(pageNo)
{
     document.getElementById("responseResult").innerHTML="";
     var pageNum=pageNo;
     var urlName=document.contact.urlName.value;

   document.getElementById("responseResult").innerHTML='<img alt="loading"   src="images/loader.white.gif"/>';
          var str= "fromDate=" +encodeURIComponent(document.contact.fromDate.value) + "&toDate=" +encodeURIComponent(document.contact.toDate.value)+"&pageNum="+pageNum+"&urlName="+urlName;
                var xmlhttp = createRequestObject();
                 xmlhttp.onreadystatechange=function(){

                if (xmlhttp.readyState==4 && xmlhttp.status==200)
  		 {
                     document.getElementById("responseResult").innerHTML=xmlhttp.responseText;
               }
            }

	    xmlhttp.open('POST','getTransactionList.jsp',true);
	    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	    xmlhttp.send(str);
 }

function transactionListPageNum(pageNo)
{
    var pageNum=pageNo;
   gettransactionList(pageNum);
}

/*function previousTransactionDetails(pageNo)
{
    var pageNum=pageNo-1;
     gettransactionList(pageNum);
}*/

 function validationForClientList()
{
     document.getElementById("result").innerHTML="";
       document.getElementById("responseResult").innerHTML="";
     var  brokerName = document.contact.brokerName.value;
     var  emailId = document.contact.emailId.value ;
      var  folioNum = document.contact.folioNum.value;
     var  panNo = document.contact.panNo.value ;
     var pageNo=1;
     var numeric = /^[0-9]*$/;
   // var rcDateRegularEx = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;

  // document.getElementById("responseResult").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
  if(numeric.test(brokerName) && !(brokerName=="" || brokerName==null))
  {
      document.getElementById("result").innerHTML="Invalid Broker Name.";
      document.getElementById("brokerName").focus();
  }
  else if(!(emailId=="" || emailId==null) && !(validate_email(emailId)) )
  {
      document.getElementById("emailId").focus();
  }
  else if(!(numeric.test(folioNum)) && !(folioNum=="" || folioNum==null) )
  {
      document.getElementById("result").innerHTML="Invalid Folio Number.";
      document.getElementById("panNo").focus();
  }
  else
  {
      getClientList(pageNo);
  }
}
function getClientList(pageNo)
{
     document.getElementById("responseResult").innerHTML="";
     var pageNum=pageNo;
     //var urlName=document.contact.urlName.value;

   document.getElementById("responseResult").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
          var str= "brokerName=" +Trim(document.contact.brokerName.value) + "&emailId=" +Trim(document.contact.emailId.value)+
              "&folioNum=" +Trim(document.contact.folioNum.value) + "&panNo=" +Trim(document.contact.panNo.value)+"&pageNum="+pageNum;
                var xmlhttp = createRequestObject();
                 xmlhttp.onreadystatechange=function(){

                if (xmlhttp.readyState==4 && xmlhttp.status==200)
  		 {
                     document.getElementById("responseResult").innerHTML=xmlhttp.responseText;
               }
            }

	    xmlhttp.open('POST','getClientList.jsp',true);
	    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	    xmlhttp.send(str);
 }

 function clientListPageNum(pageNo)
{
    var pageNum=pageNo;
   getClientList(pageNum);
}

 function searchClientListPageNo(pageNo,searchType,searchTypeValue)
{
    window.location.href="viewExistingSearchList.jsp?pageNo="+pageNo+"&searchType="+searchType+"&searchTypeValue="+searchTypeValue;
	   
   
}


function validateRecommendationStatusForAdmin()

{
    document.getElementById("errordiv").innerHTML="";
    if (document.recommendationStatus.fromDate.value == null || document.recommendationStatus.fromDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select From Date.";
        document.recommendationStatus.fromDate.focus();
    }
    else if (document.recommendationStatus.toDate.value == null || document.recommendationStatus.toDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select To Date.";
        document.recommendationStatus.toDate.focus();
    }
    else
    {
        var str= "fromDate="+document.recommendationStatus.fromDate.value+
                    "&toDate="+document.recommendationStatus.toDate.value;

        var xmlhttp = createRequestObject();
        var dateValid = "";

       xmlhttp.onreadystatechange=function()
        {
             if (xmlhttp.readyState==4)
             {
                dateValid = xmlhttp.responseText;
                if(dateValid.match("Activity restricted"))
                {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                }
                else if (dateValid.match(("InvalidDate")))
                {
                    document.getElementById("errordiv").innerHTML = "From Date should not be greater than To Date.";
                }
                else
                {
                    recommendationStatusForAdmin();
                }
            }
        }
        xmlhttp.open('POST','../checkFromToDate.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function recommendationStatusForAdmin()
{
    var str= "fromDate="+document.recommendationStatus.fromDate.value
                +"&toDate="+document.recommendationStatus.toDate.value
                +"&transType="+document.getElementById('transType').value
                +"&statusType="+document.getElementById('statusType').value;

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="../adminLogin.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
             document.getElementById("recommendationStatusResult").innerHTML=xmlhttp.responseText.trim();
         }
    }
    xmlhttp.open('POST','fetchRecommendationStatusAdmin.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}


function validateNewRegistrationDetailsForAdmin()

{
    document.getElementById("errordiv").innerHTML="";
    if (document.NewRegistrationDetails.fromDate.value == null || document.NewRegistrationDetails.fromDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select From Date.";
        document.NewRegistrationDetails.fromDate.focus();
    }
    else if (document.NewRegistrationDetails.toDate.value == null || document.NewRegistrationDetails.toDate.value == "")
    {
        document.getElementById("errordiv").innerHTML="Please select To Date.";
        document.NewRegistrationDetails.toDate.focus();
    }
    else
    {
        var str= "fromDate="+document.NewRegistrationDetails.fromDate.value+
                 "&toDate="+document.NewRegistrationDetails.toDate.value;

        var xmlhttp = createRequestObject();
        var dateValid = "";

       xmlhttp.onreadystatechange=function()
        {
             if (xmlhttp.readyState==4)
             {
                dateValid = xmlhttp.responseText;
                if(dateValid.match("Activity restricted"))
                {
                    alert("The Activity you are trying is restricted");
                    window.location.href="logout.jsp";
                }
                else if (dateValid.match(("InvalidDate")))
                {
                    document.getElementById("errordiv").innerHTML = "From Date should not be greater than To Date.";
                }
                else
                {
                    newRegistrationDetailsForAdmin();
                }
            }
        }
        xmlhttp.open('POST','../checkFromToDate.jsp',true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(str);
    }
}

function newRegistrationDetailsForAdmin()
{
    var str= "fromDate="+document.NewRegistrationDetails.fromDate.value
              +"&toDate="+document.NewRegistrationDetails.toDate.value

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="../adminLogin.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
             document.getElementById("newRegistrationDetailsResult").innerHTML=xmlhttp.responseText.trim();
         }
    }
    xmlhttp.open('POST','getNewRegistrationReportAdmin.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getNewRegistrationDetails()
{
    var str= "fromDate="+document.recommendationStatus.fromDate.value
                +"&toDate="+document.recommendationStatus.toDate.value;

    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange=function()
    {
         if(xmlhttp.responseText.match("Session expired"))
         {
            alert("Session expired");
            window.location.href="login.html";
         }
         else if(xmlhttp.responseText.match("Activity restricted"))
         {
             alert("The Activity you are trying is restricted");
             window.location.href="logout.jsp";
         }
         else
         {
             document.getElementById("recommendationStatusResult").innerHTML=xmlhttp.responseText.trim();
         }
    }
    xmlhttp.open('POST','fetchRecommendationStatusAdmin.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(str);
}

function getBrokerageStructure(fileName)
{
    //fileName="-1";
    if(fileName.match("-1"))
    {
        document.getElementById("result").innerHTML="Brokerage Structure is Not Avaliable";
    }
    else
    {
        //window.location="brokerageStructure/"+xmlhttp.responseText.trim();target="_blank";
        //window.open('brokerageStructure/'+xmlhttp.responseText.trim(),'_blank');
        var a = document.createElement('a');
        a.href = 'brokerageStructure/'+fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
    }
}

function prePopulateInvestmentDetails()
{
    var recommendedSipFeq="", recommendedSipDate="", recommendedSipType="", recommendedSipEndYear="";
    var recommendedNoOfInstallments="", recommendedSecondInstallmentMonth="", recommendedSipEndMonth="";
    var recommendedSecondInstallmentYear="", transType="";

  transType=document.getElementById("transType").value;
  if(transType.match("SIP"))
  {
    recommendedSipFeq=document.getElementById("recommendedSipFeq").value;
    recommendedSipDate=document.getElementById("recommendedSipDate").value;
    recommendedSecondInstallmentMonth=document.getElementById("recommendedSecondInstallmentMonth").value;
    recommendedSecondInstallmentYear=document.getElementById("recommendedSecondInstallmentYear").value;
    recommendedSipType=document.getElementById("recommendedSipType").value;
    
    if(recommendedSipFeq.match("Monthly"))
    {document.getElementById("Monthly").selected=true;}
    else if(recommendedSipFeq.match("Quarterly"))
    {document.getElementById("Quarterly").selected=true;}
    else if(recommendedSipFeq.match("Half Yearly"))
    {document.getElementById("Half Yearly").selected=true;}

    if(recommendedSipDate.match("1"))
    {document.getElementById("01").selected=true;}
    else if(recommendedSipDate.match("5"))
    {document.getElementById("05").selected=true;}
    else if(recommendedSipDate.match("10"))
    {document.getElementById("10").selected=true;}
    else if(recommendedSipDate.match("15"))
    {document.getElementById("15").selected=true;}
    else if(recommendedSipDate.match("20"))
    {document.getElementById("20").selected=true;}
    else if(recommendedSipDate.match("25"))
    {document.getElementById("25").selected=true;}
    else if(recommendedSipDate.match("28"))
    {document.getElementById("28").selected=true;}
    
    if(recommendedSecondInstallmentMonth.match("01"))
    {document.getElementById("01").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("02"))
    {document.getElementById("02").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("03"))
    {document.getElementById("03").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("04"))
    {document.getElementById("04").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("05"))
    {document.getElementById("05").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("06"))
    {document.getElementById("06").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("07"))
    {document.getElementById("07").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("08"))
    {document.getElementById("08").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("09"))
    {document.getElementById("09").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("10"))
    {document.getElementById("10").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("11"))
    {document.getElementById("11").selected=true;}
    else if(recommendedSecondInstallmentMonth.match("12"))
    {document.getElementById("12").selected=true;}

    if(recommendedSecondInstallmentYear.match("2018"))
    {document.getElementById("2018").selected=true;}
    else if(recommendedSecondInstallmentYear.match("2019"))
    {document.getElementById("2019").selected=true;}
    else if(recommendedSecondInstallmentYear.match("2020"))
    {document.getElementById("2020").selected=true;}

    if(recommendedSipType.match("EndDate"))
    {
        document.getElementById("sipperiod1").checked=true;
        document.getElementById("byDate").style.display="block";
        document.getElementById("byInstallments").style.display="none";

        recommendedSipEndMonth=document.getElementById("recommendedSipEndMonth").value;
        if(recommendedSipEndMonth.match("01"))
        {document.getElementById("end01").selected=true;}
        else if(recommendedSipEndMonth.match("02"))
        {document.getElementById("end02").selected=true;}
        else if(recommendedSipEndMonth.match("03"))
        {document.getElementById("end03").selected=true;}
        else if(recommendedSipEndMonth.match("04"))
        {document.getElementById("end04").selected=true;}
        else if(recommendedSipEndMonth.match("05"))
        {document.getElementById("end05").selected=true;}
        else if(recommendedSipEndMonth.match("06"))
        {document.getElementById("end06").selected=true;}
        else if(recommendedSipEndMonth.match("07"))
        {document.getElementById("end07").selected=true;}
        else if(recommendedSipEndMonth.match("08"))
        {document.getElementById("end08").selected=true;}
        else if(recommendedSipEndMonth.match("09"))
        {document.getElementById("end09").selected=true;}
        else if(recommendedSipEndMonth.match("10"))
        {document.getElementById("end10").selected=true;}
        else if(recommendedSipEndMonth.match("11"))
        {document.getElementById("end11").selected=true;}
        else if(recommendedSipEndMonth.match("12"))
        {document.getElementById("end12").selected=true;}

        recommendedSipEndYear=document.getElementById("recommendedSipEndYear").value;
        if(recommendedSipEndYear.match("2018"))
        {document.getElementById("end2018").selected=true;}
        else if(recommendedSipEndYear.match("2019"))
        {document.getElementById("end2019").selected=true;}
        else if(recommendedSipEndYear.match("2020"))
        {document.getElementById("end2020").selected=true;}
        else if(recommendedSipEndYear.match("2021"))
        {document.getElementById("end2021").selected=true;}
        else if(recommendedSipEndYear.match("2022"))
        {document.getElementById("end2022").selected=true;}
        else if(recommendedSipEndYear.match("2023"))
        {document.getElementById("end2023").selected=true;}
        else if(recommendedSipEndYear.match("2024"))
        {document.getElementById("end2024").selected=true;}
        else if(recommendedSipEndYear.match("2025"))
        {document.getElementById("end2025").selected=true;}
        else if(recommendedSipEndYear.match("2026"))
        {document.getElementById("end2026").selected=true;}
        else if(recommendedSipEndYear.match("2027"))
        {document.getElementById("end2027").selected=true;}
        else if(recommendedSipEndYear.match("2028"))
        {document.getElementById("end2028").selected=true;}
        else if(recommendedSipEndYear.match("2029"))
        {document.getElementById("end2029").selected=true;}
        else if(recommendedSipEndYear.match("2030"))
        {document.getElementById("end2030").selected=true;}
    }
    else if(recommendedSipType.match("Installments"))
    {
        document.getElementById("sipperiod2").checked=true;
        document.getElementById("byInstallments").style.display="block";
        document.getElementById("byDate").style.display="none";
        recommendedNoOfInstallments=document.getElementById("recommendedNoOfInstallments").value;
        document.getElementById("txtsipperiod").value = recommendedNoOfInstallments;
    }
  }
}

function prePopulateForm()
{
    var showNationality="", showFatherSpouseName="", showOccupation="", showMaritalStatus="", showIncomeSlab="";
    var showPoliticalExposure="", showPOB="", showTaxResidentialAddress="", showTaxResidentialCityCode="", showNomineeRelation="";
    var showTaxResidentialState="", showTaxResidentialCountry="", showTinNo="", showIfscCode="", showMicrCode="", showGuardianRelation="";
    var showBankBranch="", showBankCity="", showBankName="", showAccNo="", showAccType="", showNomineeDetails="";
    var showNomineeDob="", showGuardianName="", showGuardianPan="", showGender="", showTitleName="", showTaxStatus="";
    var showNomineeName="", showTaxResidentialCity="";

    showTitleName=document.getElementById("showTitleName").value;
    showGender=document.getElementById("showGender").value;
    showNationality=document.getElementById("showNationality").value;
    showFatherSpouseName=document.getElementById("showFatherSpouseName").value;
    showOccupation=document.getElementById("showOccupation").value;
    showMaritalStatus=document.getElementById("showMaritalStatus").value;
    showIncomeSlab=document.getElementById("showIncomeSlab").value;
    showPoliticalExposure=document.getElementById("showPoliticalExposure").value;
    showPOB=document.getElementById("showPOB").value;
    showTaxStatus=document.getElementById("showTaxStatus").value;
    if(showTaxStatus.match("Non Residential Indian Individual"))
    {
        showTaxResidentialAddress=document.getElementById("showTaxResidentialAddress").value;
        showTaxResidentialCity=document.getElementById("showTaxResidentialCity").value;
        showTaxResidentialCityCode=document.getElementById("showTaxResidentialCityCode").value;
        showTaxResidentialState=document.getElementById("showTaxResidentialState").value;
        showTaxResidentialCountry=document.getElementById("showTaxResidentialCountry").value;
        showTinNo=document.getElementById("showTinNo").value;
    }
    showBankName=document.getElementById("showBankName").value;
    showAccNo=document.getElementById("showAccNo").value;
    showAccType=document.getElementById("showAccType").value;
    showBankBranch=document.getElementById("showBankBranch").value;
    showIfscCode=document.getElementById("showIfscCode").value;
    showMicrCode=document.getElementById("showMicrCode").value;
    showBankCity=document.getElementById("showBankCity").value;
    showNomineeDetails=document.getElementById("showNomineeDetails").value;
    if(showNomineeDetails.match("Yes"))
    {
        showNomineeDob=document.getElementById("showNomineeDob").value;
    }
    showGuardianName=document.getElementById("showGuardianName").value;
    showGuardianPan=document.getElementById("showGuardianPan").value;
    showGuardianRelation=document.getElementById("showGuardianRelation").value;

    if(showTitleName.match("Mr"))
    {document.getElementById("Mr").checked=true;}
    else if(showTitleName.match("Miss"))
    {document.getElementById("Miss").checked=true;}
    else if(showTitleName.match("Mrs"))
    {document.getElementById("Mrs").checked=true;}

    if(showGender.match("Male"))
    {document.getElementById("Male").checked=true;}
    else if(showGender.match("Female"))
    {document.getElementById("Female").checked=true;}

    if(showNationality.match("Indian"))
    {document.getElementById("nationalityIndian").checked=true;}
    else
    {
        document.getElementById("nationalityOther").checked=true;
        document.getElementById("other_nationality").style.display="block";
        document.getElementById("otherNationality").value=showNationality.trim();
    }

    document.getElementById("nameFatherSpouse").value=showFatherSpouseName.trim();

    if(showOccupation.match("Agriculturist"))
    {document.getElementById("Agriculturist").selected=true;}
    else if(showOccupation.match("Business"))
    {document.getElementById("Business").selected=true;}
    else if(showOccupation.match("Forex Dealer"))
    {document.getElementById("Forex Dealer").selected=true;}
    else if(showOccupation.match("Housewife"))
    {document.getElementById("Housewife").selected=true;}
    else if(showOccupation.match("Private Sector Service"))
    {document.getElementById("Private Sector Service").selected=true;}
    else if(showOccupation.match("Professional"))
    {document.getElementById("Professional").selected=true;}
    else if(showOccupation.match("Public Sector Government Service"))
    {document.getElementById("Public Sector Government Service").selected=true;}
    else if(showOccupation.match("Retired"))
    {document.getElementById("Retired").selected=true;}
    else if(showOccupation.match("Service"))
    {document.getElementById("Service").selected=true;}
    else if(showOccupation.match("Student"))
    {document.getElementById("Student").selected=true;}
    else
    {
        document.getElementById("occupationOther").selected=true;
        document.getElementById("other_occupation").style.display="block";
        document.getElementById("otherOccupation").value=showOccupation.trim();
    }

    if(showMaritalStatus.match("Single"))
    {document.getElementById("Single").checked=true;}
    else if(showMaritalStatus.match("Married"))
    {document.getElementById("Married").checked=true;}

    if(showIncomeSlab.match("31"))
    {document.getElementById("31").selected=true;}
    else if(showIncomeSlab.match("32"))
    {document.getElementById("32").selected=true;}
    else if(showIncomeSlab.match("33"))
    {document.getElementById("33").selected=true;}
    else if(showIncomeSlab.match("34"))
    {document.getElementById("34").selected=true;}
    else if(showIncomeSlab.match("35"))
    {document.getElementById("35").selected=true;}
    else if(showIncomeSlab.match("36"))
    {document.getElementById("36").selected=true;}

    if(showPoliticalExposure.match("PE"))
    {document.getElementById("PE").checked=true;}
    else if(showPoliticalExposure.match("RPE"))
    {document.getElementById("RPE").checked=true;}
    else if(showPoliticalExposure.match("NA"))
    {document.getElementById("NA").checked=true;}

    if(showPOB.match("India"))
    {document.getElementById("countryIndian").checked=true;}
    else
    {
        document.getElementById("countryOther").checked=true;
        document.getElementById("other_country").style.display="block";
        document.getElementById("otherCountry").value=showPOB.trim();
    }

    if(showTaxStatus.match("Resident Indian Individual"))
    {
        document.getElementById("Resident Indian Individual").selected=true;
        document.getElementById("accTypeShow").style.display="block";
        document.getElementById("accTypeHide").style.display="none";
    }
    else
    {
        document.getElementById("Non Residential Indian Individual").selected=true;
        document.getElementById("other_taxStatus").style.display="block";
        document.getElementById("taxResidencyAddress").value=showTaxResidentialAddress.trim();
        document.getElementById("taxResidencyCity").value=showTaxResidentialCity.trim();
        document.getElementById("taxResidencycityCode").value=showTaxResidentialCityCode.trim();
        document.getElementById("taxResidencyState").value=showTaxResidentialState.trim();
        document.getElementById("taxResidencyCountry").value=showTaxResidentialCountry.trim();
        document.getElementById("TINno").value=showTinNo.trim();
        document.getElementById("accTypeShow").style.display="none";
        document.getElementById("accTypeHide").style.display="block";
    }

    document.getElementById("bankName").value=showBankName.trim();
    document.getElementById("bankAccountNumber").value=showAccNo.trim();
    document.getElementById("reconfirmBankAccountNumber").value=showAccNo.trim();
    document.getElementById("bankBranch").value=showBankBranch.trim();

    if(showAccType.match("SB"))
    {document.getElementById("SB").checked=true;}
    else if(showAccType.match("CA"))
    {document.getElementById("CA").checked=true;}
    else if(showAccType.match("NRE"))
    {document.getElementById("NRE").checked=true;}
    else if(showAccType.match("NRO"))
    {document.getElementById("NRO").checked=true;}
    else if(showAccType.match("FCNR"))
    {document.getElementById("FCNR").checked=true;}

    document.getElementById("ifscCode").value=showIfscCode.trim();
    document.getElementById("micrCode").value=showMicrCode.trim();
    document.getElementById("bankCity").value=showBankCity.trim();

    if(showNomineeDetails.match("Yes"))
    {
        document.getElementById("nomineeYes").checked=true;
        document.getElementById("showDiv").style.display="block";
        showNomineeName=document.getElementById("showNomineeName").value;
        showNomineeDob=document.getElementById("showNomineeDob").value;
        showNomineeRelation=document.getElementById("showNomineeRelation").value;
        document.getElementById("nameNominee").value=showNomineeName.trim();
        document.getElementById("cal1").value=showNomineeDob.trim();
        document.getElementById("relationNominee").value=showNomineeRelation.trim();
    }
    else
    {
        document.getElementById("nomineeNo").checked=true;
        document.getElementById("showDiv").style.display="none";
    }

    if(document.getElementById('chkMinor').value.match("yes"))
    {
        document.getElementById('guardianDiv').style.display="block";
        document.getElementById("nameGuardian").value=showGuardianName.trim();
        document.getElementById("panGuardian").value=showGuardianPan.trim();
        document.getElementById("relationGuardian").value=showGuardianRelation.trim();
    }
    else if(document.getElementById('chkMinor').value.match("no"))
    {
        document.getElementById('guardianDiv').style.display="none";
    }

    if((document.getElementById('chkMinor').value.match("yes")) && (showGuardianRelation.match("Mother")))
    {document.getElementById("selectGuardianRelationMother").checked=true;}
    else if((document.getElementById('chkMinor').value.match("yes")) && (showGuardianRelation.match("Father")))
    {document.getElementById("selectGuardianRelationFather").checked=true;}
    else if ((document.getElementById('chkMinor').value.match("yes")) && (!(showGuardianRelation == null || showGuardianRelation == "")))
    {
        document.getElementById("selectGuardianRelationOther").checked=true;
        document.getElementById("relationOfGuardian").style.display="block";
        document.getElementById("relationGuardian").value=showGuardianRelation.trim();
    }

}

function activate()
{
    if(document.getElementById('optExisting').checked)
    {
	document.getElementById('show1').style.display ="none";
	document.getElementById('show2').style.display ="block";
    }
    else if(document.getElementById('optNew').checked)
    {
        document.getElementById('show1').style.display ="block";
	document.getElementById('show2').style.display ="none";
    }
}

function downloadPdfWithLogo(){
    //alert(document.downloadPDFWithLogo.logo_img.value);
     var str= "logo_img="+document.downloadPDFWithLogo.logo_img.value
                +"&cobranding_pdf="+document.downloadPDFWithLogo.cobranding_pdf.value;
    document.getElementById('errorMsg').innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
           // alert(xmlhttp.responseText);
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if(xmlhttp.responseText.match("failure"))
             {
                document.getElementById("errorMsg").innerHTML="<span style='color:red'>Failed to Generate PDF.</span>";
             }
             else
             {
                var msg = xmlhttp.responseText.trim();
                document.getElementById("errorMsg").innerHTML="<span style='color:blue'>Your PDF is successfully generated. <a href='cobranding_pdf/"+msg+"' target='_blank'>Click Here</a> to download.</span>";
             }
        }
     };
     xmlhttp.open('POST','downloadPDFWithLogo',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
}
function validateTrailFee()
{
  var type= $('input[name=ReportType]:checked').val();
  var period= $('input[name=Period]:checked').val();
  var pdfPass=document.getElementById("PDFPassword").value;
  if(typeof type == 'undefined')
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please select report type.</span>";
  }
  else if(typeof period == 'undefined')
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please select Period.</span>";
  }
  else if(pdfPass=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter PDF Password.</span>";
  }
  else
  {
      document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
          var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }
         else if(xmlhttp.responseText.match("success")){
             document.getElementById("result").innerHTML = "<span style='color: green;'>Your request for Trail Fee through mailback has been submitted successfully.</br> Please check your registered email-id to download the report.</span>";
         }
        else
        {
                document.getElementById("result").innerHTML = "<span style='color: red;'>Sorry, We are not able to fulfill your request. Please try after some time.</span>";
        }
      }
    }
    xmlhttp.open('POST','getTrailFee.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('type='+type+'&period='+period+'&pdfPass='+pdfPass);
  }

}
function validateEuin()
{
  var type= $('input[name=ReportType]:checked').val();
  var fromDate=document.getElementById("cal_1").value;
  var toDate=document.getElementById("cal_2").value;
  var pdfPass=document.getElementById("PDFPassword").value;
  if(typeof type == 'undefined')
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please select report type.</span>";
  }
  else if(fromDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter From Date.</span>";
  }else if(fromDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid From Date.</span>";
  }
  else if(new Date(fromDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than Current date.</span>";
  }
  else if(toDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter To Date.</span>";
  }else if(toDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid To Date.</span>";
  }
   else if(new Date(toDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>To Date should not be greater than Current date.</span>";
  }
     else if(new Date(fromDate) > new Date(toDate))
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than To date.</span>";
  }
  else if(pdfPass=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter PDF Password.</span>";
  }
  else
  {
      document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
          var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }else if(xmlhttp.responseText.match("success")){
             document.getElementById("result").innerHTML = "<span style='color: green;'>Your request for Invalid EUIN Transactions through mailback has been submitted successfully.</br> Please check your registered email-id to download the report.</span>";
         }
        else
        {
                document.getElementById("result").innerHTML = "<span style='color: red;'>Sorry, We are not able to fulfill your request. Please try after some time.</span>";
        }
       
      }
    }
    xmlhttp.open('POST','getInvalidEUIN.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('type='+type+'&fromDate='+fromDate+'&toDate='+toDate+'&pdfPass='+pdfPass);
  }

}
function validateKYC()
{
  var type= $('input[name=ReportType]:checked').val();
  var fromDate=document.getElementById("cal_1").value;
  var toDate=document.getElementById("cal_2").value;
  var pdfPass=document.getElementById("PDFPassword").value;
  //var folioNo=document.getElementById("folioNo").value;
 // var panNo=document.getElementById("panNo").value;
  
  if(typeof type == 'undefined')
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please select report type.</span>";
  }
//    else if(folioNo=="" && panNo=="")
//  {
//      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter Folio No or Pan No.</span>";
//  }
//    else if(folioNo!="" && panNo!="")
//  {
//      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter either Folio No or Pan No.</span>";
//  }
  else if(fromDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter From Date.</span>";
  }else if(fromDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid From Date.</span>";
  }
  else if(new Date(fromDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than Current date.</span>";
  }
  else if(toDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter To Date.</span>";
  }else if(toDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid To Date.</span>";
  }
   else if(new Date(toDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>To Date should not be greater than Current date.</span>";
  }
     else if(new Date(fromDate) > new Date(toDate))
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than To date.</span>";
  }
  else if(pdfPass=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter PDF Password.</span>";
  }
  else
  {
      document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
          var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }else if(xmlhttp.responseText.match("success")){
             document.getElementById("result").innerHTML = "<span style='color: green;'>Your request for KYCs List through mailback has been submitted successfully.</br> Please check your registered email-id to download the report.</span>";
         }
         else
         {
                document.getElementById("result").innerHTML = "<span style='color: red;'>Sorry, We are not able to fulfill your request. Please try after some time.</span>";
         }
        
      }
    }
    xmlhttp.open('POST','getKycReport.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('type='+type+'&fromDate='+fromDate+'&toDate='+toDate+'&pdfPass='+pdfPass+'&folioNo='+folioNo+'&panNo='+panNo);
  }

}
function validatesipstpswpexpired()
{
  var fromDate=document.getElementById("cal_1").value;
  var toDate=document.getElementById("cal_2").value;
  var pdfPass=document.getElementById("PDFPassword").value;
   var SchemeName=$('#schemeOptionValue').val();//document.getElementById("schemeOptionValue").value;
  if(SchemeName == "" || SchemeName == null)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please select Scheme.</span>";
  }
  else if(fromDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter From Date.</span>";
  }else if(fromDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid From Date.</span>";
  }
  else if(new Date(fromDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than Current date.</span>";
  }
  else if(toDate=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter To Date.</span>";
  }else if(toDate.length > 10)
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter valid To Date.</span>";
  }
   else if(new Date(toDate) > new Date())
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>To Date should not be greater than Current date.</span>";
  }
     else if(new Date(fromDate) > new Date(toDate))
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>From Date should not be greater than To date.</span>";
  }
  else if(pdfPass=="")
  {
      document.getElementById("result").innerHTML = "<span style='color: red;'>Please enter PDF Password.</span>";
  }
  else
  {
      document.getElementById("result").innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
          var xmlhttp = createRequestObject();

    xmlhttp.onreadystatechange=function()
    {
     if (xmlhttp.readyState==4)
     {
         if(xmlhttp.responseText.match("Activity restricted"))
         {
            alert("The Activity you are trying is restricted");
            window.location.href="logout.jsp";
         }else if(xmlhttp.responseText.match("success")){
             document.getElementById("result").innerHTML = "<span style='color: green;'>Your request for SIP / STP / SWP Expired through mailback has been submitted successfully.</br> Please check your registered email-id to download the report.</span>";
         }
          else
         {
                document.getElementById("result").innerHTML = "<span style='color: red;'>Sorry, We are not able to fulfill your request. Please try after some time.</span>";
         }
       
      }
    }
    xmlhttp.open('POST','getSIP_STP_SWP_Expired.jsp',true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('fromDate='+fromDate+'&toDate='+toDate+'&pdfPass='+pdfPass+'&SchemeName='+SchemeName);
  }
}


function downloadCobrandingPdf(msg,pdfname){
    //var msg="";
    var folder_name = document.getElementById("download_category").value; 
      
    if(msg == "cobranding"){
          
    $("#image-div").hide();
    //alert(document.downloadPDFWithLogo.logo_img.value);
   // alert(pdfname)
     var str= "pdfname="+pdfname
                +"&msg="+msg+"&folder_name="+folder_name;
    document.getElementById('errorMsg'+pdfname).innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
           // alert(xmlhttp.responseText);
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if(xmlhttp.responseText.match("failure"))
             {
                document.getElementById("errorMsg"+pdfname).innerHTML="<span style='color:red'>Failed to Download File.</span>";
             }
             else
             {
                var msg = xmlhttp.responseText.trim();
                var link = document.createElement('a');
                link.href = 'cobranding_pdf/'+msg;
                link.download = msg;
                link.dispatchEvent(new MouseEvent('click'));
                document.getElementById("errorMsg"+pdfname).innerHTML="";
                //document.getElementById("errorMsg"+pdfname).innerHTML="<span style='color:blue'>Your PDF is successfully generated. <a href='cobranding_pdf/"+msg+"' target='_blank'>Click Here</a> to download.</span>";
             }
        }
     };
     xmlhttp.open('POST','downloadPDFWithLogo',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
 }else{
    // alert('downloads/'+folder_name+'/'+pdfname);
                var link = document.createElement('a');
                link.href = 'downloads/'+folder_name+'/'+pdfname;
                link.download = pdfname;
                link.dispatchEvent(new MouseEvent('click'));
 }
}

//Crate code for NFO download
function downloadNFOPdf(msg,pdfname){
  
    if(msg == "NFOdownload"){
          
    $("#image-div").hide();
    //alert(document.downloadPDFWithLogo.logo_img.value);
   // alert(pdfname)
     var str= "pdfname="+pdfname
                +"&msg="+msg;
   // document.getElementById('errorMsg'+pdfname).innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
    var xmlhttp = createRequestObject();
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
           // alert(xmlhttp.responseText);
             if(xmlhttp.responseText.match("Session expired"))
             {
                alert("Session expired");
                window.location.href="login.html";
             }
             else if(xmlhttp.responseText.match("Activity restricted"))
             {
                alert("The Activity you are trying is restricted");
                window.location.href="logout.jsp";
             }
             else if(xmlhttp.responseText.match("failure"))
             {
                //document.getElementById("errorMsg"+pdfname).innerHTML="<span style='color:red'>Failed to Download File.</span>";
             }
             else
             {
                var msg = xmlhttp.responseText.trim();
                var link = document.createElement('a');
                link.href = 'NFOdownload_pdf/'+msg;
                link.download = msg;
                link.dispatchEvent(new MouseEvent('click'));
                //document.getElementById("errorMsg"+pdfname).innerHTML="";
                //document.getElementById("errorMsg"+pdfname).innerHTML="<span style='color:blue'>Your PDF is successfully generated. <a href='cobranding_pdf/"+msg+"' target='_blank'>Click Here</a> to download.</span>";
             }
        }
     };
     xmlhttp.open('POST','downloadNFOwithARN',true);
     xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xmlhttp.send(str);
 }else{
    // alert('downloads/'+folder_name+'/'+pdfname);
                var link = document.createElement('a');
                link.href = 'downloads/NFO_collaterals/'+pdfname;
                link.download = pdfname;
                link.dispatchEvent(new MouseEvent('click'));
 }
}

  function hideaddbtn(){
       //alert("hii")
       $("#addfiles").hide();
   }
     function showaddbtn(){
       //alert("hii")
       $("#addfiles").show();
   }
    
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
      trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
       trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
  
   
        $("#btnSubmit").click(function (event) {
        //  alert('hi')
        $("#btnSubmit").prop("disabled", true);
        document.getElementById('loader').innerHTML='<img alt="loading" src="images/loader.white.gif"/>';
        
              setTimeout(function(){
               
                
                var arncode=document.getElementById("arncode").value;
               
                var str= "arncode=" +arncode;
                var xmlhttp = createRequestObject();
              //  document.getElementById("errorMsg"+logoid).innerHTML='<img alt="loading" src="../images/loader.white.gif"  />';
               xmlhttp.onreadystatechange=function(){
               if (xmlhttp.readyState==4 && xmlhttp.status==200)
  		 {
                    // alert(xmlhttp.responseText.trim());
                     if(xmlhttp.responseText.trim() == 'Already Exist'){
                         alert("Logo Uploaded successfully, Please wait for approval.")
                          document.getElementById('loader').innerHTML='';
                     }else{
                         alert("Failed to Logo Upload, Logo size must be less than 2 MB.")
                     }
                      window.location.reload();
                 }
            }

	    xmlhttp.open('POST','checkPendingLogoAlreadyExist.jsp',true);
	    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	    xmlhttp.send(str);
        
                
                
           //alert("Logo Uploaded successfully, Please wait for approval.")
             
               }, 3000);
             
           
        });

    });


  


//logo
var flag=false;
    function uploadImage() {
        showaddbtn();
    if(flag == false){
        flag=true;
    $("#image-div").show();
    }else{
        flag=false;
        $("#image-div").hide();
    }
}


function dropdowmreset(){
    var selectedOptions = document.getElementById("fundType").selectedOptions;
    for(var i = 0; i < selectedOptions.length; i++)
        selectedOptions[i].selected = false;
     var selectedOptions1 = document.getElementById("schemeCode").selectedOptions;
    for(var i = 0; i < selectedOptions1.length; i++)
        selectedOptions1[i].selected = false;
    
}