/**
 * 分页
 */
angular.module('page',[])
    // 公用工具服务
    .service('PAGE', function($rootScope, $ionicPopup, $ionicScrollDelegate, $timeout, TAB, HTTP, ACTION, CACHE, SETTING){
        // 初始化参数
        this.init = function(scope){
            init(scope);
        }
        
        var init = function(scope){
            // 初始化查询条件对象
            scope.filter = {};
            scope.filter.data = {};
            // 初始化数据列表
            scope.dataList = []; 
            // 默认上拉加载不可用
            scope.infinite_scroll_flag = false;
            // 进入当前页面时是否刷新数据列表，默认不刷新
            $rootScope.refreshDataList = false;
            // 当前用户Id
            try {
                scope.filter.userId = CACHE.get('userInfo').userId;
            } catch (e) {
                scope.filter.userId = null;
            }

            scope.TAB = TAB;
            scope.SCREEN = screen;
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
            // 数据列表加载状态，-1 : 加载成功并隐藏加载状态，1：加载中
            scope.dataListLoading = (loading == null || loading == true)?1:2;
            // 延迟请求
            setTimeout(function(){
                scope.pageNo = 1; // 当前页码初始化为1
                HTTP.send({
                    url: scope.dataListUrl,
                    method: 'post',
                    headers: true,
                    data: {pageNo: scope.pageNo, userId: scope.filter.userId, data: scope.filter.data},
                    catch: false
                }).then(function(data){
                    if(data.data!=null && data.data.obj!=null){
                        // 分页数据
                        var obj = data.data.obj;
                        // 主数据
                        scope.dataList = obj.list==null?[]:obj.list;
                        // 总记录数
                        scope.totalCount = obj.count;
                        // 当前已加载记录数
                        scope.currentCount = scope.dataList.length; 
                        // 下一页页码
                        scope.pageNo = scope.pageNo + 1;   
                        
                        // 是否允许上拉加载操作， true：允许执行上拉加载更多，false：不允许
                        if(obj.pageNo*obj.pageSize >= scope.totalCount){scope.infinite_scroll_flag = false;}else{scope.infinite_scroll_flag = true;}
                        // 数据列表加载状态提示信息 2：加载成功并隐藏加载状态，0：无数据
                        if(scope.dataList.length>0){scope.dataListLoading = 2;}else{scope.dataListLoading = 0;}
                        // 返回列表顶部
                        $ionicScrollDelegate.scrollTop(true);
                    }else{
                        scope.dataListLoading = -1; // 出错了
                    }
                },function(e){
                    scope.dataListLoading = -1; // 出错了
                });
            }, (waitTime==null || waitTime=='undefined' || waitTime=='')?500:waitTime);
        };

        // 上拉加载更多
        this.loadMore = function(scope){
            // 延迟请求（默认延迟1000毫秒）
            setTimeout(function(){
                HTTP.send({
                    url: scope.dataListUrl,
                    method: 'post',
                    headers: true,
                    data: {pageNo: scope.pageNo, userId: scope.filter.userId, data: scope.filter.data},
                    catch: false,
                    loading: false
                }).then(function(data){
                    if(data.data!=null && data.data.obj!=null){
                        // 数据已加载完，不再下拉加载新数据，且列表无更新
                        if(data.data.obj.pageNo == 1){scope.infinite_scroll_flag = false;return;}

                        // 分页数据
                        var obj = data.data.obj;
                        // 主数据
                        scope.dataList = obj.list==null?scope.dataList:scope.dataList.concat(obj.list);
                        // 总记录数目
                        scope.totalCount = data.data.obj.count; 
                        // 下一页页码
                        scope.pageNo = scope.pageNo + 1;             
                        // 当前已加载记录数
                        scope.currentCount = scope.dataList.length;  

                        // 是否允许上拉加载操作， true：允许执行上拉加载更多，false：不允许
                        if(obj.pageNo*obj.pageSize >= scope.totalCount){scope.infinite_scroll_flag = false;}else{scope.infinite_scroll_flag = true;}
                        // 数据列表加载状态提示信息 2：加载成功并隐藏加载状态，0：无数据
                        if(scope.dataList.length>0){scope.dataListLoading = 2;}else{scope.dataListLoading = 0;}
                    }else{
                        scope.dataListLoading = -1; // 出错了
                    }
                },function(e){
                    scope.dataListLoading = -1; // 出错了
                });
            }, 1000);
        };

        /**
         * 返回上一级列表页面时判断是否需要刷新列表数据
         * 描述：在子页面更新了某条记录的状态，返回列表页时需更新列表,默认显示加载动画
         * 使用：打开新页面或返回上一页面
         * scope 作用域
         * url   请求地址
         * data  查询条件
         */
        this.isRefresh = function(scope, url, data){
            if($rootScope.refreshPage==true || scope.dataList==null || scope.dataList.length==0){
                // 初始化基本参数
                init(scope);
                // 数据Url
                scope.dataListUrl = scope.dataListUrl == null ? url : scope.dataListUrl;
                // 设置查询条件data
                if(data!=null && data!='undefined'){scope.filter.data = data;};
                // 查询
                doRefresh(scope, true);
            }
        };
    });