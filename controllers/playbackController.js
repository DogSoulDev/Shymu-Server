const playbackController = {
    play: function(file) {
        let audio = new Audio(file);
        audio.play();
    }
};

module.exports = {playbackController};