// Variables to track quiz state
var currentQuestionIndex = 1;
var selectedAnswers = {};
var quizScore = 0;

// Correct answers for the quiz
// Correct answers for the quiz - arranged by concentration
var correctAnswers = {
    'q1': 'Writing code to solve problems',               // Software Development
    'q2': 'Creating applications that people use',        // Software Development
    'q3': 'Building the product or solution',             // Software Development
    'q4': 'Programming languages and user interface design', // Software Development
    'q5': 'Collaborative teams working on creative solutions', // Software Development
    'q6': 'Identifying and fixing security vulnerabilities', // Cybersecurity
    'q7': 'Implementing security measures to protect assets', // Cybersecurity
    'q8': 'Cloud infrastructure and virtualization',      // Networking
    'q9': 'Making complex systems work efficiently together', // Networking
    'q10': 'Using data to drive business strategy and innovation' // Data Management
};

// Navigation between sections
function showHomeSection() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    window.scrollTo(0, 0);
}

function showQuizSection() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    closeAllModals();
    window.scrollTo(0, 0);
}

// Modal functions
function openModal(type) {
    document.getElementById(type + 'Modal').style.display = 'block';
}

function closeModal(type) {
    document.getElementById(type + 'Modal').style.display = 'none';
}

function closeAllModals() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = 'none';
    }
}

// Quiz functions
function startQuiz() {
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    resetQuiz();
}

function selectOption(option) {
    // Clear any previously selected options in the same question
    var questionDiv = option.closest('.question');
    var options = questionDiv.querySelectorAll('.option');
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
    
    // Select the clicked option
    option.classList.add('selected');
    
    // Store the selected answer
    selectedAnswers['q' + currentQuestionIndex] = option.textContent;
    
    // Enable the next/submit button
    if (currentQuestionIndex < 10) {
        document.getElementById('btn-next').disabled = false;
    } else {
        document.getElementById('btn-submit').disabled = false;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < 10) {
        // Hide current question
        document.querySelector('#q' + currentQuestionIndex).classList.remove('active');
        // Show next question
        currentQuestionIndex++;
        document.querySelector('#q' + currentQuestionIndex).classList.add('active');
        // Update progress bar
        updateProgressBar();
        // Update current question number
        document.getElementById('current-question').textContent = currentQuestionIndex;
        // Enable previous button
        document.getElementById('btn-prev').disabled = false;
        // Disable next button until an option is selected
        document.getElementById('btn-next').disabled = !selectedAnswers['q' + currentQuestionIndex];
        
        // Show submit button on last question
        if (currentQuestionIndex === 10) {
            document.getElementById('btn-next').style.display = 'none';
            document.getElementById('btn-submit').style.display = 'inline-block';
            document.getElementById('btn-submit').disabled = !selectedAnswers['q' + currentQuestionIndex];
        }
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 1) {
        // Hide current question
        document.querySelector('#q' + currentQuestionIndex).classList.remove('active');
        // Show previous question
        currentQuestionIndex--;
        document.querySelector('#q' + currentQuestionIndex).classList.add('active');
        // Update progress bar
        updateProgressBar();
        // Update current question number
        document.getElementById('current-question').textContent = currentQuestionIndex;
        // Disable previous button on first question
        document.getElementById('btn-prev').disabled = currentQuestionIndex === 1;
        // Enable next button
        document.getElementById('btn-next').disabled = false;
        document.getElementById('btn-next').style.display = 'inline-block';
        // Hide submit button if not on last question
        if (currentQuestionIndex < 10) {
            document.getElementById('btn-submit').style.display = 'none';
        }
    }
}

function updateProgressBar() {
    var progressPercent = (currentQuestionIndex / 10) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
}

function showResults() {
    // Calculate score
    quizScore = 0;
    for (var i = 1; i <= 10; i++) {
        if (selectedAnswers['q' + i] === correctAnswers['q' + i]) {
            quizScore++;
        }
    }
    
    // Update score display
    document.getElementById('final-score').textContent = quizScore + '/10';
    
    // Update recommendation based on score
    var recommendation = document.getElementById('recommendation').querySelector('p');
    if (quizScore <= 3) {
        recommendation.textContent = 'Based on your responses, we recommend exploring all four concentrations further before making a decision.';
    } else if (quizScore <= 5) {
        recommendation.textContent = 'Consider exploring Software Development and Data Management as potential concentration areas.';
    } else if (quizScore <= 7) {
        recommendation.textContent = 'Your answers suggest you might be interested in Cybersecurity or Networking.';
    } else {
        recommendation.textContent = 'With your strong understanding of CIT, you\'re ready to choose a concentration based on your personal interests!';
    }
    
    // Show results section
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
}

function resetQuiz() {
    // Reset variables
    currentQuestionIndex = 1;
    selectedAnswers = {};
    quizScore = 0;
    
    // Reset all questions
    var questions = document.querySelectorAll('.question');
    for (var i = 0; i < questions.length; i++) {
        questions[i].classList.remove('active');
        var options = questions[i].querySelectorAll('.option');
        for (var j = 0; j < options.length; j++) {
            options[j].classList.remove('selected');
        }
    }
    
    // Reset first question to active
    document.querySelector('#q1').classList.add('active');
    
    // Reset buttons
    document.getElementById('btn-prev').disabled = true;
    document.getElementById('btn-next').disabled = true;
    document.getElementById('btn-next').style.display = 'inline-block';
    document.getElementById('btn-submit').style.display = 'none';
    document.getElementById('btn-submit').disabled = true;
    
    // Reset progress bar
    document.getElementById('progress-bar').style.width = '10%';
    document.getElementById('current-question').textContent = '1';
    
    // Show questions section
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
}

// Handle navigation with hash changes
function handleNavigation() {
    var hash = window.location.hash || '#home';
    if (hash === '#home') {
        showHomeSection();
    } else if (hash === '#quiz') {
        showQuizSection();
    }
}

// Event listeners
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};