// check if there's local storage color option
let mainColors = localStorage.getItem("color_option")
// console.log(mainColors)

if (mainColors !== null) {
  // console.log('local storag is not empty you can set it on root now')
  document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"))
  // remove class from all color list item
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    // add active class on element with data-color === local storege item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }

  });

}
// random background option
let backgroundOption = true;

//varible to control the background interval
let backgroundInterval;

// check if ther's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  // console.log("not empty")
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;

  } else {
    backgroundOption = false;
  }
  // console.log(backgroundLocalItem)
  // remove active class from all span
  document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active")
  })
  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {

    document.querySelector(".random-background .no").classList.add("active");
  }
}


// toggel spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

  // toggel class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // tiggel class open main settings box
  document.querySelector(".setting-box").classList.toggle("open")
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li")
// loop on all list items
colorsLi.forEach(li => {
  // click on every list items
  li.addEventListener("click", (e) => {

    // set color on root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handileActive(e);

  })
})

// switch random background option
const randomBackEl = document.querySelectorAll(".random-background span")
// loop on all spans
randomBackEl.forEach(span => {
  // click on every span
  span.addEventListener("click", (e) => {


    handileActive(e);

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true)
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false)
    }

  })
})



// selector landing page element
let LandingPage = document.querySelector(".landing-page");

// get erray of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// change background img url
LandingPage.style.backgroundImage = 'url("img/02.jpg")';

// function to randomize imgs
function randomizeImgs() {

  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background img url
      LandingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';

    }, 5000);

  }

}
randomizeImgs();


// select skills selector
let ourSkills = document.querySelector(".skills")

window.onscroll = function () {

  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight

  // window height
  let windowHeight = this.innerHeight

  // window scrollTop
  let windowScrollTop = this.pageYOffset

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }

}


// creat popup with the image
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    // create overlay element
    let overlay = document.createElement("div")

    // add class to overlay
    overlay.className = 'popup-overlay'

    // appent the overlay to the body
    document.body.appendChild(overlay)

    // create the popup
    let popupBox = document.createElement("div")

    // add class to the popup box
    popupBox.className = 'popup-box'

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3")

      // create text fot heading
      let imgText = document.createTextNode(img.alt)

      // append the text to heading
      imgHeading.appendChild(imgText)

      // append the heading to the popup box
      popupBox.appendChild(imgHeading)

    }

    // create the image
    let popupImage = document.createElement("img")

    // set image source
    popupImage.src = img.src

    // add image to popup box
    popupBox.appendChild(popupImage)

    // append the popup box to body
    document.body.appendChild(popupBox)

    // create the close span
    let closeButton = document.createElement("span")

    // create the close text
    let closeButtonText = document.createTextNode("X")

    // append text to to close button
    closeButton.appendChild(closeButtonText)

    // add class name to the close button
    closeButton.className = 'close-button'

    // add close button to the popup box
    popupBox.appendChild(closeButton)




  })

})
// close button
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // remove the curent popup
    e.target.parentNode.remove()

    // remove overlay
    document.querySelector(".popup-overlay").remove()
  }


})

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets")

// select all links
const allLinks = document.querySelectorAll(".links a")





function scrollToSomewhere(elements) {

  elements.forEach(ele => {

    ele.addEventListener("click", (e) => {
  
      e.preventDefault()
  
      document.querySelector(e.target.dataset.section).scrollIntoView({
  
        behavior: 'smooth' 
  
      })
  
    })
  
  
  })

}

scrollToSomewhere(allBullets)
scrollToSomewhere(allLinks)

// handile active stat
function handileActive(ev) {

      // remove class from all childrens
      ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
      })
      // add active class on self
      ev.target.classList.add("active");

} 

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach( span => {

  span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show') {

      bulletsContainer.style.display = 'block'

    }else {

      bulletsContainer.style.display = 'none'

    }

    handileActive(e)

  });



});

// reset button
document.querySelector(".reset-options").onclick = function () {

  // localStorage.clear();
  localStorage.removeItem("color_option")
  localStorage.removeItem("background_option")
  localStorage.removeItem("bullets_option")

  // reload window
  window.location.reload();
}

// toggel mune
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function (e) {

  e.stopPropagation()

  this.classList.toggle("menu-active")
  tLinks.classList.toggle("open")

}

// click anywhere outeside menu and toggle button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // check if menu is open
    if (tLinks.classList.contains("open")) {

      toggleBtn.classList.toggle("menu-active")

      tLinks.classList.toggle("open")
      
    }

  }

})

// stop propagation
tLinks.onclick = function (e) {
  e.stopPropagation()



}