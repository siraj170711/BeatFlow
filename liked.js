function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("show");
}

const episodesDiv = document.getElementById("episodes");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");

let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
let currentIndex = 0;

function loadSong(index){
  if(likedSongs.length === 0) return;

  currentIndex = index;
  audio.src = likedSongs[index].src;   // ✅ FIXED (src instead of file)
  title.innerText = likedSongs[index].title;
}

function playPause(){
  audio.paused ? audio.play() : audio.pause();
}

function next(){
  if(likedSongs.length === 0) return;

  currentIndex = (currentIndex + 1) % likedSongs.length;
  loadSong(currentIndex);
  audio.play();
}

function prev(){
  if(likedSongs.length === 0) return;

  currentIndex = (currentIndex - 1 + likedSongs.length) % likedSongs.length;
  loadSong(currentIndex);
  audio.play();
}

audio.addEventListener("timeupdate", ()=>{
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", ()=>{
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", ()=>{
  next();
});

function renderLiked(){
  episodesDiv.innerHTML = "";

  if(likedSongs.length === 0){
    episodesDiv.innerHTML = "<p>No liked songs yet</p>";
    return;
  }

  likedSongs.forEach((ep, i)=>{
    const div = document.createElement("div");
    div.className = "episode";

    div.innerHTML = `
      <strong>${ep.title}</strong><br>
      <small>${ep.desc}</small>
    `;

    div.onclick = ()=>{
      loadSong(i);
      audio.play();
    };

    episodesDiv.appendChild(div);
  });
}

renderLiked();
if(likedSongs.length > 0){
  loadSong(0);
}
