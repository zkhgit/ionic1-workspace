angular.module('app')
    .controller('publicIntroductionCtrl', function($scope, publicIntroductionService){
		// 初始化加载
		publicIntroductionService.loading($scope);
		$scope.doRefresh = function(){
			publicIntroductionService.loading($scope);
		};
	})
	.service('publicIntroductionService', function(HTTP){
		// 初始化加载
		this.loading = function(scope){
			HTTP.send({
				url: 'app/cms/getIntroduction',
				// loading:true
			}).then(function(data){
				scope.introduction = data.data.obj;
				// 调整内容中的图片大小和位置
				setTimeout(function() {
					$('#mainContent').find('img').css('width', (screen.width-20) +'px').css('height','auto').css('marginLeft', '-28px');
				}, 150);
			});
		};

    });