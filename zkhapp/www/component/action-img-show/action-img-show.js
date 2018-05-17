/**
*actionImgShow服务
*实现完成图片的放大轮播预览功能。
*依赖于图片放大指令
*用法：
*  
var allimgs = [
      {
        imgsrc: '/img/mike.png'
      },
      {
        imgsrc: '/img/ben.png'
      },
      {
        imgsrc: '/img/adam.jpg'
      },
      {
        imgsrc: '/img/perry.png'
      }

    ];

    $scope.imgs = allimgs;
	
	图片预加载
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
    }

配置项opts
larImgs: 数组arr
currentImg: int
imgClose: fn函数类型
*/
angular.module('app')
.factory('actionImgShow', ['$ionicLoading','$rootScope','$compile','$ionicBody','$ionicPlatform','$ionicHistory','$timeout',function($ionicLoading,$rootScope,$compile,$ionicBody,$ionicPlatform, $ionicHistory, $timeout) {
		var obj = {
			element: null,
			backbuttonRegistration: angular.noop,
			scope: null
		};
		var fns = {
			showLargeImg: function(opts) {
        if(window.cordova){
          StatusBar.hide();
        }
        
				var scope = $rootScope.$new(true);
				angular.extend(scope, {
				larImgs: null,
				currentImg: null,
				imgClose: null
				},opts ||　{});
					
				var	element = scope.element = $compile('<img-slide-large lar-imgs="larImgs" current-img="{{currentImg}}" img-close="imgClose()"></img-slide-large>')(scope);

				$ionicBody.append(element);

				actionImgShow.imgIsShow = true;

				obj.element = element;
				obj.scope = scope;
				// 返回一个注销该后退按钮动作的函数
				obj.backbuttonRegistration = $ionicPlatform.registerBackButtonAction(function(e) {
					e.preventDefault();
					if(actionImgShow.imgIsShow) {
						actionImgShow.close(); 
						}else { 
						if($ionicHistory.backView()) {
							$ionicHistory.goBack();
						}
					}  
				},102);
			},

			closeLargeImg: function() {
        /**************************************************/
        if(window.cordova){
          StatusBar.show();
          StatusBar.styleLightContent();
          StatusBar.backgroundColorByHexString("#387ef5");
        }
        /**************************************************/

				this.imgIsShow = false;
				// 销毁作用域
				obj.scope.$destroy();

				obj.element.remove();
				// 执行该注销该后退按钮动作的函数
				if(obj.backbuttonRegistration) {
					obj.backbuttonRegistration();	
				}

				obj = {
					element: null,
					backbuttonRegistration: angular.noop,
					scope: null
				};	
			},
			
		};

		var actionImgShow = {
			imgIsShow: false,
			show: fns.showLargeImg,
			close: fns.closeLargeImg
		};

		return actionImgShow;	
	}])
/**
*图片放大滑动预览指令集
*缓存模板：ng-img-slide-large.html
*指令：imgSlideLarge ，实现图片的预览
*指令：imgShow，实现图片放大功能
*依赖的css: img.enable.show.css
*/

/**
*缓存模板
*<div class="bar bar-footer img-bar-footer">可以自定义
*
*/

/**
*imgSlideLarge指令
*指令获取从控制器传过来的参数。
*acope的参数：
*larImgs：要轮播的图片的数组数据
*currentImg：当前点击的图片的第几个数
*imgClose：绑定至控制器的关闭函数
*/
.directive('imgSlideLarge', ['$rootScope','$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        larImgs: '=',
        currentImg: '@',
        imgClose: '&',
      },
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'component/action-img-show/ng-img-slide-large.html';
      },
      controller: ['$scope', '$attrs','$timeout','$ionicPlatform', function($scope, $attrs, $timeout, $ionicPlatform) {
        if($scope.currentImg != undefined)  {
          $scope.imgActiveSlide = $scope.currentImg;
          $scope.currentLargeImg = parseInt($scope.currentImg) + 1; 
        }

        // slide的总个数
        $scope.imgsNum = $scope.larImgs.length;

        $scope.slideImgChange = function($index) {
          $scope.currentLargeImg = $index+1;
        }

      }],
    };
}])

/**
*imgShow指令
*实现双指捏放的放大和缩小功能。
*
*/
.directive('imgShow',['$compile','$timeout','$ionicGesture',function($compile, $timeout, $ionicGesture) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: false,
      require: '^?imgSlideLarge',
      scope:true,
      link:function($scope,$element,$attrs,$imgSlideCtrl) {
        if($scope.largeImg.imgsrc != undefined) {
          //图片的数组，没有预加载。 
          angular.element($element).append('<img src='+$scope.largeImg.imgsrc+'>').css({
            "background-color":"rgba(5, 5, 5, 5.96)",
          });
        }else {
          //预加载图片数据
          angular.element($element).append($scope.largeImg).css({
            "background-color": "rgba(5, 5, 5, 5.96)",
          }); 
        }

        var this_img = angular.element($element).find('img').css({
            "transform-origin":"50% 50%",
            "-webkit-transform": "scale(1,1)",
            "transform":"scale(1,1)",
            "transition": "all 100ms linear",
        });

        var this_imgbar = angular.element(document.querySelector('div.img-bar-footer')).css({
            'height':"20%",
            'background-color':"rgb(5, 5, 5)",
            "background-size":'100% 0'
        });
 
        /**
        *创建一个hammer对象
        */
        var hammer = new Hammer($element[0].querySelector('img'));
            hammer.get('pinch').set({ enable: true });
            hammer.add(new Hammer.Pinch());
        /**
        *捏开点监听
        */
        var initScale = 1,
            // 缩放中心点
            pinchX    = 0,
            pinchY    = 0;

        hammer.on("pinchstart",function (e) {
          // 缩放中心点
          pinchX = e.center.x;
          pinchY = e.center.y;

          this_img.css({
              "transform-origin": +pinchX+'px'+' '+pinchY+'px',
          });

        });

        hammer.on("pinchout", function (e) {
            var scale = e.scale.toFixed(2) * initScale;
            /**
            *放大动画
            */
            this_img.css({
              "-webkit-transform": "scale("+scale+","+scale+")",
              "transform": "scale("+scale+","+scale+")",
              "transition": "all 100ms linear",
            });
           
            // 设置footer透明度等于0.2
            this_imgbar.css({
              "opacity": "0.2",
            });
            
        });

        hammer.on("pinchend", function (e) {
          initScale = e.scale.toFixed(2) * initScale;
           
        });
        
        /**
        *捏合缩小，回弹原来大小
        */
        hammer.on("pinchin", function (e) {
          var scale = e.scale.toFixed(2) * initScale;

          if(scale <= 0.8) {
            this_img.css({
              "transform-origin": "50% 50%",
              "-webkit-transform": "scale(0.8,0.8)",
              "transform": "scale(0.8,0.8)",
              "transition": "all 200ms linear",
            });

            initScale = 0.8;

          }else {
            this_img.css({
              "transform-origin": "50% 50%",
              "-webkit-transform": "scale("+scale+","+scale+")",
              "transform": "scale("+scale+","+scale+")",
              "transition": "all 200ms linear",
            });

            initScale = scale;
          }
          // 设置footer不透明
          this_imgbar.css({
            "opacity":"1",
          });
      });


        /**
        *
        *
        */
       /* hammer.on('pan',function (e) {
          var X = e.deltaX+"px";
          var Y = e.deltaY+"px";
          this_img.css({
              "-webkit-transform": "translate("+X+","+Y+")",
              "transform": "translate("+X+","+Y+")",
            });
        });*/

       /* hammer.on('panmove',function (e) {
          var X = e.deltaX+"px";
          var Y = e.deltaY+"px";
          this_img.css({
              "-webkit-transform": "translate("+X+","+Y+")",
              "transform": "translate("+X+","+Y+")",
            });
        });

        hammer.on('panend',function (e) {
          var X = e.deltaX+"px";
          var Y = e.deltaY+"px";
          this_img.css({
              "-webkit-transform": "translate("+X+","+Y+")",
              "transform": "translate("+X+","+Y+")",
            });
        });
      */

        /**
        *左滑动事件
        *图片恢复缩放
        */
        var swipeleftFn = function() {
            if(initScale >1) {
              this_img.css({
                "transform-origin":"50% 50%",
                "-webkit-transform": "scale(1,1)",
                "transform": "scale(1,1)",
                "transition": "all 100ms linear",
              });
              initScale = 1;
            }

          };
        var swipeleft = $ionicGesture.on('swipeleft', swipeleftFn, this_img);

        /**
        *右滑动事件
        *图片恢复缩放
        */
        var swiperightFn = function() { 
              if(initScale >1) {
                this_img.css({
                  "transform-origin":"50% 50%",
                  "-webkit-transform": "scale(1,1)",
                  "transform":"scale(1,1)",
                  "transition": "all 100ms linear",
                });
                initScale = 1;
            }
          };

        var swiperight = $ionicGesture.on('swiperight', swiperightFn, this_img);

        // 销毁作用域时解绑手势事件
        $scope.$on("$destroy", function() {
            $ionicGesture.off(swipeleft, 'swipeleft', swipeleftFn);
            $ionicGesture.off(swiperight, 'swiperight', swiperightFn);
            $scope.$destroy();
        });


      }
    }

}]);