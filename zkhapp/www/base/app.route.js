angular.module('app.route', [])
    .config(function($urlRouterProvider, $ocLazyLoadProvider){
       
        $urlRouterProvider.otherwise('tab/main');

        $ocLazyLoadProvider.config({
            modules:[
            {
                name:'page', // 分页
                files:[
                    'base/util/page.js',
                ]
            },
            {
                name:'animate', // 动画 --https://daneden.github.io/animate.css
                files:[
                    'css/animate.css'
                ]
            },{
                name:'patternLock', // 手势解锁
                files:[
                    'component/patternLock/patternLock.css',
                    'component/patternLock/patternLock.min.js',
                    'base/directive/patternLock.js'
                ]
            },{ // 一个用于触摸设备(Android，iPhone)的日期和时间选择器jQuery插件
                name:'mobiscroll',
                files:[
                    'component/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                    'component/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
                ]
            },{
                name:'ng-material-floating-button', // 浮动按钮
                files:[
                    'component/ng-material-floating-button/mfb/dist/mfb.min.css',
                    'component/ng-material-floating-button/src/mfb-directive.js'
                ]
            },{
                name:'ionic-rating', // 评价五颗星星
                files:[
                    'component/ionic-rating/ionic-rating.css',
                    'component/ionic-rating/ionic-rating.min.js'
                ]
            }]
        });
    });