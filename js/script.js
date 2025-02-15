// Nav__menu toggle

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLink = document.querySelectorAll('.nav__link')


if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

function linkAction(){
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Progress circle in skills

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".progress").forEach(circle => {
        let percent = circle.getAttribute("data-percent");
        let circumference = 2 * Math.PI * 35; // 2πr
        let offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    });
});

// Skills section dropdown

const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills);
})

// Skills , Education, Experience section 

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

// Project section pop-up

const portfolioItems = document.querySelectorAll('.portfolio__item');
const popups = document.querySelectorAll('.portfolio__popup');
const popupClose = document.querySelectorAll('.popup__close');

portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        popups[index].style.display = 'flex';
    });
});

popupClose.forEach((button, index) => {
    button.addEventListener('click', () => {
        popups[index].style.display = 'none';
    });
});

popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = "none";
    });

    let selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = "block";

    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove("active__link");
    });

    let activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add("active__link");
    }
}

// Dark__mode theme changer

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Show toast in Projects

function startCountdown() {
    let toastElement = document.getElementById("toast");
    let toastMessage = document.getElementById("toastMessage");
    countdown = 59; 
    
    toastElement.style.display = "block";
    
    interval = setInterval(() => {
        toastMessage.innerText = `Please wait ${countdown} sec`;
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            hideToast();
        }
    }, 1000);
}

function hideToast() {
    document.getElementById("toast").style.display = "none";
    clearInterval(interval);
}

// Contact form submission

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    document.getElementById("responseMessage").innerText = "Sending...";
    document.getElementById("responseMessage").style.display = "block";

    let formData = new FormData(this); 

    fetch("https://formsubmit.co/ajax/aniketghosh255@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerText = "Message sent successfully!";
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("contactForm").reset(); // Clear form
    })
    .catch(error => {
        document.getElementById("responseMessage").innerText = "Error sending message. Please try again.";
        document.getElementById("responseMessage").style.display = "block";
    });
});

// Theme color changer

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeColors = document.querySelectorAll(".theme-color");
    const themeSwitcher = document.getElementById("theme-switcher");
    const themeSettingsBtn = document.getElementById("theme-settings-btn");

    function setThemeColor(color) {
        root.style.setProperty("--hue-color", color);
        localStorage.setItem("selected-theme-color", color);
    }

    const savedColor = localStorage.getItem("selected-theme-color");
    if (savedColor) {
        setThemeColor(savedColor);
    }

    themeColors.forEach(colorCircle => {
        colorCircle.addEventListener("click", function() {
            const selectedColor = this.getAttribute("data-color");
            setThemeColor(selectedColor);
        });
    });

    themeSettingsBtn.addEventListener("click", (event) => {
        event.stopPropagation(); 
        themeSwitcher.classList.toggle("switch__on");
    });

    document.addEventListener("click", (event) => {
        if (!themeSwitcher.contains(event.target) && event.target !== themeSettingsBtn) {
            themeSwitcher.classList.remove("switch__on");
        }
    });
});

//Music for background

document.addEventListener("DOMContentLoaded", () => {
    let bgMusic = new Audio("audio/bg__music.mp3"); 
    bgMusic.loop = true; 
    bgMusic.volume = 0.5; 

    function playMusic() {
        bgMusic.play().catch(() => {
            console.log("Autoplay blocked, waiting for user interaction.");
        });
    }

    playMusic(); 

    document.addEventListener("click", () => {
        bgMusic.play();
    });

    bgMusic.addEventListener("pause", () => {
        bgMusic.play();
    });
});
