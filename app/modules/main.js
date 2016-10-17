/**
 * Main AngularJS Web Application
 */
var app = angular.module('chatWebApp', ['ngRoute', 'facebook', 'ChatService']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "app/partials/home.html", controller: "LoginCtrl"})
        // Pages
        .when("/chat", {templateUrl: "app/partials/chat.html", controller: "ChatCtrl"})
        // else 404 or Home Page
        .otherwise("/", {templateUrl: "app/partials/home.html", controller: "LoginCtrl"});    
}]);

app.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

app.config(function (FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('137187980078182');
});

/**
 * Control Login Page
 */
app.controller('LoginCtrl', function ($scope, Facebook, $location, $http) {
    console.log("Login Controller reporting for duty.");
    console.log($location.search());

    // Define user empty data :/
    $scope.user = {};

    // Defining user logged status
    $scope.logged = false;

    // And some fancy flags to display messages upon user status change
    $scope.salutation = false;

    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
            function () {
                return Facebook.isReady();
            },
            function (newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            userIsConnected = true;
            $scope.logged = true;
        }
    });

    /**
     * IntentLogin
     */
    $scope.intentLogin = function () {
        console.log('IntentLogin', userIsConnected);
        if (!userIsConnected) {
            $scope.login();
        } else {
            $scope.me();
            console.log('User', $scope.user);
            checkSubscription();
        }
    };

    /**
     * Login
     */
    $scope.login = function () {
        Facebook.login(function (response) {
            if (response.status == 'connected') {
                $scope.logged = true;
                $scope.me();
            }
        });
    };

    /**
     * me 
     */
    $scope.me = function () {
        Facebook.api('/me', function (response) {
            console.log('/me >', response);
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function () {
                $scope.user = response;
            });

        });
    };

    /**
     * Logout
     */
    $scope.logout = function () {
        console.log('Logout');
        Facebook.logout(function () {
            $scope.$apply(function () {
                $scope.user = {};
                $scope.logged = false;
                userIsConnected = false;
            });
        });
    };

    /**
     * Taking approach of Events :D
     */
    $scope.$on('Facebook:statusChange', function (ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
            $scope.$apply(function () {
                $scope.facebookId = data.authResponse.userID;
                $scope.salutation = true;
            });
        } else {
            $scope.$apply(function () {
                $scope.salutation = false;
            });
        }
    });
    
    function checkSubscription(token) {
        console.log('getUserInfo');
        console.log($location.search());
        $http({
            method: "get",
            url: "server/ServiceController.php",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {
                action: "getUserInfo",
                token: $location.search().t
            }
        }).then(function mySucces(response) {
            console.log(response);
            //$location.path('/chat');
        }, function myError(response) {
            console.log(response);
        });
    }
    
});

/**
 * Control Chat Page
 */
app.controller('ChatCtrl', function ($scope) {
    console.log("Chat Controller reporting for duty.");
});