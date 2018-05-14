angular.module('app.route')
    .config(function($stateProvider){
        $stateProvider
            .state('tab.form', { // 表单
                url: '/demo/form',
                views: {
                    'main': {
                        controller:'formController',
                        templateUrl:function(){
                            return 'component/mobiscroll/demo/form.html';
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
                                    'component/mobiscroll/demo/form.js'
                                ]);
                            }
                        }
                    }
                }
            })
            .state('tab.menu', { // 菜单项
                url: '/demo/menu',
                views: {
                    'main': {
                        controller:'menuController',
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
            .state('tab.tree', { // 树结构
                url: '/demo/tree',
                views: {
                    'main': {
                        controller:'treeController',
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
            });
    });


                    