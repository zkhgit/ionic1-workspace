/**
 * 获得文件后缀名
 */
angular.module('app')
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