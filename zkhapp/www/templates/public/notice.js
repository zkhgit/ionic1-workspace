angular.module('public_notice_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.notice.name, {
	            url: TAB.public.notice.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/notice.html',
	                    controller: 'notice'
	                }
	            }
	        });
    })
    .controller('notice', function($scope, noticeService, PAGE){
        // 初始化加载
        noticeService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('noticeService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, true, null, {categoryId: 201});
        };
    })