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
    .controller('policy', function($scope, policyService, PAGE){
        // 初始化加载
        policyService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope, false);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('policyService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            PAGE.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 202};
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, data);
        };
    })