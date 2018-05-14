angular.module('app')
    .controller('main', function($scope, $cordovaToast, mainService){
        // 初始化加载
        mainService.loading($scope);
        $scope.setIp = function(tomIp, port){
            $scope.toast = '设置成功！';
            IP = typeof(tomIp)=='string'?tomIp:'192.168.0.24';  // 10.0.248.53  168.160.1.52 168.160.1.39 localhost
            PORT = typeof(port)=='string'?port:'8080';
            PATH = 'http://'+ IP + ':' + PORT; //测试IP
            DOMAIN_NAME = PATH + '/kjtrzpt/';
            $cordovaToast.showLongBottom('服务器设置成功');
        };
    })
    .service('mainService', function(){
        this.loading = function(scope){

        };
    });