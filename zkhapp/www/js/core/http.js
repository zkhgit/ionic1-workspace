/**
 * http配置
 */
angular.module('http', [])
    .service('HTTP', function($q, $http,  $timeout, $rootScope, $ionicPopup, $cordovaToast, $ionicLoading, SETTING){
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
            config.url = $rootScope.DOMAIN_NAME + config.url;
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

            //6、异常处理
            var http = $http(config);
            http.catch(function (error) {//error:重写异常数据
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
                if (!config.catch || config.catch == true){
                    // 终止请求
                    shutdown(102, error.data.title);
                }
            });

            http.then(function (data) {
                // 请求成功，终止请求
                shutdown();alert("成功");
            });

            return http;
        };


        // 终止Http请求
        this.shutdown = function(status){
            shutdown(status, null);
        }
        
        var shutdown = function(status, msg){
            if(!status){
                // 请求正常结束
            }else if(status===101){// （手动）右键终止
                $rootScope.httpStop.resolve();
                $rootScope.httpStop = null; // 解决了右键时显示异常信息
                $cordovaToast.showLongBottom("请求已取消");
            }else if(status===102 && !!$rootScope.httpStop){// （自动）异常终止
                $ionicPopup.alert({
                    title: msg,
                    buttons: [
                        {
                            text: '取消',
                            type: SETTING.buttonColor
                        }
                    ]
                });
            }

            $ionicLoading.hide();
        };
    });