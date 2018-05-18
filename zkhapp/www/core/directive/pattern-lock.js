/**
 * 手势解锁
 */
angular.module('app')
	.directive('patternLock', function($rootScope,$timeout,CACHE) { 
		return {
			restrict:'E',
			replace:true,
			scope:{
				lock:'='
			},
			template:
				'<div>'+
					'<div class="mhn-lock-title">'+
						'<span ng-class="{\'mhn-lock-stable\':lock.state==\'stable\',\'mhn-lock-success\':lock.state==\'success\',\'mhn-lock-failure\':lock.state==\'failure\'}">{{lock.title}}</span>'+
					'</div>'+
					'<div class="mhn-lock-wrap">'+
						'<div class="mhn-lock" ng-class="{\'patt-success\':lock.state==\'success\',\'patt-error\':lock.state==\'failure\'}"></div>'+
					'</div>'+
				'</div>',
			link:function(scope, element, attrs, ctrls){
				var oldPattern = CACHE.get('pattern');
				var options = {
					onDraw:function(newPattern){
						oldPattern = CACHE.get('pattern');
						var timer;

						if((newPattern+'').length<4){
							scope.lock = {
								title:'请至少输入4位密码',
								state:'failure'
							};
							$timeout.cancel(timer);
							timer =$timeout(function(){
								patternLock.reset();
								if(oldPattern){
									scope.lock = {
										title:'请输入手势密码解锁',
										state:'stable'
									};
								}else{
									scope.lock = {
										title:'请输入初始手势密码',
										state:'stable'
									};
								}
							},2000);
						}else{
							if(oldPattern){
								if(oldPattern==newPattern){
									scope.lock = {
										prevPattern:null,
										title:'解锁成功',
										state:'success'
									};
									$timeout.cancel(timer);
									timer = $timeout(function(){
										$rootScope.patternLockModal.hide();

										// 解锁成功，重置当前手势图案
										scope.lock = {
											prevPattern:null,
											title:'请输入手势密码解锁',
											state:'stable'
										};
										patternLock.reset();
									},1000);
								}else{
									scope.lock = {
										title:'密码输入错误，请重新输入',
										state:'failure'
									};
									$timeout.cancel(timer);
									timer = $timeout(function(){
										patternLock.reset();
										scope.lock = {
											prevPattern:null,
											title:'请输入手势密码解锁',
											state:'stable'
										};
									},1000);
								}
							}else{
								if(scope.lock.prevPattern){
									if(scope.lock.prevPattern==newPattern){
										CACHE.save('pattern',newPattern);
										$timeout.cancel(timer);
										scope.lock = {
											prevPattern:null,
											title:'密码设置成功',
											state:'success'
										};

										// 设置成功，隐藏并重置当前手势图案
										scope.lock = {
											prevPattern:null,
											title:'请输入手势密码解锁',
											state:'stable'
										};
										patternLock.reset();
									}else{
										scope.lock = {
											prevPattern:null,
											title:'两次密码不一致，请重新输入',
											state:'failure'
										};
										$timeout.cancel(timer);
										timer = $timeout(function(){
											patternLock.reset();
											scope.lock = {
												prevPattern:null,
												title:'请输入手势密码解锁',
												state:'stable'
											};
										},2000);
									}
								}else{
									scope.lock = {
										prevPattern:newPattern,
										title:'请再输入一次',
										state:'stable'
									};
									patternLock.reset();
								}
								
							}
						}
						scope.$apply();
					}
				};

				var patternLock= new PatternLock(element.find('.mhn-lock'),options);
				var wrap = element.find('.mhn-lock-wrap').css({display:'inline-block'});
				var lock = element.find('.mhn-lock');
				if(oldPattern){
					scope.lock = {
						title:'请输入手势密码解锁',
						state:'stable'
					};
				}else{
					scope.lock = {
						title:'请输入初始手势密码',
						state:'stable'
					};
				}
			}
		};
});
