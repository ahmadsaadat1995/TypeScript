(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl',
            [
                '$scope', 'dataService', function ($scope, dataService) {
                    $scope.users = [];
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 2;
                    getData();

                    function getData() {
                        dataService.getUsers().then(function (result) {
                            $scope.users = result;
                        });
                    }

                    $scope.deleteUser = function (id) {
                        dataService.deleteUser(id).then(function () {
                            toastr.success('کاربر گرامی عملیات حذف با موفقیت انجام شد ');
                            getData();
                        }, function () {
                            toastr.error('کاربری با چنین مشخصاتی در سیسستم وجود ندارد.' + id);
                        });
                    };
                    $scope.sortBy = function (column) {
                        $scope.sortColumn = column;
                        $scope.reverse = !$scope.reverse;
                    };
                }])
        .controller('userAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function () {
                    toastr.success('کاربر گرامی عملیات درج شما با موفقیت انجام شد ');
                    $location.path('/');
                },
                    function () {
                        toastr.error('کاربرگرامی عملیات با خطا مواجه شد .');
                    });
            };
        }])
        .controller('userEditCtrl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
            }, function () {
                toastr.error('Erro in fetching  user with id:' + $routeParams.id);
            });

            //get user update

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success("عملیات بروز رسانی با موفقیت انجام شد .");
                    $location.path('/');
                },
                    function () {
                        toastr.error("کاربر گراکمی عملیات بروز رسانی با خطا مواجه شد .");
                    });
            };
        }]);
})();