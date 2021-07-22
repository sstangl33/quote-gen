// Show New Quote
function newQuote() {
  const totalQuotes = localQuotes.length;
  const quote = localQuotes[Math.floor(Math.random() * totalQuotes)];
  return quote;
}

// On Load
console.log(newQuote());
