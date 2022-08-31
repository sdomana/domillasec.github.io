var balance = 0;
var GPUs = 0;
var GPUPrice = 100;
var EPS = 0;
var loaded = 0;
var GPUBTN = document.getElementsByClassName('flat')[1]
var EPCBTN = document.getElementsByClassName('flat')[2]
var v1 = 0
var clickPrice = 10000;
var EPC = 1;

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

function nWC(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var intervalId = window.setInterval(function () {
  if (loaded == 0) {
    load()
    loaded += 1
  }
  save()
  balance += EPS/100
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
}

function load() {
  if (getCookie('Balance') && getCookie('GPUs')) {
    document.getElementsByClassName('flat')[0].style.borderColor = '#00ff00'
    document.getElementsByClassName('flat')[0].innerText = "Mine"
    document.getElementsByClassName('flat')[1].innerText = `${nWC(GPUPrice)} - Buy GPU`
    console.log('Progress Loaded')
    balance = parseInt(getCookie('Balance'))
    GPUs = parseInt(getCookie('GPUs'))
    EPS = parseInt(getCookie('EPS'))
    GPUPrice = parseInt(getCookie('GPUPrice'))
    EPC = parseInt(getCookie('EPC'))
    clickPrice = parseInt(getCookie('clickPrice'))
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

document.addEventListener('load', (e) => {
  console.log('EL Loaded')
})

function verifyReset() {
  if (v1 == 0) {
    let btn = document.getElementById('rsetBtn')
    btn.innerText = "You sure?"
    btn.style.color = "#ff0000"
    btn.style.borderColor = "#ff0000"
    v1 += 1
  } else {
    balance = 0;
    GPUs = 0;
    GPUPrice = 100;
    EPS = 0;
    v1 = 0;
    clickPrice = 100000;
    EPC = 1;
    save()
    location.reload();
  }
}

function updateM() {
  document.getElementById('mHead').innerText = "Money: $" + nWC(Math.round(balance));
  document.getElementById('sHead').innerText = "GPUs: " + GPUs;
  document.getElementById('sHeadI').innerText = "M/s: $" + nWC(Math.round(EPS));
  document.getElementById('sHeadII').innerText = "M/c: $" + nWC(Math.round(EPC));
  document.getElementsByClassName('flat')[0].innerText = `Mine\n+$${nWC(EPC)}`
  document.getElementsByClassName('flat')[1].innerText = `Buy GPU\n-$${nWC(GPUPrice)}`
  document.getElementsByClassName('flat')[2].innerText = `Buy EPC\n-$${nWC(clickPrice)}`
  if (balance < GPUPrice) {
    document.getElementsByClassName('flat')[1].style.borderColor = '#ff0000'
  } else {
    document.getElementsByClassName('flat')[1].style.borderColor = '#00ff00'
  }
  if (balance < clickPrice) {
    document.getElementsByClassName('flat')[2].style.borderColor = '#ff0000'
  } else {
    document.getElementsByClassName('flat')[2].style.borderColor = '#00ff00'
  }

  if (balance > 1000000) {
    document.getElementById('mHead').classList.add('rainbow')
    document.getElementById('mHead').classList.add('rainbow_text_animated')
  }

  save()
}

function addBal() {
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



function buyClick() {
  if (balance < clickPrice) { alert('bad', 'You don\'t have enough money!'); return; }
  
  balance -= clickPrice
  clickPrice += Math.round((clickPrice * 2))
  if (EPC == 1) {
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
  if (EPS == 0) {
    EPS += 10
  }
  EPS += (EPS - Math.floor(Math.random() * EPS / 2))
  GPUs += 1
  updateM()
  alert('good', 'You bought 1 GPU, increasing your M/s!')
}

function alert(x, y) {
  if (x == 'bad') {
    document.body.innerHTML += `<div class="alt ralert visible">${y}</div>`
  } else if (x == 'info') {
    document.body.innerHTML += `<div class="alt ialert visible">${y}</div>`
  } else if (x == 'good') {
    document.body.innerHTML += `<div class="alt galert visible">${y}</div>`
  }

  setTimeout(() => {
    for (let i = 0; i < document.getElementsByClassName('alt').length; i++) {
      document.getElementsByClassName('alt')[i].classList.remove('visible')
      document.getElementsByClassName('alt')[i].classList.add('hidden')
    }
  }, 1000)

}