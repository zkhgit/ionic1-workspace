angular.module('app')
    .controller('mainCtrl', function($scope, $cordovaToast, $ionicContentBanner, PATH, mainService){
        // 初始化加载
        mainService.loading($scope);

        $ionicContentBanner.showstablebanner({     
            text:'欢迎归来欢迎归来欢迎归来欢迎归来！',     
            type:'info',    
        });

        $scope.setIp = function(tomIp, port){
            $scope.toast = '设置成功！';
            PATH.IP = typeof(tomIp)=='string'?tomIp:'192.168.0.24';  // 10.0.248.53  168.160.1.52 168.160.1.39 localhost
            PATH.PORT = typeof(port)=='string'?port:'8080';
            PATH.IP_PORT = 'http://'+ PATH.IP + ':' + PATH.PORT; //测试IP
            PATH.DOMAIN_NAME = PATH.IP_PORT + '/kjtrzpt/';
            $cordovaToast.showLongBottom('服务器设置成功');
        };
    })
    .service('mainService', function($rootScope){
        this.loading = function(scope){
            scope.$on('$ionicView.afterEnter', function() {
                $rootScope.mfbButton = false; // 显示浮动按钮
            });
        };
    });