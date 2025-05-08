// Variables to track quiz state
var currentQuestionIndex = 1;
var selectedAnswers = {};
var quizScore = 0;

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
                // Update ARIA properties to improve accessibility
                document.getElementById('home').setAttribute('aria-hidden', 'false');
                document.getElementById('quiz').setAttribute('aria-hidden', 'true');
            }, 10);
        }, 300);
    } else {
        document.getElementById('home').style.display = 'block';
        document.getElementById('home').setAttribute('aria-hidden', 'false');
        document.getElementById('quiz').setAttribute('aria-hidden', 'true');
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
                // Update ARIA properties to improve accessibility
                document.getElementById('home').setAttribute('aria-hidden', 'true');
                document.getElementById('quiz').setAttribute('aria-hidden', 'false');
            }, 10);
        }, 300);
    } else {
        document.getElementById('quiz').style.display = 'block';
        document.getElementById('home').setAttribute('aria-hidden', 'true');
        document.getElementById('quiz').setAttribute('aria-hidden', 'false');
        closeAllModals();
        window.scrollTo(0, 0);
    }
}

// Enhanced Modal functions
// Fixed Modal functions
// Simple Modal functions
function openModal(type) {
    var modal = document.getElementById(type + 'Modal');
    modal.style.display = 'block';
}

function closeModal(type) {
    var modal = document.getElementById(type + 'Modal');
    modal.style.display = 'none';
}

function closeAllModals() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = 'none';
    }
}
    
    // Reset aria-expanded attribute on the button that opened the modal
    var buttons = document.querySelectorAll('.btn-more');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('aria-controls') === type + 'Modal') {
            buttons[i].setAttribute('aria-expanded', 'false');
            buttons[i].focus(); // Return focus to the button that opened the modal
    }
}


function closeAllModals() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = 'none';
        modals[i].setAttribute('aria-hidden', 'true');
        
        // Reset all aria-expanded attributes
        var buttons = document.querySelectorAll('.btn-more');
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].setAttribute('aria-expanded', 'false');
        }
    }
}

// Focus trap for modals (accessibility improvement)
function trapFocus(element) {
    var focusableElements = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) return;

        if (e.shiftKey) { // shift + tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else { // tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}

// Quiz functions
function startQuiz() {
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    resetQuiz();
    
    // Accessibility announcement
    document.getElementById('quiz-questions').setAttribute('aria-hidden', 'false');
    document.getElementById('quiz-start').setAttribute('aria-hidden', 'true');
    document.getElementById('quiz-results').setAttribute('aria-hidden', 'true');
    
    // Focus first question
    document.getElementById('question-1-heading').focus();
}

function selectOption(option) {
    // Clear any previously selected options in the same question
    var questionDiv = option.closest('.question');
    var options = questionDiv.querySelectorAll('.option');
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
        options[i].setAttribute('aria-checked', 'false');
    }
    
    // Select the clicked option
    option.classList.add('selected');
    option.setAttribute('aria-checked', 'true');
    
    // Store the selected answer
    selectedAnswers['q' + currentQuestionIndex] = option.textContent;
    
    // Enable the next/submit button
    if (currentQuestionIndex < 10) {
        document.getElementById('btn-next').disabled = false;
    } else {
        document.getElementById('btn-submit').disabled = false;
    }
}

// Add keyboard support for selecting options
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('option')) {
            e.preventDefault();
            selectOption(e.target);
        }
    }
});

function nextQuestion() {
    if (currentQuestionIndex < 10) {
        // Hide current question
        var currentQuestion = document.querySelector('#q' + currentQuestionIndex);
        currentQuestion.classList.remove('active');
        currentQuestion.setAttribute('aria-hidden', 'true');
        
        // Show next question
        currentQuestionIndex++;
        var nextQuestion = document.querySelector('#q' + currentQuestionIndex);
        nextQuestion.classList.add('active');
        nextQuestion.setAttribute('aria-hidden', 'false');
        
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
        
        // Focus the question heading for screen readers
        document.getElementById('question-' + currentQuestionIndex + '-heading').focus();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 1) {
        // Hide current question
        var currentQuestion = document.querySelector('#q' + currentQuestionIndex);
        currentQuestion.classList.remove('active');
        currentQuestion.setAttribute('aria-hidden', 'true');
        
        // Show previous question
        currentQuestionIndex--;
        var prevQuestion = document.querySelector('#q' + currentQuestionIndex);
        prevQuestion.classList.add('active');
        prevQuestion.setAttribute('aria-hidden', 'false');
        
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
        
        // Focus the question heading for screen readers
        document.getElementById('question-' + currentQuestionIndex + '-heading').focus();
    }
}

function updateProgressBar() {
    var progressPercent = (currentQuestionIndex / 10) * 100;
    var progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressPercent + '%';
    
    // Update ARIA values for accessibility
    var progressContainer = progressBar.parentElement;
    progressContainer.setAttribute('aria-valuenow', progressPercent);
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
    
    // Accessibility updates
    document.getElementById('quiz-questions').setAttribute('aria-hidden', 'true');
    document.getElementById('quiz-results').setAttribute('aria-hidden', 'false');
    
    // Focus the results heading for screen readers
    document.querySelector('#quiz-results h3').focus();
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
        questions[i].setAttribute('aria-hidden', 'true');
        var options = questions[i].querySelectorAll('.option');
        for (var j = 0; j < options.length; j++) {
            options[j].classList.remove('selected');
            options[j].setAttribute('aria-checked', 'false');
        }
    }
    
    // Reset first question to active
    document.querySelector('#q1').classList.add('active');
    document.querySelector('#q1').setAttribute('aria-hidden', 'false');
    
    // Reset buttons
    document.getElementById('btn-prev').disabled = true;
    document.getElementById('btn-next').disabled = true;
    document.getElementById('btn-next').style.display = 'inline-block';
    document.getElementById('btn-submit').style.display = 'none';
    document.getElementById('btn-submit').disabled = true;
    
    // Reset progress bar
    document.getElementById('progress-bar').style.width = '10%';
    document.getElementById('progress-bar').parentElement.setAttribute('aria-valuenow', '10');
    document.getElementById('current-question').textContent = '1';
    
    // Show questions section
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    
    // Accessibility updates
    document.getElementById('quiz-start').setAttribute('aria-hidden', 'true');
    document.getElementById('quiz-questions').setAttribute('aria-hidden', 'false');
    document.getElementById('quiz-results').setAttribute('aria-hidden', 'true');
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
window.addEventListener('load', function() {
    // Initialize sections with proper ARIA attributes
    document.getElementById('home').setAttribute('aria-hidden', 'false');
    document.getElementById('quiz').setAttribute('aria-hidden', 'true');
    
    // Set initial styles for transitions
    document.getElementById('home').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    document.getElementById('quiz').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Call animateOnScroll initially to show elements in viewport
    animateOnScroll();
    
    // Initial navigation based on hash
    handleNavigation();
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        // Find which modal was clicked
        var modals = document.getElementsByClassName('modal');
        for (var i = 0; i < modals.length; i++) {
            if (modals[i] === event.target) {
                // Extract the type from the ID (remove 'Modal' suffix)
                var type = modals[i].id.replace('Modal', '');
                closeModal(type);
                break;
            }
        }
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

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Keyboard accessibility enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for option selection
    var options = document.querySelectorAll('.option');
    for (var i = 0; i < options.length; i++) {
        options[i].setAttribute('tabindex', '0');
        options[i].addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption(this);
            }
        });
    }
    
    // Add keyboard support for buttons
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Enhance skip link functionality
    var skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    }
});

// Add CSS classes for animation on load
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    setTimeout(function() {
        var elements = document.querySelectorAll('.concentration-box, .career-item, .page-title, .cit-logo');
        elements.forEach(function(element, index) {
            // Stagger the animations
            setTimeout(function() {
                element.classList.add('visible');
            }, index * 100);
        });
    }, 300);
});

// Enhance modal transitions
function enhanceModalTransitions() {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        // Add transition styles
        modal.style.transition = 'opacity 0.3s ease';
        
        var content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            content.style.transform = 'translateY(20px)';
            content.style.opacity = '0';
        }
    });
}

// Call function on page load
window.addEventListener('load', enhanceModalTransitions);

// Function to announce quiz progress to screen readers
function announceProgress(currentIndex, total) {
    var announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('class', 'sr-only');
    announcer.textContent = 'Question ' + currentIndex + ' of ' + total;
    document.body.appendChild(announcer);
    
    // Remove after announcement is made
    setTimeout(function() {
        document.body.removeChild(announcer);
    }, 1000);
}

// Enhanced next/prev functions with announcements
function enhancedNextQuestion() {
    nextQuestion();
    announceProgress(currentQuestionIndex, 10);
}

function enhancedPrevQuestion() {
    prevQuestion();
    announceProgress(currentQuestionIndex, 10);
}

// Replace standard functions with enhanced ones for better accessibility
// This should be done after page load
document.addEventListener('DOMContentLoaded', function() {
    var nextButton = document.getElementById('btn-next');
    var prevButton = document.getElementById('btn-prev');
    
    if (nextButton) {
        nextButton.onclick = enhancedNextQuestion;
    }
    
    if (prevButton) {
        prevButton.onclick = enhancedPrevQuestion;
    }
});