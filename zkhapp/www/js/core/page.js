/**
 * 分页
 */
angular.module('page',[])
    // 数据列表的上拉加载、下拉刷新
    .service('PAGE', function($timeout, $rootScope, $ionicScrollDelegate, HTTP, ACTION, CACHE, SETTING, COMMON){
        // 初始化分页参数
        this.init = function(scope){
            init(scope);
        };
        
        var init = function(scope){
            // 初始化分页对象(包括查询条件、数据列表数组)
            scope.data = {
                url: null, // 数据列表的接口url
                list: [],  // 数据列表
                // 查询条件
                filter: {
                    userId: null, // 当前用户id
                    data: {}      // 主查询数据对象bean
                },
                // 分页参数
                page:{
                    totalCount: 0,   // 总记录数
                    currentCount: 0, // 当前已加载记录数
                    pageNo: 1,       // 下一页页码
                }
            };

            // 获取当前用户Id
            try {
                scope.data.filter.userId = CACHE.get('userInfo').userId;
            } catch (e) {
                scope.data.filter.userId = null;
            }

            // 上拉加载是否可用，默认不可用
            scope.isInfiniteScroll = false;
            // 进入当前页面时是否刷新数据列表，默认不刷新
            $rootScope.refreshDataList = false;
            
            // 初始化页面参数
            COMMON.scopeInit(scope);
        };
        

        /**
         * 刷新列表
         * 描述：每次进入页面时都调用一次（包括从子页面返回时）
         * scope    作用域（当前页面）
         * url      数据接口API
         * loading  是否显示加载中动画
         * data     查询条件
         */
        this.isRefresh = function(scope, url, loading, data){
            // 每次进入页面时调用，包括从子页面返回时
            scope.$on('$ionicView.afterEnter', function() {
                if($rootScope.refreshPage==true || !scope.data || !scope.data.list || scope.data.list.length==0){
                    // 初始化基本参数
                    init(scope);
                    // 数据接口Url
                    scope.data.url = !url ? scope.data.url : url;
                    // 设置查询条件data
                    if(!!data){scope.data.filter.data = data;};
                    // 查询
                    doRefresh(scope, loading);
                }
            });
        };

        /**
         * 下拉刷新
         * scope    作用域（当前页面）
         */ 
        this.doRefresh = function(scope, data){
            // 设置查询页码
            scope.data.page.pageNo = 1;
            // 设置查询条件data
            if(!!data){scope.data.filter.data = data;};
            doRefresh(scope, false);
        };

        // 刷新公共方法
        var doRefresh = function(scope, loading){
            // 数据列表加载状态，-1 : 加载成功并隐藏加载状态，1：加载中
            scope.dataListLoading = ((!loading || loading == true) && loading!=false)?1:2;
            HTTP.send({
                url: scope.data.url,
                method: 'post',
                headers: true,
                data: {pageNo: scope.data.page.pageNo, userId: scope.data.filter.userId, data: scope.data.filter.data},
                loading: false
            }).then(function(data){
                if(!!data && !!data.data && !!data.data.obj){
                    var obj = data.data.obj;
                    // 主数据
                    scope.data.list = !!obj.list?[]:obj.list;
                    // 分页参数
                    scope.data.page = {
                        totalCount: obj.count,                // 总记录数
                        currentCount: scope.data.list.length, // 当前已加载记录数
                        pageNo: scope.data.page.pageNo + 1      // 下一页页码
                    };
                    
                    // 是否允许上拉加载操作（true：允许执行上拉加载更多，false：不允许）
                    if(obj.pageNo*obj.pageSize >= obj.count){scope.isInfiniteScroll = false;}else{scope.isInfiniteScroll = true;}
                    // 数据列表加载状态提示信息（2：加载成功并隐藏加载状态，0：无数据）
                    if(scope.data.list.length>0){scope.dataListLoading = 2;}else{scope.dataListLoading = 0;}
                    // 返回列表顶部
                    $ionicScrollDelegate.scrollTop(true);
                }else{
                    scope.dataListLoading = -1; // 出错了
                }
                // 延迟广播
                $timeout(function() {scope.$broadcast('scroll.refreshComplete');}, 1000);
            },function(e){
                scope.dataListLoading = -1; // 出错了
                // 延迟广播
                $timeout(function() {scope.$broadcast('scroll.refreshComplete');}, 1000);
            });
        };


        // 上拉加载更多
        this.loadMore = function(scope){
            HTTP.send({
                url: scope.data.url,
                method: 'post',
                headers: true,
                data: {pageNo: scope.data.page.pageNo, userId: scope.data.filter.userId, data: scope.data.filter.data},
                loading: false
            },1000).then(function(data){
                if(!!data && !!data.data && !!data.data.obj){
                    // 数据已加载完，不再下拉加载新数据，且列表无更新
                    if(data.data.obj.pageNo == 1){scope.isInfiniteScroll = false;return;}

                    var obj = data.data.obj;
                    // 主数据
                    scope.data.list = !obj.list?scope.data.list:scope.data.list.concat(obj.list);
                    // 分页参数
                    scope.data.page = {
                        totalCount: obj.count,                // 总记录数
                        currentCount: scope.data.list.length, // 当前已加载记录数
                        pageNo: scope.data.page.pageNo + 1    // 下一页页码
                    };

                    // 是否允许上拉加载操作， true：允许执行上拉加载更多，false：不允许
                    if(obj.pageNo*obj.pageSize >= obj.count){scope.isInfiniteScroll = false;}else{scope.isInfiniteScroll = true;}
                    // 数据列表加载状态提示信息（2：加载成功并隐藏加载状态）
                    scope.dataListLoading = 2;
                }else{
                    scope.dataListLoading = -1; // 出错了
                }
                // 延迟这个广播对上拉加载效果提升明显
                $timeout(function() {scope.$broadcast('scroll.infiniteScrollComplete');}, 1000);
            },function(e){
                scope.dataListLoading = -1; // 出错了
                // 延迟这个广播对上拉加载效果提升明显
                $timeout(function() {scope.$broadcast('scroll.infiniteScrollComplete');}, 1000);
            });
        };
    })
    /**
     * 列表加载动画（包括加载中、暂无数据、出错了等）
     * paddingTop：自定义内部顶部边距（允许在原有基础上增减）
     */
    .directive('pageDatalistLoading', function(){
        return{
            scope: false,
            restrict: 'E',
            replace: true,
            template: '<div style="height: 100%;text-align: center;" class="page-data-list-loading" ng-style="{\'padding-top\':(SCREEN.height/2-SCREEN.width*0.18-20+(!paddingTop?0:paddingTop))+\'px\'}">'+
                            '<img class="page-data-list-infoimg" width="36%" ng-src="{{dataListLoading==\'0\'?\'img/zwjl.png\':\'img/error.png\'}}">{{paddingTop}}'+
                            '<div ng-style="{\'margin-top\':SCREEN.width*0.02+20+\'px\'}"><ion-spinner class="page-data-list-loading-ion" icon="bubbles"></ion-spinner></div>'+
                      '</div>',
            controller: function($scope, $rootScope){
                // null：加载成功并隐藏加载状态，-1：出错了 ，0：无数据，1：加载中，2：加载成功并隐藏加载状态，否则：展示出错了
                $scope.$watch('dataListLoading',function(newValue){
                    $('.page-data-list-loading').css('display', '');
                    $('.page-data-list-infoimg').css('display', 'none');
                    $('.page-data-list-loading-ion').css('display', 'none');

                    if(!newValue || newValue==2){
                        $('.page-data-list-loading').css('display', 'none');
                    }else if(newValue === -1 && !!$rootScope.httpStop){// 请求失败 、异常
                        $('.page-data-list-infoimg').css('display', '');
                    }else if(newValue === 0){
                        $('.page-data-list-infoimg').css('display', '');
                    }else if(newValue === 1){
                        $('.page-data-list-loading-ion').css('display', '');
                    }
                });
            }
        };
    })
    /**
     * 页面底部显示分页属性或数据加载完成提示信息
     * isPage：true 显示分页属性，false 不显示分页属性
     * loadedTitle：数据加载完成时底部显示的提示信息
     */
    .directive('pageDatalistLoaded', function(){
        return {
            scope: false, // false：父类值跟子类值双向绑定，true：只是继承父类的值，子类值改变父类值不变
            restrict: 'E',
            replace: true,
            template: '<div class="page-datalist-loaded">'+
                            '<div class="page-datalist-loaded-yespage text-center" style="line-height:25px; font-size:10px;color:#0f0f0f">已加载{{data.page.currentCount}}条，共{{data.page.totalCount}}条</div>'+
                            '<div class="page-datalist-loaded-nopage text-center" style="line-height:25px; font-size:10px;color:#0f0f0f" ng-bind="!loadedTitle?\'没有更多了！\':loadedTitle"></div>'+
                      '</div>',
            controller: function($scope){
                // 底部是否显示分页数据
                $scope.$watch('isPage', function(valPage){
                    $('.page-datalist-loaded-yespage').css('display', 'none');
                    $('.page-datalist-loaded-nopage').css('display', 'none');

                    // 是否显示总记录数，总记录数，当前记录数
                    if(valPage){
                        $('.page-datalist-loaded-yespage').css('display', '');
                    }else{
                        // false：数据已加载完，true：数据未加载完
                        $scope.$watch('isInfiniteScroll',function(newValue){
                            if(newValue===false && !!$scope.data && !!$scope.data.list && $scope.data.list.length>0){
                                $('.page-datalist-loaded-nopage').css('display', '');
                            } 
                        });
                    }
                });
            }     
        };
    });