angular.module('public_introduction_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.introduction.name, {
	            url: TAB.public.introduction.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/introduction.html',
	                    controller: 'introduction'
	                }
	            }
	        });
    })
    .controller('introduction', function($scope, introductionService){
		// 初始化加载
		introductionService.loading($scope, false);
		$scope.doRefresh = function(){
			introductionService.loading($scope, false);
		};
	})
	.service('introductionService', function(TAB, HTTP, SCREEN, ACTION){
		// 初始化加载
		this.loading = function(scope, loading){
			scope.TAB = TAB;
			setTimeout(function() {
				HTTP.send({
					url: ACTION.public.getIntroduction,
					loading:loading
				}).then(function(data){
					scope.introduction = data.data.obj;
					// 调整内容中的图片大小和位置
					setTimeout(function() {
						$('#mainContent').find('img').css('width', (SCREEN.width-20) +'px').css('height','auto').css('marginLeft', '-28px');
					}, 150);
				});
			}, 500);
		};

    });