const updateButton = document.querySelector("#update-button");
const updateMessage = document.querySelector("#update-message");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

const calNaughtonJrQuotes = [
  "You just broke my bro's arm, now you're about to get Tasered.",
  "Shake and bake!",
  "I like to picture Jesus in a tuxedo T-shirt, because it says, like, I want to be formal, but I'm here to party.",
  "I like to think of Jesus as a mischievous badger.",
  "When you say psychosomatic, you mean like he could start a fire with his thoughts?",
  "Sometimes you get a knock on the head, you get special powers. It happens all the time. Read a comic book, okay?",
  "Got a new nick-name...The Magic Man. Now you see me, now you don't",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * calNaughtonJrQuotes.length);
  return calNaughtonJrQuotes[randomIndex];
}

updateButton.addEventListener("click", (_) => {
  const randomQuote = getRandomQuote();

  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Cal Naughton Jr.",
      quote: randomQuote,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      updateMessage.textContent = response;
      window.location.reload(true);
    })
    .catch((error) => {
      console.error("Error:", error);
      updateMessage.textContent = "An error occurred.";
    });
});

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Cal Naughton Jr.",
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = response;
      } else {
        window.location.reload(true);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      updateMessage.textContent = "An error occurred.";
    });
});
