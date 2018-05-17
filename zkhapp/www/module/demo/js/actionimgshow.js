angular.module('app')
    .controller('actionimgshowCtrl', function($scope, actionImgShow){
        var allimgs = [
            {
                imgsrc: 'img/common/avatar.png'
            },
            {
                imgsrc: 'img/lock-bg.jpg'
            },
            {
                imgsrc: 'img/demo-head.jpg'
            }
        ];
        $scope.imgs = allimgs;
        // 图片预加载
        var arr = new Array();
        for(var i=0; i<allimgs.length; i++) {
            var img = new Image();
            img.src = allimgs[i].imgsrc;
            img.onload = function(i) {
                arr[i] = img;
            }(i);
        }

        //使用该服务
        $scope.onDoubleTap = function($index) {
            actionImgShow.show({
                "larImgs":arr,
                //"larImgs":allimgs 也可以这样子实现没有预加载的图片数组
                "currentImg":$index,
                imgClose : function() {
                    actionImgShow.close();
                }
            });
        };
    });