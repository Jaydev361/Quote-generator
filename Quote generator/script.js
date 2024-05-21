const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter");

//  tooltip element
function createTooltip(text, target) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerHTML = `<div class="tooltip-text">${text}</div><div class="arrow"></div>`;

  // Position the tooltip below the target element
  const rect = target.getBoundingClientRect();
  tooltip.style.top = rect.bottom + 10 + "px"; // Adjusted to be a bit below
  tooltip.style.left = rect.left + "px";

  document.body.appendChild(tooltip);

  // Remove tooltip when the mouse moves away from the button
  target.addEventListener("mouseout", () => {
    tooltip.remove();
  });

  // Remove tooltip after 2 seconds
  setTimeout(() => {
    tooltip.remove();
  }, 2000);
}

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("mouseover", () => {
  createTooltip("Speak", soundBtn);
});

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("mouseover", () => {
  createTooltip("Copy", copyBtn);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("mouseover", () => {
  createTooltip("Tweet", twitterBtn);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
