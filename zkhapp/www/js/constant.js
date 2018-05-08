/**
 * 定义常量用的，这货定义的值当然就不能被改变，
 * 它可以被注入到任何地方，但是不能被装饰器(decorator)装饰
 * 可以作为全局变量使用（个人觉得更像是java中的常量）
 */
angular.module('constant',[])
    /** 系统基础设置 */
    .constant('SETTING', {
        hideTabs: 'tabs-item-hide', // 是否显示tabs -- tabs-item-hide|''
        buttonColor: 'button-positive', // 默认按钮颜色
    })
    /** 配置页面跳转路径 */
    .constant('TAB', {
        /** 初始化加载的页面 */
        initial: {
            index: 'tab/main', // 未登录用户打开登录页面
        },
        /** 主目录下的页面 */
        tabs: {
            tab: {
                name: 'tab',
                url: '/tab'
            },
            main: {
                name: 'tab.main',
                url: '/main',
                title: '主页'
            }
        },
        public: {
            index: {
                name: 'tab.index',
                url: '/public/index'
            },
            acticle: {
                name: 'tab.acticle',
                url: '/public/acticle?id',
                title: '内容'
            },
            notice: {
                name: 'tab.notice',
                url: '/public/notice',
                title: '通知公告'
            },
            news: {
                name: 'tab.news',
                url: '/public/news',
                title: '新闻动态'
            },
            science: {
                name: 'tab.science',
                url: '/public/science',
                title: '科技动态'
            },
            policy: {
                name: 'tab.policy',
                url: '/public/policy',
                title: '政策法规'
            },
            introduction: {
                name: 'tab.introduction',
                url: '/public/introduction',
                title: '关于平台'
            }
        }
    })
    /** 服务端接口 */
    .constant('ACTION', {
        public: {
            list: '/app/cms/list', // 内容（文章）列表
            getContent: '/app/cms/getContent', // 文章内容
            getIntroduction: '/app/cms/getIntroduction', // 平台介绍
        }
    })

    /** 文件类型 */
    .constant('MIMETYPE',{
        JPEG: 'image/jpeg',
        //JPG: 'image/jpeg',
        PNG: 'image/png',
        GIF: 'image/gif',
        PDF: 'application/pdf',
        DOC: 'application/msword',
        RAR: 'application/x-rar-compressed',
        ZIP: 'application/zip',
        XLS: 'application/excel',
        MP4: 'video/mp4',
        TXT: 'text/plain',
    })

    // 重写原有的文件 
    // 通过$ionicLoadingConfig设置默认加载效果
    .constant('$ionicLoadingConfig', {
        //template: '<div class="card" style="width:200px;"><div class="positive padding" style="text-align: left;width:200px;height: 45px;border-bottom: 2px solid #387EF5;font-size: 20px;">提示</div><p style="margin-top:10px;margin-bottom: 5px;"><ion-spinner icon="ios"></ion-spinner></p></div>', // 动画模板
        template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>', // style="fill:red"
    　　hideOnStateChange:false,
    　  showBackdrop: false,                 //是否显示蒙层
    　　maxWidth: 600,    
    　　showDelay: 0
        //delay - 显示载入指示器之前要延迟的时间,以毫秒为单位,默认为 0,即不延迟 duration - 载入指示器持续时间,以毫秒为单位。时间到后载入指示器自 动隐藏。默认  情况下, 载入指示器保持显示状态,知道显示的调用 hide()方法
    });