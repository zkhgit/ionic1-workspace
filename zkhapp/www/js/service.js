/**
 * service是一个可注入的构造器
 *
 * 在service里面可以不用返回东西，因为AngularJS会调用new关键字来创建对象。
 * 但是返回一个自定义对象好像也不会出错
 *
 * 第一次被注入时实例化，只实例化一次，整个应用的生命周期中是个单例模式，
 * 可以用来在controller之间传递数据
 */
angular.module('service',[])
	/** 退出(注销)登录 */
	.service('exitAppService', function($ionicPopup, $ionicLoading, $timeout, CACHE, SETTING){
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
    })
    //下载、下载并打开文件
    .service("Download",function($q,$cordovaFileTransfer,$ionicLoading,$timeout,$cordovaFileOpener2,$ionicPopup,mimeF){
        var build = function(url, targetPath, options, trustHosts){
            //下载完打开文件（带进度条）
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                $ionicLoading.show({
                    template: "已经下载：100%"
                });
                $timeout(function(){
                    $ionicLoading.hide();
                    // 打开下载下来的APP--application/vnd.android.package-archive  ||  application/rtf
                    if (mimeF.getMime(targetPath) != null) {
                        $cordovaFileOpener2.open(targetPath, mimeF.getMime(targetPath)
                        ).then(function () {
                            // 成功
                            $ionicLoading.hide();
                        }, function (err) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title:'没有找到合适的软件打开文件'
                            });
                            // 错误
                        });
                    }
                    $ionicLoading.hide();
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
        var open = function(targetPath){
            if (mimeF.getMime(targetPath) != null) {
                $cordovaFileOpener2.open(targetPath, mimeF.getMime(targetPath)).then(function() {}, function(err) {
                    $ionicPopup.show({
                        title: '打开文件失败，请确认是否开启了读取文件权限',
                        buttons: [{
                            text: '我知道了',
                            type: SETTING.butColor
                        }]
                    });
                });
            }
        };

        // （仅下载）下载视频
        var onlyBuild = function(url, targetPath, options, trustHosts){
            var q = $q.defer();
            $ionicLoading.show();
            //下载
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                $ionicLoading.show({
                    template: "已经下载：100%"
                });
                $timeout(function(){
                    $ionicLoading.hide();
                }, 200);
                q.resolve(true);
            }, function (err) {
                $ionicLoading.hide();
                q.reject(false);
                $ionicPopup.show({
                    title:"<b>下载失败！</b>",
                    buttons: [
                        {text: '确认',
                            type: SETTING.buttonColor}
                    ]
                });
            }, function (progress) {
                
            });
            return q.promise;
        };
        
        return {
            onlyBuild: onlyBuild,
            build: build,
            open: open
        }
    })
    .service('openFile', function($cordovaFileOpener2, $ionicPopup, SETTING, mimeF){
        // 打开手机中的文件
        this.openFile = function(pathUrl) {
            var path = cordova.file.externalRootDirectory + pathUrl; // file:///storage/emulated/0/
            if (mimeF.getMime(path) != null) {
                $cordovaFileOpener2.open(path, mimeF.getMime(path)).then(function() {}, function(err) {
                    $ionicPopup.show({
                        title: '打开文件失败，请确认是否开启了读取文件权限',
                        buttons: [{
                            text: '我知道了',
                            type: SETTING.butColor
                        }]
                    });

                });
            }
        };
    })
    // 公用工具服务
    .service('commonService', function($timeout, TAB, HTTP, ACTION, CACHE, JSONBY){
        // 初始化参数
        this.init = function init(scope){
            scope.TAB = TAB; // 页面跳转配置
            scope.dataList = []; // 数据集
            scope.pageNo = 2;  // 分页
            scope.infinite_scroll_flag = true; // 上拉加载
        };

        /**
         * 查询数据列表，公用数据拉取方法
         * scope : 作用域
         * url : API接口
         * loading : 是否显示加载动画
         */
        this.doRefresh = function(scope, url, loading){
            HTTP.send({
                url: url,
                data: {pageNo: 1, id: scope.filter.id, data: scope.filter.data},// id:当前用户id
                method: 'post',
                headers: true,
                loading: loading
            }).then(function(data){
                 if(data.data!=null){
                    scope.dataList = data.data.obj.list==null?[]:data.data.obj.list;
                    scope.count = data.data.obj.count; // 总记录数目
                    scope.numberPage = scope.dataList.length; // 当前记录数
                    
                    if(data.data.obj.pageNo*data.data.obj.pageSize>=data.data.obj.count){    
                        // 数据已加载完，接着执行剩下的操作
                        scope.infinite_scroll_flag = false;
                    }
                    // 暂无记录、分页参数显示
                    // 上拉加载广播
                    setTimeout(function() {
                        if(scope.dataList.length==0){
                            setTimeout(function() {
                                scope.myjl = false;
                            }, 1000);
                        }else{
                            scope.myjl = true;
                        }
                        scope.$broadcast('scroll.infiniteScrollComplete');
                    }, 1000);
                 }
            });
        };

        // 上拉加载更多
        this.loadMore = function(scope, url){
                HTTP.send({
                    url: url,
                    data: {pageNo: scope.pageNo, id: scope.filter.id, data: scope.filter.data},
                    method: 'post',
                    headers: true,
                    loading: false
                }).then(function(data){
                    if(data.data!=null){
                        if(data.data.obj.pageNo == 1){
                            // 数据已加载完,不再执行剩下的操作
                            scope.infinite_scroll_flag = false; 
                            return;
                        }
                        if(data.data.obj.pageNo*data.data.obj.pageSize>=data.data.obj.count){    
                            // 数据已加载完，接着执行剩下的操作
                            scope.infinite_scroll_flag = false;
                        }
                        scope.dataList = scope.dataList.concat(data.data.obj.list==null?[]:data.data.obj.list);
                        
                        scope.pageNo = scope.pageNo + 1; // 当前页
                        scope.count = data.data.obj.count; // 总记录数目
                        scope.numberPage = scope.dataList.length; // 当前记录数

                        // 上拉加载广播
                        setTimeout(function() {
                            scope.$broadcast('scroll.infiniteScrollComplete');
                        }, 1000);
                    }
            });
        };

        /**
         * 返回上一级列表页面时判断是否需要刷新列表数据
         * 描述：在子页面更新了某条记录的状态，返回列表页时需更新列表
         * scope 作用域
         * url   缺省查询接口
         */
        this.isRefresh = function(scope, url){
            if($rootScope.refreshPage==true || scope.dataList==null || scope.dataList.length==0){
                // 初始化基本参数
                init(scope);
                // 控制是否刷新数据列表
                $rootScope.refreshPage = false; // 是否刷新
                scope.pageUrl = scope.pageUrl == null ? url : scope.pageUrl;
                // 查询
                doRefresh(scope, false);
            }
        };
    })
    // 自定义信息提示框
    .service('infoService', function($rootScope, $ionicPopup, SETTING){
        this.operationSucceeded = function(title, text, pageFlag, backFlag){
            $ionicPopup.show({
                title: (title==null||title=='')?'操作成功':title,
                buttons: [
                    {
                        text: '<b>'+(title==null||title=='')?'我知道了':text+'</b>',
                        type: SETTING.butColor,
                        onTap: function (e) {
                            // 当前列表页（或返回上一级页面时）是否刷新列表
                            if(pageFlag){
                                $rootScope.refreshPage = true;
                            }
                            // 是否返回上一页
                            if(backFlag){
                                $rootScope.$ionicGoBack();
                            }
                        }
                    },
                ]
            });
        };
    })