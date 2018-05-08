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
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('policyService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, true, {categoryId: 202});
        };
    })