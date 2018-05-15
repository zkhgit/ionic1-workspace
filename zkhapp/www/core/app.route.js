angular.module('app.route', [])
    .config(function($urlRouterProvider, $ocLazyLoadProvider){

        $urlRouterProvider.otherwise('tab/main');
        
        /**
         * 这种懒加载方式引入的模块（angular.module('demo',[])），
         * 不需要在别的模块中声明（angular.module('app',['demo']）,
         * 只需在$ocLazyLoad.load(['demo'])中加载即可;
         */
        $ocLazyLoadProvider.config({
            modules:[
                /** css动画样式 *****************************************************************/
                {
                    name:'animate', // 动画 --https://daneden.github.io/animate.css
                    files:[
                        'css/animate.css'
                    ]
                },
                /** css动画样式 *****************************************************************/


                /** core/service服务 ***********************************************************/
                {
                    name:'download', // 文件下载
                    files:[
                        'core/service/download.js',
                    ]
                },
                {
                    name:'exitApp', // 退出（并注销）登录
                    files:[
                        'core/service/exitApp.js',
                    ]
                },
                {
                    name:'format', // 时间格式化
                    files:[
                        'core/service/format.js',
                    ]
                },
                {
                    name:'jsonSort', // json数组排序
                    files:[
                        'core/service/jsonSort.js',
                    ]
                },
                {
                    name:'mime', // 获得文件后缀名
                    files:[
                        'core/service/mime.js',
                    ]
                },
                {
                    name:'page', // 分页
                    files:[
                        'core/service/page.js',
                    ]
                },
                /** core/service服务 ***********************************************************/


                /** component组件 ***************************************************************/
                {// AngularJS树组件
                    name:'angular-tree-control',
                    files:[
                        'component/angular-tree-control/css/tree-control.css',
                        'component/angular-tree-control/css/tree-control-attribute.css',
                        'component/angular-tree-control/js/angular-tree-control.js',
                    ]
                },
                {// 图表
                    name:'chart', 
                    files:[
                        'component/chart/Chart.min.js',
                        'component/chart/angular-chart.js'
                    ]
                },
                {// 日期选择控件
                    name:'ionic-datepicker', 
                    files:[
                        'component/ionic-datepicker/ionic-datepicker.bundle.min.js',
                        'component/ionic-datepicker/config.js'
                    ]
                },
                {// 原生页面切换效果
                    name:'ionic-native-transitions', 
                    files:[
                        // 'component/ionic-native-transitions/ionic-native-transitions.min.js',
                        'component/ionic-native-transitions/config.js'
                    ]
                },
                {// 评价五颗星星
                    name:'ionic-rating', 
                    files:[
                        'component/ionic-rating/ionic-rating.css',
                        'component/ionic-rating/ionic-rating.min.js'
                    ]
                },
                {// 日期和时间选择器jQuery插件 
                    name:'mobiscroll', 
                    files:[
                        'component/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                        'component/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
                    ]
                },
                {// 文件上传
                    name:'ng-file-upload', 
                    files:[
                        'component/ng-file-upload/ng-file-upload.js',
                        'component/ng-file-upload/ng-file-upload-shim.js',
                    ]
                },
                {// 浮动按钮
                    name:'ng-material-floating-button', 
                    files:[
                        'component/ng-material-floating-button/mfb.min.css',
                        'component/ng-material-floating-button/mfb-directive.js'
                    ]
                },
                {// 手势解锁
                    name:'patternLock', 
                    files:[
                        'component/patternLock/patternLock.css',
                        'component/patternLock/patternLock.min.js',
                        'core/directive/patternLock.js'
                    ]
                },
                {// 表单验证
                    name:'validator', 
                    files:[
                        'component/validator/w5cValidator.css',
                        'component/validator/w5cValidator.js',
                        'component/validator/config.js'
                    ]
                },
                /** component组件 ***************************************************************/

                /** module/**Route.js功能模块路由 ***********************************************/
                {// 公共门户
                    name:'module-rotue', 
                    files:[
                        'module/public/publicRoute.js',
                        'module/demo/demoRoute.js'                       
                    ]
                },
                /** module/**Route.js功能模块路由 ***********************************************/
            ]
        });
        
    });