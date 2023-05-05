const svgFilters = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
['width', 'height'].forEach(attr => svgFilters.setAttribute(attr, '0'));
svgFilters.innerHTML = `<defs>
<filter id="dist">
  <feTurbulence id="feturb" type="turbulence" baseFrequency="0.01" numOctaves="2" result="turbulence"/>
  <feDisplacementMap in2="turbulence" in="SourceGraphic"
    scale="50" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="dist-0">
  <feTurbulence id="turbulence" baseFrequency="0.05" numOctaves="3" result="noise" seed="5"/>
  <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="R"/>
</filter>
<filter id="dist-1">
  <feTurbulence id="turbulence" baseFrequency="0.08" numOctaves="2" result="noise" seed="1"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"xChannelSelector="R" yChannelSelector="R" />
</filter>

<filter id="dist-2">
  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="8"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="R"/>
</filter>
<filter id="dist-3">
  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="R"/>
</filter>

<filter id="dist-4">
  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="5" result="noise" seed="90"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="-16" xChannelSelector="R" yChannelSelector="R"/>
</filter>
<filter id="dist-5">
  <feTurbulence id="turbulence" baseFrequency="0.001" numOctaves="2" result="noise" seed="5"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="-16" xChannelSelector="B" yChannelSelector="B"/>
</filter>
<filter id="dist-6">
  <feTurbulence id="turbulence" baseFrequency="0.0002" numOctaves="8" result="noise" seed="15"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="B" yChannelSelector="B"/>
</filter>
<filter id="dist-7">
  <feTurbulence id="turbulence" baseFrequency="0.002" numOctaves="25" result="noise" seed="40"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="-12" xChannelSelector="B" yChannelSelector="B"/>
</filter>
</defs>`
document.body.appendChild(svgFilters);

const mytext =  "Increased vigilance due to an anomaly on site. The information we are receiving seems to coincide with the Anmon principle schema. TN-SP 11 quartz clock must be reset before any switching transport. Abnormal activity detected from the E4-Dune sector shoreline, time group 453, possibly Danse Macabre. Access for analysis team and network re-opening for encryption instructions. Radio control reinforcement and implementation of collective identifier Orch-I/Orch-II for subordinate stations No. 1 to 10. Interception index and verification of the vulnerability of cyber transmission equipment via quad-spectrum control. Objective: monitoring activities in the air and at sea until next ascending moon to prevent any further breach of ZERTC. Absolute jamming imperative. 5S-3P here, 4N radio control, over.";
const typewriter = document.getElementsByClassName('typewriter')[0].querySelector('span');
const time = document.getElementById('time');
const date = document.getElementById('date');
const footer = document.querySelector('footer');
const artworkContainer = document.getElementById('artworkContainer');
const images = artworkContainer.querySelectorAll('img');
const header1 = document.getElementById('header1');
const header2 = document.getElementById('header2');

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
