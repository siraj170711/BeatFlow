const audio = document.getElementById("audio");
  const progress = document.getElementById("progress");
  const title = document.getElementById("title");
  const episodesDiv = document.getElementById("episodes");

  const episodes = [
    { title: "Vizhigalil Oru Vaanavil", desc: "Saindhavi,Deiva Thirumagal", src: "songs/song1.mp3" },
    { title: "Yaaro En Nenjai", desc: "Sagar,Kutty", src: "songs/song2.mp3" },
    { title: "Kan Irandil", desc: "Vijay Antony,Uthamaputhiran", src: "songs/song3.mp3" },
    { title: "Thuli Thuli", desc: "Haricharan,Paiya", src: "songs/song4.mp3" },
    { title: "Usure Pogudhey", desc: "Karthick,Raavanan", src: "songs/song5.mp3" },
    { title: "Singari", desc: "Sai Abhyankar,Dude", src: "songs/song6.mp3" },
    { title: "Nakka Mukka", desc: "Vijay Antony,Kadhalil Vilundhen", src: "songs/song7.mp3" },
    { title: "Yaaradhu", desc: "Karthick,Kaavalan", src: "songs/song8.mp3" },
    { title: "Udhungada Sangu", desc: "Anirudh Ravichandran,VIP", src: "songs/song9.mp3" },
    { title: "pattamboochi", desc: "KK,Rita,Kaavalan", src: "songs/song10.mp3" },
    { title: "Un Vizhigalil", desc: "Anirudh,Maan Karate", src: "songs/song11.mp3" },
    { title: "Veredhuvum Thevai Illai", desc: "Sidsriram,Kadaram kondan", src: "songs/song12.mp3" },
  ];

  let index = 0;

  function loadEpisode(i) {
    index = i;
    audio.src = episodes[index].src;
    title.innerText = episodes[index].title;
    highlight();
  }

  function playPause() {
    if (audio.paused) audio.play();
    else audio.pause();
  }

  function next() {
    index = (index + 1) % episodes.length;
    loadEpisode(index);
    audio.play();
  }

  function prev() {
    index = (index - 1 + episodes.length) % episodes.length;
    loadEpisode(index);
    audio.play();
  }

  audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  });

  progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  audio.addEventListener("ended", next);

  function renderEpisodes() {
    episodesDiv.innerHTML = "";
    episodes.forEach((ep, i) => {
      const box = document.createElement("div");
      box.className = "episode";
      box.innerHTML = `<strong>${ep.title}</strong><br><small>${ep.desc}</small>`;
      box.onclick = () => {
        loadEpisode(i);
        audio.play();
      };
      episodesDiv.appendChild(box);
    });
  }

  function highlight() {
    document.querySelectorAll(".episode").forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });
  }

  renderEpisodes();
  loadEpisode(0);