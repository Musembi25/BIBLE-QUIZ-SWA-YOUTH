// Game state
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20;
let playerName = '';
let questions = [];

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');

// Questions data
const questionsData = [
    {
        question: "What is the meaning of justification in Christian theology?",
        answers: [
            "Earning salvation through works",
            "Being made righteous by faith in Christ",
            "Becoming perfect through the law",
            "Living without sin"
        ],
        correct: 1,
        reference: "Romans 5:1"
    },
    {
        question: "According to Ephesians 2:8-9, salvation is...",
        answers: [
            "A result of perfect obedience",
            "A reward for good deeds",
            "By grace through faith, not by works",
            "For those who follow the Ten Commandments"
        ],
        correct: 2,
        reference: "Ephesians 2:8-9"
    },
    {
        question: "To be 'born again' means...",
        answers: [
            "Being baptized again",
            "Joining a church",
            "Experiencing a spiritual rebirth through the Holy Spirit",
            "Memorizing the Bible"
        ],
        correct: 2,
        reference: "John 3:3-5"
    },
    {
        question: "Which Old Testament story symbolizes salvation through Christ?",
        answers: [
            "The burning bush",
            "The Ten Plagues",
            "Noah's Ark",
            "David and Goliath"
        ],
        correct: 2,
        reference: "1 Peter 3:20-21"
    },
    {
        question: "Which term means Jesus absorbed God's wrath for sin on our behalf?",
        answers: [
            "Redemption",
            "Propitiation",
            "Regeneration",
            "Reconciliation"
        ],
        correct: 1,
        reference: "1 John 2:2"
    },
    {
        question: "Romans 6:23 says the wages of sin is death, but the gift of God is...",
        answers: [
            "Forgiveness",
            "Peace",
            "Eternal life in Christ",
            "Earthly blessings"
        ],
        correct: 2,
        reference: "Romans 6:23"
    },
    {
        question: "In Matthew 22, why was the man without wedding clothes thrown out?",
        answers: [
            "He came late",
            "He didn't RSVP",
            "He lacked true righteousness",
            "He wasn't invited"
        ],
        correct: 2,
        reference: "Matthew 22:11-13"
    },
    {
        question: "According to Titus 3:5, how are we saved?",
        answers: [
            "By doing good deeds",
            "Through fasting and prayer",
            "By mercy and renewal of the Holy Spirit",
            "By obeying religious rituals"
        ],
        correct: 2,
        reference: "Titus 3:5"
    },
    {
        question: "What happens if we continue sinning after knowing the truth (Hebrews 10:26)?",
        answers: [
            "Angels will warn us",
            "We are forgiven anyway",
            "No sacrifice for sins is left",
            "We'll be punished with sickness"
        ],
        correct: 2,
        reference: "Hebrews 10:26"
    },
    {
        question: "When Jesus said 'It is finished,' what did He mean?",
        answers: [
            "His suffering was unbearable",
            "The work of redemption was complete",
            "The Romans had won",
            "His mission failed"
        ],
        correct: 1,
        reference: "John 19:30"
    },
    {
        question: "What does the term 'sanctification' mean in salvation?",
        answers: [
            "Being perfect immediately",
            "The process of becoming more like Christ",
            "Never making mistakes",
            "Living without temptation"
        ],
        correct: 1,
        reference: "1 Thessalonians 4:3"
    },
    {
        question: "According to John 3:16, why did God send His Son?",
        answers: [
            "To judge the world",
            "To establish a new religion",
            "To condemn sinners",
            "To save those who believe in Him"
        ],
        correct: 3,
        reference: "John 3:16"
    },
    {
        question: "What is the role of the Holy Spirit in salvation?",
        answers: [
            "Only to perform miracles",
            "To convict of sin and guide to truth",
            "To replace Jesus' work",
            "To make us perfect instantly"
        ],
        correct: 1,
        reference: "John 16:8-13"
    },
    {
        question: "What does 'repentance' mean in the context of salvation?",
        answers: [
            "Feeling sorry for sins",
            "Turning away from sin and toward God",
            "Making up for past mistakes",
            "Joining a church"
        ],
        correct: 1,
        reference: "Acts 3:19"
    },
    {
        question: "What is the significance of Jesus' resurrection for salvation?",
        answers: [
            "It's just a historical event",
            "It proves our salvation and gives us hope",
            "It's only important for Easter",
            "It doesn't affect our salvation"
        ],
        correct: 1,
        reference: "1 Corinthians 15:17"
    }
];

// Sound effects
const sounds = {
    correct: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'),
    wrong: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
    timer: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-clock-tick-1045.mp3'),
    complete: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3')
};

// Initialize the game
function initGame() {
    // Shuffle questions
    questions = [...questionsData].sort(() => Math.random() - 0.5);
    
    // Event listeners
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('play-again').addEventListener('click', resetGame);
    document.getElementById('share-score').addEventListener('click', shareScore);
    document.getElementById('back-to-home').addEventListener('click', showWelcomeScreen);
}

// Start the game
function startGame() {
    playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert('Please enter your name to begin!');
        return;
    }

    // Create and show welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <h3>Welcome, ${playerName}! 👋</h3>
        <p>We're excited to have you join us on this journey of faith!</p>
        <p>Get ready to test your knowledge about God's amazing gift of salvation.</p>
        <div class="welcome-verse">
            <p>"For by grace you have been saved through faith, and that not of yourselves; it is the gift of God."</p>
            <p class="verse-ref">- Ephesians 2:8</p>
        </div>
    `;

    // Add welcome message to the container
    const container = document.querySelector('#welcome-screen .container');
    container.appendChild(welcomeMessage);

    // Add animation class after a small delay
    setTimeout(() => {
        welcomeMessage.classList.add('show');
    }, 100);

    // Show instructions after a delay
    setTimeout(() => {
        welcomeMessage.classList.remove('show');
        setTimeout(() => {
            welcomeMessage.remove();
            showScreen(instructionsScreen);
        }, 500);
    }, 3000);
}

// Start the quiz
function startQuiz() {
    showScreen(quizScreen);
    loadQuestion();
    startTimer();
}

// Load question
function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    
    // Update progress bar
    const progress = ((currentQuestion) / questions.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-option');
    
    // Disable all buttons
    buttons.forEach(button => button.disabled = true);
    
    // Show correct/wrong
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        score += 10;
        sounds.correct.play();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        sounds.wrong.play();
    }
    
    // Show next button
    document.getElementById('next-question').style.display = 'block';
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    
    // Stop timer
    clearInterval(timer);
}

// Next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        timeLeft = 20;
        document.querySelector('.timer').textContent = timeLeft;
        loadQuestion();
        startTimer();
        document.getElementById('next-question').style.display = 'none';
    } else {
        endGame();
    }
}

// Timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    document.querySelector('.timer').textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('.timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(-1); // Time's up
        }
    }, 1000);
}

// End game
function endGame() {
    showScreen(scoreScreen);
    document.getElementById('final-score').textContent = score;
    
    // Set score message
    let message = '';
    if (score >= 90) {
        message = "Bible Master! You really know your salvation! 👑";
    } else if (score >= 70) {
        message = "Well done! You're learning fast! 🔥";
    } else {
        message = "Keep digging into God's Word! 💪";
    }
    document.getElementById('score-message').textContent = message;
    
    // Show verse of the day
    const randomVerse = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('verse-text').textContent = randomVerse.question;
    document.getElementById('verse-reference').textContent = randomVerse.reference;
    
    // Save score to leaderboard
    saveScore();
    
    // Play completion sound
    sounds.complete.play();
}

// Save score
function saveScore() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({
        name: playerName,
        score: score,
        date: new Date().toLocaleDateString()
    });
    
    // Sort by score (highest first) and keep only top 10
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 10) {
        leaderboard.length = 10;
    }
    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
}

// Update leaderboard display
function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <span class="rank">#${index + 1}</span>
            <span class="name">${entry.name}</span>
            <span class="score">${entry.score} points</span>
            <span class="date">${entry.date}</span>
        `;
        leaderboardList.appendChild(item);
    });
}

// Share score
function shareScore() {
    const text = `I scored ${score} points on the Salvation Bible Quiz! Try it now!`;
    if (navigator.share) {
        navigator.share({
            title: 'Salvation Bible Quiz Score',
            text: text
        });
    } else {
        navigator.clipboard.writeText(text);
        alert('Score copied to clipboard!');
    }
}

// Reset game
function resetGame() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 20;
    showScreen(welcomeScreen);
}

// Show screen
function showScreen(screen) {
    [welcomeScreen, instructionsScreen, quizScreen, scoreScreen, leaderboardScreen].forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

// Show welcome screen
function showWelcomeScreen() {
    showScreen(welcomeScreen);
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    updateLeaderboard();
}); 