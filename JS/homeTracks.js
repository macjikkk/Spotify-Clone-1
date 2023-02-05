window.onload = console.log(JSON.parse(localStorage.getItem("Tracks"))); //tracks from home

window.onload = console.log(JSON.parse(localStorage.getItem("Playlist"))); //playlist from home

const result = document.querySelector(".results");

const homePlaylistData = JSON.parse(localStorage.getItem("Playlist"));
const homePlaylistTitle = homePlaylistData.name;
const homePlaylistsDataDescription = homePlaylistData.description;
const homePlaylistImg = homePlaylistData.images[0].url;
const totalTrackNums = homePlaylistData.tracks.total;

const detailsBg = document.createElement("div"); //parent of playlistDetails
detailsBg.className = "details-bg";
const detailsTransparentBg = document.createElement("div");
detailsTransparentBg.className = "transparent-bg";
const iconsBg = document.querySelector(".icons-bg");
const tracksBg = document.querySelector(".tracks-bg");
const iconsSection = document.createElement("div"); //playIcon, favourites icon, three dots are children of iconSection
iconsSection.className = "icon-section";
const iconSubTitle = document.createElement("div"); //parent of iconSub
const playlistDetails = document.createElement("div");
playlistDetails.className = "playlist-details";

const playlistTitle = document.createElement("h1"); // belong to playlistDetails
playlistTitle.className = "playlist-title";
const playlistImg = document.createElement("img"); // belong to playlistDetails
playlistImg.className = "playlist-img";
const playlist = document.createElement("h6"); // belong to playlistDetails
playlist.className = "playlist-string";
const playlistDes = document.createElement("p"); // belong to playlistDetails
playlistDes.className = "playlist-description";
const totalSongsDom = document.createElement("p"); // belong to playlistDetails
totalSongsDom.className = "playlist-total-song-num";

const playIcon = document.createElement("div");
playIcon.className = "play-icon-div";
const favouriteIcon = document.createElement("div");
favouriteIcon.className = "favourite-icon";
const optionsIcon = document.createElement("div");
optionsIcon.className = "options-icon";
const emTag = document.querySelector("em");

console.log(
  homePlaylistTitle,
  homePlaylistsDataDescription,
  homePlaylistImg,
  totalTrackNums
);

iconsBg.className = "icons-bg Icons-bg";

const IconsBg = document.querySelector(".Icons-bg");
//append the dom elements to the data
playlist.textContent = "PLAYLIST";
playlistImg.src = homePlaylistImg;
playlistTitle.textContent = homePlaylistTitle;
playlistDes.textContent = homePlaylistsDataDescription;
totalSongsDom.textContent = totalTrackNums;

playlistTitle.style.color = "white";
playlistDes.style.color = "white";
totalSongsDom.style.color = "white";

colorjs.prominent(playlistImg, { format: "hex" }).then((color) => {
  detailsBg.style.background = `linear-gradient(to bottom, ${color[2]}, #242424 30%)`; //choose color[0] || color [1] || color[2]
  // IconsBg.style.background = `linear-gradient(to bottom, ${color[0]}90, #242424)`;
  // tracksBg.style.background = `linear-gradient(to bottom, ${color[0]}, #242424 5%)`; //needs some opacity or does not
  // result.style.background = color[0]
});

/*     
  colorjs.average(Img, { format: "hex" }).then((color) => {
    trackBgColor.style.backgroundColor = color;
    console.log(color);
  });
*/

playlistDetails.append(
  playlist,
  playlistImg,
  playlistTitle,
  playlistDes,
  totalSongsDom
);

detailsBg.append(playlistDetails);
detailsTransparentBg.style.opacity = "0.5";
detailsTransparentBg.style.position = "relative";
detailsTransparentBg.style.bottom = "150px";
detailsTransparentBg.style.right = "50px";
detailsTransparentBg.style.height = "2000px";
detailsTransparentBg.style.width = "2000px";
detailsTransparentBg.style.backgroundColor = "#242424";
playlistDetails.append(detailsTransparentBg);

//iconSection. transform the
playIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0
0
700 700" width="65" height="65"><circle
cx="350.001" cy="350" r="325.002" transform="rotate(-45
  350.001
  350)" style="fill:#1fdf64"/><path d="M510.835 323.394
  254.007
  194.982a29.745 29.745 0 0 0-43.048 26.606v256.824a29.745
  29.745 0 0 0 43.048 26.606l256.828-128.412c21.922-10.96
  21.922-42.25 0-53.212z" height="20" width="20"
  style="fill:rgb(0, 0, 0)"/></svg>
  `;

favouriteIcon.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="#b3b3b3" class="bi bi-heart" viewBox="0 0 16 16" id="IconChangeColor"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" id="mainIconPathAttribute" stroke-width="0" stroke="#ff0000"></path> </svg>';

optionsIcon.innerHTML =
  '<svg style= xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b3b3b3" class="bi bi-three-dots" viewBox="0 0 16 16"> <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#b3b3b3"></path> </svg>';

iconsSection.append(playIcon, favouriteIcon, optionsIcon);

result.append(detailsBg);
iconsBg.append(iconsSection);

const homeTracksData = JSON.parse(localStorage.getItem("Tracks"));
//title, artist, image, date, album title
const Tracks = document.createElement("div"); //img, title, artist, album title, release date, duration + hover()
Tracks.className = "tracks";

// homeTracksData.forEach((track, i) => {
//   const nums = document.createElement('h6')
//   nums.className = 'track-order'
//   nums.textContent = i
//   console.log(nums);
// });

homeTracksData.forEach((tracks, index) => {
  const homeTrackTitle = tracks.track.name;
  const homeTrackImg = tracks.track.album.images[2].url;
  const homeReleaseDate = tracks.track.album.release_date;
  const homeAlbumTitle = tracks.track.album.name;
  const trackDuration = tracks.track.duration_ms;

  const track = document.createElement("div");
  track.className = "track";
  const trackImg = document.createElement("img");
  trackImg.className = "track-img";
  const trackTitle = document.createElement("h6");
  trackTitle.className = "track-name";
  const albumTitle = document.createElement("h6");
  albumTitle.className = "album-title";
  const releaseDate = document.createElement("h6");
  releaseDate.className = "release-date";
  const duration = document.createElement("h6");
  duration.className = "duration";
  const trackNum = document.createElement("span");
  trackNum.className = "track-number";

  let minutes = Math.floor(trackDuration / 60000);
  let seconds = ((trackDuration % 60000) / 1000).toFixed(0);
  const time = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  trackImg.src = homeTrackImg;
  trackTitle.textContent = homeTrackTitle;
  albumTitle.textContent = homeAlbumTitle;
  releaseDate.textContent = homeReleaseDate;
  trackNum.textContent = index + 1;
  duration.textContent = time;

  trackTitle.style.color = "white";
  albumTitle.style.color = "white";
  releaseDate.style.color = "white";
  trackNum.style.color = "white";
  duration.style.color = "white";

  track.append(
    trackImg,
    trackNum,
    trackTitle,
    albumTitle,
    releaseDate,
    duration
  );

  const artists = tracks.track.artists[0];
  const artistName = artists.name;
  const artist = document.createElement("h6");
  artist.className = "artist";
  artist.textContent = artistName;
  artist.style.color = "white";
  artist.style.position = "relative";
  track.append(artist);
  console.log(artistName);

  Tracks.append(track);

  console.log(homeTrackTitle, homeTrackImg, homeAlbumTitle, homeReleaseDate);
});
// console.log(homeTracksData.length); // line them up one by one
tracksBg.append(Tracks);

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
//to prevent template.innerHTML u can loop through the tip and use tippy() for iterator
// to prevent template.innerHTML u can use getElementById() instead of querySelector()

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

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true });
  }
);
