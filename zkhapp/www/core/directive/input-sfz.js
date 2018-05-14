/**
 * 表单-身份证号
 */
angular.module('app')
    .directive('inputSfz', function($compile,$ocLazyLoad) {
        return {
            restrict:'AE',
            require:'ngModel',
            scope:{
                selectData:'=',
                ngModel:'='
            },
            link:function(scope, element, attr, ctrl) {
                $ocLazyLoad.load([
                    'mobiscroll'
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
    });