angular.module('app.route')
    .config(function($stateProvider){
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl:function(){
                    return 'module/tab/html/tab.html';
                }
            })
            .state('tab.main', {
                url: '/main',
                views:{
                    'main':{
                        controller:'mainCtrl',
                        templateUrl:function(){
                            return 'module/tab/html/main.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ionic-banner-tips',
                                    'module/tab/js/main.js'
                                ]);
                            }
                        }
                    }
                }
            });
    });