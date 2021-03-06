/**!
 * uploader.controller
 * @author jianglj
 * @create 2016-05-10 11:30
 */
(function () {
    'use strict';

    angular
        .module('xcore.comp')
        .directive('uploaderComp', UploadFunc);

    function UploadFunc() {
        return {
            restrict: 'A',
            scope: {
              pics: '='
            },
            bindToController: true,
            controller: UploadControllerFunc,
            controllerAs: 'ctrl',
            templateUrl: 'app/components/uploader/uploader.html',
            replace: true
        };
    }

    UploadControllerFunc.$inject = [
        '$scope',
        'settings',
        'FileUploader',
        'comp.notification.notificationService',
        'xcore.public.setting'
    ];

    function UploadControllerFunc(scope, settings, FileUploader, notificationService, publicSetting) {
        var vm = this;
        vm.pics = scope.pics;
        vm.UPLOAD = settings.backend.upload;
        vm.PICS = settings.backend.pics;
        var PIC_UPLOAD = vm.UPLOAD + publicSetting.upload;
        //图片左移
        vm.moveLeft = moveLeft;
        //图片右移
        vm.moveRight = moveRight;
        //删除图片
        vm._removePic = _removePic;
        function moveLeft(pics, index){
            if(!index){
                return;
            }
            var targetIndex = index - 1,
                target = pics[targetIndex],
                source = pics[index];
            pics[targetIndex] = source;
            pics[index] = target;
        }

        function moveRight(pics, index){
            if(pics.length - 1 === index){
                return;
            }
            var targetIndex = index + 1,
                target = pics[targetIndex],
                source = pics[index];
            pics[targetIndex] = source;
            pics[index] = target;
        }

        function _removePic(pics, index){
            pics.splice(index, 1);
        }
        vm.uploader = new FileUploader({
            url: PIC_UPLOAD,
            headers: {
                'X-Auth-Token': Cookies.get('AUTHTOKEN')
            },
            removeAfterUpload: true
        });

        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        vm.uploader.filters.push({
            name: 'sizeFilter',
            fn: function(item , options) {
                if(item.size / 1000 <= 500){
                    return true
                }else{
                    notificationService.notify('异常', '图片不能大于500k');
                }
            }
        });

        vm.uploader.onAfterAddingAll = function(addedFileItems) {
            vm.uploader.uploadAll();
        };

        vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            var uri = response[0].uri;
            vm.pics.push(uri);
        };

        vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
            notificationService.notify('异常', response.message);
        }

    }

})();
