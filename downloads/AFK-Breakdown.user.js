// ==UserScript==
// @name         AFK-Breakdown
// @namespace    here lol
// @version      1
// @description  Breaks down cubes automatically after ~1hr of afk
// @author       sdoma
// @match        https://cubecollector.net/*
// @icon         https://preview.redd.it/fbi3gpdb7hk81.jpg?width=640&crop=smart&auto=webp&s=df8acb188410eca7fff6294cd238f179e03cd852
// @grant        none
// ==/UserScript==


var timetowait = 3600000 // 1 hour in MS


const delay = ms => new Promise(res => setTimeout(res, ms));

const crushydacoobs = async () => {
        await delay(10000);
        document.getElementById('playgamebutton').click();
        await delay(250);
        document.getElementsByClassName('invpagesortselectionitem')[12].click();
        await delay(250);
        document.getElementsByClassName('invpagesortselectionitem')[11].click();
        await delay(timetowait);
        location.reload();
}


crushydacoobs();