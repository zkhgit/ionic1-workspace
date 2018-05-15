angular.module('app')
    .controller('demoMainCtrl', function($scope, $rootScope, $ionicModal, mainService){
        mainService.loading($scope);

        $ionicModal.fromTemplateUrl('module/demo/html/patternLock.html',{
            scope: $rootScope,
            animation:'slide-in-up'
        }).then(function(modal){
            modal.show();
            $rootScope.modalHeight = $('.modal').height();
            $rootScope.hidePatternLock = function(){
                modal.hide();
            };
            $rootScope.patternLockModal = modal;
        });
    })
    .service('demoMainService', function(){
        this.loading = function(scope){

        };
    });