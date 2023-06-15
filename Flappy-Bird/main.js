 // Variables
 var bird = document.getElementById('bird');
 var gameContainer = document.getElementById('game-container');
 var scoreElement = document.getElementById('score');
 var score = 0;
 var isGameOver = false;

 // Move the bird up
 function flap() {
     bird.style.top = (bird.offsetTop - 50) + 'px';
 }

 // Move the bird down (gravity effect)
 function applyGravity() {
     bird.style.top = (bird.offsetTop + 3) + 'px';
 }

 // Generate random pipe position
 function generatePipePosition() {
     return Math.floor(Math.random() * 350) + 'px';
 }

 // Create a new pipe
 function createPipe() {
     if (isGameOver) return;

     var pipe = document.createElement('div');
     pipe.classList.add('pipe');
     pipe.style.left = '400px';
     pipe.style.bottom = generatePipePosition();

     gameContainer.appendChild(pipe);

     movePipe(pipe);
 }

 // Move the pipe from right to left
 function movePipe(pipe) {
     var pipeInterval = setInterval(function () {
         if (isGameOver) {
             clearInterval(pipeInterval);
             return;
         }

         var pipeLeft = pipe.offsetLeft;
         if (pipeLeft <= -70) {
             // Pipe is out of the game container
             clearInterval(pipeInterval);
             gameContainer.removeChild(pipe);
         } else {
             pipe.style.left = (pipeLeft - 5) + 'px';

             // Check collision
             checkCollision(pipe);
         }
     }, 20);
 }

 // Check collision between bird and pipe
 function checkCollision(pipe) {
     var birdTop = bird.offsetTop;
     var birdBottom = bird.offsetTop + bird.offsetHeight;
     var birdLeft = bird.offsetLeft;
     var birdRight = bird.offsetLeft + bird.offsetWidth;

     var pipeTop = pipe.offsetHeight;
     var pipeBottom = gameContainer.offsetHeight;
     var pipeLeft = pipe.offsetLeft;
     var pipeRight = pipe.offsetLeft + pipe.offsetWidth;

     if (
         birdBottom >= pipeTop &&
         birdTop <= pipeBottom &&
         birdRight >= pipeLeft &&
         birdLeft <= pipeRight
     ) {
         // Collision occurred
         gameOver();
       } else if (birdTop <= 0 || birdBottom >= gameContainer.offsetHeight) {
         // Bird touches top or bottom boundary
         gameOver();
     } else if (pipeLeft <= birdRight && pipeLeft >= birdLeft) {
         // Bird passes through the pipe
         score++;
         scoreElement.textContent = 'Score: ' + score;
     }
 }

 // Game over logic
 function gameOver() {
     isGameOver = true;
     alert('Game Over! Your score: ' + score);
     location.reload(); // Reload the page to restart the game
 }

 // Event listener to make the bird flap when the spacebar is pressed
 document.addEventListener('keydown', function (event) {
     if (event.code === 'Space') {
         flap();
     }
 });

 // Start creating pipes
 setInterval(createPipe, 3000);
 setInterval(applyGravity, 20);