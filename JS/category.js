const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

window.onload = console.log(JSON.parse(localStorage.getItem("categoryData"))); //categories

window.onload = console.log(
  JSON.parse(localStorage.getItem("categoryPlaylists"))
); //category playlists

// window.onload = console.log(JSON.parse(localStorage.getItem("syncPlaylists")));
const result = document.querySelector(".results");
const resultBg = document.querySelector(".bg");
const playlistSection = document.createElement("div");
playlistSection.className = "playlist-section";

const category = JSON.parse(localStorage.getItem("categoryData"));
const categoryTitle = document.createElement("h1");
categoryTitle.className = "category-title";
const categoryDescription = document.createElement("h4");
categoryDescription.className = "category-description";

categoryTitle.textContent = category.name;
categoryDescription.textContent = `Popular ${category.name} playlists`;

resultBg.append(categoryTitle);
result.append(categoryDescription);

const playlists = JSON.parse(localStorage.getItem("categoryPlaylists")); //the whole thing needs to have a proper position under an appropriate div
for (const item of playlists) {
  const card = document.createElement("div");
  card.className = "card-deck whole-card ms-4";
  const playlistImg = document.createElement("img");
  playlistImg.className = "playlist-img";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body cardText";
  const playlistTitle = document.createElement("h6");
  playlistTitle.className = "playlist-title text-white";
  const playlistsDescription = document.createElement("p");
  playlistsDescription.className = "playlist-description";

  playlistImg.src = item.images[0].url;
  playlistImg.style.height = "167px";
  playlistImg.style.width = "167px";
  playlistImg.style.marginTop = "1%";
  playlistImg.style.borderRadius = "5px";
  playlistImg.style.position = "relative";

  const itemDescription = item.description;

  playlistName = item.name;
  playlistTitle.textContent = playlistName.slice(0, 20) + " "; //condition the title length with ...
  playlistsDescription.textContent = itemDescription.slice(0, 45) + "...";

  card.style.width = "199px";
  card.style.height = "290px";
  card.style.backgroundColor = "#181818";
  card.style.borderRadius = "5px";
  card.obj = item;

  cardBody.append(playlistTitle, playlistsDescription);
  card.append(playlistImg, cardBody);
  playlistSection.append(card);
  result.append(playlistSection);
}

const playlistCards = document.querySelectorAll(".card-deck");
const icon = document.createElement("i");

const hover = () => {
  for (const card of playlistCards) {
    card.style.transition = "all 0.3s ease-in";
    card.addEventListener("mouseover", () => {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0
      0
      700 700" width="50" height="50"><circle
      cx="350.001" cy="350" r="325.002" transform="rotate(-45
        350.001
        350)" style="fill:#1fdf64"/><path d="M510.835 323.394
        254.007
        194.982a29.745 29.745 0 0 0-43.048 26.606v256.824a29.745
        29.745 0 0 0 43.048 26.606l256.828-128.412c21.922-10.96
        21.922-42.25 0-53.212z"
        style="fill: rgb(0, 0, 0); height="10px"; width="10px";/></svg>
        `;
      icon.style.opacity = "1";
      icon.style.transition = "all 0.3s ease-in";
      card.append(icon);
    });
    card.addEventListener("mouseout", () => {
      icon.style.opacity = "0";
      icon.style.transition = "all 0.3s ease-out";
    });
  }
};
hover();

for (const card of playlistCards) {
  //works only in nested click
  card.addEventListener("click", (e) => {
    const playlistObj = e.currentTarget.obj;
    const playlistURL = e.currentTarget.obj.href;
    console.log(playlistObj);

    const clientId = "927805874c654120a0fc078f03c7b93f";
    const clientSecret = "67ea6dd8f56a492f97dfb8ec484c8fc7";

    const tracks = async () => {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });

      const data = await result.json();
      const token = data.access_token;

      const fetchTracks = await fetch(`${playlistURL}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      const tracksJson = await fetchTracks.json();
      const tracks = await tracksJson.tracks.items;

      localStorage.setItem("playlist", JSON.stringify(playlistObj));
      localStorage.setItem("tracks", JSON.stringify(tracks));

      location.href = "https://macjik.github.io/Spotify-Clone/spotifySearchTracks.html";
    };
    tracks();
  });
}

window.addEventListener("load", () => {
  document.querySelector("div").style.display = "none";
});

//const tip = document.querySelector(".tool-tip");
//const tippyBox = document.querySelector(".tippy-box");
//const template = document.getElementById("template");
let template = document.querySelector("#template");
const libraryTippy = document.querySelector(".library-tip-content");
const createPlaylistTippy = document.querySelector(
  ".create-playlist-tip-content"
);
const likedSongsTippy = document.querySelector(".liked-songs-tip-content");

tippy(libraryTippy, {
  theme: "tomato",
  content: "Work in Process",
  trigger: "click",
  allowHTML: true,
  placement: "bottom",
  animation: "scale-subtle",
  interactive: true,
  fill: "tomato",
});

tippy(createPlaylistTippy, {
  theme: "tomato",
  content: "Work in Process",
  trigger: "click",
  allowHTML: true,
  placement: "bottom",
  animation: "scale-subtle",
  interactive: true,
  fill: "tomato",
});

tippy(likedSongsTippy, {
  theme: "tomato",
  content: "Work in Process",
  trigger: "click",
  allowHTML: true,
  placement: "bottom",
  animation: "scale-subtle",
  interactive: true,
  fill: "tomato",
});
