let emoji;

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:3000/api/v1/emoji")
    .then(res => res.json())
    .then(randEmoji => (emoji = randEmoji));
  // .then(emojipedia => emojipediaStore.push(...emojipedia));

  selectRandom();

  // document.getElementById("create-store").addEventListener("click", () => {
  //   fetch("http://localhost:3001/emojipediaStore")
  //     .then(res => res.json())
  //     .then(emojipedia => createStore(emojipedia));
  // });
});

function selectRandom() {
  // const randomEmoji =
  // emojipediaStore[Math.floor(Math.random() * emojipediaStore.length) + 1];

  console.log(emoji);
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
  randomEmojiDiv.lastElementChild.innerText = `${popularDefinition.alias}, ${
    popularDefinition.votes
  } votes`;

  loadEmojiMeaning(emoji);
}

function loadEmojiMeaning(randomEmoji) {
  const emojiMeaningDiv = document.getElementById("emoji-meaning");
  const aliasesDiv = document.getElementById("aliases");

  emojiMeaningDiv.firstElementChild.innerHTML = `${
    randomEmoji.name
  } <img src="./image/${randomEmoji.image}" alt="${randomEmoji.name}"/> <br/>`;

  aliasesDiv.innerHTML = "";

  aliasesDiv.innerHTML = randomEmoji.aliases
    .sort((a, b) => a.votes - b.votes)
    .map(
      a => `<div class="col-xs-6">
  <input
    class="form-control input-lg js-tag-input"
    readonly
    type="text"
    value="${a.alias}"
  />
</div>
<div class="col-xs-1">
  <p>${a.votes} votes</p>
</div>
<div class="col-xs-2">
  <submit class="btn btn-primary btn-lg btn-block" type="submit">
    Upvote
  </submit>
</div>
<div class="col-xs-3">`
    )
    .join("");
}

// Needed once to create a JSON seed file
// function createStore(emojipedia) {
//   const emojipediaStore = [];

//   for(let obj of emojipedia) {
//     let emoji = {};

//     for(let key in obj) {
//       if(key === "name"){
//         if(obj[key] === null) {
//           emoji[key] = obj["short_name"].replace(/_/g, " ").split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ").toUpperCase()
//         } else {
//           emoji[key] = obj[key];
//         }
//       } else if(key === "image") {
//         emoji[key] = obj[key];
//       } else if(key === "short_names") {
//         emoji["aliases"] = [];

//         for(let sn of obj[key]) {
//           let alias = {};
//           alias["alias"] = sn;
//           alias["votes"] = 0;
//           emoji["aliases"].push(alias)
//         }
//       } else if(key === "unified") {
//         emoji[key] = obj[key];
//       }
//     }
//     emojipediaStore.push(emoji);
//   }
//   const opts = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(emojipediaStore)
//   }
//   fetch("http://localhost:3002/emojiStore", opts)
// }
