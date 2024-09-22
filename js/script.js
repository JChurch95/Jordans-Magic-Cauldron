document.addEventListener('DOMContentLoaded', function() {
    var content = document.querySelector('.content');
    var cauldronSound = document.getElementById('cauldronSound');
    var batsFlyingSound = document.getElementById('batsFlyingSound');
    var questionForm = document.getElementById('questionForm');
    var bgVideo = document.getElementById('bgVideo');
    var submitButton = document.getElementById('submitButton');
    var responseText = document.getElementById('responseText');
    var returnButton = document.getElementById('returnButton');
    var cauldronImage = document.getElementById('cauldronImage');
    var questionInput = document.getElementById('questionInput');
    var navButtons = document.querySelectorAll('.nav-button');
    var contactForm = document.getElementById('contactForm');
    var promptText = document.querySelector('h2');

    // Add this new variable to track if it's the first question
    var isFirstQuestion = true;

    // Magic 8 Ball responses
    var responses = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ];

    // Modify the getRandomResponse function
    function getRandomResponse() {
        if (isFirstQuestion) {
            isFirstQuestion = false; // Set to false for subsequent questions
            // Return a "no" answer for the first question
            return responses.find(response => response.toLowerCase().includes("no"));
        }
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function switchPage(toPage) {
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById(toPage).classList.add('active');
        
        // Remove 'active' class from all nav buttons
        navButtons.forEach(button => button.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        document.querySelector(`[data-page="${toPage}"]`).classList.add('active');
    }

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    questionInput.addEventListener('input', function() {
        adjustTextareaHeight(this);
    });

    // Adjust height on window resize
    window.addEventListener('resize', function() {
        adjustTextareaHeight(questionInput);
    });

    // Initial adjustment
    adjustTextareaHeight(questionInput);

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchPage(this.dataset.page);
        });
    });

    questionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        promptText.style.display = 'none'; // Hide the prompt text
        cauldronImage.classList.add('cauldron-rumbling');
        submitButton.disabled = true; // Disable the button during animation

        // Show and play the video
        bgVideo.style.display = 'block';
        bgVideo.currentTime = 0; // Reset video to start
        var playPromise = bgVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Video playback started successfully
            })
            .catch(error => {
                console.log("Video play failed:", error);
            });
        }

        // Start playing both the cauldron and bats flying sounds
        cauldronSound.currentTime = 0; // Reset the cauldron audio to the beginning
        batsFlyingSound.currentTime = 0; // Reset the bats flying sound to the beginning
        var cauldronAudioPromise = cauldronSound.play();
        var batsAudioPromise = batsFlyingSound.play();

        [cauldronAudioPromise, batsAudioPromise].forEach(promise => {
            if (promise !== undefined) {
                promise.then(_ => {
                    // Audio playback started successfully
                })
                .catch(error => {
                    console.log("Audio play failed:", error);
                });
            }
        });

        // Stop animation, hide video, and stop sounds after 10.15 seconds
        setTimeout(function() {
            cauldronImage.classList.remove('cauldron-rumbling');
            bgVideo.style.display = 'none';
            bgVideo.pause();
            cauldronSound.pause(); // Stop the cauldron sound
            batsFlyingSound.pause(); // Stop the bats flying sound
            submitButton.disabled = false; // Re-enable the button
            responseText.textContent = getRandomResponse(); // Set response text
            responseText.style.display = 'block';
            returnButton.style.display = 'block';
            questionForm.style.display = 'none';
        }, 10150); // 10.15 seconds duration
    });

    returnButton.addEventListener('click', function() {
        responseText.style.display = 'none';
        returnButton.style.display = 'none';
        questionForm.style.display = 'block';
        promptText.style.display = 'block'; // Show the prompt text again
        questionInput.value = ''; // Clear the input
        adjustTextareaHeight(questionInput); // Reset the height of the textarea
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        
        // Here you would typically send this data to a server
        console.log('Owl Sent!:', { firstName, lastName, email });
        
        // Clear the form
        contactForm.reset();
        
        // Show a thank you message (you can customize this)
        alert('Thank you for contacting me!');
    });
});