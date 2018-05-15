angular.module('app')
    .controller('demoLoadingCtrl', function($scope, $interval, $timeout, $ionicLoading, demoLoadingService){
        demoLoadingService.loading($scope);

        $scope.vo = {
        percent:0
    };

    $scope.vc = {
        percentTimer:function(){
            $scope.vo.percent = 0;
            var timer = $interval(function(){
                $scope.vo.percent += parseInt(Math.random()*3,10);
                if($scope.vo.percent>=100){
                    $scope.vo.percent = 100;
                    $interval.cancel(timer);
                    $timeout(function(){
                        $ionicLoading.hide();
                        
                    },3000);
                }
            },100);
        },
        showProgress:function(){
            $ionicLoading.show({
                showBackdrop: true,
                scope:$scope,
                templateUrl:'progress.html'
            }).then(function(){
                $scope.vc.percentTimer();
            });
        }
    };

    $scope.ready = function(){
        $timeout(function(){
            $scope.vo.showLoading = true;
        },1000);
        return arguments.callee;
    }();
    })
    .service('demoLoadingService', function(){
        this.loading = function(scope){

        };
    });