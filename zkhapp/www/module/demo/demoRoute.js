angular.module('app.route')
    .config(function($stateProvider){
        $stateProvider
            .state('tab.demoMain', { // 功能演示主页面
                url: '/demo/main',
                views: {
                    'main': {
                        controller:'demoMainCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/main.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'patternLock',
                                    'module/demo/js/main.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoForm', { // 表单
                url: '/demo/form',
                views: {
                    'main': {
                        controller:'demoFormCtrl',
                        templateUrl:function(){
                            return 'component/mobiscroll/demo/form.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'format',
                                    'elastic',
                                    'ionic-rating',
                                    'core/directive/input-color.js',
                                    'core/directive/input-datetime.js',
                                    'core/directive/input-select.js',
                                    'core/directive/input-sfz.js',
                                    'core/directive/input-treelist.js',
                                    'component/mobiscroll/demo/form.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoValidator', { // 表单验证
                url: '/demo/validator',
                views: {
                    'main': {
                        controller:'demoValidatorCtrl',
                        templateUrl:function(){
                            return 'component/validator/demo/validator.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ionic-datepicker',
                                    'component/validator/demo/validator.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoMenu', { // 手风琴
                url: '/demo/menu',
                views: {
                    'main': {
                        controller:'demoMenuCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/menu.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'module/demo/js/menu.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoTree', { // 树结构
                url: '/demo/tree',
                views: {
                    'main': {
                        controller:'demoTreeCtrl',
                        templateUrl:function(){
                            return 'component/angular-tree-control/demo/tree.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angular-tree-control',
                                    'component/angular-tree-control/demo/tree.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoLoading', { // 加载动画
                url: '/demo/loading',
                views: {
                    'main': {
                        controller:'demoLoadingCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/loading.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'module/demo/js/loading.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoDownload', { // 文件下载
                url: '/demo/downloa',
                views: {
                    'main': {
                        controller:'demoDownloadCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/download.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'core/service/mime.js',
                                    'core/service/download.js',
                                    'module/demo/js/download.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoCitypicker', { // 文件下载
                url: '/demo/citypicker',
                views: {
                    'main': {
                        controller:'demoCitypickerCtrl',
                        templateUrl:function(){
                            return 'component/ionic-pickcity/demo/citypicker.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ionic-pickcity',
                                    'component/ionic-pickcity/demo/citypicker.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoActionimgshow', { // 文件下载
                url: '/demo/actionimgshow',
                views: {
                    'main': {
                        controller:'demoActionimgshowCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/actionimgshow.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'action-img-show',
                                    'module/demo/js/actionimgshow.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoChart', { // 文件下载
                url: '/demo/chart',
                views: {
                    'main': {
                        controller:'demoChartCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/chart.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'module/demo/js/chart.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.demoContacts', { // 文件下载
                url: '/demo/contacts',
                views: {
                    'main': {
                        controller:'demoContactsCtrl',
                        templateUrl:function(){
                            return 'module/demo/html/contacts.html';
                        },
                        resolve:{
                            load:function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'module/demo/js/contacts.js'
                                ]);
                            }
                        }
                    }
                }
            });
    });


                    