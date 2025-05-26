function setup() {

  createCanvas(400, 400);

}



function draw() {

  background(220);

}// --- Global Variables ---

let cityFireworks = [];

let countrySparklers = [];

let stars = [];

let cityPeople = [];

let countryPeople = [];



// --- Setup Function ---

function setup() {

  createCanvas(windowWidth, windowHeight); // Or a specific size like 800, 400

  angleMode(DEGREES); // Useful for rotations



  // Initialize stars

  for (let i = 0; i < 200; i++) {

    stars.push({

      x: random(width),

      y: random(height / 2), // Stars mostly in the top half

      size: random(1, 3),

      twinkleOffset: random(100)

    });

  }



  // Initialize city people (abstract dots)

  for (let i = 0; i < 50; i++) {

    cityPeople.push({

      x: random(0, width / 2),

      y: random(height * 0.8, height * 0.95), // Bottom part of city

      color: color(random(200, 255)),

      offset: random(100)

    });

  }



  // Initialize country people (abstract shapes)

  for (let i = 0; i < 30; i++) {

    countryPeople.push({

      x: random(width / 2, width),

      y: random(height * 0.7, height * 0.9), // Bottom part of country

      color: color(random(200, 255)),

      offset: random(100)

    });

  }



  // Set up intervals for new fireworks

  setInterval(launchFirework, 1000); // Every 1 second

}



// --- Draw Function ---

function draw() {

  // Clear background

  background(20, 20, 50); // Dark night sky



  // --- Draw City Side (Left Half) ---

  push();

  rectMode(CORNER);

  // City skyline (abstract buildings)

  fill(30, 30, 80);

  for (let i = 0; i < width / 2; i += 30) {

    let buildingHeight = random(height * 0.4, height * 0.7);

    rect(i, height - buildingHeight, 25, buildingHeight);

    // Building windows (twinkling)

    fill(255, 255, 100, sin(frameCount * 5 + i) * 50 + 150); // Twinkling effect

    for (let j = 0; j < buildingHeight / 20; j++) {

      if (random(1) > 0.7) { // Randomly show windows

        rect(i + 5, height - buildingHeight + 5 + j * 20, 15, 10);

      }

    }

  }



  // City people

  noStroke();

  for (let person of cityPeople) {

    fill(person.color);

    ellipse(person.x, person.y + sin(frameCount * 2 + person.offset) * 2, 5, 5); // Slight sway

  }



  // Fireworks

  for (let i = cityFireworks.length - 1; i >= 0; i--) {

    cityFireworks[i].update();

    cityFireworks[i].display();

    if (cityFireworks[i].isFinished()) {

      cityFireworks.splice(i, 1);

    }

  }

  pop();



  // --- Draw Country Side (Right Half) ---

  push();

  // Country hills

  fill(40, 60, 40);

  beginShape();

  vertex(width / 2, height);

  vertex(width, height);

  vertex(width, height * 0.5);

  for (let i = width / 2; i < width; i += 20) {

    curveVertex(i, height * 0.6 + sin(i * 0.01 + frameCount * 0.5) * 20);

  }

  endShape(CLOSE);



  // Stars

  fill(255, 255, 200, 200);

  for (let star of stars) {

    let alpha = map(sin(frameCount * 0.5 + star.twinkleOffset), -1, 1, 100, 255);

    fill(255, 255, 200, alpha);

    ellipse(star.x, star.y, star.size, star.size);

  }



  // Moon

  fill(200, 200, 150);

  ellipse(width * 0.75, height * 0.15, 80, 80);



  // Bonfire (central light source for countryside)

  let bonfireColor = color(255, 100, 0, map(sin(frameCount * 0.1), -1, 1, 100, 200));

  fill(bonfireColor);

  ellipse(width * 0.75, height * 0.85, 80, 40); // Base of fire

  // Fire flickering

  for (let i = 0; i < 10; i++) {

    fill(255, random(50, 150), 0, random(50, 150));

    ellipse(width * 0.75 + random(-20, 20), height * 0.85 - random(0, 30), random(10, 30), random(10, 30));

  }

  // Smoke/embers

  for (let i = 0; i < 5; i++) {

    fill(100, 100, 100, random(20, 80));

    ellipse(width * 0.75 + random(-10, 10), height * 0.85 - random(30, 60), random(5, 15), random(5, 15));

  }



  // Country people

  noStroke();

  for (let person of countryPeople) {

    fill(person.color);

    ellipse(person.x + sin(frameCount * 1.5 + person.offset) * 5, person.y, 10, 15); // Blob-like person

    // Sparklers (small flickering lights)

    if (random(1) > 0.8) {

      fill(255, 255, 150, random(100, 255));

      ellipse(person.x + random(-5, 5), person.y - 10 + random(-5, 5), 3, 3);

    }

  }

  pop();



  // --- Connecting Element (Middle) ---

  stroke(255, 255, 0, 150); // Shimmering gold line

  strokeWeight(2);

  line(0, height / 2, width, height / 2); // Simple horizontal line

  // Add a subtle glow

  noStroke();

  fill(255, 255, 0, map(sin(frameCount * 0.1), -1, 1, 50, 150));

  rect(0, height / 2 - 5, width, 10);



  // --- "Feliz Ano Novo!" Text ---

  fill(255);

  textAlign(CENTER, CENTER);

  textSize(map(sin(frameCount * 0.15), -1, 1, 40, 50)); // Pulsating size

  text("Feliz Ano Novo!", width / 2, height * 0.1); // At the top center

  textSize(map(sin(frameCount * 0.15 + 20), -1, 1, 20, 25)); // Pulsating size

  text("Conexão Campo e Cidade em Festa!", width / 2, height * 0.15); // Below



}



// --- Firework Class (Example - you'll need to expand this) ---

class Firework {

  constructor() {

    this.hu = random(255); // Hue for color

    this.firework = new Particle(random(width / 2), height, this.hu, true);

    this.exploded = false;

    this.particles = [];

  }



  update() {

    if (!this.exploded) {

      this.firework.update();

      if (this.firework.vel.y >= 0) { // When firework stops rising

        this.exploded = true;

        this.explode();

      }

    }



    for (let i = this.particles.length - 1; i >= 0; i--) {

      this.particles[i].update();

      if (this.particles[i].isFinished()) {

        this.particles.splice(i, 1);

      }

    }

  }



  display() {

    if (!this.exploded) {

      this.firework.display();

    }

    for (let i = 0; i < this.particles.length; i++) {

      this.particles[i].display();

    }

  }



  explode() {

    for (let i = 0; i < 100; i++) {

      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);

      this.particles.push(p);

    }

  }



  isFinished() {

    return this.exploded && this.particles.length === 0;

  }

}



// --- Particle Class (Example - for fireworks) ---

class Particle {

  constructor(x, y, hu, firework) {

    this.pos = createVector(x, y);

    this.firework = firework;

    this.lifespan = 255;

    this.hu = hu;



    if (this.firework) {

      this.vel = createVector(0, random(-12, -8));

    } else {

      this.vel = p5.Vector.random2D();

      this.vel.mult(random(2, 10));

    }

    this.acc = createVector(0, 0);

  }



  applyForce(force) {

    this.acc.add(force);

  }



  update() {

    if (!this.firework) {

      this.vel.mult(0.9); // Air resistance for explosion particles

      this.lifespan -= 4;

    }

    this.vel.add(this.acc);

    this.pos.add(this.vel);

    this.acc.mult(0); // Reset acceleration

  }



  display() {

    colorMode(HSB);

    if (!this.firework) {

      strokeWeight(2);

      stroke(this.hu, 255, 255, this.lifespan);

    } else {

      strokeWeight(4);

      stroke(this.hu, 255, 255);

    }

    point(this.pos.x, this.pos.y);

    colorMode(RGB); // Reset to RGB for other elements

  }



  isFinished() {

    return this.lifespan < 0;

  }

}



// Function to launch a new firework

function launchFirework() {

  if (random(1) > 0.5) { // Control frequency

    cityFireworks.push(new Firework());

  }

}



// Adjust canvas size if window is resized

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}