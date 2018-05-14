angular.module('app')
    .controller('newsController', function($scope, $rootScope, $ionicPopup, newsService, PAGE){
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
    .service('newsService', function(PAGE){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, 'app/cms/list', true, {categoryId: 203});
        };
    })