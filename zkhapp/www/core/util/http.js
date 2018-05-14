/**
 * HTTP配置
 * config.isRightKey=true 拒绝右键取消请求
 * waitTime（单位：毫秒） 延迟请求时间
 * loading=true 显示$ionicLoading加载动画
 */
angular.module('http', [])
    .service('HTTP', function($q, $http,  $timeout, $rootScope, $ionicPopup, $cordovaToast, $ionicLoading, PATH, SETTING){
        //模板展示
        //$http({
        //    method: string,
        //    url: string,
        //    params: object,
        //    data: string or object,
        //    headers: object,
        //    transformRequest: function transform(data, headersGetter) or an array of functions,
        //    transformResponse: function transform(data, headersGetter) or an array of functions,
        //    cache: boolean or Cache object,
        //    timeout: number,
        //    withCredentials: boolean
        //});

        // 本来可以不写这个，但是为了流畅度加了个延迟
        this.send = function (config, waitTime) {
            var q = $q.defer();
            send(config).then(function(data){
                // 请求成功时延迟显示结果
                $timeout(function(){ q.resolve(data); }, /^\d+$/.test(waitTime)?waitTime:500);
            },function(e){
                q.reject(e);
            });
            return q.promise;
        };

        var send = function (config) {
            // 拼接完成请求路径
            config.url = PATH.DOMAIN_NAME + config.url;
            // 网络状况检查
            if(window.cordova){
                if (navigator.connection.type == "none") {
                    $rootScope.tomIonicPopup = $ionicPopup.alert({
                        title: '你断网了',
                        buttons: [
                            {
                                text: '取消',
                                type: SETTING.buttonColor
                            }
                        ]
                    });

                    // 终止请求
                    shutdown(); return;
                }
            }

            //1、是否显示自定义加载动画
            if (config.loading == true) {$ionicLoading.show(); }

            //2、头部配置
            if (!config.headers || config.headers == false) {
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest'
                };
            }else{
                config.headers = {'Content-Type': 'application/json;charset=utf-8'};
            }

            //config.headers: {'Content-Type': 'application/json;charset=utf-8'}
            //dataType:'JSON'

            //3、默认为GET方式
            if (config.method == 'post' || config.method == 'POST'){ config.method = 'post'; }else{ config.method = 'get'; }

            // 4、超时时间（此处这样设置是为了能主动终止请求）
            $rootScope.httpStop = $q.defer();
            config.timeout = $rootScope.httpStop.promise;

            //5、默认不缓存
            if (config.cache == true){ config.cache = true; }else{ config.cache = false; }

            //6、拒绝右键取消请求
            if(!!config.isRightKey){ $rootScope.isRightKey = true; }

            //7、异常处理
            var http = $http(config);
            // 正常结束（成功或失败）
            http.then(function (data) {
                // 请求成功，终止请求
                shutdown();
            });
            // 异常结束
            http.catch(function (error) {
                if (!error.data) {
                    error.data = {};
                }
                if (error.status == 0) {
                    error.data = {
                        title: '<div>请求超时...</div>'
                    };
                } else if (error.status == 403) {//权限不够
                    error.data = {
                        title: '<div>请求被服务器拒绝...</div>'
                    };
                } else if (error.status == 500) {
                    error.data = {
                        title: '<div>内部服务器错误...</div>'
                    };
                } else {
                    error.data = {
                        title: '<div>连接失败...</div>'
                    };
                }
                //6.2、异常展示
                if ((!config.catch && config.catch!=false) || config.catch == true){
                    // 终止请求
                    shutdown(101, error.data.title);
                }
            });
            // 最终执行
            http.finally(function(){
                $ionicLoading.hide();
                $rootScope.isRightKey = null;
            });

            return http;
        };


        // 终止Http请求
        this.shutdown = function(status, msg){
            shutdown(status, msg);
        };
        
        var shutdown = function(status, msg){
            // null/true：请求成功，101：请求失败，102右键终止，103：刷新、下拉刷新或上拉加载
            if(!status || !$rootScope.httpStop){ // （自动）请求成功
            }else if(status===101){              // （手动）请求异常（或失败）
                $ionicPopup.alert({
                    title: msg,
                    buttons: [
                        {
                            text: '取消',
                            type: SETTING.buttonColor
                        }
                    ]
                });
            }else if(status===102){             // （手动）右键终止
                $rootScope.httpStop.resolve();
                $cordovaToast.showLongBottom("请求已取消");
            }else if(status===103){             // （自动）刷新、下拉刷新或上拉加载异常
                $rootScope.httpStop.resolve();
            }

            // 必须放在最后
            $rootScope.httpStop = null;
        };
    });