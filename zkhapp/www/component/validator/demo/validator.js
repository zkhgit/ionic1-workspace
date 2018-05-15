angular.module('app')
    .controller('demoValidatorCtrl', function($scope, ionicDatePicker, demoValidatorService){
        demoValidatorService.loading($scope);
        // 出生日期  
        $scope.openTpyBirthDate = function () {
            ionicDatePicker.openDatePicker({
                callback: function (val) {  
                    if (typeof (val) === 'undefined') { 
                    } else {
                        // 日期赋值
                        $scope.user.tpyBirthDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
                        // 更新日期弹框上的日期  
                        this.inputDate = new Date(val);
                    }  
                }
            });  
		};
		// 参加工作时间
        $scope.openTpyBeginWorkDate = function () {
            ionicDatePicker.openDatePicker({
                callback: function (val) {  
                    if (typeof (val) === 'undefined') { 
                    } else {
                        // 日期赋值
                        $scope.user.tpyBeginWorkDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
                        // 更新日期弹框上的日期  
                        this.inputDate = new Date(val);
                    }  
                }
            });  
        };
        
        $scope.tomSubmit = function(){
            alert('提交成功');
        };
    })
    .service('demoValidatorService', function(){
        this.loading = function(scope){

        };
    });