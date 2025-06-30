const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  {
    title: "Sunny Days",
    artist: "John Smith",
    file: "songs/song1.mp3"
  },
  {
    title: "Rainy Nights",
    artist: "Jane Doe",
    file: "songs/song2.mp3"
  },
  {
    title: "Ocean Breeze",
    artist: "DJ Waves",
    file: "songs/song3.mp3"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}

// Play Song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update progress
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  updateTimeDisplays();
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

function updateTimeDisplays() {
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Playlist UI
function createPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Autoplay next
audio.addEventListener("ended", () => {
  nextBtn.click(); // simulate next
});

loadSong(songs[songIndex]);
createPlaylist();
