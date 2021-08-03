/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var appView = angular.module('appView',['ui.bootstrap']);
appView.controller('viewController',['$scope','$http','$window', function($scope,$http,$window){


    $scope.details={};
    $scope.formData = {};
    $scope.paginationDisplay=false;
     $scope.noDataFlag=false;
//    function getInfo(){
//$http.post('announcementDetails.jsp').success(function(data){
//$scope.details = data;
//$scope.totalItems=$scope.details.length;
//});
//}
 $scope.openWindow = function(id)
 {
  window.open("edit-announcement.jsp?Id="+id, null, "height=500, width=500, status=yes, toolbar=no, menubar=no");
 };

    $scope.searchByFilter = function() {
     $scope.details ="";
    $scope.fromDate = FromDate();
//     $scope.noDataFlag=false;
//     $scope.dataFlag=false;
   $scope.toDate = ToDate();
   var firstDate =new Date($scope.fromDate);
   var secondDate =new Date($scope.toDate);
    // alert($scope.toDate)
     if(($scope.fromDate == "" && $scope.fromDate == "") || firstDate <= secondDate)
      {
      var data =$.param({
            status : $scope.status,
            fromDate : $scope.fromDate,
            toDate : $scope.toDate
           });
       var config={
           headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
       }
	$http.post("announcementDetails.jsp",data,config)
                .success(function(response){
                    $scope.details=response;
                    //alert($scope.details);
                 $scope.totalItems=$scope.details.length;
                   //alert($scope.totalItems);
                if($scope.totalItems!=0)
                    {
                $scope.paginationDisplay=true;
                $scope.noDataFlag=false;
                    }
                    //$scope.clear();
                    //getInfo();

                   if($scope.totalItems==0)
                       {
                           $scope.noDataFlag=true;
                           $scope.paginationDisplay=false;
                       }

             });
        }
        else{
            alert("From Date should be samller ")
        }
    };
 $scope.clear = function () {
        $scope.details ="";
    };
    

    $scope.count=0;
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.details.length/$scope.pageSize);
    }
  $scope.viewby = 5;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show

$scope.totalItems=25;
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}
}]);
