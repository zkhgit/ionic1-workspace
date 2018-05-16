angular.module('app')
    .controller('demoMainCtrl', function($scope, $rootScope, demoMainService){
        demoMainService.loading($scope);

        $scope.open = function(){
            iAppOfficePlugin.openWebFile(		
                'http://192.168.0.24:8080/cepsp/attached/linxu.docx',
                '', 
                0, 
                1, 
                'admin', 
                function(successCallback) {alert('成功');}, 
                function(e) {
                    alert(e);
                    alert(JSON.stringify(e));
                }
            );

        }
    })
    .service('demoMainService', function($rootScope, $ionicModal, $ionicPopup, CACHE, SETTING){
        this.loading = function(scope){
            scope.$on('$ionicView.afterEnter', function() {
                $rootScope.mfbButton = true; // 显示浮动按钮
            });
        };

        $ionicModal.fromTemplateUrl('module/demo/html/patternLock.html',{
            scope: $rootScope,
            animation:'slide-in-up'
        }).then(function(modal){
            $rootScope.modalHeight = screen.height;
            $rootScope.hidePatternLock = function(){
                modal.hide();
            };
            $rootScope.resetPatternLock = function(){
                CACHE.remove('pattern');
                $rootScope.tomIonicPopup = $ionicPopup.alert({
                    title: '手势密码已重置',
                    buttons: [
                        {
                            text: '取消',
                            type: SETTING.buttonColor
                        }
                    ]
                });
            };
            $rootScope.patternLockModal = modal;
        });
    });