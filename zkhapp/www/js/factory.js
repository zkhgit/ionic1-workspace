/**
 * factory是一个可注入的方法
 *
 * actory是普通function，而service是一个构造器(constructor)，
 * 这样Angular在调用service时会用new关键字，
 * 而调用factory时只是调用普通的function，
 * 所以factory可以返回任何东西，而service可以不返回
 */
angular.module('factory',[])
    //1、http服务重写
    .factory("HTTP",function($http, $q, $rootScope, $cordovaToast, $ionicPopup, $ionicLoading, SETTING){

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

        var send = function (config) {
            config.url = $rootScope.DOMAIN_NAME + config.url;
            var networkState = true;
            if(window.cordova){
                //判断当前网络是否正常
                networkState = navigator.connection.type;
                if (networkState == "none") {
                    $ionicPopup.alert({
                        title: '你断网了',
                        //template: ,
                        buttons: [
                            {
                                text: '取消',
                                type: SETTING.butColor
                            }
                        ]
                    });

                    shutdown(); // 终止请求
                    return;
                }
            }

            //1、是否显示自定义加载动画
            $rootScope.httpStop = $q.defer();
            if (config.loading == true) {
                $ionicLoading.show();
            }

            //2、头部配置
            if (config.headers == null || config.headers == false) {
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
            if (config.method == null) {
                config.method = 'get';
            }

            angular.extend(config, {//深拷贝
                timeout: $rootScope.httpStop.promise
            });

            //5、默认不缓存
            if (config.cache == null) {
                config.cache = false;
            }

            //6、异常处理
            var http = $http(config);
            http.catch(function (error) {//error:重写异常数据
                // 终止请求
                shutdown(null, true);

                if (error.data == null) {
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
                        title: '<div>连接服务器失败...</div>'
                    };
                }
                //6.2、异常展示
                if (config.catch == false) {
                } else if(error.status == -1){
                    // $cordovaToast.showLongBottom('失去连接');
                }else {
                    // 弹出异常提示对话框
                    $ionicPopup.alert({
                        title: error.data.title,
                        //template: ,
                        buttons: [
                            {
                                text: '取消',
                                type: 'button-blue-tom'
                            }
                        ]
                    });
                }
            });
            http.then(function () {
                // 终止请求
                shutdown();
            });
            return http;
        };

        // 终止Http请求
        var shutdown = function(flag, exception){
            // 右键终止请求
            if(typeof(flag)=='boolean' && flag == true){
                $rootScope.httpStop.resolve(); // 终止Ajax请求
            }
            // 异常时显示暂无消息
            if(typeof(exception)=='boolean' && exception == true){
                $("#listNull").css('display','');
            }
            $ionicLoading.hide();
            $rootScope.httpStop = null;
            $rootScope.$broadcast('scroll.refreshComplete');
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
        };

        return {
            send: send,
            shutdown: shutdown
        };

    })
    //HTML5缓存
    .factory('CACHE', function() {

        var save = function (key, value, flag) {// true时为session
            if (!!flag) {
                window.sessionStorage.setItem(key, typeof value == 'object' ? angular.toJson(value) : value);
            } else {
                window.localStorage.setItem(key, typeof value == 'object' ? angular.toJson(value) : value);
            }
        };

        var get = function (key, flag) {
            if (!!flag) {
                return angular.fromJson(window.sessionStorage.getItem(key));
            } else {
                return angular.fromJson(window.localStorage.getItem(key));
            }
        };

        var remove = function (key, flag) {
            if (!!flag) {
                window.sessionStorage.removeItem(key);
            } else {
                window.localStorage.removeItem(key);
            }
        };

        var clear = function (flag) {
            if (!!flag) {
                window.sessionStorage.clear();
            } else {
                window.localStorage.clear();
            }
        };

        var getKeyByIndex = function (index, flag) {
            if (!!flag) {
                return window.sessionStorage.key(index);
            } else {
                return window.localStorage.key(index);
            }
        };

        var length = function (flag) {
            if (!!flag) {
                return window.sessionStorage.length;
            } else {
                return window.localStorage.length;
            }
        };


        return {
            save: save,
            get: get,
            remove: remove,
            getKeyByIndex: getKeyByIndex,
            length: length,
            clear: clear
        };
    })
     // JSON数组排序
    .factory("JSONBY",function(){

        //JSON排序
        var getSortFun = function (order, sortBy) {
            var ordAlpah = (order == 'asc' || order == 'ASC') ? '>' : '<';
            return new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');;
        };


        return{
            getSortFun: getSortFun
        };

    })
    // 获得文件后缀名
    .factory('MIME', function($ionicPopup, SETTING, MIMETYPE){
        return {
            getMime : function(targetPath){
                var mime = targetPath.substr(targetPath.lastIndexOf('.')+1);
                if(mime==='jpg'||mime==='jpeg'){
                    mime = MIMETYPE.JPEG;
                }else if(mime==='png'){
                    mime = MIMETYPE.PNG;
                }else if(mime==='pdf'){
                    mime = MIMETYPE.PDF;
                }else if(mime==='doc'||mime==='dot'||mime==='docx'){
                    mime = MIMETYPE.DOC;
                }else if(mime==='rar'){
                    mime = MIMETYPE.RAR;
                }else if(mime==='zip'){
                    mime = MIMETYPE.ZIP;
                }else if(mime==='xls'||mime==='xla'||mime==='xlsx'){
                    mime = MIMETYPE.XLS;
                }else if(mime==='mp4'){
                    mime = MIMETYPE.MP4;
                }else if(mime==='txt'){
                    mime = MIMETYPE.TXT;
                }else{
                    $ionicPopup.show({
                        title: '文件类型不正确',
                        buttons: [
                            {
                                text: '我知道了',
                                type: SETTING.butColor
                            }
                        ]
                    }); 
                    return null;
                }
                return mime;
            }
        };
    });