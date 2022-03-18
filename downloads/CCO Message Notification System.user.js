// ==UserScript==
// @name         CCO Message Notification System
// @namespace    here lol
// @version      1.3
// @description  Notifications with user-specified triggers.
// @author       sdoma
// @match        https://cubecollector.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cubecollector.net
// @grant        none
// ==/UserScript==

var triggers = ["sdoma", "dsoma", "soda"] // Set the things that cause pings B)
var colorNotif = "#FFFFFF" // Hex code, default white.
var sound = "https://csgoclicker.net/assets/unbox.mp3" // USE DIRECT .MP3 URL LINKS ONLY!!111!!1

function playSound(url) {
    var a = new Audio(url);
    a.play();
}

var numberofat = 0
socket.on('newmessage', function(data){
    var level = document.querySelector("#navbarusername > span").innerText
    var nameuser = document.querySelector("#navbarusername").innerText.replace(level,"")
    if (triggers.some(trigger => data.m.toLowerCase().includes(trigger))) {
        numberofat = numberofat + 1
        document.getElementById('chatwindowname').innerText = "PUBLIC CHAT - " + numberofat + " MENTIONS"
        playSound(sound)
        setTimeout(function() {
            let message = Array.from(document.querySelectorAll('.chatmessagetext')).pop();
            message.style.color = colorNotif
            message.style.fontWeight = 'bold';
        }, 100);
    }
})