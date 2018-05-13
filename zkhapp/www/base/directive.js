
angular.module('directive',[])
    // 返回顶部
    .directive("returnTop",function(){
        return{
            restrict: 'E',
            replace: true,
            template: '<i id="scrollTop" ng-click="scrollTop()" class="icon ion-arrow-up-a blue-tom" style="position: absolute; bottom: 10px;right: 10px;font-size: 30px;"></i>',
            controller: function($scope, $ionicScrollDelegate){
                $scope.scrollTop = function() {
                    $ionicScrollDelegate.scrollTop(true);
                };
            }
        };
    })
    // 身份证号
    .directive('inputSfz', ['$compile', '$ocLazyLoad', function($compile,$ocLazyLoad) {
        return {
            restrict:'AE',
            require:'ngModel',
            scope:{
                selectData:'=',
                ngModel:'='
            },
            link:function(scope, element, attr, ctrl) {
                $ocLazyLoad.load([
                    'component/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                    'component/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
                ]).then(function() {
                    element = $(element[0]);
    
                    var sfzInstance;
                    var options = {
                        theme:'android-holo-light',
                        lang:'zh',
                        fill:'ltr',
                        leftKey:{
                            text:'X',
                            value:'X'
                        },
                        headerText:'请输入身份证号',
                        buttons:[{
                            text:'取消',
                            handler:'cancel',
                            icon:'close'
                        },{
                            text:'清空',
                            handler:'clear',
                            icon:'loop2'
                        },{
                            text:'确定',
                            handler:'set',
                            icon:'checkmark'
                        }],
                        placeholder:'_',
                        template:'dddddddddddddddddd',
                        formatValue:function(numbers, vars, inst) {
                            return numbers.toString().replace(/,/g, '');
                        },
                        onInit:function(event,inst){
                            sfzInstance = inst;
                            if(scope.ngModel){
                                inst.setVal(scope.ngModel);
                            }
                        },
                        validate:function(event, inst) {
                            var s = inst.settings,
                                values = event.values,
                                vars = event.variables,
                                disabledButtons = [],
                                invalid = false;
    
                            if(values.length >= 18) {
                                for(var i = 0; i <= 9; i++) {
                                    disabledButtons.push(i);
                                }
                            }
    
                            if(values.length != 17) {
                                disabledButtons.push('X');
                            }
    
                            if(values.length == 0) {
                                disabledButtons.push(0);
                            }
    
                            return {
                                invalid:invalid,
                                disabled:disabledButtons
                            };
                        }
                    };
    
                    if(attr.dataValue){
                        options.dataValue = attrs.dataValue;
                    }
    
                    if(attr.dataText){
                        options.dataText = attrs.dataText;
                    }
    
                    element.mobiscroll().numpad(options);
    
                    // scope.$watch('ngModel',function(value){
                    // 	if(value){
                    // 		sfzInstance.setVal(value,true,false,false);
                    // 	}
                    // });
                });
            }
        };
    }])
    // 下拉框
    .directive('inputSelect', function($compile, $ocLazyLoad) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                selectData:'=',
                ngModel: '='
            },
            link: function(scope, element, attr, ctrl) {
                $ocLazyLoad.load([
                    'component/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                    'component/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
                ]).then(function() {
                    element = $(element[0]);
                    var selectData = [{text:'',value:''}];
                    for(var i=0;i<scope.selectData.length;i++){
                        var option = scope.selectData[i];
                        if(typeof option == 'object'){
                            selectData.push({
                                text:attr.prefix+option[attr.optionText||'text']+attr.suffix,
                                value:option[attr.optionValue||'value']
                            });
                        }else{
                            selectData.push({
                                text:(attr.prefix||'')+option+(attr.suffix||''),
                                value:option
                            });
                        }
                    }
                    var selectInstance;
                    var options = {
                        theme: 'android-holo-light',
                        lang: 'zh',
                        display:'bottom',
                        data:selectData,
                        placeholder:'请选择选项',
                        circular:(attr.circular==true||attr.circular=='true')?true:false,
                        headerText:attr.headerText||'请选择',
                        buttons:[{
                            text:'取消',
                            handler:'cancel',
                            icon:'close'
                        },{
                            text:'清空',
                            handler:'clear',
                            icon:'loop2'
                        },{
                            text:'确定',
                            handler:'set',
                            icon:'checkmark'
                        }],
                        onInit:function(event,inst){
                            selectInstance = inst;
                            if(scope.ngModel){
                                inst.setVal(scope.ngModel);
                            }
                        },
                        onBeforeShow:function(event,inst){
                            if(!scope.ngModel){
                                inst.setVal(selectData[1].value);
                            }
                        },
                        onSet: function(value, inst) {
                            scope.ngModel = inst.getVal();
                            scope.$apply();
                        },
                        onClear:function(){
                            scope.ngModel = '';
                            scope.$apply();
                        }
                    };
    
                    if(attr.dataValue){
                        options.dataValue = attrs.dataValue;
                    }
    
                    if(attr.dataText){
                        options.dataText = attrs.dataText;
                    }
    
                    element.mobiscroll().select(options);
    
                    scope.$watch('ngModel',function(value){
                        if(value){
                            selectInstance.setVal(value,true,false,false);
                        }
                    });
                });
            }
        };
    });