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
    .controller('notice', function($scope, noticeService, commonService){
        // 初始化加载
        noticeService.loading($scope);
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
    .service('noticeService', function(commonService, ACTION){
        this.loading = function(scope){
            // 设置初始化参数
            commonService.init(scope);
            // 设置查询条件（栏目类型）
            var data = {categoryId: 201};
            // 获取列表
            commonService.isRefresh(scope, ACTION.public.list, data);
        };
    })