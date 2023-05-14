function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight

  function markup(remove) {
    wrapperMarkup(remove)
    dotMarkup(remove)
    arrowMarkup(remove)
  }

  //this chunk of code removes the markup from the arrow, dots, and wrapper

  function removeElement(elment) {
    elment.parentNode.removeChild(elment)
  }

  function createDiv(className) {
    let div = document.createElement("div")
    let classNames = className.split(" ")
    classNames.forEach((name) => div.classList.add(name))
    return div
    //this code block is creating a new div using a loop, splits the className parameter, saves the array [dots, arrows, navigation wrapper] and saves it into classNames (plural).
  }





  function arrowMarkup(remove) {

    if (remove) {

      removeElement(arrowLeft)
      removeElement(arrowRight)
      return

    }
    arrowLeft = createDiv("arrow arrow--left")
    arrowLeft.addEventListener("click", () => slider.prev())
    arrowRight = createDiv("arrow arrow--right")
    arrowRight.addEventListener("click", () => slider.next())
    wrapper.appendChild(arrowLeft)
    wrapper.appendChild(arrowRight)

  }

  //creating a div for the arrows prev and next 
  //adding an event listener for both on the left and right arrow on click for previous and next if the removeElement from above is not true . 

  function wrapperMarkup(remove) {
    if (remove) {
      let parent = wrapper.parentNode
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper)
      removeElement(wrapper)
      return
    }
    wrapper = createDiv("navigation-wrapper")
    slider.container.parentNode.appendChild(wrapper)
    wrapper.appendChild(slider.container)
  }

  //creating a div called navigation-wrapper, 


  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots)
      return

    }
    dots = createDiv("dots")
    slider.track.details.slides.forEach((_e, idx) => {
      let dot = createDiv("dot")
      dot.addEventListener("click", () => slider.moveToIdx(idx))
      dots.appendChild(dot)

    })
    wrapper.appendChild(dots)

  }

  //removing the element dots on inactive dots 
  //creating a div for the dots (dots = createDiv("dots")) that are clicked on, marking them as active

  function updateClasses() {
    let slide = slider.track.details.rel
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled")
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled")
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide

        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }

  //updating the classes on the active/inactive arrows
  //adding the class "arrow--disabled" on inactive arrows as the sliders are moved to the next slide

  //adding the dot--active class to the active dots


  slider.on("created", () => {
    markup()
    updateClasses()
  })
  slider.on("optionsChanged", () => {
    console.log(2)
    markup(true)
    markup()
    updateClasses()
  })
  slider.on("slideChanged", () => {
    updateClasses()
  })
  slider.on("destroyed", () => {
    markup(true)
  })
}

let slider = new KeenSlider("#limo-keen-slider", {}, [navigation])






let zipcodes = [12378, 67890, 10004, 10021];

// //create a function to validateZipCodes and prevent page from refreshing on submit 

function validateZipCodes(e) {
  e.preventDefault();

  // //target the zipcode search box
  let inputZipcode = document.querySelector('#zipCode').value;

  //Number(Zipcode) makes it so that whatever is input into the #zipCode area is a number, otherwise it returns as a NaN

  inputZipcode = Number(inputZipcode)


  if (zipcodes.indexOf(inputZipcode) < 0) {
    console.log("here")
    //an invalid zip code was entered 

    document.querySelector('#zipCode').setCustomValidity("Services limited to New York City")
    document.querySelector('#zipCode').reportValidity("")


  } else {

    //if zipcode is valid
    //submit the form
    this.submit()

  }


}
//Target the limo form and add event listener on submit
document.querySelector(".limoForm").addEventListener('submit', validateZipCodes)

