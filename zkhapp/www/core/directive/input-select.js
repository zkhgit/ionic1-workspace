/**
 * 表单-下拉框
 */
angular.module('app')
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
                    'mobiscroll'
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
