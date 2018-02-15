// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

// Variation Authored by
// Daniel Bowder
// http://github.com/dotbowder

function setup() {
  createCanvas(1920,1080);
  dp = new DoublePendulum();
  background(0);
}

function draw() {
  translate(width/2, height/3)
  dp.update();
  dp.draw();
  frameRate(100);
}
