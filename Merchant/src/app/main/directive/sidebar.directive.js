/**!
 * 左边菜单
 * sidebar.directive.js
 * @author xiaodong.liu
 * @create 2016-04-15 16:10
 */
(function () {
    'use strict';

    angular
        .module('xcore.main')
        .directive('xcMainSideBar', sideBar);

    sideBar.$inject = [
        'xcore.sidebar_menu_setting'

    ];

    function sideBar(setting) {
        var directive = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/main/view/sidebar.html',
            controller: controllerFunc,
            controllerAs: 'vm',
            link: linkFunc

        };

        return directive;

        controllerFunc.$inject = [
            '$scope',
            '$state'
        ];

        function controllerFunc($scope, $state) {
            var vm = this;
            vm.sideBar = setting;

            $('.sidebar').on('click', '.J_item', function () {
                var $this = $(this),
                    state = $this.attr('state');
                /*$state.go('xcore._blank', {location: false}).then(function() {
                    $state.go(state, {location: true});
                });*/
                $state.go(state);
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        }

        function linkFunc(scope, el, attr) {
            var sideBar = el;
            (function(el){
                $(sideBar).on('click', '.J_menu', function () {
                    var submenu = $(this).parent(".sub-menu");
                    $(submenu).siblings().removeClass('active');
                    if ($(submenu).hasClass('active')) {
                        $(submenu).removeClass('active');
                        $(submenu).find(".arrow").removeClass('open');
                        $(submenu).find(".sub li").removeClass('active');
                        $(submenu).find(".sub").hide();
                    } else {
                        $(submenu).addClass('active');
                        $(submenu).find(".arrow").addClass('open');
                        $(submenu).find(".sub").show();
                    }
                });

            })(el)

        }

    }

})();
