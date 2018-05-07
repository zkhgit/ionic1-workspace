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
    .service('commonService', function($timeout, $rootScope, $ionicPopup, $ionicScrollDelegate, TAB, HTTP, ACTION, CACHE, JSONBY, SETTING){
        // 初始化参数
        this.init = function(scope){
            init(scope);
        }
        var init = function(scope){
            scope.data = {}; // 页面一般对象
            scope.dataList = []; // 数据集
            scope.pageNo = 2;  // 分页
            $rootScope.refreshPage = false; // 是否刷新数据列表

            // 查询条件对象
            scope.filter = {};
            scope.filter.data = {};
            try {
                scope.filter.userId = CACHE.get('userInfo').userId;
            } catch (error) {
                scope.filter.userId = null;
            }

            scope.TAB = TAB;
        };

        /**
         * 查询数据列表，公用数据拉取方法
         * scope : 作用域
         * loading : 是否显示加载动画
         * waitTime : 延迟请求时间（单位：毫秒）
         */
        this.doRefresh = function(scope, loading, waitTime){
            doRefresh(scope, loading, waitTime);
        };
        var doRefresh = function(scope, loading, waitTime){
            // 是否展示没有数据，-1 : 不展示，1：展示加载中
            scope.isShowNotList = (loading == null || loading == true)?1:-1;
            // 延迟请求
            setTimeout(function(){
                HTTP.send({
                    url: scope.pageUrl,
                    method: 'post',
                    headers: true,
                    data: {pageNo: 1, userId: scope.filter.userId, data: scope.filter.data},
                }).then(function(data){
                    console.log(data);
                    if(data.data!=null && data.data.obj!=null){
                        // 主数据
                        scope.dataList = data.data.obj.list==null?[]:data.data.obj.list;
                        // 是否展示没有数据提示信息 -1：不展示，0：展示
                        if(scope.dataList.length>0){
                            scope.isShowNotList = -1;
                        }else{
                            scope.isShowNotList = 0;
                        }

                        // 总记录数目
                        scope.totalCount = data.data.obj.count;
                        // 当前记录数
                        scope.numberPage = scope.dataList.length;    
                        // 数据已加载完，不再下拉加载新数据
                        if(data.data.obj.pageNo*data.data.obj.pageSize>=scope.totalCount){    
                            scope.infinite_scroll_flag = false;
                        }else{
                            scope.infinite_scroll_flag = true;
                        }

                        // 上拉加载广播
                        setTimeout(function() {
                            scope.$broadcast('scroll.refreshComplete');  
                        }, 500);
                        // 回到列表顶部
                        $ionicScrollDelegate.scrollTop(true);
                    }else{
                        scope.isShowNotList = 2;
                    }
                });
            }, (waitTime==null || waitTime=='undefined' || waitTime=='')?500:waitTime);
        };

        // 上拉加载更多
        this.loadMore = function(scope){
            // 延迟请求
            setTimeout(function(){
                HTTP.send({
                    url: scope.pageUrl,
                    method: 'post',
                    headers: true,
                    data: {pageNo: scope.pageNo, userId: scope.filter.userId, data: scope.filter.data},
                    loading: false
                }).then(function(data){
                    if(data.data!=null && data.data.obj!=null){
                        // 数据已加载完，不再下拉加载新数据，且列表无更新
                        if(data.data.obj.pageNo == 1){
                            scope.infinite_scroll_flag = false; 
                            return;
                        }

                        // 总记录数目
                        scope.totalCount = data.data.obj.count; 
                        // 当前页
                        scope.pageNo = scope.pageNo + 1;             
                        // 当前记录数
                        scope.numberPage = scope.dataList.length;    
                        // 主数据
                        scope.dataList = scope.dataList.concat(data.data.obj.list==null?[]:data.data.obj.list);
                        // 数据已加载完，不再下拉加载新数据，且列表有更新
                        if(data.data.obj.pageNo*data.data.obj.pageSize>=scope.totalCount){    
                            scope.infinite_scroll_flag = false;
                        }else{
                            scope.infinite_scroll_flag = true; // 上拉加载
                        }

                        // 上拉加载广播
                        setTimeout(function() {
                            scope.$broadcast('scroll.infiniteScrollComplete');
                        }, 500);
                    }else{
                        $rootScope.tomIonicPopup = $ionicPopup.show({
                            title: '出错了',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: SETTING.buttonColor
                                },
                            ]
                        });
                    }
                },function(){
                    alert('出错了');
                });
            }, 1000);
        };

        /**
         * 返回上一级列表页面时判断是否需要刷新列表数据
         * 描述：在子页面更新了某条记录的状态，返回列表页时需更新列表
         * 使用：打开新页面或返回上一页面
         * scope 作用域
         * url   缺省查询接口
         */
        this.isRefresh = function(scope, url, data){
            if($rootScope.refreshPage==true || scope.dataList==null || scope.dataList.length==0){
                // 初始化基本参数
                init(scope);
                // 数据Url
                scope.pageUrl = scope.pageUrl == null ? url : scope.pageUrl;
                // 设置查询条件data
                if(data!=null && data!='undefined'){scope.filter.data = data;};
                // 查询
                doRefresh(scope, true);
            }
        };
    })
    // 自定义信息提示框
    .service('tomIonicPopup', function($rootScope, $ionicPopup, SETTING){
        this.operationSucceeded = function(title, buttonName, refreshPage, backPage){
            $ionicPopup.show({
                title: (title==null||title=='')?'操作成功':title,
                buttons: [
                    {
                        text: '<b>'+(title==null||title=='')?'我知道了':text+'</b>',
                        type: SETTING.butColor,
                        onTap: function (e) {
                            // 当前列表页（或返回上一级页面时）是否刷新列表
                            if(refreshPage){
                                $rootScope.refreshPage = true;
                            }
                            // 是否返回上一页
                            if(backPage){
                                $rootScope.$ionicGoBack();
                            }
                        }
                    },
                ]
            });
        };
    })