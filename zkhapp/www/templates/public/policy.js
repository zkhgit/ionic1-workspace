angular.module('public_policy_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.policy.name, {
	            url: TAB.public.policy.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/policy.html',
	                    controller: 'policy'
	                }
	            }
	        });
    })
    .controller('policy', function($scope, policyService, commonService){
        // 初始化加载
        policyService.loading($scope);
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
    .service('policyService', function(commonService, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            commonService.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 202};
            // 获取列表
            commonService.isRefresh(scope, ACTION.public.list, data);
        };
    })