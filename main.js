const SHUFFLE_ANIMATION_DURATION = 2400;
const CARD_ANIMATION_DURATION = 240;
const TOTAL_CARDS = 6;
const MAX_CARD_VALUE = 52;

const elements = {
  shuffleImg: document.querySelector(".shuffle-img"),
  shuffleButton: document.querySelector(".shuffle-button"),
  cards: Array.from(document.querySelectorAll(".card")),
};

/**
 * Creates a promise that resolves after a specified delay.
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates an array of unique random numbers.
 * @returns {number[]} Array of unique random numbers
 */
const generateRandomArray = () => {
  const numbers = new Set();
  while (numbers.size < TOTAL_CARDS) {
    const randomNum = Math.floor(Math.random() * MAX_CARD_VALUE) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};

/**
 * Assigns a new card image and applies animations.
 * @param {HTMLElement} card - Card element
 * @param {number} index - Card index
 * @param {number[]} randomArray - Array of random numbers
 */
const assignCard = async (card, index, randomArray) => {
  card.classList.add("card-roll");
  await delay(CARD_ANIMATION_DURATION);
  card.classList.remove("card-roll");
  card.src = `resources/imgs/${randomArray[index]}.svg`;
  card.classList.add("card-turn");
  await delay(CARD_ANIMATION_DURATION);
  card.classList.remove("card-turn");
};

/**
 * Handles the shuffle button click event.
 */
const handleShuffle = async () => {
  const randomArray = generateRandomArray();
  elements.shuffleImg.src = "resources/shuffle.gif";
  await delay(SHUFFLE_ANIMATION_DURATION);
  elements.shuffleImg.src = "resources/idle.gif";
  for (let index = 0; index < elements.cards.length; index++) {
    await assignCard(elements.cards[index], index, randomArray);
  }
};

// Initialize event listener
elements.shuffleButton.addEventListener("click", handleShuffle);
