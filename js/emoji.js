let emoji;
// const emojipediaStore = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://emoji-endpoint.herokuapp.com/api/v1/emoji")
    .then(res => res.json())
    .then(randEmoji => (emoji = randEmoji));
  // .then(emojipedia => emojipedia.push(...emojipedia));

  selectRandom();

  // document.getElementById("create-store").addEventListener("click", () => {
  //   fetch("http://localhost:3001/emojipediaStore")
  //     .then(res => res.json())
  //     .then(emojipedia => createStore(emojipedia));
  // });

  document.getElementById("search").addEventListener("click", searchHandler);

  document.getElementById("random-btn").addEventListener("click", async () => {
    await fetch("http://emoji-endpoint.herokuapp.com/api/v1/emoji")
      .then(res => res.json())
      .then(randEmoji => (emoji = randEmoji));

    selectRandom();
  });

  const upvoteBtns = document.getElementsByClassName(
    "btn btn-primary btn-lg btn-block upvote"
  );

  for (let btn of upvoteBtns) {
    btn.addEventListener("click", e => upvoteHandler(e.target.dataset.id));
  }

  document
    .getElementById("define-emoji")
    .addEventListener("click", defineHandler);
});

function searchHandler() {
  const q = document.getElementById("q").value;
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: q })
  };

  fetch("http://emoji-endpoint.herokuapp.com/api/v1/searchbyname", opts)
    .then(res => res.json())
    .then(data => {
      emoji = data;
      selectRandom();
    });
}

function defineHandler() {
  const definition = document.getElementById("tokenlist-loaded1").value;
  const newAlias = { alias: definition, votes: 0, emoji_id: emoji.id };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAlias)
  };

  fetch("http://emoji-endpoint.herokuapp.com/api/v1/alias", opts)
    .then(res => res.json())
    .then(alias => {
      emoji.aliases.push(alias);
      loadAlias();
    });
}

function upvoteHandler(ids) {
  const emojiAliasVotes = ids.split("-");

  const newVotes = parseInt(emojiAliasVotes[2]) + 1;

  const upvoteBtns = document.getElementsByClassName(
    "btn btn-primary btn-lg btn-block upvote"
  );

  for (let btn of upvoteBtns) {
    if (btn.dataset.id === ids) {
      btn.dataset.id = `${emoji.id}-${emojiAliasVotes[1]}-${newVotes}`;
    }
  }

  const aliasVotes = document.getElementById(
    `${emoji.id}-${emojiAliasVotes[1]}`
  );
  const popularMeaning = document.getElementById("popular-meaning");

  popularMeaning.innerText = newVotes;
  aliasVotes.innerText = `${newVotes} votes`;

  const opts = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alias: emojiAliasVotes[1], votes: newVotes })
  };

  fetch(
    `http://emoji-endpoint.herokuapp.com/api/v1/emoji/${emojiAliasVotes[0]}
    }`,
    opts
  );

  // loadAlias();
}

function selectRandom() {
  // const randomEmoji =
  // emojipediaStore[Math.floor(Math.random() * emojipediaStore.length) + 1];

  const randomEmojiDiv = document.getElementById("emoji-random");

  // debugger;
  randomEmojiDiv.firstElementChild.innerHTML = `${
    emoji.name
  } <img src="./image/${emoji.image}" alt="${emoji.name}"/>`;

  let popularDefinition = emoji.aliases[0];
  for (let alias of emoji.aliases) {
    if (popularDefinition.votes < alias.votes) {
      popularDefinition = alias;
    }
  }
  randomEmojiDiv.lastElementChild.innerHTML = `${
    popularDefinition.alias
  }, <span id="popular-meaning">${popularDefinition.votes}</span> votes`;
  randomEmojiDiv.lastElementChild.style = "display:none";

  loadEmojiMeaning();
}

function loadEmojiMeaning() {
  const emojiMeaningDiv = document.getElementById("emoji-meaning");

  emojiMeaningDiv.firstElementChild.innerHTML = `${
    emoji.name
  } <img src="./image/${emoji.image}" alt="${emoji.name}"/> <br/>`;

  loadAlias();
}

function loadAlias() {
  console.log(emoji.aliases);
  const aliasesDiv = document.getElementById("aliases");

  aliasesDiv.innerHTML = "";

  aliasesDiv.innerHTML = emoji.aliases
    .sort((a, b) => a.votes - b.votes)
    .map(
      a => `<div><div class="col-xs-8">
  <input
    class="form-control input-lg js-tag-input"
    readonly
    type="text"
    value="${a.alias}"
  />
</div>
<div class="col-xs-1">
  <p id="${emoji.id}-${a.id}">${a.votes} votes</p>
</div>
<div class="col-xs-2">
  <submit data-id="${emoji.id}-${a.id}-${
        a.votes
      }" class="btn btn-primary btn-lg btn-block upvote" type="submit">
    Upvote
  </submit>
</div>`
    )
    .join("");

  const upvoteBtns = document.getElementsByClassName(
    "btn btn-primary btn-lg btn-block upvote"
  );

  for (let btn of upvoteBtns) {
    btn.addEventListener("click", e => upvoteHandler(e.target.dataset.id));
  }
}

// Needed once to create a JSON seed file
// function createStore(emojipedia) {
//   const emojipediaStore = [];

//   for (let obj of emojipedia) {
//     let emoji = {};

//     for (let key in obj) {
//       if (key === "name") {
//         if (obj[key] === null) {
//           emoji[key] = obj["short_name"]
//             .replace(/_/g, " ")
//             .split(" ")
//             .map(el => el.charAt(0).toUpperCase() + el.slice(1))
//             .join(" ")
//             .toUpperCase();
//         } else {
//           emoji[key] = obj[key];
//         }
//       } else if (key === "image") {
//         emoji[key] = obj[key];
//       } else if (key === "short_names") {
//         emoji["aliases"] = [];

//         for (let sn of obj[key]) {
//           let alias = {};
//           alias["alias"] = sn;
//           alias["votes"] = 0;
//           emoji["aliases"].push(alias);
//         }
//       } else if (key === "unified") {
//         emoji[key] = obj[key]
//           .split("-")
//           .join("")
//           .toLowerCase();
//       }
//     }
//     emojipediaStore.push(emoji);
//   }
//   const opts = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(emojipediaStore)
//   };
//   fetch("http://localhost:3002/emojiStore", opts);
// }
