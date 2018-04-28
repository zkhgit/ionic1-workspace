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
    .controller('news', function($scope, newsService, publicService){
        // 初始化加载
        newsService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            $scope.filter.pageNo = 1;
            publicService.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            publicService.loadMore($scope);
        };
    })
    .service('newsService', function(publicService){
        this.loading = function(scope){
            // 设置初始化参数
            publicService.init(scope);
            // 设置栏目类型
            scope.filter.categoryId = 203;
            // 获取列表
            publicService.doRefresh(scope, true);
        };
    })