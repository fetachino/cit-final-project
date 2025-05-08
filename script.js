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
    // Reset concentration scores
    var concentrationScores = {
        'software': 0,
        'cybersecurity': 0,
        'networking': 0,
        'data': 0
    };
    
    // Map options to concentrations
    var optionConcentrations = {
        'Writing code to solve problems': 'software',
        'Testing systems for security vulnerabilities': 'cybersecurity',
        'Designing and maintaining network infrastructure': 'networking',
        'Analyzing data to find meaningful patterns': 'data',
        
        'Creating applications that people use': 'software',
        'Protecting sensitive information from threats': 'cybersecurity',
        'How computers communicate with each other': 'networking',
        'Converting raw data into useful insights': 'data',
        
        'Building the product or solution': 'software',
        'Identifying risks and ensuring compliance': 'cybersecurity',
        'Setting up the technical infrastructure': 'networking',
        'Gathering and interpreting information': 'data',
        
        'Programming languages and user interface design': 'software',
        'Security protocols and threat assessment': 'cybersecurity',
        'Network configuration and system administration': 'networking',
        'Database design and statistical analysis': 'data',
        
        'Collaborative teams working on creative solutions': 'software',
        'High-security settings with clear protocols': 'cybersecurity',
        'Technical environments with specialized equipment': 'networking',
        'Research-oriented with emphasis on analytics': 'data',
        
        'Designing an app with an intuitive user experience': 'software',
        'Identifying and fixing security vulnerabilities': 'cybersecurity',
        'Troubleshooting connectivity issues in a complex network': 'networking',
        'Creating visualizations that explain complex datasets': 'data',
        
        'Building software tools that automate processes': 'software',
        'Implementing security measures to protect assets': 'cybersecurity',
        'Upgrading infrastructure for better performance': 'networking',
        'Using data analysis to inform decision making': 'data',
        
        'Mobile and web application frameworks': 'software',
        'Encryption and authentication systems': 'cybersecurity',
        'Cloud infrastructure and virtualization': 'networking',
        'Big data platforms and analytics tools': 'data',
        
        'Creating elegant solutions to user needs': 'software',
        'Finding and addressing potential threats': 'cybersecurity',
        'Making complex systems work efficiently together': 'networking',
        'Extracting meaningful insights from information': 'data',
        
        'Creating software that millions of people use': 'software',
        'Protecting organizations from cyber attacks': 'cybersecurity',
        'Building and maintaining critical infrastructure': 'networking',
        'Using data to drive business strategy and innovation': 'data'
    };
    
    // Calculate concentration scores
    for (var i = 1; i <= 10; i++) {
        if (selectedAnswers['q' + i]) {
            var concentration = optionConcentrations[selectedAnswers['q' + i]];
            if (concentration) {
                concentrationScores[concentration]++;
            }
        }
    }
    
    // Find highest scoring concentration(s)
    var maxScore = 0;
    var topConcentrations = [];
    
    for (var concentration in concentrationScores) {
        if (concentrationScores[concentration] > maxScore) {
            maxScore = concentrationScores[concentration];
            topConcentrations = [concentration];
        } else if (concentrationScores[concentration] === maxScore) {
            topConcentrations.push(concentration);
        }
    }
    
    // Prepare recommendation text
    var recommendationText = '';
    if (topConcentrations.length === 1) {
        // Single top concentration
        switch(topConcentrations[0]) {
            case 'software':
                recommendationText = 'Based on your preferences, you might be well-suited for Software Development. You seem to enjoy creating applications and solving problems through code.';
                break;
            case 'cybersecurity':
                recommendationText = 'Based on your preferences, you might be well-suited for Cybersecurity. You appear to value protecting systems and identifying potential threats.';
                break;
            case 'networking':
                recommendationText = 'Based on your preferences, you might be well-suited for Networking. You seem interested in infrastructure and how systems communicate.';
                break;
            case 'data':
                recommendationText = 'Based on your preferences, you might be well-suited for Data Management. You appear to enjoy analyzing information and deriving insights from data.';
                break;
        }
    } else {
        // Multiple top concentrations (tie)
        var concentrationNames = topConcentrations.map(function(concentration) {
            switch(concentration) {
                case 'software': return 'Software Development';
                case 'cybersecurity': return 'Cybersecurity';
                case 'networking': return 'Networking';
                case 'data': return 'Data Management';
            }
        });
        
        recommendationText = 'Based on your preferences, you might be well-suited for multiple areas: ' + 
            concentrationNames.join(' and ') + '. Consider exploring these concentrations further to find your best fit.';
    }
    
    // Display recommendation
    var recommendation = document.getElementById('recommendation').querySelector('p');
    recommendation.textContent = recommendationText;
    
    // Format the string for display
    var displayString = '';
    for (var concentration in concentrationScores) {
        var displayName = '';
        switch(concentration) {
            case 'software': displayName = 'Software Development'; break;
            case 'cybersecurity': displayName = 'Cybersecurity'; break;
            case 'networking': displayName = 'Networking'; break;
            case 'data': displayName = 'Data Management'; break;
        }
        displayString += displayName + ': ' + concentrationScores[concentration] + '<br>';
    }
    
    // Update score display
    document.getElementById('final-score').innerHTML = displayString;
    
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