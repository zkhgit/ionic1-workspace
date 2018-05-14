/**
 * 下载
 */
angular.module('app')
    // 下载并查看文件（带进度条）
    .service("download",function($q,$cordovaFileTransfer,$ionicLoading,$timeout,$cordovaFileOpener2,$ionicPopup,MIME,openFile){
        this.build = function(url, targetPath, options, trustHosts){
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                $ionicLoading.show({
                    template: "已经下载：100%"
                });
                $timeout(function(){
                    $ionicLoading.hide();
                    if (MIME.getMime(targetPath) != null) {
                        openFile.open(targetPath);
                    }
                },200);
            }, function (err) {
                $ionicPopup.show({
                    title:"<b>下载失败！</b>",
                    buttons: [
                        {text: '确认',
                            type: SETTING.buttonColor}
                    ]
                })
            }, function (progress) {
                //进度，这里使用文字显示下载百分比
                $timeout(function () {
                    var downloadProgress = (progress.loaded / progress.total) * 100;
                    $ionicLoading.show({
                        template: '<div class="card" style="width:200px;"><div class="positive padding" style="text-align: left;width:200px;height: 45px;border-bottom: 2px solid #387EF5;font-size: 20px;">提示</div><p class="padding dark" style="margin-top:10px;margin-bottom: 5px;">下载进度：' + Math.floor(downloadProgress) + '%</p></div>'
                    });
                })
            });
        };     
    })
    // 查看已下载的文件
    .service('openFile', function($cordovaFileOpener2, $ionicPopup, SETTING, MIME){
        // 打开手机中的文件
        this.open = function(pathUrl) {
            var path = cordova.file.dataDirectory + pathUrl;
            if (MIME.getMime(path) != null) {
                $cordovaFileOpener2.open(path, MIME.getMime(path)).then(function() {}, function(err) {
                    $ionicPopup.show({
                        title: '没有找到合适的软件',
                        buttons: [{
                            text: '我知道了',
                            type: SETTING.butColor
                        }]
                    });
                });
            }
        };
    });