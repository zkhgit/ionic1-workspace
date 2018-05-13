angular.module('app.route').config(function($stateProvider){
    $stateProvider
        .state('tab.acticle', { // 内容
            url: '/public/acticle?id',
            views: {
                'main': {
                    controller:'acticle',
                    templateUrl:function(){
                        return 'module/public/html/acticle.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/acticle.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.introduction', { // 关于平台
            url: '/public/introduction',
            views: {
                'main': {
                    controller:'introduction',
                    templateUrl:function(){
                        return 'module/public/html/introduction.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/introduction.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.news', { // 新闻动态
            url: '/public/news',
            views: {
                'main': {
                    controller:'news',
                    templateUrl:function(){
                        return 'module/public/html/news.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/news.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.notice', { // 通知公告
            url: '/public/notice',
            views: {
                'main': {
                    controller:'notice',
                    templateUrl:function(){
                        return 'module/public/html/notice.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/notice.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.policy', { // 政策法规
            url: '/public/policy',
            views: {
                'main': {
                    controller:'policy',
                    templateUrl:function(){
                        return 'module/public/html/policy.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/policy.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.science', { // 科技动态
            url: '/public/science',
            views: {
                'main': {
                    controller:'science',
                    templateUrl:function(){
                        return 'module/public/html/science.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/science.js'
                            ]);
                        }
                    }
                }
            }
        });
});