/****
 * RESV 后台地址配置
 * @author xiaodong.liu
 * @2016-4-19
 */
(function () {

    'use strict';

    angular
        .module('xcore')
        .constant('settings', {

            backend: {
                system: /*system*/'http://10.2.9.36:8888', /*system*/
                product: /*product*/'http://10.2.9.36:8888', /*product http://10.2.9.36:8888 http://192.168.2.94:8888*/
                merchant: /*merchant*/'http://10.2.9.36:8888'/*merchant*/,
                upload: /*upload*/'http://10.2.9.36:8888'/*upload*/,
                pics: /*merchant*/'http://10.2.9.38:8080'/*merchant*/,
            }

        });

})();
