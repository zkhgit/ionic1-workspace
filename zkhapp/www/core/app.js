/**
 * 系统主配置文件
 */
angular.module('app', ['ionic','oc.lazyLoad','app.route','ngCordova','ionic-native-transitions',
    /** 1、以下为自己开发的功能模块 */
    'cache','common','http'
])
/** 基本配置 */
.config(function ($ionicConfigProvider) {
    /** 1、通用样式的兼容*********************************/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.backButton.text('返回').icon('ion-ios-arrow-back');//ion-ios-arrow-thin-left
    $ionicConfigProvider.platform.android.backButton.text('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').icon('ion-ios-arrow-back');//ion-android-arrow-back  ion-chevron-left
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid()); // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
    /** 1、通用样式的兼容*********************************/
    /** 2、其他*******************************************/
    ionic.Platform.isFullScreen = false; // 禁止全屏显示（他别是IOS全屏显示样式错乱）
    $ionicConfigProvider.views.maxCache(15); // 最大缓存页面
    $ionicConfigProvider.views.forwardCache(true); // 缓存下一页
    $ionicConfigProvider.views.swipeBackEnabled(false); // 不允许右滑返回上一页（IOS右滑返回不稳定，安卓滑动无效）
    $ionicConfigProvider.spinner.icon('ios');
    /** 2、其他*******************************************/
})
/** 在config之后加载 */
.run(function($ionicPlatform, $q, $ionicLoading, $rootScope, $location, $cordovaToast, $ionicHistory, $timeout, PATH, HTTP) {
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
            PATH.ionicFilePath = cordova.file.dataDirectory + '/ionic';
        }
        // 安卓右键返回时，延迟设置isVisible为false，防止第三方输入法返回退出当前页面  
        window.addEventListener('keyboardDidHide', function (e) {
            Keyboard.isVisible = true;
            $timeout(function () {  
                Keyboard.isVisible = false;  
            }, 100);  
        });
        // 网络检测
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $cordovaToast.showShortBottom('已连接至'+navigator.connection.type+'网络');
        });
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            $cordovaToast.showShortBottom('未检测到网络');
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
        if($location.path() == '/tab/main') {
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

})
.controller('appController', function($scope,$ocLazyLoad){
    $scope.ready = (function(){
        $ocLazyLoad.load([
            'animate',
            'ionic-native-transitions',
            'module-rotue',
            'page'
        ]);
    })();
});