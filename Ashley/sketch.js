  var firebaseConfig = {
    apiKey: "AIzaSyA_5aZHGZ-hTHBjwJMbuyiq3J-qh2zOCv4",
    authDomain: "ashley-circle.firebaseapp.com",
    databaseURL: "https://ashley-circle.firebaseio.com",
    projectId: "ashley-circle",
    storageBucket: "ashley-circle.appspot.com",
    messagingSenderId: "987794467839",
    appId: "1:987794467839:web:347d9a3976407184"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
let database = firebase.database()
let scoreboard = {  }
let ocean = document.getElementById("ocean")
let x
let y
let a 
let b 
let c
let d
let direction_h
let direction_v
let direction_h2
let direction_v2
let score;
let enemy
let level
let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/750
  x = 200
  y = 600
  a = 95
  b = 88
  c = [190, 290, 390,75]
  d = [171, 202, 431,30]
  direction_h = 1
  direction_v = 1
  direction_h2 = [1,1,1,1]
  direction_v2 = [1,1,1,1]
  score = 0
  enemy = 3
  level = 1
  time = 10
}

function draw() {
  if (time > 0) {


  background(219,112,147);
  fill(255,192,203)
  circle(x,y,50*s)
  fill(220,20,60)
  circle(a,b,30*s)
  
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 5
}
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5
}
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 5
}
  if (keyIsDown(UP_ARROW)) {
    y = y - 5
}
a = a + 3*direction_h 
b = b - 4*direction_v
	  
if (touches.length == 0)   {

	controls for main character

}
	else { 
		x = touches[0].x
		y = touches[0].y
}

if ( a > width || a < 0) {
	direction_h = direction_h * -1
}

if ( b > height || b < 0) {
	direction_v = direction_v * -1
}

textSize(30)
text("score: " + score,80,80)
  
textSize(30)
text("time: " + time.toFixed(0),80,110)
  
if (dist( x, y, a, b) < 50*s + 30*s) {
	score = score + 1
}
  
  for (i=0; i<enemy; i=i+1) {
    fill(199,21,133)
    circle(c[i],d[i],50*s)
    if (dist( x, y, c[i], d[i]) < 50*s + 50*s) {
        score = score - 1
    }
    if ( c[i] > width || c[i] < 0) {
        direction_h2[i] = direction_h2[i] * -1
    }

    if ( d[i] > height || d[i] < 0) {
        direction_v2[i] = direction_v2[i] * -1
    }
    c[i] = c[i] + 2*direction_h2[i] 
    d[i] = d[i] - 3*direction_v2[i]
    

  }
  
if (score > 200 && level ==1) {
  enemy = enemy + 1
  level = 2
  c.push.apply(c, [150])
  d.push.apply(d, [250])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
if (score > 400 && level ==2) {
  enemy = enemy + 1
  level = 3
  c.push.apply(c, [50])
  d.push.apply(d, [350])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
if (score > 500 && level ==3) {
  enemy = enemy + 1
  level = 4
  c.push.apply(c, [70])
  d.push.apply(d, [150])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
if (score > 600 && level ==4) {
  enemy = enemy + 1
  level = 5
  c.push.apply(c, [30])
  d.push.apply(d, [650])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
if (score > 670 && level ==5) {
  enemy = enemy + 1
  level = 6
  c.push.apply(c, [5])
  d.push.apply(d, [50])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
if (score > 730 && level ==6) {
  enemy = enemy + 1
  level = 7
  c.push.apply(c, [750])
  d.push.apply(d, [502])
  direction_h2.push.apply(direction_h2, [1])
  direction_v2.push.apply(direction_v2, [1])
}
  
  
  time=time-0.05
  }
  else {
    ocean.innerHTML = "Name? <input id='apple'><button onclick='restart()'>Restart</button>"
    noLoop()
}
    
}

function restart() { 
        let apple = document.getElementById("apple")
		name = apple.value 
	   database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 10
		score = 0
		loop()
		ocean.innerHTML = ""
        generate_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)

  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
