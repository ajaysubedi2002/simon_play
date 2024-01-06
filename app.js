let gameseq = [];
let userseq = [];
let level = 0;
let colors = ['yellow', 'green', 'red', 'black'];

let game = false;
let h2 = document.querySelector('h2');
let highscore = 100;

document.addEventListener('keypress', function () {
    if (game === false) {
        h2.innerText = 'Game started!';
        game = true;
        levelup();
    }
});

function levelup() {
    level++;
    h2.innerText = `Level ${level}`;
    let ranindex = Math.floor(Math.random() * 4);
    let rancolor = colors[ranindex];
    let ranbtn = document.querySelector(`.${rancolor}`);
    btnflash(ranbtn);
    gameseq.push(rancolor);
    console.log('This is game ' + gameseq);
    console.log('Highscore: ' + highscore);
}

function btnflash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 200);
}

function userflash(btn) {
    btn.classList.add('userflash');
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 100);
}

function press() {
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute('id');
    userseq.push(usercolor);
    gamecheck(userseq.length - 1);
}

let btns = document.querySelectorAll('.btn');
for (btn of btns) {
    btn.addEventListener('click', press);
}

function gamecheck(idx) {
    if (gameseq[idx] === userseq[idx]) {
        if (gameseq.length == userseq.length) {
            levelup();
            userseq = [];
        }
    } else {
        reset();
    }
}

function reset() {
    game = false;
    if (level > highscore) {
        highscore = level;
        h2.innerText = `New highscore: ${highscore}! Press any key to start again.`;
    } else {
        h2.innerText = `Your score: ${level}. Press any key to start again. Highscore: ${highscore}`;
    }
    level = 0;
    gameseq = [];
    userseq = [];
}
