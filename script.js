function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

document.addEventListener('DOMContentLoaded', (event) => {

  // Set up canvas
  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  // Set canvas size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Set up snowflakes array
  var snowflakes = [];

  // Snowflake object
  function Snowflake() {
    // Set position, size, and fixed speed and direction
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (randomIntFromInterval(20, 60)/10);
    this.speed = 1;
    this.dir = Math.PI / (randomIntFromInterval(15, 30)/10);  // Move down

    // Draw snowflake
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // Update snowflake position
    this.update = function () {
      this.x += Math.cos(this.dir) * this.speed;
      this.y += Math.sin(this.dir) * this.speed + this.speed;
      if (this.y > canvas.height) {
        this.y = 0;
      }
      if (this.x > canvas.width || this.x < 0) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
      }
    }
  }

  // Create new snowflakes and push to array
  for (var i = 0; i < 100; i++) {
    var snowflake = new Snowflake();
    snowflakes.push(snowflake);
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < snowflakes.length; i++) {
      snowflakes[i].draw();
      snowflakes[i].update();
    }
  }

  // Start animation loop
  animate();

});