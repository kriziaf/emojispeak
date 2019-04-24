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

  emojiMeaningDiv.firstElementChild.innerHTML = `${
    randomEmoji.name
  } <img src="./image/${randomEmoji.image}" alt="${randomEmoji.name}"/> <br/>`;
}
