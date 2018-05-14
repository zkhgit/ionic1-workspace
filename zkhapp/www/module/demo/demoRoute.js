angular.module('app.route')
    .config(function($stateProvider){
        $stateProvider
            .state('tab.form', { // 新闻动态
                url: '/demo/form',
                views: {
                    'main': {
                        controller:'formController',
                        templateUrl:function(){
                            return 'module/demo/html/form.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'format',
                                    'ionic-rating',
                                    'core/directive/input-color.js',
                                    'core/directive/input-datetime.js',
                                    'core/directive/input-select.js',
                                    'core/directive/input-sfz.js',
                                    'core/directive/input-treelist.js',
                                    'module/demo/js/form.js'
                                ]);
                            }
                        }
                    }
                }
            });
    });


                    