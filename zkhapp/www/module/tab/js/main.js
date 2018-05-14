angular.module('app')
    .controller('mainController', function($scope, $cordovaToast, mainService, PATH){
        // 初始化加载
        mainService.loading($scope);
        $scope.setIp = function(tomIp, port){
            $scope.toast = '设置成功！';
            PATH.IP = typeof(tomIp)=='string'?tomIp:'192.168.0.24';  // 10.0.248.53  168.160.1.52 168.160.1.39 localhost
            PATH.PORT = typeof(port)=='string'?port:'8080';
            PATH.IP_PORT = 'http://'+ IP + ':' + PORT; //测试IP
            PATH.DOMAIN_NAME = PATH.IP_PORT + '/kjtrzpt/';
            $cordovaToast.showLongBottom('服务器设置成功');
        };
    })
    .service('mainService', function(){
        this.loading = function(scope){

        };
    });