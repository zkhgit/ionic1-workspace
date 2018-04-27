/** 服务平台公用Service */
angular.module('public_service',[])
    .service('publicService', function($rootScope, $q, TAB, PATH, HTTP, ACTION, SCREEN){
        /**
         * 初始化参数配置
         */
        this.init = function(scope){
            scope.TAB = TAB;
            scope.PATH = PATH;
            scope.PORT = PATH.port;
            scope.filter = {pageNo: 1};
            scope.pageNo = 1;
            scope.SCREEN = SCREEN;
        };

        /**
         * 栏目列表
         */
        this.tabs = [
            {text: '首页'},
            {text: '通知通告'},
            {text: '新闻公告'},
            {text: '特派员风采'},
            {text: '学习园地'},
            {text: '用户交流'},
            {text: '专家咨询'},
            {text: '联系我们'}
        ];


        /**
         * 内容列表-下拉刷新列表
         * param categoryId
         * param pageNo
         * param pageSize
         */
        this.doRefresh = function(scope, loading){
            $rootScope.refreshNotList = true;
            scope.dataList = [];
            HTTP.send({
                url: ACTION.public.list,
                params:{
                    categoryId: scope.filter.categoryId, 
                    pageNo: scope.filter.pageNo
                },
                loading: loading
            }).then(function(data){
                $rootScope.refreshNotList = false;
                scope.dataList = (data.data == null || data.data.obj == null || data.data.obj.list == null) ? [] : data.data.obj.list;
                setTimeout(function() {
                    if(data.data == null || data.data.obj == null || scope.dataList.length >= data.data.obj.count){
                        scope.infinite_scroll_flag = false;
                    }else{
                        scope.infinite_scroll_flag = true;
                    }
                    scope.$broadcast('scroll.infiniteScrollComplete');
                }, 500);
            });
        };

        /**
         * 内容列表-上拉加载更多
         */
        this.loadMore = function(scope){
            scope.filter.pageNo++;
            HTTP.send({
                url: ACTION.public.list,
                params:{
                    categoryId: scope.filter.categoryId, 
                    pageNo: scope.filter.pageNo
                },
				loading: false
            }).then(function(data){
                scope.dataList = (data.data == null || data.data.obj == null) ? scope.dataList : scope.dataList.concat(data.data.obj.list);
                // 上拉加载广播
                setTimeout(function() {
                    if(data.data == null || data.data.obj == null || scope.dataList.length >= data.data.obj.count){
                        scope.infinite_scroll_flag = false;
                    }else{
                        scope.infinite_scroll_flag = true;
                    }
                    scope.$broadcast('scroll.infiniteScrollComplete');
                }, 1000);
            });
        };

        /**
         * 禁止<iframe>中引入的<video>里的视频自动播放
         */
        this.autoplayNo = function(scope){
            scope.$on('$ionicView.afterEnter', function() {
                setTimeout(function() {
                    $("iframe").contents().find("video").attr('autoplay', false);
                    $("iframe").contents().find("video").attr('poster', 'img/play.png');
                }, 200);
            });
        };
    });