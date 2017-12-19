var app = angular.module("HangManApp", ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home', {
            templateUrl: '/views/directory.html',
        })
        .when('/win', {
            templateUrl: '/views/win.html',
        })
        .when('/loose', {
            templateUrl: '/views/loose.html',
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

app.controller("gameController", ['$scope', '$timeout', '$location', ($scope, $timeout, $location) => {

    var words = ["Metalica", "Beatles", "Queen", "Radiohead", "Aerosmith", "Scorpions", "Kiss", "Rush", "Eagles", "Oasis"];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.displayWord = '';

    $scope.input = {
        letter: ''
    };
    $scope.heart1 = true;
    $scope.heart2 = true;
    $scope.heart3 = true;

    var selectRandomWord = () => {
        var index = Math.floor(Math.random() * words.length);
        return words[index];
    };
    var newGame = () => {
        anime.timeline()
            .add({
                targets: '.ml15 .word',
                scale: [14, 1],
                opacity: [0, 1],
                easing: "easeOutCirc",
                duration: 600,
            });
        if ($scope.guitar1 == true || $scope.guitar2 == true) {
            $scope.result = true;
        }
        $scope.result = 'Collect 3 guitars to win the game!';
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 4;
        $scope.displayWord = '';
        selectedWord = selectRandomWord();
        var tempDisplayWord = '';
        for (var i = 0; i < selectedWord.length; i++) {
            tempDisplayWord += '*';
        }
        $scope.displayWord = tempDisplayWord;
    }

    $scope.letterChosen = () => {
        for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
            if ($scope.incorrectLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.input.letter = "";
                return;
            }
        }
        $scope.guesses = 4 - ($scope.incorrectLettersChosen.length);
        for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
            if ($scope.correctLettersChosen[i].toUpperCase() == $scope.input.letter.toLowerCase()) {
                $scope.input.letter = "";
                return;
            }
        }
        var correct = false;
        for (var i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toUpperCase() + $scope.displayWord.slice(i + 1);
                var correct = true;
            }
        }
        if (correct) {
            $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
        } else {
            $scope.guesses--;
            $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
        }


        $scope.input.letter = "";
        if ($scope.guesses == 0) {
            $timeout(() => {
                $scope.result = true;
                $scope.result = 'Too bad...';
                $scope.displayWord = selectedWord
                $scope.heart1 = false;
                anime.timeline()
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 600,
                    });
            }, 500);
            $timeout(() => {
                newGame();
            }, 2000);
        }

        if ($scope.guesses == 0 && $scope.heart1 == false) {
            $timeout(() => {
                $scope.result = true;
                $scope.result = 'Try harder..!';
                $scope.displayWord = selectedWord
                $scope.heart2 = false;
                anime.timeline()
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 600,
                    });
            }, 500);
            $timeout(() => {
                newGame();
            }, 2000);
        }

        if ($scope.guesses == 0 && $scope.heart2 == false) {
            $timeout(() => {
                $scope.result = true;
                $scope.result = "You have lost..."
                $scope.displayWord = selectedWord
                $scope.heart3 = false;
            }, 500);
            $timeout(() => {
                $location.path('/loose');
            }, 2000);
        }

        if ($scope.displayWord.indexOf("*") == -1) {
            $timeout(() => {
                $scope.guitar1 = true;
                $scope.result = "DAMN you're good!";
                anime.timeline()
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 600
                    });
            }, 500);
            $timeout(() => {
                newGame();
            }, 2000);
        }



        if ($scope.displayWord.indexOf("*") == -1 && $scope.guitar1 == true) {
            $timeout(() => {
                $scope.guitar2 = true;
                $scope.result = "You're almost there!!";
                anime.timeline()
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 600
                    });
            }, 500);
            $timeout(() => {
                newGame();
            }, 2000);
        }

        if ($scope.displayWord.indexOf("*") == -1 && $scope.guitar2 == true) {
            $timeout(() => {
                $scope.result = true;
                $scope.result = "Yea!@#$@#$@#";
                $scope.guitar3 = true;
                anime.timeline()
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 600,
                    });
            }, 500);
            $timeout(() => {
                $location.path('/win');
            }, 2000);
        }
    }

    newGame();
}]);

app.controller('resultController', ['$scope', '$location', ($scope, $location) => {
    $scope.newGame = () => {
        $location.path('/home');
    };
}]);