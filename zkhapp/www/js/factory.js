/**
 * factory是一个可注入的方法
 *
 * actory是普通function，而service是一个构造器(constructor)，
 * 这样Angular在调用service时会用new关键字，
 * 而调用factory时只是调用普通的function，
 * 所以factory可以返回任何东西，而service可以不返回
 */
angular.module('factory',[])
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