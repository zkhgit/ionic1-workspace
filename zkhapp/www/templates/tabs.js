
angular.module('tabs_ctrl',[])
    .config(function($stateProvider, TAB){
        $stateProvider
            .state(TAB.tabs.tab.name, {
                url: TAB.tabs.tab.url,
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state(TAB.tabs.main.name, {
                url: TAB.tabs.main.url,
                views: {
                    'main': {
                        templateUrl: 'templates/main.html',
                        controller: 'main'
                    }
                }
            });
    })
    .controller('main', function($scope, $ionicPopup, $cordovaToast, mainService, exitAppService,$ionicLoading, HTTP){
        // 初始化加载
        mainService.loading($scope);

        $scope.setIp = function(tomIp, port){
            IP = typeof(tomIp)=='string'?tomIp:'192.168.0.24';  // 10.0.248.53  168.160.1.52 168.160.1.39 localhost
            PORT = typeof(port)=='string'?port:'8080';
            PATH = 'http://'+ IP + ':' + PORT; //测试IP
            DOMAIN_NAME = PATH + '/kjtrzpt';
            $cordovaToast.showLongBottom('服务器设置成功');
        };
    })
    .service('mainService', function($cordovaToast, CACHE, TAB, HTTP, ACTION, JSONBY, CACHE){
        this.loading = function(scope){
            scope.TAB = TAB;
        };
    });
    