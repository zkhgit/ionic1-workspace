angular.module('public_news_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.news.name, {
	            url: TAB.public.news.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/news.html',
	                    controller: 'news'
	                }
	            }
	        });
    })
    .controller('news', function($scope, $rootScope, $ionicPopup, newsService, PAGE){
        // 初始化加载
        newsService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
        // 长按删除
        $scope.onHold = function(acticle){
            $rootScope.tomIonicPopup = $ionicPopup.show({
                title: '提示',
                subTitle: "确定要删除该条记录吗？",
                buttons: [
                  { text: '取消' },
                  {
                    text: '删除',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.dataList.splice($scope.dataList.indexOf(acticle), 1)
                    }
                  },
                ]
              });
            
        };
    })
    .service('newsService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, true, {categoryId: 203});
        };
    })