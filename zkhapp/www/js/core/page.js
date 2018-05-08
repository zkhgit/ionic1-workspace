/**
 * 分页
 */
angular.module('page',[])
    // 数据列表的上拉加载、下拉刷新
    .service('PAGE', function($rootScope, $ionicScrollDelegate, $timeout, HTTP, ACTION, CACHE, SETTING, COMMON){
        // 初始化分页参数
        this.init = function(scope){
            init(scope);
        };
        
        var init = function(scope){
            // 初始化查询条件对象
            scope.filter = {};
            scope.filter.data = {};
            // 初始化数据列表
            scope.dataList = []; 
            // 上拉加载是否可用，默认不可用
            scope.isInfiniteScroll = false;
            // 进入当前页面时是否刷新数据列表，默认不刷新
            $rootScope.refreshDataList = false;
            // 当前用户Id
            try {
                scope.filter.userId = CACHE.get('userInfo').userId;
            } catch (e) {
                scope.filter.userId = null;
            }

            // 初始化页面参数
            COMMON.scopeInit(scope);
        };

        /**
         * 刷新页面
         * 
         */ 
        this.doRefresh = function(scope, waitTime){
            doRefresh(scope, false, waitTime);
        };

        /**
         * 刷新列表
         * 描述：每次进入页面时都调用一次（包括从子页面返回时）
         * scope    作用域（当前页面）
         * url      数据接口API
         * loading  是否显示加载中动画
         * waitTime 延迟请求（单位：毫秒）
         * data     查询条件
         */
        this.isRefresh = function(scope, url, loading, waitTime, data){
            // 每次进入页面时调用，包括从子页面返回时
            scope.$on('$ionicView.afterEnter', function() {
                if($rootScope.refreshPage==true || scope.dataList==null || scope.dataList.length==0){
                    // 初始化基本参数
                    init(scope);
                    // 数据接口Url
                    scope.dataListUrl = url == null ? scope.dataListUrl : url;
                    // 设置查询条件data
                    if(data!=null && data!='undefined'){scope.filter.data = data;};
                    // 查询
                    doRefresh(scope, loading, waitTime);
                }
            });
        };

        var doRefresh = function(scope, loading, waitTime){
            // 数据列表加载状态，-1 : 加载成功并隐藏加载状态，1：加载中
            scope.dataListLoading = (loading == null || loading == true)?1:2;
            // 延迟请求
            $timeout(function(){
                HTTP.send({
                    url: scope.dataListUrl,
                    method: 'post',
                    headers: true,
                    data: {pageNo: 1, userId: scope.filter.userId, data: scope.filter.data},
                    catch: false,
                    loading: false
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
                        scope.pageNo = 2;   
                        
                        // 是否允许上拉加载操作， true：允许执行上拉加载更多，false：不允许
                        if(obj.pageNo*obj.pageSize >= scope.totalCount){scope.isInfiniteScroll = false;}else{scope.isInfiniteScroll = true;}
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
        this.loadMore = function(scope){alert();
            // 延迟请求（默认延迟1000毫秒）
            $timeout(function(){
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
                        if(data.data.obj.pageNo == 1){scope.isInfiniteScroll = false;return;}

                        // 分页数据
                        var obj = data.data.obj;
                        // 主数据
                        scope.dataList = obj.list==null?scope.dataList:scope.dataList.concat(obj.list);
                        // 总记录数目
                        scope.totalCount = data.data.obj.count; 
                        // 当前已加载记录数
                        scope.currentCount = scope.dataList.length;  
                        // 下一页页码
                        scope.pageNo++;

                        // 是否允许上拉加载操作， true：允许执行上拉加载更多，false：不允许
                        if(obj.pageNo*obj.pageSize >= scope.totalCount){scope.isInfiniteScroll = false;}else{scope.isInfiniteScroll = true;}
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

    })
    // 数据列表加载动画（包括加载中、暂无数据、出错了等）
    .directive('pageDatalistLoading', function(){
        return{
            scope: false,
            restrict: 'E',
            replace: true,
            template: '<div class="page-data-list-loading" ng-style="{\'padding-top\':paddingTop}">'+
                            '<img class="page-data-list-infoimg" width="36%" ng-src="{{dataListLoading==\'0\'?\'img/zwjl.png\':\'img/error.png\'}}">'+
                            '<ion-spinner class="page-data-list-loading-ion" icon="bubbles"></ion-spinner>'+
                      '</div>',
            controller: function($scope){
                // null：加载成功并隐藏加载状态，-1：出错了 ，0：无数据，1：加载中，2：加载成功并隐藏加载状态，否则：展示出错了
                $scope.$watch('dataListLoading',function(newValue){
                    $('.page-data-list-loading').css('display', '');
                    $('.page-data-list-infoimg').css('display', 'none');
                    $('.page-data-list-loading-ion').css('display', 'none');
                    if(newValue == null || newValue=='undefined' || newValue === 2){
                        $('.page-data-list-loading').css('display', 'none');
                    }else if(newValue === -1){
                        $('.page-data-list-infoimg').css('display', '');
                    }else if(newValue === 0){
                        $('.page-data-list-infoimg').css('display', '');
                    }else if(newValue === 1){
                        $('.page-data-list-loading-ion').css('display', '');
                    }else{
                        $('.page-data-list-infoimg').css('display', '');
                    }
                });
            }
        };
    })
    // 显示数据列表加载完成时提示
    .directive('pageDatalistLoaded', function(){
        return {
            scope: false,
            restrict: 'E',
            replace: true,
            template: '<div class="text-center" style="line-height:25px; font-size:10px;color:#0f0f0f">已经到底了！</div>',
            controller: function($scope){
                // false：数据已加载完，true：数据未加载完
                $scope.$watch('isInfiniteScroll',function(newValue){
                    $('.page-datalist-loaded').css('display', 'none');
                    if(!newValue && $scope.dataList!=null && $scope.dataList.length>0){
                        $('.page-datalist-loaded').css('display', '');
                    };
                });
            }     
        };
    });