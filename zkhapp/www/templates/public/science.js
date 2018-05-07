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
    .controller('science', function($scope, scienceService, PAGE){
        // 初始化加载
        scienceService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope, false);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('scienceService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            PAGE.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 103};
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, data);
        };
    })