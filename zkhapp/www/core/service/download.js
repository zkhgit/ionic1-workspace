/**
 * 下载
 */
angular.module('app')
    // 下载并查看文件（带进度条）
    .service("Download",function($rootScope, $q,$cordovaFileTransfer,$ionicLoading,$timeout,$cordovaFileOpener2,$ionicPopup,PATH,MIME,SETTING){

        // 传入文件路径下载(通用方法)
        var start = function(url, progressName){
            var targetPath = PATH.downloadFilePath + url.substr(url.lastIndexOf('/')+1);
            var options = {};
            var trustHosts = true;

            open(targetPath).then(function (flag){
            },function(e){
                $rootScope.tomIonicPopup = $ionicPopup.show({
                    title: '下载',
                    subTitle: '下载这个资源，是吗？',
                    buttons: [
                        { text: '否' },
                        {
                            text: '<b>是</b>',
                            type: SETTING.buttonColor,
                            onTap: function(e) {
                                build(PATH.DOMAIN_NAME + url, targetPath, options, trustHosts, progressName);
                            }
                        },
                    ]
                });
            });
        };

        var build = function(url, targetPath, options, trustHosts, progressName){
            //1、下载文件（带进度条）
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                $timeout(function(){
                    $ionicLoading.hide();
                    //2、打开下载下来的APP--application/vnd.android.package-archive  ||  application/rtf
                    var mime = MIME.getMime(url);
                    $cordovaFileOpener2.open(targetPath, mime
                    ).then(function () {
                            // 成功
                        }, function (err) {
                            $rootScope.tomIonicPopup = $ionicPopup.alert({
                                title:'没有找到合适的软件打开文件'
                            });
                            // 错误
                        });
                    $ionicLoading.hide();
                },200);
            }, function (err) {
                $rootScope.tomIonicPopup = $ionicPopup.show({
                    title:"下载失败",
                    buttons: [
                        {text: '确认',
                            type: SETTING.buttonColor,
                            onTap: function(e) {
                            }
                        }
                    ]
                });
            }, function (progress) {
                //3、进度，这里使用文字显示下载百分比
                $timeout(function () {
                    var downloadProgress = (progress.loaded / progress.total) * 100;
                    $rootScope[progressName] = downloadProgress;
                    // $ionicLoading.show({
                    //     template: "已经下载：" + Math.floor(downloadProgress) + "%"
                    // });
                })
            });

        };

        //2、下载完打开文件
        var open = function(targetPath){
            var q = $q.defer();
            //4、打开下载下来的APP--application/vnd.android.package-archive  ||  application/rtf
            var mime = MIME.getMime(targetPath);
            $cordovaFileOpener2.open(targetPath, mime
            ).then(function () {
                    q.resolve(true);
                    // 成功
                }, function (err) {
                    q.reject(false);
                    // 错误
                });
            return q.promise;
        };

        return {
            open: open,
            build: build,
            start: start
        };

    });