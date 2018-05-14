angular.module('app')
    .controller('menuController', function($scope, menuService){
        menuService.loading($scope);
    })
    .service('menuService', function(){
        this.loading = function(scope){
            scope.menus = [];
        }
    });