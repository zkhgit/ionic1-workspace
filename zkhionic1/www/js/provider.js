/**
 * provider是一个可配置的factory,可以注入到config
 *
 * 注意这里config方法注入的是movieProvider，
 * 上面定义了一个供应商叫movie，但是注入到config中不能直接写movie，
 * 因为前文讲了注入的那个东西就是服务，是供应商提供出来的，
 * 而config中又只能注入供应商（两个例外是$provide和$injector），
 * 所以用驼峰命名法写成movieProvider，Angular就会帮你注入它的供应商。
 */
angular.module('provider',[])
    .provider('movie', function(){
        //案例
        var version;
        return {
            setVersion: function(value){
                version = value;
            },
            $get: function(){
                return {
                    title: 'The Matrix ' + version
                };
            }
        };

        /**
         * 在config中使用案例
         * app.config(function (movieProvider) {movieProvider.setVersion('Reloaded');});
         * 参考：https://segmentfault.com/a/1190000003096933
         * */
    });

