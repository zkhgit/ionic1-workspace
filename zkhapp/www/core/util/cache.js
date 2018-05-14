/**
 * 页面缓存
 */
angular.module('cache', [])
    .service('CACHE', function(){
        // 保存
        this.save = function (key, value, flag) { // flag为true，代表session缓存
            if (!!flag) {
                window.sessionStorage.setItem(key, (value!=null && typeof(value) == 'object') ? angular.toJson(value) : value);
            } else {
                window.localStorage.setItem(key, (value!=null &&  typeof(value) == 'object') ? angular.toJson(value) : value);
            }
        };
        // 获取
        this.get = function (key, flag) { // flag为true，代表session缓存
            if (!!flag) {
                return window.sessionStorage.getItem(key)==''?'':angular.fromJson(window.sessionStorage.getItem(key));
            } else {
                return window.sessionStorage.getItem(key)==''?'':angular.fromJson(window.localStorage.getItem(key));
            }
        };
        // 移除指定缓存
        this.remove = function (key, flag) { // flag为true，代表session缓存
            if (!!flag) {
                window.sessionStorage.removeItem(key);
            } else {
                window.localStorage.removeItem(key);
            }
        };
        // 清空session或local缓存
        this.clear = function (flag) { // flag为true，代表session缓存
            if (!!flag) {
                window.sessionStorage.clear();
            } else {
                window.localStorage.clear();
            }
        };
        // 通过index获取缓存数据
        var getKeyByIndex = function (index, flag) { // flag为true，代表session缓存
            if (!!flag) {
                return window.sessionStorage.key(index);
            } else {
                return window.localStorage.key(index);
            }
        };
        // 缓存的长度
        var length = function (flag) { // flag为true，代表session缓存
            if (!!flag) {
                return window.sessionStorage.length;
            } else {
                return window.localStorage.length;
            }
        };
    });