const emojipediaStore = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:3000/emojipedia")
    .then(res => res.json())
    .then(emojipedia => emojipediaStore.push(...emojipedia));

  selectRandom();
});

function selectRandom() {
  const randomEmoji =
    emojipediaStore[Math.floor(Math.random() * emojipediaStore.length) + 1];

  const randomEmojiDiv = document.getElementById("emoji-random");

  randomEmojiDiv.firstElementChild.innerHTML =
    randomEmoji.name +
    " " +
    `<img src="./image/${randomEmoji.image}" alt="${randomEmoji.name}"/>`;

  let popularDefinition = randomEmoji.aliases[0];
  for (let alias of randomEmoji.aliases) {
    if (popularDefinition.votes < alias.votes) {
      popularDefinition = alias;
    }
  }
  randomEmojiDiv.lastElementChild.innerText = `${popularDefinition.alias}, ${
    popularDefinition.votes
  } votes`;

  loadEmojiMeaning(randomEmoji);
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

function HexToString(s) {
    var escaped = "";
    var hex = "";
    if(s.length%4 > 0) {
      for (i = 0; i < (4 - (s.length % 4)); i++) {
        hex += "0";
      }
    }
    hex += s;
    for (var i = 0; i < hex.length; i += 4) {
      escaped += "%u" + hex.charAt(i) + hex.charAt(i + 1) + hex.charAt(i + 2) + hex.charAt(i + 3);
    }
    return unescape(escaped).split(unescape("%00")).join("");
  }

  function isEmoji?(emoji) {
    return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/.test(emoji)
  }