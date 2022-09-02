var balance = 0;
var GPUs = 0;
var GPUPrice = 100;
var EPS = 0;
var loaded = 0;
var GPUBTN = document.getElementsByClassName('shopflat')[0]
var EPCBTN = document.getElementsByClassName('shopflat')[1]
var v1 = 0
var clickPrice = 10000;
var EPC = 1;
var clicks = 0;
var showAch = 0;
var hasReset = 0;
var goldmines = 0;

var locked = ["Thousandaire", "Millionaire", "Billionaire", "Trillionaire", "GPU Collector", "Autoclicker", "Gold Mine", "New Man"]

var unlocked = []

function intToString(value) {
  var suffixes = ["", "k", "m", "b","t","qd"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nWC(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var intervalId = window.setInterval(function () {
  if (loaded === 0) {
    load()
    loaded += 1
  }
  save()
  balance += EPS / 100
  updateM();
}, 10);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function save() {
  document.cookie = `Balance=${balance};`
  document.cookie = `GPUs=${GPUs};`
  document.cookie = `EPS=${EPS};`
  document.cookie = `GPUPrice=${GPUPrice}`
  document.cookie = `EPC=${EPC}`
  document.cookie = `clickPrice=${clickPrice}`
  document.cookie = `achievements=${JSON.stringify(unlocked)}`
  document.cookie = `lach=${JSON.stringify(locked)}`
  document.cookie = `clicks=${clicks}`
  document.cookie = `goldmines=${goldmines}`
  document.cookie = `hasReset=${hasReset}`
}

function load() {
  if (getCookie('Balance') && getCookie('GPUs')) {
    unlocked = JSON.parse(getCookie('achievements'))
    locked = JSON.parse(getCookie('lach'))
    console.log(getCookie('achievements'))
    document.getElementsByClassName('flat')[0].style.borderColor = '#808080'
    document.getElementsByClassName('flat')[0].innerText = "Mine"
    console.log('Progress Loaded')
    balance = parseInt(getCookie('Balance'))
    GPUs = parseInt(getCookie('GPUs'))
    EPS = parseInt(getCookie('EPS'))
    GPUPrice = parseInt(getCookie('GPUPrice'))
    EPC = parseInt(getCookie('EPC'))
    clickPrice = parseInt(getCookie('clickPrice'))
    clicks = parseInt(getCookie('clicks'))
    goldmines = parseInt(getCookie('goldmines'))
    hasReset = parseInt(getCookie('hasReset'))
    document.getElementById('topbarBal').innerText = "$" + balance
    updateM()
    if (balance >= 100 || GPUs >= 1) {
      GPUBTN.classList.remove('hidden')
      GPUBTN.classList.add('visible')
    }
    if (balance >= 100000 || EPC >= 2) {
      EPCBTN.classList.remove('hidden')
      EPCBTN.classList.add('visible')
    }
  } else {
    save()
  }
}

function verifyReset() {
  if (v1 === 0) {
    let btn = document.getElementById('rsetBtn')
    btn.innerText = "You sure?"
    btn.style.color = "#ff0000"
    btn.style.borderColor = "#ff0000"
    v1 += 1
  } else {
    balance = 0;
    goldmines = 0;
    GPUs = 0;
    GPUPrice = 100;
    EPS = 0;
    v1 = 0;
    clickPrice = 100000;
    clicks = 0;
    EPC = 1;
    unlocked = [];
    hasReset = 1;
    locked = ["Thousandaire", "Millionaire", "Billionaire", "Trillionaire", "GPU Collector", "EPC Collector", "Autoclicker", "Goldmine", "AFK Pro"];
    save()
    location.reload();
  }
}

function showHome() {
  document.getElementsByClassName('header')[0].classList.add('vis')
  document.getElementsByClassName('header')[0].classList.remove('invis')
  document.getElementsByClassName('clickers')[0].classList.add('vis')
  document.getElementsByClassName('clickers')[0].classList.remove('invis')
  document.getElementsByClassName('shopBtns')[0].classList.add('invis')
  document.getElementsByClassName('shopBtns')[0].classList.remove('vis')
  document.getElementsByClassName('shopBtns')[0].classList.remove('vflex')
}

function showShop() {
  document.getElementsByClassName('header')[0].classList.remove('vis')
  document.getElementsByClassName('header')[0].classList.add('invis')
  document.getElementsByClassName('clickers')[0].classList.remove('vis')
  document.getElementsByClassName('clickers')[0].classList.add('invis')
  document.getElementsByClassName('shopBtns')[0].classList.remove('invis')
  document.getElementsByClassName('shopBtns')[0].classList.add('vis')
  document.getElementsByClassName('shopBtns')[0].classList.add('vflex')
}

function showSettings() {
  document.getElementsByClassName('header')[0].classList.remove('vis')
  document.getElementsByClassName('header')[0].classList.add('invis')
  document.getElementsByClassName('clickers')[0].classList.remove('vis')
  document.getElementsByClassName('clickers')[0].classList.add('invis')
  document.getElementsByClassName('shopBtns')[0].classList.remove('vflex')
}

function updateM() {
  document.getElementById('topbarBal').innerText = "$" + nWC(Math.round(parseInt(balance)))
  document.getElementById('mHead').innerText = "Money: $" + nWC(Math.round(balance));
  document.getElementById('sHead').innerText = "GPUs: " + GPUs;
  document.getElementById('sHeadI').innerText = "M/s: $" + nWC(Math.round(EPS));
  document.getElementById('sHeadII').innerText = "M/c: $" + nWC(Math.round(EPC));
  document.getElementsByClassName('flat')[0].innerText = `Mine\n+$${nWC(EPC)}`
  document.getElementsByClassName('shopflat')[0].innerText = `Buy GPU (${GPUs})\n-$${nWC(GPUPrice)}`
  document.getElementsByClassName('shopflat')[1].innerText = `Buy EPC (${EPC})\n-$${nWC(clickPrice)}`
  if (balance < GPUPrice) {
    document.getElementsByClassName('shopflat')[0].style.borderColor = '#808080'
  } else {
    document.getElementsByClassName('shopflat')[0].style.borderColor = '#00ff00'
  }
  if (balance < clickPrice) {
    document.getElementsByClassName('shopflat')[1].style.borderColor = '#808080'
  } else {
    document.getElementsByClassName('shopflat')[1].style.borderColor = '#00ff00'
  }

  if (balance > 1000000) {
    document.getElementById('mHead').classList.add('rainbow')
    document.getElementById('mHead').classList.add('rainbow_text_animated')
  }

  if (balance >= 1000) {
    if (locked.includes('Thousandaire')) {
      let tar = locked.indexOf('Thousandaire')
      locked.splice(tar, 1)
      unlocked.push('Thousandaire')
      alert('info', 'You earned an achievement: Thousandaire!')
      save()
    }
    document.getElementById('thouAch').innerText = "🔓 Thousandaire - Reach $1,000."
  }

  if (balance >= 1000000) {
    if (locked.includes('Millionaire')) {
      let tar = locked.indexOf('Millionaire')
      locked.splice(tar, 1)
      unlocked.push('Millionaire')
      alert('info', 'You earned an achievement: Millionaire!')
      save()
    }
    document.getElementById('millAch').innerText = "🔓 Millionaire - Reach $1,000,000."
  }

  if (balance >= 1000000000) {
    if (locked.includes('Billionaire')) {
      let tar = locked.indexOf('Billionaire')
      locked.splice(tar, 1)
      unlocked.push('Billionaire')
      alert('info', 'You earned an achievement: Billionaire!')
      save()
    }
    document.getElementById('billAch').innerText = "🔓 Billionaire - Reach $1,000,000,000."

  }
  
  if (balance >= 1000000000000) {
    if (locked.includes('Trillionaire')) {
      let tar = locked.indexOf('Trillionaire')
      locked.splice(tar, 1)
      unlocked.push('Trillionaire')
      alert('info', 'You earned an achievement: Trillionaire!')
      save()
    }
    document.getElementById('trillAch').innerText = "🔓 Trillionaire - Reach $1,000,000,000,000."

  }

  if (GPUs >= 10) {
    if (locked.includes('GPU Collector')) {
      let tar = locked.indexOf('GPU Collector')
      locked.splice(tar, 1)
      unlocked.push('GPU Collector')
      alert('info', 'You earned an achievement: GPU Collector!')
      save()
    }
    document.getElementById('GPU Collector').innerText = "🔓 GPU Collector - Buy a total of 10 GPUs."

  }

  if (clicks >= 10000) {
    if (locked.includes('Autoclicker')) {
      let tar = locked.indexOf('Autoclicker')
      locked.splice(tar, 1)
      unlocked.push('Autoclicker')
      alert('info', 'You earned an achievement: Autoclicker!')
      save()
    }
    document.getElementById('Autoclicker').innerText = "🔓 Autoclicker - Click 'Mine' 10,000 times."

  }

  if (EPC >= 100000) {
    if (locked.includes('EPC Pro')) {
      let tar = locked.indexOf('EPC Pro')
      locked.splice(tar, 1)
      unlocked.push('EPC Pro')
      alert('info', 'You earned an achievement: EPC Pro!')
      save()
    }
    document.getElementById('EPC Collector').innerText = "🔓 EPC Collector - Reach $100,000 M/c"

  }

  if (EPS >= 1000000) {
    if (locked.includes('AFK Pro')) {
      let tar = locked.indexOf('AFK Pro')
      locked.splice(tar, 1)
      unlocked.push('AFK Pro')
      alert('info', 'You earned an achievement: AFK Pro!')
      save()
    }
    document.getElementById('AFK Pro').innerText = "🔓 AFK Pro - Reach $1,000,000 M/s"

  }

  if (hasReset >= 1 || unlocked.includes('New Man')) {
    if (locked.includes('New Man')) {
      let tar = locked.indexOf('New Man')
      locked.splice(tar, 1)
      unlocked.push('New Man')
      alert('info', 'You earned an achievement: New Man!')
      save()
    }
    document.getElementById('New Man').innerText = "🔓 New Man - Reset your profile at least once."

  }

  if (goldmines >= 1) {
    if (locked.includes('Gold Mine')) {
      let tar = locked.indexOf('Gold Mine')
      locked.splice(tar, 1)
      unlocked.push('Gold Mine')
      alert('info', 'You earned an achievement: Gold Mine!')
      save()
    }
    document.getElementById('goldAch').innerText = "🔓 Gold Mine - Hit a gold mine! (0.1% chance.)"
  }

  save()
}

function addBal() {
  let chance = randInt(0, 100000)
  if (chance >= 99999) {
    console.log('AAAA GOLDMINE - ' + chance)
    goldmines += 1;
    balance += randInt(1, balance*3)
    updateM()
    save()
  }
  clicks += 1;
  balance += EPC
  updateM()
  if (balance >= 100) {
    GPUBTN.classList.remove('hidden')
    GPUBTN.classList.add('visible')
  }
  if (balance >= 100000) {
    EPCBTN.classList.remove('hidden')
    EPCBTN.classList.add('visible')
  }
}


function showAchs() {
  if (showAch === 0) {
    document.getElementById('achDiv').classList.remove('invis')
    document.getElementById('achDiv').classList.add('vis')
    showAch = 1
  } else {
    document.getElementById('achDiv').classList.remove('vis')
    document.getElementById('achDiv').classList.add('invis')
    showAch = 0
  }
}


function buyClick() {
  if (balance < clickPrice) { alert('bad', 'You don\'t have enough money!'); return; }

  balance -= clickPrice
  clickPrice += Math.round((clickPrice * 2))
  if (EPC === 1) {
    EPC += 500
  }
  EPC += (EPC - Math.floor(Math.random() * EPC / 1.25))
  updateM()
  alert('good', 'You bought 1 EPC, increasing your $ per click!')
}

function buyGPU() {
  if (balance < GPUPrice) { alert('bad', 'You don\'t have enough money!'); return; }

  balance -= GPUPrice
  GPUPrice += Math.round((GPUPrice * 1.5))
  if (EPS === 0) {
    EPS += 10
  }
  EPS += (EPS - Math.floor(Math.random() * EPS / 2))
  GPUs += 1
  updateM()
  alert('good', 'You bought 1 GPU, increasing your M/s!')
}

function alert(x, y) {
  if (x === 'bad') {
    document.body.innerHTML += `<div class="alt ralert visible">${y}</div>`
  } else if (x === 'info') {
    document.body.innerHTML += `<div class="alt ialert visible">${y}</div>`
  } else if (x === 'good') {
    document.body.innerHTML += `<div class="alt galert visible">${y}</div>`
  }

  setTimeout(() => {
    for (let i = 0; i < document.getElementsByClassName('alt').length; i++) {
      document.getElementsByClassName('alt')[i].classList.remove('visible')
      document.getElementsByClassName('alt')[i].classList.add('hidden')
    }
  }, 5000)

}