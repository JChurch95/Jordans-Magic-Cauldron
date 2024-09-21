document.addEventListener('DOMContentLoaded', function() {
    var content = document.querySelector('.content');
    var cauldronSound = document.getElementById('cauldronSound');
    var questionForm = document.getElementById('questionForm');
    var bgVideo = document.getElementById('bgVideo');
    var submitButton = document.getElementById('submitButton');
    var questionPage = document.getElementById('questionPage');
    var responsePage = document.getElementById('responsePage');
    var responseText = document.getElementById('responseText');
    var returnButton = document.getElementById('returnButton');

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

    function getRandomResponse() {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function switchPage(fromPage, toPage) {
        fromPage.classList.remove('active');
        toPage.classList.add('active');
    }

    questionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        
        content.classList.add('rumbling');
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
        
        // Start playing the looping cauldron sound
        cauldronSound.currentTime = 0; // Reset the audio to the beginning
        var audioPromise = cauldronSound.play();
        
        if (audioPromise !== undefined) {
            audioPromise.then(_ => {
                // Audio playback started successfully
            })
            .catch(error => {
                console.log("Audio play failed:", error);
            });
        }
        
        // Stop animation, hide video, and stop sound after 3 seconds
        setTimeout(function() {
            content.classList.remove('rumbling');
            bgVideo.style.display = 'none';
            bgVideo.pause();
            cauldronSound.pause(); // Stop the looping sound
            submitButton.disabled = false; // Re-enable the button
            responseText.textContent = getRandomResponse(); // Set response text
            switchPage(questionPage, responsePage);
        }, 10150); // 10.15 seconds duration
    });

    returnButton.addEventListener('click', function() {
        switchPage(responsePage, questionPage);
    });
});