/**
 * 表单验证配置
 */
angular.module('tomValidator',[])
    .config(["w5cValidatorProvider", function (w5cValidatorProvider) {
        // 全局配置
        w5cValidatorProvider.config({
            blurTrig   : true, // 光标移除元素后是否验证并显示错误提示信息
            showError  : showError, // 可以是bool和function，这里使用我们自定义的错误显示方式。
            removeError: removeError // 可以是bool和function，这里使用我们自定义的错误移除方式。
        });
        // 特定字段自定义验证及提示信息
        w5cValidatorProvider.setRules({
            // zidingyi: {
            //     required      : "该选项不能为空",
            //     maxlength     : "该选项输入值长度不能大于{maxlength}",
            //     minlength     : "该选项输入值长度不能小于{minlength}",
            //     email         : "输入邮件的格式不正确",
            //     repeat        : "两次输入不一致",
            //     pattern       : "该选项输入格式不正确",
            //     number        : "必须输入数字",
            //     w5cuniquecheck: "该输入值已经存在，请重新输入",
            //     url           : "输入URL格式不正确",
            //     max           : "该选项输入值不能大于{max}",
            //     min           : "该选项输入值不能小于{min}"
            // },
            // customizer    : {
            //      customizer: "自定义验证数字必须大于上面的数字"
            // },
            // dynamicName:{
            //      required: "动态Name不能为空"
            // },
            // dynamic       : {
            //      required: "动态元素不能为空"
            // },
        });
    }]);

    /**以下必须是全局方法 */
    /**验证失败时的信息提示方式、错误信息移除方式 ------------------------------------*/
        // 错误提示方式
        var showError = function(elem, errorMessages){
            var $elem = angular.element(elem),
            $group = getParentGroup($elem);

            if (!isEmpty($group)){
                if ($group.hasClass("valid-lr")){
                $group.removeClass("valid-lr");
                }

                if (!$group.hasClass("has-error-lr")){
                $group.addClass("has-error-lr");
                }
            }

            var $next = $group.next();
            if (!$next || !$next.hasClass("form-errors")) {
                $group.after('<div class="form-errors"><div class="form-error">' + errorMessages[0] + '</div></div>');
            }
        };

        // 提示信息移除方式
        var removeError = function (elem){
            var $elem = angular.element(elem),
                $group = getParentGroup($elem);

            if (!isEmpty($group)){
                if ($group.hasClass("has-error-lr")){
                $group.removeClass("has-error-lr");
                }

                var $next = $group.next();
                if (!$next || $next.hasClass("form-errors")) {
                    $next.remove();
                }
            }

        };

        var getParentGroup = function (elem) {
            if (elem[0].tagName === "FORM" || elem[0].nodeType == 11) {
                return null;
            }
            if (elem && elem.hasClass("item-input")) {
                return elem;
            } else {
                return getParentGroup(elem.parent());
            }
        };

        var isEmpty = function (object) {
            if (!object) {
                return true;
            }
            if (object instanceof Array && object.length === 0) {
                return true;
            }
            return false;
        };
        /**验证失败时的信息提示方式、错误信息移除方式 ------------------------------------*/