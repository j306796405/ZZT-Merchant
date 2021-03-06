/**
 * Created by fcy79 on 2016/4/25.
 */
(function() {
    'use strict';
    angular
        .module('xcore.biz.filter')
        .filter('f_atreplace', atreplace)
        .filter('f_yes_no',yes_no)
        .filter('f_picUrl',picUrl)
        .filter('f_money',moneyFilter)

    
        ;
    /*
      图片路径
     */
    var baseUrl = "http://10.2.9.38:8080";

    /**
     *  '@' 符号替换 <br/>
     *  HTML 片段需要先使用 $sce.trustAsHtml(html_in_string)将标记为信任，
     *  然后才可以使用 data-ng-bind-html="html_in_string" 取消转义。
     * @param $sce
     * @returns {Function}
     */
    function atreplace($sce) {
        var span = document.createElement('span');
        return function(input) {
            if (!input) return input;
            var lines = input.split('@');

            for (var i = 0; i < lines.length; i++) {
                span.innerText = lines[i];
                span.textContent = lines[i];  //for Firefox
                lines[i] = span.innerHTML;
            }
            return $sce.trustAsHtml(lines.join('<br/>'));
        }
    }

    // status 转换 ‘1’ 是，’0‘ 否
    function yes_no() {
        return function(input) {
            var result = null;
            if (input == '1') {
                result = '是';
            } else if (input == '0') {
                result = '否';
            }
            return result;
        }
    }

    /**
     * 图片路径
     * @returns {Function}
     */
    function picUrl() {
        return function(input) {
            return baseUrl + input;
        }
    }

    /**
     * 金额转换（分转元）
     * @returns {Function}
     */
    function moneyFilter() {
        return function (input) {
            if(input == "" || !input){
                input = 0;
            }
            return (Number(input)/100).toFixed(2);
        }
    }
})();