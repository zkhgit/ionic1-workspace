/**
 * 系统主配置文件
 */
angular.module('app', ['ionic','ngCordova','ionic-native-transitions', // 必选组件
    // 第三方组件
    'ionic-datepicker','w5c.validator','ngFileUpload','chart.js',
    /** 1、以下为自己开发的功能模块 */
    'provider','factory','service','value','constant','directive','filter',
    'common','cache','http','page',
    'tabs_ctrl',
    'public_acticle_ctrl',
    'public_notice_ctrl',
    'public_news_ctrl',
    'public_science_ctrl',
    'public_policy_ctrl',
    'public_introduction_ctrl'
])
/** 基本配置 */
.config(function ($urlRouterProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider, TAB) {
    /** 1、安卓环境时tabs置底处理,以及一些其他全局配置*********************************/
    $ionicConfigProvider.platform.ios.tabs.style('background: #F4F4F4;');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.backButton.text('返回').icon('ion-ios-arrow-back');//ion-ios-arrow-thin-left
    $ionicConfigProvider.platform.android.backButton.text('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').icon('ion-ios-arrow-back');//ion-android-arrow-back  ion-chevron-left
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.views.swipeBackEnabled(false); // IOS是否允许右滑返回上一页
    /** 1、安卓环境时tabs置底处理,以及一些其他全局配置*********************************/

    /** 2、调用原生页面切换效果******************************************************/
    $ionicNativeTransitionsProvider.setDefaultOptions({
        duration: 290, // 页面切换动画时长（毫秒）
        slowdownfactor: 4, // 重叠视图（更高的数字是更多）或没有重叠（1），默认为4。
        iosdelay: -1, // 等待iOS webview在动画开始前更新, 默认 -1
        androiddelay: -1, // 与上面相同，但对于Android, 默认 -1
        winphonedelay: -1, // 与上面相同，但对于Windows Phone，默认为 -1,
        fixedPixelsTop: 44, // 默认页眉的像素数，默认值为0（IOS和Android）
        fixedPixelsBottom: 0,// 你的固定页脚的像素数（FI标签栏），默认为0（iOS和Android）
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: true // 接管默认的后台转换和状态回转换，使用相反的方向转换回去。
    });
    $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left',
    });
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'slide',
        direction: 'right'
    });
    /** 2、调用原生页面切换效果******************************************************/

    /** 3、加载初始化页面***********************************************************/
    $urlRouterProvider.otherwise(TAB.initial.index);
    /** 3、加载初始化页面***********************************************************/
})
/**日期选择控件配置 */
.config(function(ionicDatePickerProvider){
    var datePickerObj = {  
        inputDate: new Date(),  
        titleLabel: '选择日期',  
        setLabel: '确定',  
        todayLabel: '今天',  
        closeLabel: '关闭',  
        mondayFirst: false,  
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],  
        monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],  
        templateType: 'popup',  
        from: new Date(1950, 1, 1),  
        to: new Date(2050, 12, 31),  
        showTodayButton: true,  
        dateFormat: 'yyyy-MM-dd',  
        closeOnSelect: false,  
        // disabledDates: [  // 设置不能选中的日期
        //     new Date(2016, 2, 16),  
        //     new Date(2015, 3, 16),  
        //     new Date(2015, 4, 16),  
        //     new Date(2015, 5, 16),  
        //     new Date('Wednesday, August 12, 2015'),  
        //     new Date("2016-08-16"),  
        //     new Date(1439676000000)  
        // ], 
        // disableWeekdays: []  //设置不能选中的周末
    };  
    ionicDatePickerProvider.configDatePicker(datePickerObj);
})
/** 表单验证配置*/
.config(["w5cValidatorProvider", function (w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : true, // 光标移除元素后是否验证并显示错误提示信息
        showError  : showError, // 可以是bool和function，这里使用我们自定义的错误显示方式。
        removeError: removeError // 可以是bool和function，这里使用我们自定义的错误移除方式。
    });
    // 特定字段自定义验证及提示信息
    w5cValidatorProvider.setRules({
        // zidingyi: {
        //     required      : "该选项不能为空",
        //     maxlength     : "该选项输入值长度不能大于{maxlength}",
        //     minlength     : "该选项输入值长度不能小于{minlength}",
        //     email         : "输入邮件的格式不正确",
        //     repeat        : "两次输入不一致",
        //     pattern       : "该选项输入格式不正确",
        //     number        : "必须输入数字",
        //     w5cuniquecheck: "该输入值已经存在，请重新输入",
        //     url           : "输入URL格式不正确",
        //     max           : "该选项输入值不能大于{max}",
        //     min           : "该选项输入值不能小于{min}"
        // },
        // customizer    : {
        //      customizer: "自定义验证数字必须大于上面的数字"
        // },
        // dynamicName:{
        //      required: "动态Name不能为空"
        // },
        // dynamic       : {
        //      required: "动态元素不能为空"
        // },
    });

    /**验证失败时的信息提示方式、错误信息移除方式 ------------------------------------*/
    // 错误提示方式
    var showError = function(elem, errorMessages){
        var $elem = angular.element(elem),
        $group = getParentGroup($elem);

        if (!isEmpty($group)){
            if ($group.hasClass("valid-lr")){
            $group.removeClass("valid-lr");
            }

            if (!$group.hasClass("has-error-lr")){
            $group.addClass("has-error-lr");
            }
        }

        var $next = $group.next();
        if (!$next || !$next.hasClass("form-errors")) {
            $group.after('<div class="form-errors"><div class="form-error">' + errorMessages[0] + '</div></div>');
        }
    };

    // 提示信息移除方式
    var removeError = function (elem){
        var $elem = angular.element(elem),
            $group = getParentGroup($elem);

        if (!isEmpty($group)){
            if ($group.hasClass("has-error-lr")){
            $group.removeClass("has-error-lr");
            }
        }

        var $next = $group.next();
        if (!$next || $next.hasClass("form-errors")) {
            $next.remove();
        }
    };

    var getParentGroup = function (elem) {
        if (elem[0].tagName === "FORM" || elem[0].nodeType == 11) {
            return null;
        }
        if (elem && elem.hasClass("item-input")) {
            return elem;
        } else {
            return getParentGroup(elem.parent());
        }
    };

    var isEmpty = function (object) {
        if (!object) {
            return true;
        }
        if (object instanceof Array && object.length === 0) {
            return true;
        }
        return false;
    };
    /**验证失败时的信息提示方式、错误信息移除方式 ------------------------------------*/
}])
/** 在config之后加载 */
.run(function($ionicPlatform, $q, $ionicLoading, $rootScope, $location, $cordovaToast, $ionicHistory, $timeout, TAB, PATH, HTTP) {
    /** 1、设备准备就绪，自定义基本配置基本属性**************************************************************/
    $ionicPlatform.ready(function() {
        // cordova插件准备就绪（手机环境）
        if(window.cordova){
            // 延时隐藏启动屏幕，避免短暂白屏（延时300毫秒）
            $timeout(function(){navigator.splashscreen.hide();}, 500);
            // 设备顶部的状态栏
            if (window.StatusBar) {
                // android>6.0
                // StatusBar.styleDefault(); // 状态栏默认样式，也就是电池信号黑色；（测试有用）
                 StatusBar.styleLightContent(); // 状态栏内容浅色，貌似就是白色，适合深色背景；  
                // StatusBar.styleBlackTranslucent(); // 状态栏黑色半透明，电池时间都是白色的，适合深色背景；  
                // StatusBar.styleBlackOpaque(); // 状态栏黑色不透明，还是白色的，适合深色背景；  
                // StatusBar.hide(); // 状态栏隐藏（测试有用）；  
                // StatusBar.show(); // 状态栏显示（测试有用）；
                // StatusBar.overlaysWebView(true); // 使状态栏覆盖或不覆盖WebView（测试有用）
                StatusBar.backgroundColorByHexString("#387ef5"); // 状态栏背景色（测试有用）
            }
            // 设置键盘属性
            if (Keyboard) {
                Keyboard.hideFormAccessoryBar(true); // true：隐藏键盘顶部的附加工具栏。该工具栏具有Prev，Next和Done按钮
                Keyboard.disableScroll(true);  // true：键盘不允许滚动
            }
            // 设置下载文件存放路径
            PATH.ionicDown = window.cordova.file.applicationStorageDirectory;
        }
        // 安卓右键返回时，延迟设置isVisible为false，防止第三方输入法返回退出当前页面  
        window.addEventListener('keyboardDidHide', function (e) {
            Keyboard.isVisible = true;
            $timeout(function () {  
                Keyboard.isVisible = false;  
            }, 100);  
        });
    });
    /** 1、设备准备就绪，自定义基本配置**************************************************************/

    /** 2、物理返回按钮控制&双击退出应用******************************************/
    var timeTemp;
    if(!$rootScope.times){$rootScope.times = new Date().getTime();}
    $ionicPlatform.registerBackButtonAction(function (e) {
        // 文件上传中提示
        if(!!$rootScope.tomUploadProgress){
            $cordovaToast.showShortBottom("正在上传，请耐心等待！");
            return;
        }
        // 关闭$ionicPopup
        if(!!$rootScope.tomIonicPopup){
            $rootScope.tomIonicPopup.close();
            $rootScope.tomIonicPopup = null;
            return;
        }
        // 拒绝右键取消请求
        if(!!$rootScope.isRightKey){
            $cordovaToast.showLongBottom("正在提交数据，请稍后再试！");
            return;
        }
        // 终止Ajax请求
        if(!!$rootScope.httpStop){
            HTTP.shutdown(102); // 终止请求
            return;
        }
        // 判断处于哪个页面时双击退出
        if($location.path() == TAB.tabs.tab.url+TAB.tabs.main.url) {
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                timeTemp = new Date().getTime();
                if(timeTemp - $rootScope.times > 2000){
                    $cordovaToast.showShortBottom('再按一次退出系统');
                    $rootScope.times = new Date().getTime();
                }
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }else if ($ionicHistory.backView()) {
            if (Keyboard.isVisible) {
                // 隐藏键盘
                Keyboard.hide();
            } else {
                $rootScope.$ionicGoBack();
            }
        }else {
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else{
                $rootScope.backButtonPressedOnceToExit = true;
                timeTemp = new Date().getTime();
                if(timeTemp - $rootScope.times > 2000){
                    $cordovaToast.showShortBottom('再按一次退出系统');
                    $rootScope.times = new Date().getTime();
                }
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }
        e.preventDefault();
        return false;
    }, 501); // $ionicLoading优先级为500，貌似是默认里最大的了
    /** 2、物理返回按钮控制&双击退出应用******************************************/
    
    /** 3、初始化全局变量******************************************/
    $rootScope.PATH = 'http://192.168.0.241:8080'; //测试IP 192.168.3.7
    $rootScope.DOMAIN_NAME = $rootScope.PATH + '/kjtrzpt';
    /** 3、初始化全局变量******************************************/

});