angular.module('app.route').config(function($stateProvider){
    $stateProvider
        .state('tab.publicActicle', { // 内容
            url: '/public/acticle?id',
            views: {
                'main': {
                    controller:'publicActicleCtrl',
                    templateUrl:function(){
                        return 'module/public/html/acticle.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/acticle.js',
                                'core/filter/trustHtml.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.publicIntroduction', { // 关于平台
            url: '/public/introduction',
            views: {
                'main': {
                    controller:'publicIntroductionCtrl',
                    templateUrl:function(){
                        return 'module/public/html/introduction.html';
                    },
                    resolve:{
                        load:function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'module/public/js/introduction.js',
                                'core/filter/trustHtml.js'
                            ]);
                        }
                    }
                }
            }
        })
        .state('tab.publicNews', { // 新闻动态
            url: '/public/news',
            views: {
                'main': {
                    controller:'publicNewsCtrl',
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
        .state('tab.publicNotice', { // 通知公告
            url: '/public/notice',
            views: {
                'main': {
                    controller:'publicNoticeCtrl',
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
        .state('tab.publicPolicy', { // 政策法规
            url: '/public/policy',
            views: {
                'main': {
                    controller:'publicPolicyCtrl',
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
        .state('tab.publicScience', { // 科技动态
            url: '/public/science',
            views: {
                'main': {
                    controller:'publicScienceCtrl',
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