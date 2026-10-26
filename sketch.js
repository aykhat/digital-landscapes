let x, y;
let mic;
let brushSize = 25;
let currentColorIndex = 0;
let colorList = [200, 330, 60, 120, 270]; 
let lastButtonPress = { a: false, b: false };

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(10);

  x = width / 2;
  y = height / 2;

  
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  
  background(10, 10, 10, 6);

  
  let vol = mic.getLevel();

  
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  let gp = gamepads[0];

  if (gp) {
    
    let deadzone = 0.15;
    let moveX = Math.abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
    let moveY = Math.abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
    
    x += moveX * 12;
    y += moveY * 12;
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

   
    if (vol > 0.005) {
      brushSize += vol * 25; 
      brushSize = constrain(brushSize, 10, 300); 
    }

    
    if (gp.buttons[0] && gp.buttons[0].pressed) {
      if (!lastButtonPress.a) {
        currentColorIndex = (currentColorIndex + 1) % colorList.length;
        lastButtonPress.a = true;
      }
    } else {
      lastButtonPress.a = false;
    }

    
    if (gp.buttons[1] && gp.buttons[1].pressed) {
      if (!lastButtonPress.b) {
        background(10);
        brushSize = 25;
        currentColorIndex = 0;
        lastButtonPress.b = true;
      }
    } else {
      lastButtonPress.b = false;
    }

    
    if (gp.buttons[2] && gp.buttons[2].pressed) {
      brushSize = constrain(brushSize + 2, 10, 300);
    }

    
    if (gp.buttons[3] && gp.buttons[3].pressed) {
      brushSize = constrain(brushSize - 2, 10, 300);
    }

   
    let activeHue = colorList[currentColorIndex];

    
    fill(activeHue, 80, 100, 25);
    noStroke();
    ellipse(x, y, brushSize * 1.6);

    
    fill(activeHue, 90, 100, 85);
    stroke(255, 60);
    strokeWeight(2);
    ellipse(x, y, brushSize);

  } else {
   
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Press any button on your controller to start!", width / 2, height / 2);
  }
}