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
    .controller('policy', function($scope, policyService, publicService){
        // 初始化加载
        policyService.loading($scope);
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
    .service('policyService', function(publicService){
        this.loading = function(scope){
            // 设置初始化参数
            publicService.init(scope);
            // 设置栏目类型
            scope.filter.categoryId = 202;
            // 获取列表
            publicService.doRefresh(scope,true);
        };
    })