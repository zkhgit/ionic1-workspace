angular.module('app')
    .controller('policyController', function($scope, policyService, PAGE){
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
    .service('policyService', function(PAGE){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, 'app/cms/list', true, {categoryId: 202});
        };
    })