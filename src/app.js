(function(){
    var Player = function(){
        this.disc = document.getElementById('disc');
        this.audio = document.getElementById('audio');
        this.canplay = false;
        if(audio.play){
            this.playing = true;
        }else{
            this.playing = false;
        }
        this.addEventListener();
    };

    Player.prototype.addEventListener = function(){
        var _this = this;
        this.disc.addEventListener('click', function (){
            if(_this.playing){
                _this.pause();
            }else{
                _this.play();
            }
        });
        this.audio.addEventListener('canplay', function(){
            _this.canplay = true;
            _this.play();
            _this.disc.removeChild(_this.disc.firstElementChild);
        });
        this.audio.addEventListener('play', function(){
            _this.disc.classList.remove('pause');
        });
        this.audio.addEventListener('pause', function(){
            _this.disc.classList.add('pause');
        });
    };

    Player.prototype.play = function () {
        if(!this.canplay){
            return;
        }
        this.audio.play();
        this.playing = true;
    };
    Player.prototype.pause = function() {
        this.audio.pause();
        this.playing = false;
    };

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
           .register('/music/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
    }
    document.addEventListener('DOMContentLoaded', function(){
        new Player();
    });
})();
