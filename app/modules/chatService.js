var chatService = angular.module('ChatService', []);

// I act a repository for the remote chat collection.
chatService.service("ChatService", function ($http, $q, $scope) {
    // Return public API.
    return({
        getUserInfo: getUserInfo
    });

    // ---
    // PUBLIC METHODS.
    // ---

    // I get all of the friends in the remote collection.
    function getUserInfo() {
        $http({
            method: "get",
            url: "server/ServiceController.php",
            params: {
                action: "getUserInfo"
            }
        }).then(function mySucces(response) {
            console.log(response);
        }, function myError(response) {
            console.log(response);
        });
    }
});