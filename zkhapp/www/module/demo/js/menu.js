angular.module('app')
    .controller('demoMenuCtrl', function($scope, demoMenuService){
        demoMenuService.loading($scope);
    })
    .service('demoMenuService', function(){
        this.loading = function(scope){
            // 展示/关闭
            scope.toggleMenu = function(menu) {
                if (scope.isMenuShown(menu)) {
                    scope.shownMenu = null;
                } else {
                    scope.shownMenu = menu;
                }
            };
            // 是否展示
            scope.isMenuShown = function(menu) {
                return scope.shownMenu === menu;
            };
            scope.menus=[
                {
                    name:'主页',
                    menus:[
                        {
                            name:'主页',
                            state:'tab.main',
                            icon:'ion-ios-home'
                        }
                    ]
                },
                {
                    name:'表单验证',
                    menus:[
                        {
                            name:'表单一',
                            state:'tab.demoForm',
                            icon:'ion-ios-list'
                        },
                        {
                            name:'表单二',
                            state:'tab.demoValidator',
                            icon:'ion-ios-list'
                        }
                    ]
                },
                {
                    name:'菜单和树',
                    menus:[
                        {
                            name:'手风琴菜单',
                            state:'tab.demoMenu',
                            icon:'ion-ios-list'
                        },
                        {
                            name:'组织树',
                            state:'tab.demoTree',
                            icon:'ion-ios-list'
                        }
                    ]
                }
            ];
        };
    });