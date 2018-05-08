angular.module('public_acticle_ctrl',[])
    .config(function($stateProvider, TAB){
    	$stateProvider
			.state(TAB.public.acticle.name, {
	            url: TAB.public.acticle.url,
	            views: {
	                'main': {
	                    templateUrl: 'templates/public/acticle.html',
	                    controller: 'acticle'
	                }
	            }
	        });
    })
    .controller('acticle', function($scope, $stateParams, acticleService){
		// 初始化加载
		acticleService.loading($scope, $stateParams.id);
	})
	.service('acticleService', function(HTTP, ACTION, commonService){
		// 初始化加载
		this.loading = function(scope, id){
			// 初始化参数配置
			commonService.init(scope);
			// 获取文章内容
			getContent(scope, id);
		};

		// 通过文章id获取文章内容
		var getContent = function(scope, id){
			HTTP.send({
				url: ACTION.public.getContent,
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