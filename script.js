// other themes to add ?
// bigger memory?

var library = {
  pokemon: [
    'images/a.png',
    'images/b.png',
    'images/c.png',
    'images/d.png',
    'images/e.png',
    'images/f.png',
    'images/g.png',
    'images/h.png',
    'images/i.png',
    'images/j.png',
    'images/a.png',
    'images/b.png',
    'images/c.png',
    'images/d.png',
    'images/e.png',
    'images/f.png',
    'images/g.png',
    'images/h.png',
    'images/i.png',
    'images/j.png'
  ],
  starwars: [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png'
  ],
  lotr: [
    'images/aa.png',
    'images/bb.png',
    'images/cc.png',
    'images/dd.png',
    'images/ee.png',
    'images/ff.png',
    'images/gg.png',
    'images/hh.png',
    'images/ii.png',
    'images/jj.png',
    'images/aa.png',
    'images/bb.png',
    'images/cc.png',
    'images/dd.png',
    'images/ee.png',
    'images/ff.png',
    'images/gg.png',
    'images/hh.png',
    'images/ii.png',
    'images/jj.png'
  ],
  disney: [
    'images/11.png',
    'images/22.png',
    'images/33.png',
    'images/44.png',
    'images/55.png',
    'images/66.png',
    'images/77.png',
    'images/88.png',
    'images/99.png',
    'images/1010.png',
    'images/11.png',
    'images/22.png',
    'images/33.png',
    'images/44.png',
    'images/55.png',
    'images/66.png',
    'images/77.png',
    'images/88.png',
    'images/99.png',
    'images/1010.png'
  ],
  pixar: [
    'images/c1.png',
    'images/c2.png',
    'images/c3.png',
    'images/c4.png',
    'images/c5.png',
    'images/c6.png',
    'images/c7.png',
    'images/c8.png',
    'images/c9.png',
    'images/c10.png',
    'images/c1.png',
    'images/c2.png',
    'images/c3.png',
    'images/c4.png',
    'images/c5.png',
    'images/c6.png',
    'images/c7.png',
    'images/c8.png',
    'images/c9.png',
    'images/c10.png'
  ],
}

var images = [];
var tempElt1 = "";
var tempElt2 = "";
var click = -1;
var win = 0;
var score = 0;
var time = 0;

var preElt = document.querySelector("#pre");
var themesElt = document.querySelector("#themes");
var boxElts = document.getElementsByClassName("box");
var mainElt = document.querySelector(".main");
var timeElt = document.querySelector("#time");
var scoreElt = document.querySelector("#score");
var postElt = document.querySelector("#post");
var finalElt = document.querySelector("#final");
var againElt = document.querySelector("#again");


// initiate the game with chosen theme
themesElt.addEventListener("click", function (e) {
  if (e.target.classList.contains("themes")) {
    activateTheme(e.target.id);
    preElt.classList.add("hidden");
  }
});


function activateTheme(theme) {
  // insert theme in images array
  for (let i = 0; i < 20; i++) {
    images.push(library[theme][i]);
  }
  // insert images in memory game
  for (let i = 0; i < 20; i++) {
    var rand = Math.floor(Math.random() * (images.length - 1));
    boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
    images.splice(rand, 1);
  }
}


// Handle the play
mainElt.addEventListener("click", gameLogic);

function gameLogic(e) {
  // make sure the box is playable
  if (e.target.classList.contains("play")) {
    e.target.firstChild.classList.remove("hidden");
    // first of two click
    if (click < 1) {
      tempElt1 = e.target;
      // timer
      if (click === -1) {
        timer = setInterval(function () {
          time++;
          timeElt.innerHTML = time;
        }, 1000);
      }
      click = 1;
    }

    // second click
    else if (e.target !== tempElt1) {
      tempElt2 = e.target;

      // different images
      if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
        mainElt.removeEventListener("click", gameLogic);
        setTimeout(function () {
          tempElt1.firstChild.classList.add("hidden");
          tempElt2.firstChild.classList.add("hidden");
          mainElt.addEventListener("click", gameLogic);
        }, 400);
        if (score > 0) {
          score -= 2;
        }
        scoreElt.innerHTML = score;
      }

      // same images
      else {
        score += 10;
        win += 2;
        tempElt1.firstChild.classList.add("outlined");
        tempElt2.firstChild.classList.add("outlined");
        tempElt1.classList.remove("play");
        tempElt2.classList.remove("play");
        scoreElt.innerHTML = score;

        // game won
        if (win === 20) {
          clearInterval(timer);
          finalElt.innerHTML = "You won " + score + " points <br> in " + time + " seconds";
          postElt.classList.remove("hidden");
        }
      }
      click = 0;
    }
  }
}

againElt.addEventListener("click", resetGame);

function resetGame() {
  // reset game
  tempElt1 = "";
  tempElt2 = "";
  click = -1;
  win = 0;
  score = 0;
  time = 0;
  postElt.classList.add("hidden");
  preElt.classList.remove("hidden");
  for (let i = 0; i < 20; i++) {
    boxElts[i].classList.add("play");
    boxElts[i].firstChild.classList.add("hidden");
  }
  timeElt.textContent = time;
  scoreElt.textContent = score;
}

// handle focus of the page
// function checkPageFocus() {
//   if (document.hasFocus()) {
//     preElt.classList.remove("hidden");
//   }
//   else {
//     preElt.classList.add("hidden");
//   }
// }
// var checkPageInterval = setInterval(checkPageFocus, 300);