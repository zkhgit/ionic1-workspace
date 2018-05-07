angular.module('public_news_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.news.name, {
	            url: TAB.public.news.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/news.html',
	                    controller: 'news'
	                }
	            }
	        });
    })
    .controller('news', function($scope, newsService, commonService){
        // 初始化加载
        newsService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            $scope.filter.pageNo = 1;
            commonService.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            commonService.loadMore($scope);
        };
    })
    .service('newsService', function(commonService, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            commonService.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 203};
            // 获取列表
            commonService.isRefresh(scope, ACTION.public.list, data);
        };
    })