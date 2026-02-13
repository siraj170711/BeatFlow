const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const episodesDiv = document.getElementById("episodes");

let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

const episodes = [
  { title: "Golden Sparrow", desc: "Sublahshini", src: "songs/song26.mp3" },
  { title: "Tamil selvi", desc: "Anirudh,Remo", src: "songs/song27.mp3" },
  { title: "Innisai paadi Varum", desc: "Unnikrishnann,Thulladha Manamum Thullum", src: "songs/song28.mp3" },
  { title: "Usuma laresay", desc: "Vijay Antony,Uthamaputhiran", src: "songs/song29.mp3" },
  { title: "Mellinamea", desc: "Harish Raghavendra,Shahjahan", src: "songs/song30.mp3" },
  { title: "Bae Kannala", desc: "Don", src: "songs/song31.mp3" },
  { title: "Aazhi Sooldha", desc: "Sivappu Manjal Pachai", src: "songs/song32.mp3" },
  { title: "Ethir Neechal", desc: "Anirudh,Ethir Neechal", src: "songs/song33.mp3" },
  { title: "Kadhal Kan Kattudhe", desc: "Anirudh Ravichander, Shakthisree Gopalan", src: "songs/song34.mp3" },
  { title: "Kadal Urumbum", desc: "Anirudh,Devara", src: "songs/song35.mp3" },
  { title: "Yamma Yamma", desc: "Harris Jayaraj,7 Aum Arivu", src: "songs/song36.mp3" },
  { title: "Adiye Sakkarakatti", desc: "Adhi,Meesaya Murukku", src: "songs/song37.mp3" },
  { title: "Arjunar Villu", desc: "Sukhwinder singh,Ghilli", src: "songs/song38.mp3" },
  { title: "Aathi", desc: "Vishal Dadlani,Kaththi", src: "songs/song39.mp3" },
  { title: "Kannadasan Karaikudi", desc: "Mysskin,Anjaade ", src: "songs/song40.mp3" },
  { title: "Marana Mass", desc: "Anirudh,Petta ", src: "songs/song41.mp3" },
  { title: "Engeyo Partha Mayakkam", desc: "Udit Narayan,Yaaradi Nee Mohini ", src: "songs/song42.mp3" },
  { title: "Ethana Saami", desc: "Pushpavanam Kuppusaamy,Idli Kadai", src: "songs/song43.mp3" },
  { title: "Agayam Theepidicha", desc: "V. Pradeep Kumar,Madras", src: "songs/song44.mp3" },
  { title: "Oru Naalaikkul", desc: "Karthik,Yaaradi Nee Mohini", src: "songs/song45.mp3" },
  { title: "Yendi Yendi", desc: "Vijay,Puli", src: "songs/song46.mp3" },
  { title: "Google Google", desc: "Vijay,Thuppakki", src: "songs/song47.mp3" },
  { title: "Nooru Samigal", desc: "Vijay Antony,Pichaikaaran", src: "songs/song48.mp3" },
  { title: "Venmegam Pennaga", desc: "Hariharan,Yaaradi Nee Mohini", src: "songs/song49.mp3" },
  { title: "Ullala", desc: "Inno Genga,Petta", src: "songs/song50.mp3" },
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
