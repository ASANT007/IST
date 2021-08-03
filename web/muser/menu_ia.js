
menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}

if(navigator.appVersion.indexOf("MSIE 6.0")>0)
{
	effect = "GradientWipe(duration=0.5);Alpha(style=0,opacity=90);Shadow(color='#777777', Direction=135, Strength=5)"
}
else
{
	effect = "Shadow(color='#777777', Direction=135, Strength=5)" // Stop IE5.5 bug when using more than one filter
}


timegap=500			// The time delay for menus to remain visible
followspeed=5		// Follow Scrolling speed
followrate=40		// Follow Scrolling Rate
suboffset_top=10;	// Sub menu offset Top position 
suboffset_left=10;	// Sub menu offset Left position

style0=[			// style0 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"ffffff",			// Mouse Off Font Color
"",			// Mouse Off Background Color
"d9b860",			// Mouse On Font Color
"",			// Mouse On Background Color
,			// Menu Border Color 
14,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"normal",				// Font Weight (bold or normal)
"Arial",	// Font Name
10,					// Menu Item Padding
,		// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"66ffff",			// 3D High Color
"000099",			// 3D Low Color
,			// Current Page Item Font Color (leave this blank to disable)
"ffaf04",				// Current Page Item Background Color (leave this blank to disable)
"",		// Top Bar image (Leave this blank to disable)
"ffffff",			// Menu Header Font Color (Leave blank if headers are not needed)
"000099",			// Menu Header Background Color (Leave blank if headers are not needed)
"FFFFFF",			// Menu Item Separator Color
]

style1=[			// style1 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"ffffff",			// Mouse Off Font Color
"#07639d",			// Mouse Off Background Color
"d9b860",			// Mouse On Font Color
"#07639d",			// Mouse On Background Color
,			// Menu Border Color 
12,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"normal",				// Font Weight (bold or normal)
"Arial",	// Font Name
10,					// Menu Item Padding
,		// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"66ffff",			// 3D High Color
"000099",			// 3D Low Color
,			// Current Page Item Font Color (leave this blank to disable)
,				// Current Page Item Background Color (leave this blank to disable)
"arrow.gif",		// Top Bar image (Leave this blank to disable)
"ffffff",			// Menu Header Font Color (Leave blank if headers are not needed)
"000099",			// Menu Header Background Color (Leave blank if headers are not needed)
"FF9933",			// Menu Item Separator Color
]

addmenu(menu=[		// This is the array that contains your menu properties and details
"mainmenu",			// Menu Name - This is needed in order for the menu to be called
77,					// Menu Top - The Top position of the menu in pixels
250,				// Menu Left - The Left position of the menu in pixels
,					// Menu Width - Menus width in pixels
1,					// Menu Border Width 
"center",					// Screen Position - here you can use "center;left;right;middle;top;bottom" or a combination of "center:middle"
style0,				// Properties Array - this is set higher up, as above
1,					// Always Visible - allows the menu item to be visible at all time (1=on/0=off)
"left",				// Alignment - sets the menu elements text alignment, values valid here are: left, right or center
,				// Filter - Text variable for setting transitional effects on menu activation - see above for more info
,					// Follow Scrolling - Tells the menu item to follow the user down the screen (visible at all times) (1=on/0=off)
1, 					// Horizontal Menu - Tells the menu to become horizontal instead of top to bottom style (1=on/0=off)
,					// Keep Alive - Keeps the menu visible until the user moves over another menu or clicks elsewhere on the page (1=on/0=off)
,					// Position of TOP sub image left:center:right
,					// Set the Overall Width of Horizontal Menu to 100% and height to the specified amount (Leave blank to disable)
,					// Right To Left - Used in Hebrew for example. (1=on/0=off)
,					// Open the Menus OnClick - leave blank for OnMouseover (1=on/0=off)
,					// ID of the div you want to hide on MouseOver (useful for hiding form elements)
,					// Background image for menu when BGColor set to transparent.
,					// Scrollable Menu
,					// Reserved for future use
,"&nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;","dashboard.jsp","#","Home",0
,"&nbsp;&nbsp;IST&nbsp;Details","show-menu=sub_site_mgmt","#","Masters",0
//,"&nbsp;&nbsp;Daily&nbsp;Guard&nbsp;Report","viewDailyGuardReport.jsp","#","Masters",0
//,"&nbsp;&nbsp;Guard&nbsp;Site&nbsp;Report","viewSiteGuardReport.jsp","#","Masters",0
//,"&nbsp;&nbsp;Weekly&nbsp;Off&nbsp;Report","viewWeeklyOfException.jsp","#","Masters",0
//,"&nbsp;&nbsp;Site&nbsp;Mgmt&nbsp;&nbsp;","show-menu=sub_site_mgmt","#","Atms",0
//,"&nbsp;&nbsp;Site&nbsp;Mgmt&nbsp;&nbsp;","show-menu=sub_site_mgmt","#","Site",0
//,"&nbsp;&nbsp;User&nbsp;Mgmt&nbsp;&nbsp;","show-menu=sub_user_mgmt","#","User",0
//,"&nbsp;&nbsp;Mapping&nbsp;Mgmt&nbsp;&nbsp;","show-menu=sub_question_mgmt","#","Question",0
//,"&nbsp;&nbsp;Site&nbsp;Visit&nbsp;Report","allReportForAdmin.jsp","#","Reports",0
//,"&nbsp;&nbsp;All&nbsp;Reports&nbsp;","filterReportsForAdmin.jsp","#","All Reports",0 // Added by AMOL S. on 11-Mar-2020
//,"&nbsp;&nbsp;View&nbsp;KYC&nbsp;Repository&nbsp;","viewRepository.jsp","#","View Repository",0
//,"&nbsp;&nbsp;Reset&nbsp;Password&nbsp;","changePasswordClient.jsp","#","Reset Password",0 // Added by madhur S. on 06-nov-2020
,"&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;","logout.jsp","#","Home",0

]);

addmenu(menu=["sub_master_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,	
        ,"Branch&nbsp;Master","viewAllBranches.jsp","#","Branchmaster",0
//        ,"Zone&nbsp;Master","viewAllZones.jsp","#","Zonemaster",0
//        ,"Location&nbsp;Master","show-menu=sub_city_master_mgmt","#","Citymaster",0
        ,"Customer&nbsp;Master","viewAllCustomers.jsp","#","Customermaster",0
//        ,"Bank&nbsp;Master","viewAllBanks.jsp","#","Bankmaster",0
//        ,"Photo&nbsp;Label&nbsp;Master","viewAllLebels.jsp","#","LabelMaster",0
//        ,"Site&nbsp;Type&nbsp;Master","siteTypeMaster.jsp","#","SiteTypeMaster",0
        
])

addmenu(menu=["sub_site_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
        ,"Add&nbsp;IST","addIST.jsp",,"Add&nbsp;New&nbsp;Site",0
        ,"View&nbsp;IST","viewSites.jsp",,"View&nbsp;Sites",0
])

/*addmenu(menu=["sub_site_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
        ,"Add&nbsp;Site&nbsp;Details","addSiteDetails.jsp",,"Add&nbsp;Site&nbsp;Details",0
        ,"View&nbsp;Site&nbsp;Details","viewAllSiteDetails.jsp",,"view&nbsp;Site&nbsp;Details",0
        //,"View&nbsp;Atms","viewAtms.jsp",,"View&nbsp;Atms",0
])*/

addmenu(menu=["sub_user_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
        ,"Add&nbsp;New&nbsp;User","addNewUser.jsp","#","Add&nbsp;New&nbsp;User",0
        ,"View&nbsp;Users","viewUsers.jsp","#","View&nbsp;Users",0
])

addmenu(menu=["sub_question_mgmt",
	,,150,1,"",style1,,"left",effect,,,,,,,,,,,,
       ,"Guard&nbsp;Mapping","viewGuards.jsp","#","viewGuards",0
        ,"FO&nbsp;Mapping","viewFO.jsp","#","viewFO",0

])
//addmenu(menu=["sub_report_mgmt",
//	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
//	,"Site Visit Report","allReportForAdmin.jsp",,"All Reports",0
//])
addmenu(menu=["sub_sub_user",
	,,140,1,"",style1,,"left",effect,,,,,,,,,,,,
//        ,"Add&nbsp;Country&nbsp;Manager","addNewCountryManager.jsp","#","CountryManager",0
//        ,"Add&nbsp;Branch&nbsp;Manager","addNewBranchManager.jsp","#","CountryManager",0
//        ,"Add&nbsp;Field&nbsp;Officer","addNewFieldOfficer.jsp","#","CountryManager",0
//        ,"Add&nbsp;Auditor","addNewAuditor.jsp","#","CountryManager",0
//        ,"Add&nbsp;Coordinator","addNewCoordinator.jsp","#","CountryManager",0
	
       // ,"View All Users","viewAllUsers.jsp",,"View All Users",0
])
addmenu(menu=["sub_view_user_mgmt",
	,,140,1,"",style1,,"left",effect,,,,,,,,,,,,
        //,"View&nbsp;All","viewUserDetails.jsp","#","View&nbsp;All",0
//        ,"By&nbsp;Name","viewUserDetailsByName.jsp","#","By&nbsp;Name",0
//        ,"By&nbsp;Role","viewUserDetailsByRole.jsp","#","By&nbsp;Role",0
       // ,"View All Users","viewAllUsers.jsp",,"View All Users",0
])

/*addmenu(menu=["sub_zone_master_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add New Zone","addNewZone.jsp",,"Add New Zone",0
        ,"View All Zones","viewAllZones.jsp",,"View All Zones",0
])*/
addmenu(menu=["sub_city_master_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add&nbsp;New&nbsp;Location","addNewCity.jsp",,"Add&nbsp;New&nbsp;City",0
        ,"View&nbsp;All&nbsp;Locations","viewAllCities.jsp",,"View&nbsp;All&nbsp;Cities",0
])
/*addmenu(menu=["sub_question_master_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add New Question","addNewQuestion.jsp",,"Add New Atm",0
        ,"View All Questions","viewAllQuestions.jsp",,"View All Questions",0
])*/

/*addmenu(menu=["sub_mapping_mgmt",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"State Branch Mapping","show-menu=sub_state_branch_mapping","#","State Branch Mapping",0
        ,"ATM Field Officer Mapping","show-menu=sub_atm_field_officer_mapping","#","ATM Field Officer Mapping",0
        ,"Auditor Location Mapping","show-menu=sub_auditor_location_mapping","#","Auditor Location Mapping",0
])
addmenu(menu=["sub_state_branch_mapping",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add New Mapping","addNewStateBranchMapping.jsp",,"Add New Mapping",0
        ,"View All Mapping","viewAllStateBranchMapping.jsp",,"View All Mapping",0
])
addmenu(menu=["sub_atm_field_officer_mapping",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add New Mapping","addNewAtmFieldOfficerMapping.jsp",,"Add New Mapping",0
        ,"View All Mapping","viewAllAtmFieldOfficerMapping.jsp",,"View All Mapping",0
])
addmenu(menu=["sub_auditor_location_mapping",
	,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"Add New Mapping","addNewAuditorLocationMapping.jsp",,"Add New Mapping",0
        ,"View All Mapping","viewAllAuditorLocationMapping.jsp",,"View All Mapping",0
])*/
dumpmenus()