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
    .controller('science', function($scope, scienceService, commonService){
        // 初始化加载
        scienceService.loading($scope);
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
    .service('scienceService', function(commonService, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            commonService.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 103};
            // 获取列表
            commonService.isRefresh(scope, ACTION.public.list, data);
        };
    })