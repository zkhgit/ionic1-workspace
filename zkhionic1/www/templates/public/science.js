angular.module('public_science_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.science.name, {
	            url: TAB.public.science.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/science.html',
	                    controller: 'science'
	                }
	            }
	        });
    })
    .controller('science', function($scope, scienceService, publicService){
        // 初始化加载
        scienceService.loading($scope);
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
    .service('scienceService', function(publicService){
        this.loading = function(scope){
            // 设置初始化参数
            publicService.init(scope);
            // 设置栏目类型
            scope.filter.categoryId = 103;
            // 获取列表
            publicService.doRefresh(scope,true);
        };
    })