const signInBtn = document.querySelector("#sign-in");
signInBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});

const slide = document.querySelector(".imageContainer");
firstImg = slide.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = slide.scrollWidth - slide.clientWidth;
  arrowIcons[0].style.display = slide.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    slide.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  let firstImgWidth = firstImg.clientWidth + 14;
  icon.addEventListener("click", () => {
    slide.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  //if there is no image left to scroll then return from here
  if (slide.scrollLeft == slide.scrollWidth - slide.clientWidth) return;
  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  //setting difference value that needs to add or reduce from slide left to make middle img center
  let valDifference = firstImgWidth - positionDiff;
  if (slide.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (slide.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  slide.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  //updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = slide.scrollLeft;
};

const dragging = (e) => {
  //scrolling images/slide to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  slide.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  slide.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  slide.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

slide.addEventListener("mousedown", dragStart);
slide.addEventListener("touchstart", dragStart);

slide.addEventListener("mousemove", dragging);
slide.addEventListener("touchmove", dragging);

slide.addEventListener("mouseleave", dragStop);
slide.addEventListener("touchend", dragStop);
slide.addEventListener("mouseup", dragStop);
