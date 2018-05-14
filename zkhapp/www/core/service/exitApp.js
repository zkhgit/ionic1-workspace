/**
 * 退出(注销)登录
 */
angular.module('app')
    .service('exitApp', function($ionicPopup, $ionicLoading, $timeout, CACHE, SETTING){
		// 退出系统按钮
        this.exit = function(){
            $ionicPopup.show({
                title: '<b>注销并退出</b>',
                template: '<div align="center" style="font-size: 15px;">确定退出，是吗？<div>',
                buttons: [
                    { text: '否' },
                    {
                        text: '<div>是</div>',
                        type: SETTING.butColor,
                        onTap: function(e) {
                            CACHE.clear();
                            //注销账号时
                            $ionicLoading.show({
                                template:'注销中...'
                            });
                            $timeout(function(){
                                $ionicLoading.hide();
                                if(window.cordova){
                                    ionic.Platform.exitApp();
                                }
                            },600);
                        }
                    },
                ]
            });
        };
    });