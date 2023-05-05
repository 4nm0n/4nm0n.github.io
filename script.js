const mytext =  "Increased vigilance due to an anomaly on site. The information we are receiving seems to coincide with the Anmon principle schema. TN-SP 11 quartz clock must be reset before any switching transport. Abnormal activity detected from the E4-Dune sector shoreline, time group 453, possibly Danse Macabre. Access for analysis team and network re-opening for encryption instructions. Radio control reinforcement and implementation of collective identifier Orch-I/Orch-II for subordinate stations No. 1 to 10. Interception index and verification of the vulnerability of cyber transmission equipment via quad-spectrum control. Objective: monitoring activities in the air and at sea until next ascending moon to prevent any further breach of ZERTC. Absolute jamming imperative. 5S-3P here, 4N radio control, over.";
const typewriter = document.getElementsByClassName('typewriter')[0].querySelector('span');
const time = document.getElementById('time');
const date = document.getElementById('date');
const footer = document.querySelector('footer');
const artworkContainer = document.getElementById('artworkContainer');
const images = artworkContainer.querySelectorAll('img');
const header1 = document.getElementById('header1');

const d = new Date();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
time.textContent = `${d.getHours()}:${d.getMinutes()}`;
date.textContent = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;


const typewrite = (() => {
    let timeout;
    let charId = 0;
    let busy = false;
    let el, str, keepCursor;
    const inc = () => {
        if (busy) {
            return;
        }
        busy = true;
        timeout = setTimeout(() => {
            el.textContent = str.slice(0, charId)
            charId += 1;
            if (charId > str.length) {
                charId = 0;
                clearTimeout(timeout);
                busy = false;
                !keepCursor && el.classList.add('noCursor');
                return;
            }
            busy = false;
            inc();
            
        }, Math.min(Math.max(Math.exp(Math.random() * 5 + 1), 2), 270)) // stutter
    }
    return (_el, _str, _keepCursor = false) => {
        if (busy) {
            charId = 0;
            clearTimeout(timeout);
            busy = false;
        }
        str = _str;
        el = _el;
        keepCursor = _keepCursor;
        !keepCursor && el.classList.remove('noCursor');
        inc();
    }
})()

setTimeout(() => {
    typewrite(typewriter, mytext, true);
}, 3000);

const changeImage = (() => {
    let i = 1;
    return () => {
        images[i-1]?.classList.add('hidden');
        images[i]?.classList.remove('hidden');
        if (i === 0) images[images.length-1]?.classList.add('hidden');
        i++;
        if (i === images.length) i = 0;
    }
})();

setInterval(() => {
    changeImage();
}, 6000)

footer.textContent = `${d.getFullYear()} © Anmon. All rights reserved`;

document.onmousemove = e => {
    window.requestAnimationFrame(() => {
        // header1.style.transform = `translateX(${(window.innerWidth / 2 - e.clientX) / 24}px)`;
        // header2.style.transform = `translateX(${-(window.innerWidth / 2 - e.clientX) / 56}px)`;
        header1.style.transform = `translate3d(${(window.innerWidth / 2 - e.clientX) / 24}px, ${(window.innerHeight / 2 - e.clientY) / 24}px, 0px)`;
        header2.style.transform = `translate3d(${-(window.innerWidth / 2 - e.clientX) / 56}px, ${-(window.innerHeight / 2 - e.clientY) / 24}px, 0px)`;
    });
}