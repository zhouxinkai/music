(function(){
    var Player = function(){
        this.disc = document.getElementById('disc');
        this.audio = document.getElementById('audio');
        if(audio.play){
            this.playing = true;
        }else{
            this.playing = false;
        }
        this.addEventListener();
    };

    Player.prototype.addEventListener = function(){
        this.disc.addEventListener('click', function (){
            if(this.playing){
                this.pause();
            }else{
                this.play();
            }
        }.bind(this));
    };

    Player.prototype.play = function () {
        this.audio.play();
        this.playing = true;
        this.disc.classList.remove('pause');
    };
    Player.prototype.pause = function() {
        this.audio.pause();
        this.playing = false;
        this.disc.classList.add('pause');
    };

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
           .register('sw.js')
           .then(function() { console.log("Service Worker Registered"); });
    }
    window.addEventListener('load', function(){
        new Player();
    });
})();
