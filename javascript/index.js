const availableBal = () => {
    let totalCr = 0;
    let totalDr = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].status == 'cr') {
            totalCr += parseFloat(transactions[i].amount);
        } else {
            totalDr += parseFloat(transactions[i].amount);
        }
    }
    const bal = (Math.round((totalCr - totalDr) * 100)) / 100;
    return bal;
}
const balance = document.querySelector('.balance');
balance.innerText = `₹ ${availableBal()}`;

const
    body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    mModeSwitch = body.querySelector(".m-toggle-switch"),
    mModeText = body.querySelector(".m-mode-text")
;


// side bar open close (desktop view)
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

// side bar open close (mobile view)
const
    mSideBar = document.getElementById('mSideBar'),
    sideNavBtn = document.getElementById('sideNavBtn')
;

sideNavBtn.addEventListener('click', () => {
    mSideBar.style.left = mSideBar.style.left === '10px' ? '-235px' : '10px';
});
document.addEventListener('click', (event) => {
    if (!mSideBar.contains(event.target) && !sideNavBtn.contains(event.target)) {
        mSideBar.style.left = '-235px';
    }
});


// pulse light for side bar in mobile view to animate
const 
    colorPickers = document.querySelectorAll('.mSideBarLinkIconBox'),
    mSideBtn = document.querySelectorAll(".mSideBarLink"),
    pulseLight = document.getElementById("pulseLight")
;
pulseLight.style.setProperty('--pulse-color', '#74972E');
pulseLight.style.setProperty('--pulse-top', 32 + 'px');
mSideBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const color = getComputedStyle(colorPickers[index]).backgroundColor;
        pulseLight.style.setProperty('--pulse-color', color);
        pulseLight.style.setProperty('--pulse-top', index * 45 + 32 + 'px');
        pulseLight.style.color = 'var(--pulse-color)';
        pulseLight.style.top = 'var(--pulse-top)';
    });
});

// dark light mode switch (desktop view)
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        modeText.innerHTML = "Light Mode";
    } else {
        modeText.innerHTML = "Dark Mode"
    }
});

// dark light mode switch (mobile view)
mModeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        mModeText.innerHTML = "Light Mode";
    } else {
        mModeText.innerHTML = "Dark Mode"
    }
});

// adding a class active at bottom nav button in mobile view 
const mBotBtn = document.querySelectorAll(".mBotBtn");
mBotBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        mBotBtn.forEach((element) => {
            element.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

// adding a class activeNavLinkA at side bar button in desktop view 
const 
    navLinkA = document.querySelectorAll(".navLinkA"),
    navText = document.querySelectorAll(".nav-text"),
    topCurrentPage = document.getElementById("topCurrentPage")
;
navLinkA.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        navLinkA.forEach((element) => {
            element.classList.remove('activeNavLinkA')
        });
        btn.classList.add("activeNavLinkA");
        topCurrentPage.innerText = `${navText[index].innerText}`;
    });
});

// redirecting to finance page with 4 btn in the middle 
const middleFourBtn = document.querySelectorAll(".subNavBtn");
middleFourBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        middleFourBtn.forEach((element) => {
            element.style.backgroundColor = 'white';
            element.style.color = '#547218';
        });
        btn.style.backgroundColor = '#00776F';
        btn.style.color = 'white';
        const value = btn.getAttribute('value');
        window.location.href=`shortcuts.html?value=${value}`;
    });
});
