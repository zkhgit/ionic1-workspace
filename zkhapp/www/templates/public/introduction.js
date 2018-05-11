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
		introductionService.loading($scope);
		$scope.doRefresh = function(){
			introductionService.loading($scope);
		};
	})
	.service('introductionService', function(TAB, HTTP, ACTION){
		// 初始化加载
		this.loading = function(scope){
			scope.TAB = TAB;
			HTTP.send({
				url: ACTION.public.getIntroduction,
				loading:true
			}).then(function(data){
				scope.introduction = data.data.obj;
				// 调整内容中的图片大小和位置
				setTimeout(function() {
					$('#mainContent').find('img').css('width', (screen.width-20) +'px').css('height','auto').css('marginLeft', '-28px');
				}, 150);
			});
		};

    });