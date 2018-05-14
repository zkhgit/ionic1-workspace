/**
 * 例子
 */
angular.module('app')
    .service('UploadDemo', function($q, $rootScope, $ionicPopup, $ionicLoading, Upload, SETTING){
        this.file = function (file) {
            var q = $q.defer();
            Upload.upload({
                url: '',
                data: {file: file}
            }).then(
            function (data) {
                setTimeout(function() {
                    $ionicLoading.hide();
                }, 200);
                q.resolve(angular.fromJson(data.data));
            }, function (err) {
                setTimeout(function() {
                    $ionicLoading.hide();
                }, 200);
                q.reject(err);
                $rootScope.tomIonicPopup = $ionicPopup.show({
                    title: '上传失败',
                    buttons: [
                        {
                            text: '我知道了',
                            type: SETTING.buttonColor
                        }
                    ]
                });
            }, function (evt) {
                setTimeout(function () {
                    // 上传进度
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $ionicLoading.show({
                        template: '<div class="card" style="width:200px;"><div class="positive padding" style="text-align: left;width:200px;height: 45px;border-bottom: 2px solid #387EF5;font-size: 20px;">提示</div><p class="padding dark" style="margin-top:10px;margin-bottom: 5px;">上传进度：' + Math.floor(progressPercentage) + '%</p></div>'
                    });
                });
            });
            return q.promise;
        };
    });
    /**
     * controller调用
     * $scope.uploadFile = function(file, answer_attach){
            UploadDemo.file(file).then(function(data){
                if(data.success){
                    $scope[answer_attach] = data.obj.filePath;
                }
                $rootScope.tomIonicPopup = $ionicPopup.show({
                    title: data.msg,
                    buttons: [
                        {
                            text: '我知道了',
                            type: SETTING.buttonColor
                        }
                    ]
                });
            });
        };
     */

     /**
      * 页面
        <div class="item item-text-wrap text-center">
            <div class="text-center" ngf-select="uploadFile($file, questionUnit.answerId+'answer_attach')" accept="aplication/zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template" ngf-max-size="10MB">
                <i class="icon ion-ios-upload-outline" style="font-size: 25px;"></i>
                <div >上传答案附件（ZIP、PDF、WORD）</div>
            </div>
        </div>
      */