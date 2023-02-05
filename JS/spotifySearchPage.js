// const home = document.querySelector("#home");
const input = document.querySelector("input");
const results = document.querySelector(".result");
let search_term = "";
const arr = [];

const APIController = (function () {
  const clientId = "927805874c654120a0fc078f03c7b93f";
  const clientSecret = "67ea6dd8f56a492f97dfb8ec484c8fc7";
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
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        //playlists
        const dataTing = await fetchDataURL.json();
        const playlistData = dataTing.playlists.items;

        const mappedPlaylists = playlistData.map((data) => {
          arr.push(data);
        });

        const filteredPlaylists = arr.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );

        const showList = () => {
          results.innerHTML = "";
          //remove categories from searching

          //hide everything except categories. make tracks and playlists appear only when the input is typed
          filteredPlaylists
            .filter((item) => {
              return item.name.toLowerCase().includes(search_term);
            })
            .forEach((e) => {
              const card = document.createElement("div");
              card.className =
                "card-deck playlists-card whole-card ms-4 track-cards";
              card.playlistObj = e;

              const playlistImg = document.createElement("img");
              playlistImg.className = "playlist-img";
              const cardBody = document.createElement("div");
              cardBody.className = "card-body card-text";

              playlistImg.src = e.images[0].url;
              playlistImg.style.height = "167px";
              playlistImg.style.width = "167px";
              playlistImg.style.marginTop = "1%";
              playlistImg.style.borderRadius = "5px";
              playlistImg.style.position = "relative";

              const playlistName = e.name;

              const span = document.createElement("h6");
              span.className = "playlist-title";
              span.textContent = playlistName.slice(0, 20) + " ";

              const Description = e.description;

              const description = document.createElement("p");
              description.className = "description";
              description.textContent = Description.slice(0, 30) + "...";

              card.style.display = "none";
              card.style.width = "199px";
              card.style.height = "290px";
              card.style.backgroundColor = "#181818";
              card.style.borderRadius = "5px";
              card.style.position = "relative";

              cardBody.append(span, description);
              card.append(playlistImg, cardBody);
              results.append(card);
            });

          Data.filter((item) => {
            return item.name.toLowerCase().includes(search_term);
          }).forEach((e) => {
            const card = document.createElement("div");
            card.className =
              "card-deck categories-card whole-card ms-4 track-cards";
            card.categoryObj = e;
            const categoryImg = document.createElement("img");
            categoryImg.className = "category-img";

            const cardBody = document.createElement("div");
            cardBody.className =
              "card-body cardText text-secondary playlists-body";

            const Icons = e.icons;
            for (const obj of Icons) {
              categoryImg.src = obj.url;
              categoryImg.style.height = "100px";
              categoryImg.style.width = "100px";
              categoryImg.style.marginTop = "1%";
            }

            const span = document.createElement("span");
            span.className = "category-title";
            span.textContent = e.name;
            //position the li to the new line everytime it comes to an end of the line. Done!. CSS
            cardBody.append(span);
            card.append(cardBody, categoryImg);
            results.append(card);
          });

          const playlistCards = document.querySelectorAll(".playlists-card");
          const icon = document.createElement("i");
          const hover = () => {
            for (const card of playlistCards) {
              card.style.transition = "all 0.9s ease-in";
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
                icon.style.transition = "all 0.9s ease-in";
                card.append(icon);
              });
              card.addEventListener("mouseout", () => {
                icon.style.opacity = "0";
                icon.style.transition = "all 0.9s ease-out";
              });
            }
          };
          hover();

          const card = document.querySelectorAll(".categories-card");
          card.forEach((item) => {
            item.addEventListener("click", (e) => {
              console.log(e.currentTarget.categoryObj);
              localStorage.setItem(
                "categoryData",
                JSON.stringify(e.currentTarget.categoryObj)
              );

              const dataID = e.currentTarget.categoryObj.id;
              //have to fetch all the available playlists and tracks
              const syncPlaylists = async () => {
                const fetchDataURL = await fetch(
                  `https://api.spotify.com/v1/browse/categories/${dataID}/playlists`,
                  {
                    method: "GET",
                    headers: { Authorization: "Bearer " + token },
                  }
                ); //playlists
                const dataTing = await fetchDataURL.json();
                const playlistsData = dataTing.playlists.items;
                location.href = "https://macjik.github.io/Spotify-Clone/category.html";
                localStorage.setItem(
                  "categoryPlaylists",
                  JSON.stringify(playlistsData)
                );
                console.log(playlistsData);

                for (const item of playlistsData) {
                  const playlistName = item.name;
                  const playlistsDataDescription = item.description;
                  const playlistDataImg = item.images[0].url;
                  console.log(
                    playlistName,
                    playlistsDataDescription,
                    playlistDataImg
                  );

                  const playlistData = [
                    playlistName,
                    playlistsDataDescription,
                    playlistDataImg,
                  ];
                }
              };
              syncPlaylists();
            });
          });

          const playlistCard = document.querySelectorAll(".playlists-card");
          playlistCard.forEach((item) => {
            item.addEventListener("click", (e) => {
              console.log(e.currentTarget.playlistObj);

              const playlistTrackURL = e.currentTarget.playlistObj.tracks.href;
              localStorage.setItem(
                "playlistTrackData",
                JSON.stringify(e.currentTarget.playlistObj)
              );

              const syncTracks = async () => {
                const fetchTracks = await fetch(`${playlistTrackURL}`, {
                  method: "GET",
                  headers: { Authorization: "Bearer " + token },
                });

                const tracksJson = await fetchTracks.json();
                const trackNames = tracksJson.items;
                localStorage.setItem("trackData", JSON.stringify(trackNames));
                console.log(trackNames);

                location.href = "https://macjik.github.io/Spotify-Clone/searchTracksPage.html";
              };
              syncTracks();
            });
          });
        };
        showList();

        let categoryCards = document.querySelectorAll(".categories-card");
        //these don't make much sense. Either query all the cover cards and make colour them individually or remove the cover cards. Div issues. Done!
        categoryCards[0].style.backgroundColor = "rgb(39, 133, 106)";
        categoryCards[1].style.backgroundColor = "rgb(76, 104, 90)";
        categoryCards[2].style.backgroundColor = "olive";
        categoryCards[3].style.backgroundColor = "teal";
        categoryCards[4].style.backgroundColor = "rgb(115, 88, 255)";
        categoryCards[5].style.backgroundColor = "mediumpurple";
        categoryCards[6].style.backgroundColor = "navy";
        categoryCards[7].style.backgroundColor = "rgb(20, 84, 67)";
        categoryCards[8].style.backgroundColor = "green";
        categoryCards[9].style.backgroundColor = "gray";
        categoryCards[10].style.backgroundColor = "rgb(98, 45, 30)";
        categoryCards[11].style.backgroundColor = "silver";
        categoryCards[12].style.backgroundColor = "brown";
        categoryCards[13].style.backgroundColor = "aqua";
        categoryCards[14].style.backgroundColor = "rgb(50, 32, 69)";
        categoryCards[15].style.backgroundColor = "lime";
        categoryCards[16].style.backgroundColor = "red";
        categoryCards[17].style.backgroundColor = "coral";
        categoryCards[18].style.backgroundColor = "peru";
        categoryCards[19].style.backgroundColor = "seagreen";

        input.addEventListener("input", (event) => {
          showList();
          search_term = event.target.value.toLowerCase();

          let playlistCards = document.querySelectorAll(".playlists-card");
          let categoryImg = document.querySelectorAll(".category-img");
          let categoryCards = document.querySelectorAll(".categories-card");
          let coverCards = document.querySelectorAll(".categories-card-covers");

          playlistCards.forEach((playlistCard) => {
            playlistCard.style.display = "inline-block";
          });

          if (input.value === "") {
            playlistCards.forEach((playlistCard) => {
              playlistCard.style.display = "none";
            });
            categoryCards[0].style.backgroundColor = "rgb(39, 133, 106)";
            categoryCards[1].style.backgroundColor = "rgb(76, 104, 90)";
            categoryCards[2].style.backgroundColor = "olive";
            categoryCards[3].style.backgroundColor = "teal";
            categoryCards[4].style.backgroundColor = "rgb(115, 88, 255)";
            categoryCards[5].style.backgroundColor = "mediumpurple";
            categoryCards[6].style.backgroundColor = "navy";
            categoryCards[7].style.backgroundColor = "rgb(20, 84, 67)";
            categoryCards[8].style.backgroundColor = "green";
            categoryCards[9].style.backgroundColor = "gray";
            categoryCards[10].style.backgroundColor = "rgb(98, 45, 30)";
            categoryCards[11].style.backgroundColor = "silver";
            categoryCards[12].style.backgroundColor = "brown";
            categoryCards[13].style.backgroundColor = "aqua";
            categoryCards[14].style.backgroundColor = "rgb(50, 32, 69)";
            categoryCards[15].style.backgroundColor = "lime";
            categoryCards[16].style.backgroundColor = "red";
            categoryCards[17].style.backgroundColor = "coral";
            categoryCards[18].style.backgroundColor = "peru";
            categoryCards[19].style.backgroundColor = "seagreen";
          }

          if (input.value) {
            categoryCards.forEach((card) => {
              card.style.display = "none";
            });
          }
        });
      };
      syncPlaylists();
    }
  };

  // home.addEventListener("click", () => {
  //   location.href = "http://localhost:8080/spotifyAPI.html";
  // });

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
})(); //should write shit ton of tings

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
//to prevent template.innerHTML u can loop through the tip and use tippy() for iterator
// to prevent template.innerHTML u can use getElementById() instead of querySelector()

tippy(tippyContent, {
  //works nice
  theme: "tomato",
  content: template.innerHTML, //customize it
  trigger: "click",
  allowHTML: true,
  placement: "bottom",
  animation: "scale-subtle",
  interactive: true,
  fill: "tomato",
});

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

// const tooltipTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="tooltip"]')
// );
// const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
//   return new bootstrap.Tooltip(tooltipTriggerEl, {
//     trigger: "click",
//   });
// });

//style the playlists properly
// window.addEventListener('load', () => {
//   document.querySelector('div').style.display = 'none';
// });
