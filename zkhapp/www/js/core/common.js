angular.module('common', [])
    // 通用配置
    .service('COMMON', function($rootScope, TAB){
        // 页面初始化
        this.scopeInit = function(scope, config){
            if(typeof(config)!='undefined' ){

            }
            scope.TAB = TAB;
            scope.SCREEN = screen;
            // 进入该页面时隐藏底部tabs
            $rootScope.hideTabs = SETTING.hideTabs;
        };
    });