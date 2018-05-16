angular.module('app')
    .controller('demoOfficeCtrl', function($scope, $rootScope){
        $scope.open = function(){
            iAppOfficePlugin.openWebFile(		
                'http://192.168.0.24:8080/cepsp/attached/linxu.docx',
                '', 
                0, 
                1, 
                'admin', 
                function(successCallback) {alert('成功');}, 
                function(e) {
                    alert(e);
                    alert(JSON.stringify(e));
                }
            );

        }
    });