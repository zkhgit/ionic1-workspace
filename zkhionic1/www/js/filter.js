
angular.module('filter',[])
    // angularJS绑定数据时自动转义html标签
    .filter('trustHtml', function ($sce) {

        return function (input) {
            var html = $sce.trustAsHtml(input);
            return html;
        };

    })
    // 给定时间距离当前时间
    .filter('timeCustom', function(){
        return function (timeStr) {
            var oldTime = (new Date(timeStr)).getTime(); //得到毫秒数
            var currentTime = new Date().getTime();
            var time = currentTime - oldTime;

            if(time < 1000*60){
                time = "刚刚";
            }else if(time > 1000*60 && time < 1000*60*60){
                time = Math.floor(time/(1000*60)) + '分钟前';
            }else if(time > 1000*60*60 && time < 1000*60*60*24){
                time = Math.floor(time/(1000*60*60)) + '小时前';
            }else if(time > 1000*60*60*24 && time < 1000*60*60*24*2){
                time = '1天前';
            }else if(time > 1000*60*60*24*2 && time < 1000*60*60*24*3){
                time = '2天前';
            }else if(time > 1000*60*60*24*3 && time < 1000*60*60*24*4){
                time = '3天前';
            }else{
                time = timeStr;
            }
            
            return time;
        };
    });