const mathQuestions = [
  { question: "2 + 2 + 5 ?", options: ["9", "6", "5", "3"], answer: "9" },
  { question: "5 + 3 * 2 ?", options: ["11", "16", "10", "13"], answer: "11" },
  { question: "12 - 4 ?", options: ["7", "8", "9", "10"], answer: "8" },
  { question: "9 + 6 ?", options: ["15", "16", "14", "13"], answer: "15" },
  { question: "3 x 3 + 1 ?", options: ["10", "11", "12", "9"], answer: "10" },
];

const gkQuestions = [
  { question: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "Delhi" },
  { question: "Largest ocean?", options: ["Pacific", "Indian", "Atlantic", "Arctic"], answer: "Pacific" },
  { question: "Who wrote Ramayana?", options: ["Valmiki", "Tulsi Das", "Kalidas", "Ved Vyas"], answer: "Valmiki" },
  { question: "Which is the national bird?", options: ["Peacock", "Sparrow", "Eagle", "Parrot"], answer: "Peacock" },
  { question: "Which planet is red?", options: ["Mars", "Venus", "Saturn", "Jupiter"], answer: "Mars" },
];

let allQuestions = [...mathQuestions, ...gkQuestions];
let usedIndexes = [];
let time = 5;
let timer;
let questionCount = 0;
let correct = 0;
let wrong = 0;

function pickRandomQuestion() {
  let index;
  do {
    index = Math.floor(Math.random() * allQuestions.length);
  } while (usedIndexes.includes(index));

  usedIndexes.push(index);
  return allQuestions[index];
}

function loadQuestion() {
  if (questionCount >= 5) {
    return showResult();
  }

  time = 5;
  document.getElementById("timer").innerText = time;

  const current = pickRandomQuestion();
  document.getElementById("questionBox").innerText = current.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = () => {
      clearInterval(timer);
      if (opt === current.answer) {
        correct++;
      } else {
        wrong++;
      }
      nextQuestion();
    };
    optionsContainer.appendChild(btn);
  });

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;
    if (time === 0) {
      wrong++; // user missed question
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);
  questionCount++;
  loadQuestion();
}

function showResult() {
  clearInterval(timer);
  document.getElementById("questionBox").innerHTML = `
    <h3>Quiz Completed ✅</h3>
    <p>🟢 Correct: ${correct}</p>
    <p>🔴 Wrong: ${wrong}</p>
    <p>📊 Score: ${correct}/5</p>
  `;
  document.getElementById("options").innerHTML = "";
  document.querySelector(".bottom").style.display = "none";
}

window.onload = () => {
  loadQuestion();
};
