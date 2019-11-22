
var canvaswidth=800;
var canvasheight=500;

context = document.querySelector("canvas").getContext("2d");

context.canvas.width = canvaswidth;
context.canvas.height = canvasheight;

//all objects go here
player = {
  height:25,
  jumping:true,
  width:25,
  x:20, 
  x_velocity:0,
  y:300,
  y_velocity:0
};

platform1 = {
  height:5,
  width:400,
  x:400,
  y:450,
};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller.up && player.jumping == false) {

    player.y_velocity -= 20;
    player.jumping = true;

  }

  if (controller.left) {

    player.x_velocity -= 0.5;

  }

  if (controller.right) {

    player.x_velocity += 0.5;

  }

  player.y_velocity += 1;// gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= .9;// friction
  player.y_velocity *= .9;// friction

  // if player is falling below floor line
  if (player.y > canvasheight - 15 - player.height) {

    player.jumping = false;
    player.y = canvasheight - 15 - player.height;
    player.y_velocity = 0;

  }

  // if player is going off the left of the screen
  if (player.x < -player.height) {

    player.x = canvaswidth;

  } else if (player.x > canvaswidth) {// if player goes past right boundary

    player.x = -player.height;

  }

  //background
  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvaswidth, canvasheight);// x, y, width, height

  //player
  context.fillStyle = "#ff0000";
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();

  context.fillStyle = "#00ff00";
  context.beginPath();
  context.rect(platform1.x, platform1.y, platform1.width, platform1.height);
  context.fill();

  //main ground
  context.strokeStyle = "#fff";
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(0, 490);
  context.lineTo(canvaswidth, 490);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
