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
    .controller('news', function($scope, newsService, PAGE){
        // 初始化加载
        newsService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('newsService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, true, null, {categoryId: 203});
        };
    })