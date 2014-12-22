(function(){

  var imgHeight = $('.img-responsive').height();
  $('ul.control-panel .glyphicon').css('line-height', imgHeight + 'px');

  var app = angular.module('game', ['ui.bootstrap']);

  app.controller('GameCardsCtrl', ['$scope', '$modal', function($scope, $modal) {

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    function fillArrayWithNumbers(n) {
      var arr = Array.apply(null, Array(n));
      return arr.map(function (x, i) { return i++ });
    }

    function createCards(color, value, id){
      var randColor = shuffle(color),
          cards = [],
          unic = 0;

      for (var j = 0; j < 2; j++) {
        for (var i=0; i < randColor.length; i++) {
          cards.push({idUnic: unic, id: id[i], value: value[i], color: randColor[i], clicked:false, pairFound:false});
          unic++;
        }
      }
      return shuffle(cards);
    }

    var color = ['#F16745', '#AFC65D', '#7BC8A4', '#4CC3D9', '#93648D', '#404040', '#E3A6EC', '#FFCA58'],
        value = ['glyphicon-camera', 'glyphicon-plane', 'glyphicon-bell', 'glyphicon-briefcase', 'glyphicon-phone', 'glyphicon-tower', 'glyphicon-send', 'glyphicon-globe'],
        id = fillArrayWithNumbers(8);

    $scope.cards = createCards(color, value, id);

    var clickedCards = 0,
        opendCards = 0,
        first_temp_unic_id = undefined;

    $scope.cards.range = function() {
      var range = [];
      for( var i = 0; i < $scope.cards.length; i = i + 4 )
        range.push(i);
      return range;
    };
    $scope.totalClicks = 0;
    $scope.openCard = function(cardId, idUnic) {
      clickedCards ++;
      $scope.totalClicks ++;

      if(clickedCards % 2 !== 0 && first_temp_unic_id === undefined){
        first_temp_unic_id = idUnic;
      }
      var card = $scope.cards.filter(function (card) { return card.idUnic === idUnic }),
          firstOpendFilteredCardById = $scope.cards.filter(function (firstOpendCard) { return firstOpendCard.idUnic === first_temp_unic_id });
      if (clickedCards === 1) {
        for (var i = 0; i < $scope.cards.length; i++) {
          if ($scope.cards[i].pairFound === false) {
            $scope.cards[i].clicked = false;
          }
        }
        card[0].clicked = true;
      } else {
        card[0].clicked = true;
        if (firstOpendFilteredCardById[0].id === card[0].id && firstOpendFilteredCardById[0].idUnic !== card[0].idUnic) {
          firstOpendFilteredCardById[0].pairFound = true;
          card[0].pairFound = true;
          opendCards += 2;
          first_temp_unic_id = undefined;
        }
        clickedCards = 0;
        first_temp_unic_id = undefined;
      }
      if (opendCards === $scope.cards.length) {
        $scope.modalOpen();
        $scope.totalClicks = 0;
        opendCards = 0;
      }
    };

    $scope.reInitCards = function () {
      var color = ['#F16745', '#AFC65D', '#7BC8A4', '#4CC3D9', '#93648D', '#404040', '#E3A6EC', '#FFCA58'],
          value = ['glyphicon-camera', 'glyphicon-plane', 'glyphicon-bell', 'glyphicon-briefcase', 'glyphicon-phone', 'glyphicon-tower', 'glyphicon-send', 'glyphicon-globe'],
          id = fillArrayWithNumbers(8);
      $scope.cards = createCards(color, value, id);
      console.log($scope.cards);
      $scope.cards.range = function() {
        var range = [];
        for( var i = 0; i < $scope.cards.length; i++ )
          range.push(i);
          console.log('range: ' + range);
        return range;
      };
    };
    $scope.addCards = function () {
      clickedCards = 0;
      var availableColors = ['#000000', '#ff0000', '#0000ff', '#333333', '#cccccc', '#eeeeee', '#ffa500', '#008000', '#ffd700', '#00ffff', '#ffff00', '#00ff00', '#ff00ff', '#f5f5f5', '#ffc0cb', '#40e0d0', '#31698a', '#c0d6e4', '#c6e2ff', '#c0c0c0', '#6897bb', '#f5f5dc', '#e3e3e3', '#666666', '#800000', '#a0db8e', '#008080', '#660066', '#6dc066', '#404040', '#cc0000', '#999999', '#dddddd', '#e5e5e5', '#ff6666', '#b0e0e6', '#b6fcd5', '#3b5998', '#191970', '#ff7373', '#383838', '#daa520', '#003366', '#088da5', '#fd482f', '#ff69b4', '#fbfbfb', '#ffbd55', '#ff4444', '#81a3d0', '#808080', '#800080', '#d3ffce', '#191919', '#4169e1', '#36648b', '#cc6633', '#323232', '#ff8000', '#ccff00', '#d3414a', '#81d8d0', '#3ca9d0', '#ddcfe1', '#a5c25c', '#03396c', '#4099ff', '#d41243', '#fff5a2', '#f0f0f0', '#ffefd5', '#dee4fa', '#0099cc', '#80ff00', '#66cccc', '#ff0c3e', '#525266'],
          availableValue = ['glyphicon-euro', 'glyphicon-plus', 'glyphicon-minus', 'glyphicon-cloud', 'glyphicon-envelope', 'glyphicon-pencil', 'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star', 'glyphicon-star-empty', 'glyphicon-user', 'glyphicon-film', 'glyphicon-th-large', 'glyphicon-th', 'glyphicon-th-list', 'glyphicon-ok', 'glyphicon-remove', 'glyphicon-zoom-in', 'glyphicon-zoom-out', 'glyphicon-off', 'glyphicon-signal', 'glyphicon-cog', 'glyphicon-trash', 'glyphicon-home', 'glyphicon-file', 'glyphicon-time', 'glyphicon-road', 'glyphicon-download-alt', 'glyphicon-download', 'glyphicon-upload', 'glyphicon-inbox', 'glyphicon-play-circle', 'glyphicon-repeat', 'glyphicon-refresh', 'glyphicon-list-alt', 'glyphicon-lock', 'glyphicon-flag', 'glyphicon-headphones', 'glyphicon-volume-off', 'glyphicon-volume-down', 'glyphicon-volume-up', 'glyphicon-qrcode', 'glyphicon-barcode', 'glyphicon-tag', 'glyphicon-tags', 'glyphicon-book', 'glyphicon-bookmark', 'glyphicon-print', 'glyphicon-camera', 'glyphicon-font', 'glyphicon-bold', 'glyphicon-italic', 'glyphicon-text-height', 'glyphicon-text-width', 'glyphicon-align-left', 'glyphicon-align-center', 'glyphicon-align-right', 'glyphicon-align-justify', 'glyphicon-list', 'glyphicon-indent-left', 'glyphicon-indent-right', 'glyphicon-facetime-video', 'glyphicon-picture', 'glyphicon-map-marker', 'glyphicon-adjust', 'glyphicon-tint', 'glyphicon-edit', 'glyphicon-share', 'glyphicon-check', 'glyphicon-move', 'glyphicon-step-backward', 'glyphicon-fast-backward', 'glyphicon-backward', 'glyphicon-play', 'glyphicon-pause', 'glyphicon-stop', 'glyphicon-forward', 'glyphicon-fast-forward', 'glyphicon-step-forward', 'glyphicon-eject', 'glyphicon-chevron-left', 'glyphicon-chevron-right', 'glyphicon-plus-sign', 'glyphicon-minus-sign', 'glyphicon-remove-sign', 'glyphicon-ok-sign', 'glyphicon-question-sign', 'glyphicon-info-sign', 'glyphicon-screenshot', 'glyphicon-remove-circle', 'glyphicon-ok-circle', 'glyphicon-ban-circle', 'glyphicon-arrow-left', 'glyphicon-arrow-right', 'glyphicon-arrow-up', 'glyphicon-arrow-down', 'glyphicon-share-alt', 'glyphicon-resize-full', 'glyphicon-resize-small', 'glyphicon-exclamation-sign', 'glyphicon-gift', 'glyphicon-leaf', 'glyphicon-fire', 'glyphicon-eye-open', 'glyphicon-eye-close', 'glyphicon-warning-sign', 'glyphicon-plane', 'glyphicon-calendar', 'glyphicon-random', 'glyphicon-comment', 'glyphicon-magnet', 'glyphicon-chevron-up', 'glyphicon-chevron-down', 'glyphicon-retweet', 'glyphicon-shopping-cart', 'glyphicon-folder-close', 'glyphicon-folder-open', 'glyphicon-resize-vertical', 'glyphicon-resize-horizontal'];
      for (var i = 0; i < 2; i++) {
        color.push(availableColors[Math.floor((Math.random() * 77) + 1)]);
        value.push(availableValue[Math.floor((Math.random() * 120) + 1)]);
      }
      id = fillArrayWithNumbers(id.length++);
      $scope.cards = createCards(color, value, id);
      $scope.cards.range = function() {
        var range = [];
        for( var i = 0; i < $scope.cards.length; i = i + 4 )
          range.push(i);
        return range;
      };
    };
    $scope.removeCards = function () {
      clickedCards = 0;
      color.remove(color.length-2, color.length-1);
      value.remove(value.length-2, value.length-1);
      id = fillArrayWithNumbers(id.length - 2);
      $scope.cards = createCards(color, value, id);
      $scope.cards.range = function() {
        var range = [];
        for( var i = 0; i < $scope.cards.length; i = i + 4 )
          range.push(i);
        return range;
      };
    };

    $scope.modalOpen = function () {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        backdrop: 'static',
        resolve: {
          modalData: function() {
            return $scope.totalClicks;
          }
        }
      });
      modalInstance.result.then(function () {
        $scope.reInitCards();
      });
    };
  }]);
  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.
  app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, modalData) {
    $scope.modalData = modalData;
    $scope.ok = function () {
      $modalInstance.close();
    };
  });
})();