const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const episodesDiv = document.getElementById("episodes");

let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

const episodes = [
  { title: "Vizhigalil Oru Vaanavil", desc: "Saindhavi, Deiva Thirumagal", src: "songs/song1.mp3" },
  { title: "Yaaro En Nenjai", desc: "Sagar, Kutty", src: "songs/song2.mp3" },
  { title: "Kan Irandil", desc: "Vijay Antony, Uthamaputhiran", src: "songs/song3.mp3" },
  { title: "Thuli Thuli", desc: "Haricharan, Paiya", src: "songs/song4.mp3" },
  { title: "Usure Pogudhey", desc: "Karthick, Raavanan", src: "songs/song5.mp3" },
  { title: "Singari", desc: "Sai Abhyankar, Dude", src: "songs/song6.mp3" },
  { title: "Nakka Mukka", desc: "Vijay Antony, Kadhalil Vilundhen", src: "songs/song7.mp3" },
  { title: "Yaaradhu", desc: "Karthick, Kaavalan", src: "songs/song8.mp3" },
  { title: "Udhungada Sangu", desc: "Anirudh Ravichandran, VIP", src: "songs/song9.mp3" },
  { title: "Pattamboochi", desc: "KK, Rita, Kaavalan", src: "songs/song10.mp3" },
  { title: "Un Vizhigalil", desc: "Anirudh, Maan Karate", src: "songs/song11.mp3" },
  { title: "Veredhuvum Thevai Illai", desc: "Sid Sriram, Kadaram Kondan", src: "songs/song12.mp3" },
  { title: "Ilamai Thirumbudhe", desc: "Anirudh, Petta", src: "songs/song13.mp3" },
  { title: "Yaar Indha Saalai", desc: " G. V. Prakash Kumar,Thalaiva", src: "songs/song14.mp3" },
  { title: "Idhazin Oram", desc: "Anirudh, 3", src: "songs/song15.mp3" },
  { title: "Anbe En Anbe", desc: "Harish Raghavendra, dam doom", src: "songs/song16.mp3" },
  { title: "Mun Andhi", desc: "Harris Jayaraj,7 Aum Arivu", src: "songs/song17.mp3" },
  { title: "Danga Maari Oodhari", desc: "Anegan", src: "songs/song18.mp3" },
  { title: "Nee Paartha Vizhigal", desc: "G. Sudhakar, 3", src: "songs/song19.mp3" },
  { title: "Azhaye", desc: "Sai Abhyankar,Dude", src: "songs/song20.mp3" },
  { title: "Aathichoodi", desc: "Vijay Antony,TN 07 AL 4777", src: "songs/song21.mp3" },
  { title: "Senjitaley", desc: "Anirudh,Remo", src: "songs/song22.mp3" },
  { title: "Yennai Maatrum Kadhale", desc: "Sid Sriram,Naanum Rowdy Dhan", src: "songs/song23.mp3" },
  { title: "Makamishi", desc: "Paal Dabba,Brother", src: "songs/song24.mp3" },
  { title: "Phone na Hello", desc: "Sandy,Vicky", src: "songs/song25.mp3" }
];


let index = 0;

function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("show");
}

function loadEpisode(i){
  index = i;
  audio.src = episodes[i].src;
  title.innerText = episodes[i].title;

  document.querySelectorAll(".episode").forEach((el,idx)=>{
    el.classList.toggle("playing", idx===i);
  });
}

function playPause(){
  audio.paused ? audio.play() : audio.pause();
}

function next(){
  index = (index+1)%episodes.length;
  loadEpisode(index);
  audio.play();
}

function prev(){
  index = (index-1+episodes.length)%episodes.length;
  loadEpisode(index);
  audio.play();
}

audio.addEventListener("timeupdate",()=>{
  progress.value = (audio.currentTime/audio.duration)*100 || 0;
});

audio.addEventListener("ended", () => {
  next();
});

progress.addEventListener("input",()=>{
  audio.currentTime = (progress.value/100)*audio.duration;
});

function likeSong(i){
  const song = episodes[i];
  const exists = likedSongs.find(s => s.src === song.src);

  if(!exists){
    likedSongs.push(song);
  }else{
    likedSongs = likedSongs.filter(s => s.src !== song.src);
  }

  localStorage.setItem("likedSongs",JSON.stringify(likedSongs));
  renderEpisodes();
}

function renderEpisodes(){
  episodesDiv.innerHTML="";

  episodes.forEach((ep,i)=>{
    const liked = likedSongs.some(s => s.src === ep.src) ? "liked":"";

    const div = document.createElement("div");
    div.className="episode";

    div.innerHTML=`
      <div style="display:flex;justify-content:space-between;">
        <strong>${ep.title}</strong>
        <span class="like-btn ${liked}" onclick="likeSong(${i});event.stopPropagation()">❤</span>
      </div>
      <small>${ep.desc}</small>
    `;

    div.onclick=()=>{
      loadEpisode(i);
      audio.play();
    };

    episodesDiv.appendChild(div);
  });
}

renderEpisodes();
loadEpisode(0);
