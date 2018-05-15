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

/**
 * 页面
 * <div class="item item-divider">出生日期</div>
    <label class="item item-input">
        <input type="text" ng-model="user.tpyBirthDate" placeholder="请输入出生日期" ng-click="openTpyBirthDate()" name="tpyBirthDate" readonly>
    </label>
 */
