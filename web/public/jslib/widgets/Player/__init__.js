/**
 * @description
 */
window.CaterJS.widgets.Player = (function() {
    var _player;

    function init() {
        //CaterJS init marker
        _player = new Audio( './images/res/flush.mp3' );
    };

    function shouldRun() {
		return true;
	};

    function play() {
        _player.play();
    };

    return {
        init: init
      , shouldRun: shouldRun
      , play: play
    };
})();