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



// Event listeners
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('load', handleNavigation);

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Scroll animation function
function animateOnScroll() {
    var elements = document.querySelectorAll('.concentration-box, .career-item, .page-title, .cit-logo');
    
    elements.forEach(function(element) {
        // Add the section-transition class
        if (!element.classList.contains('section-transition')) {
            element.classList.add('section-transition');
        }
        
        var position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// Function to enhance openModal with animations
function openModal(type) {
    var modal = document.getElementById(type + 'Modal');
    modal.style.display = 'block';
    
    // Add a slight delay to allow the display change to take effect
    setTimeout(function() {
        modal.classList.add('active');
        modal.querySelector('.modal-content').classList.add('active');
    }, 10);
}

// Updated closeModal function
function closeModal(type) {
    var modal = document.getElementById(type + 'Modal');
    modal.classList.remove('active');
    modal.querySelector('.modal-content').classList.remove('active');
    
    // Add a delay before hiding the modal to allow the transition to complete
    setTimeout(function() {
        modal.style.display = 'none';
    }, 300);
}

// Enhanced navigation
function showHomeSection() {
    // First fade out quiz section if visible
    if (document.getElementById('quiz').style.display !== 'none') {
        var quizSection = document.getElementById('quiz');
        quizSection.style.opacity = '0';
        quizSection.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            quizSection.style.display = 'none';
            
            // Then fade in home section
            var homeSection = document.getElementById('home');
            homeSection.style.display = 'block';
            homeSection.style.opacity = '0';
            
            setTimeout(function() {
                homeSection.style.opacity = '1';
                homeSection.style.transform = 'translateY(0)';
                window.scrollTo(0, 0);
            }, 10);
        }, 300);
    } else {
        document.getElementById('home').style.display = 'block';
        window.scrollTo(0, 0);
    }
}

function showQuizSection() {
    // First fade out home section if visible
    if (document.getElementById('home').style.display !== 'none') {
        var homeSection = document.getElementById('home');
        homeSection.style.opacity = '0';
        homeSection.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            homeSection.style.display = 'none';
            closeAllModals();
            
            // Then fade in quiz section
            var quizSection = document.getElementById('quiz');
            quizSection.style.display = 'block';
            quizSection.style.opacity = '0';
            
            setTimeout(function() {
                quizSection.style.opacity = '1';
                quizSection.style.transform = 'translateY(0)';
                window.scrollTo(0, 0);
            }, 10);
        }, 300);
    } else {
        document.getElementById('quiz').style.display = 'block';
        closeAllModals();
        window.scrollTo(0, 0);
    }
}

// Add event listeners

function showResults() {
    var score = 0;

    // Compare selected answers with correct answers
    for (var key in correctAnswers) {
        if (selectedAnswers[key] === correctAnswers[key]) {
            score++;
        }
    }

    // Display the score
    document.getElementById('final-score').textContent = score + "/10";

    // Show results section
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Recommendation message (optional)
    var recommendation = document.getElementById('recommendation');
    if (score >= 8) {
        recommendation.innerHTML = "<h4>Your Recommended Path:</h4><p>You seem highly aligned with a specific concentration. Explore Software Development, Cybersecurity, Networking, or Data Management based on your answer pattern!</p>";
    } else if (score >= 5) {
        recommendation.innerHTML = "<h4>Your Recommended Path:</h4><p>You're showing interest across multiple areas. We recommend diving deeper into two or three CIT paths.</p>";
    } else {
        recommendation.innerHTML = "<h4>Your Recommended Path:</h4><p>You're exploring a bit of everything — try all four concentrations to find your fit!</p>";
    }
}


window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', function() {
    // Set initial styles for transitions
    document.getElementById('home').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    document.getElementById('quiz').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Call animateOnScroll initially to show elements in viewport
    animateOnScroll();
});