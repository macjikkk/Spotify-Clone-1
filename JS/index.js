const parentOfAll = document.querySelector(".parent-of-all");
const PlaylistSection = document.querySelector(".playlist");
const navbar = document.querySelector(".navbar");

const playlistTitle = document.querySelector("#playlists-title");
const albumsTitle = document.querySelector("#albums-title");
const podcastsTitle = document.querySelector("#podcasts-title");
const mostListenedTitle = document.querySelector("#most-listened-title");

const main = document.querySelector("main");
const playIcon = document.querySelector(".play-icon");

const searchSection = document.querySelector("#search-section");

const icon = document.createElement("i");

const APIController = (function () {
  const clientId = "c1eb5a42a535480d919b6c9b9ac15c49";
  const clientSecret = "39474f0c96714fb697248b963d318f4f";

  // private methods
  const _getToken = async () => {
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
    return token;
  };

  const _getGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    const Data = data.categories.items;

    for (const data of Data) {
      const dataID = data.id;
      const syncPlaylists = async () => {
        const fetchDataURL = await fetch(
          `https://api.spotify.com/v1/browse/categories/${dataID}/playlists`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
          }
        ); //playlists
        const dataTing = await fetchDataURL.json();
        const playlistNames = dataTing.playlists.items;

        const filteredPlaylists = playlistNames.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );

        for (const item of filteredPlaylists) {
          const card = document.createElement("div");
          const cardBody = document.createElement("div");
          const playlistName = document.createElement("h6");
          playlistName.className = "playlist-title";
          item.name;
          const descriptionLi = document.createElement("p");
          descriptionLi.className = "playlists-description";
          item.description;

          playlistName.textContent = item.name;

          const description = item.description;
          const slicedDescrpt = description.slice(0, 35) + "...";
          descriptionLi.textContent = slicedDescrpt;

          cardBody.className = "card-body cardText playlists-body";
          cardBody.append(playlistName, descriptionLi);

          const imgObj = item.images;
          for (const obj of imgObj) {
            const img = document.createElement("img");
            img.className =
              "images playlists-img card-img-top mx-auto d-block text-center p-3";
            img.src = obj.url;
            img.alt = "Responsive image";
            img.style.height = "200px";
            img.style.width = "200px";
            img.style.position = "relative";
            img.style.top = "1%";
            img.style.borderRadius = "20px";
            img.imgObj = obj;

            card.append(img, cardBody);
            card.className =
              "card-deck whole-card ms-4 rounded playlists-card-top playlist-cards";
            card.style.width = "12rem";
            card.style.height = "18rem";
            card.style.marginTop = "5%";
            card.obj = item;

            PlaylistSection.append(card);
          }

          const playlistTracks = dataTing.playlists.items;

          const playlistCards = document.querySelectorAll(".card-deck");
          // playlistCards.splice(1, 10)

          const hover = () => {
            playlistCards.forEach((card) => {
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
            });
          };
          hover();

          const click = () => {
            for (const card of playlistCards) {
              card.addEventListener("click", (e) => {
                const trackListObj = e.currentTarget.obj.tracks.href;
                const playlistObj = e.currentTarget.obj;
                localStorage.setItem("Playlist", JSON.stringify(playlistObj));
                const syncPlaylistTracks = async () => {
                  const fetchTracksListObj = await fetch(`${trackListObj}`, {
                    method: "GET",
                    headers: { Authorization: "Bearer " + token },
                  });
                  const json = await fetchTracksListObj.json();
                  const jsonItems = json.items;

                  localStorage.setItem("Tracks", JSON.stringify(jsonItems));
                  location.href = "https://macjik.github.io/Spotify-Clone/homeTracks.html";
                };
                syncPlaylistTracks();
              });
            }
          };
          click();
        }
      };
      syncPlaylists();
    }
  };
  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    /*
                                                getPlaylistByGenre(token) {
                                                  return _getPlaylistByGenre(token);
                                                },
                                                getTracks(token, tracksEndPoint) {
                                                  return _getTracks(token, tracksEndPoint);
                                                },
                                                getTrack(token, trackEndPoint) {
                                                  return _getTrack(token, trackEndPoint);
                                                }, */
  };
})();

const synchronize = async () => {
  const token = await APIController.getToken();
  const genres = await APIController.getGenres(token);
  /*
                                              const albums = await APIController.getPlaylistByGenre(token);
                                              const getTracks = await APIController.getTracks(
                                                token,
                                                "https://api.spotify.com/v1/playlists/37i9dQZF1DWTAeOV2OWbsO/tracks"
                                              );
                                              const getTrack = await APIController.getTrack(
                                                token,
                                                "https://api.spotify.com/v1/tracks/5WBhpRyZLoUFrMBoZ7UWJC"
                                              );
                                              */
  return token, genres; // albums;
};
synchronize();


const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

window.addEventListener("load", () => {
  document.querySelector("div").style.display = "none";
});

//const tip = document.querySelector(".tool-tip");
//const tippyBox = document.querySelector(".tippy-box");
//const template = document.getElementById("template");
let template = document.querySelector("#template");
const tippyContent = document.querySelector(".tippy-content");
const libraryTippy = document.querySelector(".library-tip-content");
const createPlaylistTippy = document.querySelector(
  ".create-playlist-tip-content"
);
const likedSongsTippy = document.querySelector(".liked-songs-tip-content");

const tipTool = () => {
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
};
tipTool();
