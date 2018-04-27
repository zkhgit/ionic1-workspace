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
    .controller('notice', function($scope, noticeService, publicService){
        // 初始化加载
        noticeService.loading($scope);
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
    .service('noticeService', function(publicService){
        this.loading = function(scope){
            // 设置初始化参数
            publicService.init(scope);
            // 设置栏目类型
            scope.filter.categoryId = 201;
            // 获取列表
            publicService.doRefresh(scope,true);
        };
    })