const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector(".new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

// Get Quotes From API (https://quotes-react.netlify.app/)
async function getQuote() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    console.log(error);
    apiQuotes = localQuotes;
    showNewQuote();
  }
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function showNewQuote() {
  showLoadingSpinner();
  const totalQuotes = apiQuotes.length;
  const quote = apiQuotes[Math.floor(Math.random() * totalQuotes)];

  authorText.textContent = !quote.author ? `Unknown` : quote.author;

  if (quoteText.textContent.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Tweet Quote (https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// On Load
getQuote();

// In the code below, newQuote() and tweetQuote() are the callback functions
newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);
