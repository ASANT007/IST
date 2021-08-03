/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var appAdd = angular.module('appAdd',[]);
appAdd.controller('addController',['$scope','$http','$sce', function($scope,$http,$sce){
        $scope.save = function(notification) {
         $scope.file = fileName();
        // alert($scope.file);
       var data =$.param({
            heading : notification.heading,
            description : notification.heading_description,
            file:$scope.file
           });
       var config={
           headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
       }
	$http.post("insertAnnouncementDetails.jsp",data,config)
                .success(function(response){
                    
                  $scope.msg = $sce.trustAsHtml(response);
                 $scope.clear();
                 });
                }
         $scope.clear = function () {
        $scope.notification="";   
        $scope.contact.$setUntouched();
        $scope.contact.$setPristine();
        refreshIframe();
    };
        
}]);
