/**
 * JSON数组排序
 */
angular.module('app')
    .service("jsonSort",function(){

        this.getSort = function(order, sortBy){
            var ordAlpah = (order == 'asc' || order == 'ASC') ? '>' : '<';
            return new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');;
        }

    })