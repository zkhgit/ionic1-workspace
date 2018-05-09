angular.module('common', [])
    // 通用配置
    .service('COMMON', function(TAB){
        // 页面初始化
        this.scopeInit = function(scope){
            scope.TAB = TAB;
            scope.SCREEN = screen;
        };
    });