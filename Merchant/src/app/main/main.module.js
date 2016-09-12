/**!
 * main.module.js
 * @author jianglj
 * @create 2016-04-15 14:18
 */
(function() {
    'use strict';

    var bizModuleDependencies = ['xcore.biz.product', 'xcore.biz.info', 'xcore.biz.order'];

    angular
        .module('xcore.main', compositeArry(bizModuleDependencies, [
            'xcore.comp',
            'xcore',
            'ui.router',
            'ngTouch', 
            'angucomplete-alt',
            'angularFileUpload',
            'ngDialog'
        ]));

    function compositeArry(a, b) {
        Array.prototype.push.apply(a, b);
        return a;
    }

})();
