// ============================================================
//  PORTFOLIO SCRIPT — simple & readable
//  No fancy libraries. Just plain JavaScript.
// ============================================================


// ── INTRO SCREEN ─────────────────────────────────────────────
// Wait for the page to fully load, then set up the intro click

document.addEventListener('DOMContentLoaded', function () {

    var intro = document.getElementById('intro-screen');

    // When user clicks anywhere on the intro screen…
    intro.addEventListener('click', function () {

        // Fade the intro out
        intro.style.transition = 'opacity 0.7s';
        intro.style.opacity = '0';

        // After the fade finishes, hide intro and show the main site
        setTimeout(function () {
            intro.classList.add('hidden');
            var lobby = document.getElementById('main-lobby');
            lobby.classList.remove('hidden');

            attachHoverSounds(); // Enable hover beeps
            startMusic();        // Start background music
        }, 700);

    }, { once: true }); // only fire this listener once

});


// ── BACKGROUND MUSIC ─────────────────────────────────────────
// Play the music with a slow volume fade-in

var musicPlaying = false;

function startMusic() {
    if (musicPlaying) return; // don't start twice

    var music = document.getElementById('bg-music');
    music.volume = 0;   // start silent
    music.play();       // browser allows this because user just clicked
    musicPlaying = true;

    // Slowly raise the volume every 150ms until it reaches 0.12
    var vol = 0;
    var fadeIn = setInterval(function () {
        vol = vol + 0.01;
        if (vol >= 0.12) {
            vol = 0.12;
            clearInterval(fadeIn); // stop the interval when max volume reached
        }
        music.volume = vol;
    }, 150);
}


// ── NAVIGATION ───────────────────────────────────────────────
// Show the selected section and hide all others

function showSection(sectionId) {

    // Hide every section
    var allSections = document.querySelectorAll('.view');
    allSections.forEach(function (section) {
        section.classList.add('hidden');
    });

    // Show only the one that was clicked
    document.getElementById(sectionId).classList.remove('hidden');
}


// ── EMERGENCY MEETING POPUP ───────────────────────────────────

function triggerEmergency() {
    document.getElementById('emergency-overlay').classList.remove('hidden');
}

function closeEmergency() {
    document.getElementById('emergency-overlay').classList.add('hidden');
    return false; // stops the <a href="#"> from jumping to top of page
}


// ── HOVER SOUND ON BUTTONS & CARDS ───────────────────────────
// Play a short beep when hovering over buttons or mission cards

function attachHoverSounds() {
    var clickables = document.querySelectorAll('button, .mission-card, .contact-btn');

    clickables.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            playBeep();
        });
    });
}

// Simple beep using the Web Audio API (no sound file needed)
function playBeep() {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);             // start high
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15); // drop low

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
}
