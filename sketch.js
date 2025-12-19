

let t = 0;

function setup() {
  createCanvas(550, 550);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
}

function draw() {
  background(0, 0, 10);

  translate(width / 2, height / 2);

  let baseRadius = 50;
  let layers = 12;

  for (let l = 0; l < layers; l++) {

    // color cycles slowly
    let hue = (t * 40 + l * 25) % 360;
    stroke(hue, 80, 100, 70);
    strokeWeight(2);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.02) {
      // multi-octave perlin noise
      let n = 0;
      let freq = 1.0;
      let amp = 1.0;

      // fractal noise (FBM)
      for (let o = 0; o < 4; o++) {
        n += noise(
          cos(a) * freq + l * 0.3,
          sin(a) * freq + l * 0.3,
          t * 0.4
        ) * amp;

        freq *= 2.0;
        amp *= 0.5;
      }

      // map noise to radius distortion
      let r = baseRadius + n * 60 + l * 12;

      let x = r * cos(a + l * 0.1 + t * 0.25);
      let y = r * sin(a + l * 0.1 + t * 0.25);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  t += 0.01;
}