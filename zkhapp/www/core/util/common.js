/**
 * 基础服务、基本配置、常量等
 */
angular.module('common', [])

    /** service区 **************************************************************************************/
    // 基本配置
    .service('COMMON', function($rootScope, SETTING){
        // 页面初始化
        this.scopeInit = function(scope, config){
            scope.SCREEN = screen;
            
            if(!!config && typeof(config)=='object'){
                // 进入该页面时隐藏底部tabs
                if(config.hideTabs===true){
                    $rootScope.hideTabs = '';
                }else{
                    $rootScope.hideTabs = SETTING.hideTabs;
                }
            }
        };
    })
    /** service区 **************************************************************************************/


    /** constant区 ************************************************************************************/
    .constant('SETTING', {
        hideTabs: 'tabs-item-hide', // 是否显示tabs -- tabs-item-hide|''
        buttonColor: 'button-positive', // 默认按钮颜色
    })
    /** 文件类型 */
    .constant('MIMETYPE',{
        JPEG: 'image/jpeg',
        //JPG: 'image/jpeg',
        PNG: 'image/png',
        GIF: 'image/gif',
        PDF: 'application/pdf',
        DOC: 'application/msword',
        RAR: 'application/x-rar-compressed',
        ZIP: 'application/zip',
        XLS: 'application/excel',
        MP4: 'video/mp4',
        TXT: 'text/plain',
    })
    // 重写$ionicLoadingConfig默认加载效果
    .constant('$ionicLoadingConfig', {
        //template: '<div class="card" style="width:200px;"><div class="positive padding" style="text-align: left;width:200px;height: 45px;border-bottom: 2px solid #387EF5;font-size: 20px;">提示</div><p style="margin-top:10px;margin-bottom: 5px;"><ion-spinner icon="ios"></ion-spinner></p></div>', // 动画模板
        template: '<ion-spinner icon="bubbles"></ion-spinner>', // style="fill:red"
    　　hideOnStateChange:false,
    　  showBackdrop: false,                 //是否显示蒙层
    　　maxWidth: 600,    
    　　showDelay: 0
        //delay - 显示载入指示器之前要延迟的时间,以毫秒为单位,默认为 0,即不延迟 duration - 载入指示器持续时间,以毫秒为单位。时间到后载入指示器自 动隐藏。默认  情况下, 载入指示器保持显示状态,知道显示的调用 hide()方法
    })
    /** constant区 ************************************************************************************/


    /** value区 **************************************************************************************/
    .value('PATH', {
        // 下载文件存放位置
        ionicFilePath: '',
    });
    /** value区 **************************************************************************************/

    
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