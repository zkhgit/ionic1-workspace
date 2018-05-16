angular.module('app')
    .controller('demoDownloadCtrl', function($scope, $rootScope, Download, demoDownloadService){
        demoDownloadService.loading($scope);
        if(!$rootScope.test1){
            $rootScope.test1 = 0;
        }
        $scope.download = function(url){
            Download.start(url,'test1');
        };
    })
    .service('demoDownloadService', function(){
        this.loading = function(){

        };
    });