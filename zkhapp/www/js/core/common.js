angular.module('common', [])
    // 通用配置
    .service('COMMON', function($rootScope, TAB, SETTING){
        // 页面初始化
        this.scopeInit = function(scope, config){
            scope.TAB = TAB;
            scope.SCREEN = screen;
            // 进入该页面时隐藏底部tabs
            $rootScope.hideTabs = SETTING.hideTabs;
        };
    });

    
    /**下面是一堆常识*********************************************************************************/
    /**
     * 1、判断为空
     * !null==true，!undefined==true，!''==true，!0==true，!false==true
     */

     /**
      * 2、typeof用法
      * typeof(未定义的变量)='undefined'
      * typeof(数字（包括0、Infinity、NaN）)='number'
      * typeof(字符串（包括''）)='string'
      * typeof(true)='boolean'
      * typeof(对象（包括{}）、数组（包括[]）、null)='object'
      * typeof(函数)='function'
      */