const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'metric-1.mp3',
        albumArt: 'metric-1.jpg',
        displayName: 'Front Row, (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'dixie.mp3',
        albumArt: 'dixie.jpg',
        displayName: 'Wide Open Spaces',
        artist: 'Dixie Chix',
    },
    {
        name: 'nowhere-to-run.m4a',
        albumArt: 'nowhere-to-run.jpg',
        displayName: 'Nowhere To Run',
        artist: 'Matha Reeves & The Vandellas',
    },
    {
        name: 'the-love-you-save.m4a',
        albumArt: 'jackson5-the-ultimate-collection.jpg',
        displayName: 'The Love You Save',
        artist: 'Jackson 5',
    },
    {
        name: 'i-cant-get-next-to-you.m4a',
        albumArt: 'temptations-my-girl-the-very-best-of.jpg',
        displayName: 'I Can\'t Get Next To You',
        artist: 'The Temptations',
    },
    {
        name: 'i-want-you-back.m4a',
        albumArt: 'jackson5-the-ultimate-collection.jpg',
        displayName: 'I Want You Back',
        artist: 'Jackson 5',
    },
    {
        name: 'my-girl.m4a',
        albumArt: 'temptations-my-girl-the-very-best-of.jpg',
        displayName: 'My Girl',
        artist: 'The Temptations',
    },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}`;
    image.src = `img/${song.albumArt}`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) { songIndex = songs.length - 1; }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) { songIndex = 0; }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if(isPlaying) {
        // console.log(e);
        const { duration, currentTime } = e.srcElement;

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;

        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }

        // Delay switching duration element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;  // Width of progress bar
    // console.log('width', width);
    const clickX = e.offsetX;  // Value of click event anywhere on the progress bar
    // console.log('clickX', clickX);
    const { duration } = music;  // Destructured constant
    // console.log('duration', duration);
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);