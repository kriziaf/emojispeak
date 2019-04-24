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
  randomEmojiDiv.lastElementChild.innerText = randomEmoji.aliases;
}
