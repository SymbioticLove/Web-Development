// Get all the slide elements
const slides = document.querySelectorAll('.slide');

// Current slide index
let currentSlideIndex = 0;

// Flag to indicate if scrolling is allowed
let isScrollAllowed = true;

// Flag to indicate if swiping is in progress
let isSwiping = false;

// Array to track if typing animation for each slide has been triggered
const slideAnimationTriggered = [false, false];

// Array to store the rendered content for each slide
const slideContent = ['', '', ''];

// Function to update the scroll position
function updateScrollPosition() {
  const slideHeight = window.innerHeight;
  const offset = currentSlideIndex * slideHeight;
  window.scrollTo({
    top: offset,
    left: 0,
    behavior: 'smooth'
  });

  // Disable scrolling temporarily
  isScrollAllowed = false;
  setTimeout(() => {
    isScrollAllowed = true;
  }, 1000);
}

// Function to type out the text within the inner container
function typeOutText(container, text, typingSpeed, elementType) {
  return new Promise((resolve) => {
    const line = document.createElement(elementType);
    container.appendChild(line);

    let index = 0;
    const interval = setInterval(() => {
      line.textContent = text.slice(0, index + 1);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        resolve(); // Resolve the promise when typing is complete
      }
    }, typingSpeed);
  });
}

// Add touch event listeners
let touchStartY = 0;
let touchEndY = 0;

// Add touch event listeners
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', function(event) {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].clientY;

  // Calculate the distance between touch start and end positions
  const swipeDistance = touchEndY - touchStartY;

  // Threshold for swipe distance
  const swipeThreshold = 100;

  if (swipeDistance > swipeThreshold && isScrollAllowed) {
    currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
    startTypingAnimation(); // Start typing animation for the new slide
    updateScrollPosition();
  } else if (swipeDistance < -swipeThreshold && isScrollAllowed) {
    currentSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
    startTypingAnimation(); // Start typing animation for the new slide
    updateScrollPosition();
  }
});

const slide1Images = [
  { src: './images/idea.jpg', alt: 'idea', caption: 'From idea...' },
  { src: './images/meet.jpg', alt: 'meet', caption: 'To Design...' },
  { src: './images/develop.jpg', alt: 'develop', caption: 'To Development...' },
  { src: './images/deploy.jpg', alt: 'deploy', caption: 'To Deployment' }
];

function fadeInImagesAndCaptions() {
  const slide1Container = document.querySelector('.image-container');

  for (let i = 0; i < slide1Images.length; i++) {
    const image = document.createElement('img');
    image.src = slide1Images[i].src;
    image.alt = slide1Images[i].alt;
    image.style.opacity = '0'; // Set initial opacity to 0
    slide1Container.appendChild(image);

    // Calculate the delay based on the index of the image
    const delay = (i + 1) * 1400; // Delay each image by 1000ms (1 second)
    setTimeout(() => {
      image.style.transition = 'opacity 1s'; // Set transition duration
      image.style.opacity = '1';
    }, delay);
  }
}

// Function to initialize the typing animation after a delay
function startTypingAnimation() {
  setTimeout(async () => {
    const slide1Container = document.querySelector('.inner-container1');
    const slide2Container = document.querySelector('.inner-container2-content');
    const slide3Container = document.querySelector('.lower-container3');
    const slide1Lines = [
      { text: "Welcome to your comprehensive solution to web services!", elementType: 'h1' },
      { text: "We are your one stop shop for getting your idea onto the web", elementType: 'h2' },
      { text: "From idea to design to development to deployment, we will be with you every step of the way!", elementType: 'p'}
    ];
    const slide2Lines = [
      { text: "When you schedule a free consultation, our lead developer will sit down with you to discuss your idea", elementType: 'h2' },
      { text: "We'll figure out exactly what you need and the best way to do it...", elementType: 'p' },
      { text: "...and discuss a timeframe and price. If we know of somewhere you can go for less, we are happy to tell you!", elementType: 'p' }
    ];
    const slide3Lines = [
      { text: "With our modular pricing structure, we are able to fit our services to almost any budget", elementType: 'p'},
      { text: "Our goal is to get you online. We will do everything we can to make that happen", elementType: 'p'},
    ]
    const typingSpeed = 65; // Speed in milliseconds between each character

    async function typeOutSlide1() {
      const content = slideContent[0]; // Get the stored content for slide 1
      if (content) {
        slide1Container.innerHTML = content; // Display the stored content
      } else {
        for (let i = 0; i < slide1Lines.length; i++) {
          if (i === 2) {
            fadeInImagesAndCaptions(); // Fade in images and captions when the third line is being typed
          }
          await typeOutText(slide1Container, slide1Lines[i].text, typingSpeed, slide1Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2000ms before rendering the next line
        }
        slideContent[0] = slide1Container.innerHTML; // Store the rendered content for slide 1
      }
    }

    async function typeOutSlide2() {
      const content = slideContent[1]; // Get the stored content for slide 2
      if (content) {
        slide2Container.innerHTML = content; // Display the stored content
      } else {
        for (let i = 0; i < slide2Lines.length; i++) {
          await typeOutText(slide2Container, slide2Lines[i].text, typingSpeed, slide2Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2000ms before rendering the next line
        }
        slideContent[1] = slide2Container.innerHTML; // Store the rendered content for slide 2
      }
    }

    async function typeOutSlide3() {
      const content = slideContent[2];
      if (content) {
        slide3Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide3Lines.length; i++) {
          await typeOutText(slide3Container, slide3Lines[i].text, typingSpeed, slide3Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        slideContent[2] = slide3Container.innerHTML;
      }
    }    

     // Trigger typing animation only if it hasn't been triggered before
     if (currentSlideIndex === 0 && !slideAnimationTriggered[0]) {
      slideAnimationTriggered[0] = true;
      await typeOutSlide1();
    } else if (currentSlideIndex === 1 && !slideAnimationTriggered[1]) {
      slideAnimationTriggered[1] = true;
      await typeOutSlide2();
    } else if (currentSlideIndex === 2 && !slideAnimationTriggered[2]) {
      slideAnimationTriggered[2] = true;
      await typeOutSlide3();
    }
  }, 2000); // Delay in milliseconds
}

// Initialize the first slide
startTypingAnimation();

// Event listener for keyboard events
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'SwipeDown' || event.key === 'SwipeRight') {
    event.preventDefault();
    if (isScrollAllowed) {
      currentSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
      startTypingAnimation(); // Start typing animation for the new slide
      updateScrollPosition();
    }
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'SwipeUp' || event.key === 'SwipeLeft') {
    event.preventDefault();
    if (isScrollAllowed) {
      currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
      startTypingAnimation(); // Start typing animation for the new slide
      updateScrollPosition();
    }
  }
});

// Event listener for mousewheel events
window.addEventListener('wheel', function(event) {
  event.preventDefault();
  if (isScrollAllowed) {
    const delta = event.deltaY;
    if (delta > 0) {
      currentSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
    } else {
      currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
    }
    startTypingAnimation(); // Start typing animation for the new slide
    updateScrollPosition();
  }
});

// Disable scrolling using mouse wheel
window.addEventListener('wheel', function(event) {
  event.preventDefault();
}, { passive: false });
