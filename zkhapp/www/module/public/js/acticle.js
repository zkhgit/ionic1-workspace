angular.module('app')
	.controller('acticleController', function($scope, $stateParams, acticleService){
		// 初始化加载
		acticleService.loading($scope, $stateParams.id);
	})
	.service('acticleService', function(HTTP, COMMON){
		// 初始化加载
		this.loading = function(scope, id){
			// 初始化参数配置
			COMMON.scopeInit(scope);
			// 获取文章内容
			getContent(scope, id);
		};

		// 通过文章id获取文章内容
		var getContent = function(scope, id){
			HTTP.send({
				url: 'app/cms/getContent',
				params:{
					id: id
				}
			}).then(function(data){
				scope.acticle = data.data.obj;
				if(scope.acticle!=null && scope.acticle.articleData!=null && scope.acticle.articleData.content!=null){
					scope.content = scope.acticle.articleData.content.replace(/\/kjtpypt/g, scope.PORT + '/kjtpypt');
				}else{
					scope.content = "";
				}
				// 调整内容中的图片大小和位置
				setTimeout(function() {
					$('#mainContent').find('img').css('width','100%').css('height','auto').css('marginLeft', '-28px');
				}, 150);
			});
		};
    });