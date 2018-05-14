/**
 * angularJS绑定数据时自动转义html标签
 */
angular.module('app')
    .filter('trustHtml', function ($sce) {

        return function (input) {
            var html = $sce.trustAsHtml(input);
            return html;
        };

    })