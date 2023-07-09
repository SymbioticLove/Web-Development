// Get all the slide elements
const slides = document.querySelectorAll('.slide');

// Current slide index
let currentSlideIndex = 0;

// Flag to indicate if scrolling is allowed
let isScrollAllowed = true;

// Speed in milliseconds between each character
let typingSpeed = 50;

// Array to track if typing animation for each slide has been triggered
const slideAnimationTriggered = [false, false];

// Array to store the rendered content for each slide
const slideContent = [];

// Track rendering of slide1
let isFirstSlideRendered = false;

var watermark = 'Property of Matthew Ford, CEO/Chief Engineer, Symbiotic Love';
console.log(watermark); // Prints the watermark

// Function to handle the instructions button
function handleInstructions() {
  const instructionsButton = document.getElementById('instructions-button');
  let slideJump = false;

  instructionsButton.addEventListener('click', function() {
    let instructionsDiv = document.getElementById('instructions-div');

    if (!instructionsDiv) {
      instructionsDiv = document.createElement('div');
      instructionsDiv.id = 'instructions-div';

      const instructionsText = document.createElement('div');
      instructionsText.classList.add('instructions-text');
      instructionsText.innerHTML = `
        <p>
          Hey there, beautiful! Here, you can take a brief tour of our development process! Pressing/holding the enter key or spacebar will speed up the slide animations by
          immediately finishing the current line. Be advised that reloading mid-slideshow will incur a brief ~5s delay (while slide 1 renders) and then restart the slideshow at slide 2 when you scroll. If
          this happens, be patient and keep scrolling down and you'll be good to go shortly! If you've already heard the song and dance and are just here to
          get in contact with us, you can skip straight to <a href="#Schedule" id="consultation-link">scheduling a consultation</a>. 
        </p>
      `;
      instructionsDiv.appendChild(instructionsText);

      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.classList.add('close-button');
      closeButton.addEventListener('click', function() {
        instructionsDiv.remove();
      });
      instructionsDiv.appendChild(closeButton);

      document.body.appendChild(instructionsDiv);

      const consultationLink = document.getElementById('consultation-link');
      consultationLink.addEventListener('click', function() {
        slideJump = true; // Update slideJump to true
      });
    } else {
      instructionsDiv.remove();
    }
  });
}

// Call the handleInstructions() function to initialize the instructions functionality
handleInstructions();

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
async function typeOutText(container, text, typingSpeed, elementType) {
  return new Promise((resolve) => {
    let index = 0;
    const line = document.createElement(elementType);
    container.appendChild(line);

    const typingInterval = setInterval(() => {
      line.textContent = text.slice(0, index + 1);
      index++;

      if (index >= text.length) {
        clearInterval(typingInterval);
        resolve(); // Resolve the promise when the line is finished rendering
      }
    }, typingSpeed);

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        clearInterval(typingInterval);
        line.textContent = text; // Set the line's content to the final text
        document.removeEventListener('keydown', handleKeyDown);
        resolve(); // Resolve the promise when the line is finished rendering
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  });
}


const slide1Images = [
  { src: './images/idea.jpg', alt: 'idea'},
  { src: './images/meet.jpg', alt: 'meet'},
  { src: './images/code.jpg', alt: 'develop'},
  { src: './images/deploy.jpg', alt: 'deploy'}
];

async function renderNextLine(line) {
  await typeOutText(line.text, typingSpeed, line.elementType);
}

function slideInImagesAndCaptions() {
  const slideContainer = slides[currentSlideIndex].querySelector('.image-container');
  const slideHeight = window.innerHeight;

  return new Promise((resolve) => {
    const imagePromises = [];

    for (let i = 0; i < slide1Images.length; i++) {
      const image = document.createElement('img');
      image.src = slide1Images[i].src;
      image.alt = slide1Images[i].alt;
      image.style.transform = `translateY(${slideHeight}px)`; // Set initial position below the screen
      slideContainer.appendChild(image);

      // Calculate the delay based on the index of the image
      const delay = i * 1200; // Delay each image by 1200ms (1 second) except the first
      const imagePromise = new Promise((resolve) => {
        setTimeout(() => {
          image.style.transition = 'transform 1.3s'; // Set transition duration for transform property
          image.style.transform = 'translateY(0)'; // Move the image to its final resting position
          resolve();
        }, delay);
      });

      imagePromises.push(imagePromise);
    }

    Promise.all(imagePromises).then(() => {
      setTimeout(() => {
        isFirstSlideRendered = true; // Set the flag to true after all images finish transitioning
        resolve();
      }, 1000); // Delay the completion promise by an additional 1000ms
    });
  });
}

// Function to initialize the typing animation after a delay
function startTypingAnimation() {
  setTimeout(async () => {
    const slide2Container = document.querySelector('.inner-container2-content');
    const slide3Container = document.querySelector('.inner-container3-content');
    const slide4Container = document.querySelector('.inner-container4-content');
    const slide5Container = document.querySelector('.inner-container5-content');
    const slide6Container = document.querySelector('.inner-container6-content');
    const slide7Container = document.querySelector('.inner-container7-content');
    const slide8Container = document.querySelector('.inner-container8-content');
    const slide9Container = document.querySelector('.inner-container9-content');
    const slide10Container = document.querySelector('.inner-container10-content');
    const slideLines = [
      [
        { text: "Welcome to your comprehensive solution to web services!", elementType: 'h1' },
        { text: "We are your one-stop shop for getting your idea onto the web", elementType: 'h2' },
        { text: "From idea to design to development to deployment, we will be with you every step of the way!", elementType: 'p'}
      ],
      [
        { text: "Our process starts with a free consultation with our lead developer", elementType: 'p' },
        { text: "You'll discuss your needs, pain points and goals, as well get a technical overview of your project, timeframe and cost", elementType: 'p' }
      ],
      [
        { text: "This is the part of the process where you will be most involved, guiding us to see what you see", elementType: 'p'},
        { text: "You are empowered to lead your own project. You'll help us figure out...", elementType: 'p'}
      ],
      [
        { text: "Our talented lead designer will transfer the mock-up onto the screen", elementType: 'p'},
        { text: "We will request your opinion throughout the process to make sure we are capturing your vision exactly", elementType: 'p'},
        { text: "Then, the wireframes will be delivered to you for final approval", elementType: 'p'}
      ],
      [
        { text: "Kick back and relax. Your project has now been passed to our development team, and they're hard at work", elementType: 'p'},
        { text: "They will recreate the wireframe perfectly, as well as add in the functionality you laid out earlier", elementType: 'p'},
        { text: "You may request a check-in at any time! You will be in direct contact with the lead developer from start to finish", elementType: 'p'}
      ],
      [
        { text: "This is where we truly start to set ourselves apart from the competition", elementType: 'p'},
        { text: "We handle domain purchase and DNS setup, domain propagation and TLS certification, as well as anything else that is needed to get your site up and running", elementType: 'p'},
        { text: "But getting you up and running is not the end of our commitment", elementType: 'p'}
      ],
      [
        { text: "So our next step is to fully optimize your website", elementType: 'p'},
        { text: "From SEO to accessibility to performance, we will get your site running perfectly, not just running", elementType: 'p'},
        { text: "But even getting it running perfectly still isn't the end!", elementType: 'p'}
      ],
      [
        { text: "That's why we'll take 3 months to teach you while providing comprehensive technical support", elementType: 'p'},
        { text: "Through 1-on-1 training, you'll learn exactly what you need to know to make the best use of your new website", elementType: 'p'},
        { text: "Our development team are fastidious documenters. If you are inclined, we will also show you how to lightly modify your system", elementType: 'p'}
      ],
      [
        { text: "All of the technologies we use are lightweight and highly modular, allowing them to be built upon easily", elementType: 'p'},
        { text: "When you are ready to add new features into your website or service, we will be able to do so quickly and efficiently", elementType: 'p'},
        { text: "About those technologies...", elementType: 'p'}
      ],
      [
        { text: "For wireframing and mock-ups, we use Adobe Illustrator and Figma", elementType: 'p'},
        { text: "For sites such as portfolio websites, informational pages, business sites, or blog pages that do not require a dedicated server, we prefer to use React", elementType: 'p'},
        { text: "For sites that need user login portals, paywalls, forums, or services that do require a dedicated server to store data, we like to build that server with Python and Flask", elementType: 'p'},
        { text: "When we need an eCommerce solution, we look no further than our Shopify developer partnership", elementType: 'p'},
        { text: "We are also fully capable of creating static HTML, CSS and JavaScript sites. Inspect this source code!", elementType: 'p'}
      ]
    ];
    const slide3Lists = [
      ['Color schemes', 'Typography', 'Logo design', 'Brand image', 'Necessary functionality'],
      ['Long-term goals', 'Cost comparisons', 'Building your tech stack', 'SEO', 'and more!']
    ];

    async function typeOutSlide1() {
      const slide1Lines = slideLines[0];
      const slideContainer = slides[currentSlideIndex].querySelector('.inner-container1');
      const content = slideContent[0];
    
      if (content) {
        slideContainer.innerHTML = content;
      } else {
        let slideInPromise;
    
        for (let i = 0; i < slide1Lines.length; i++) {
          await typeOutText(slideContainer, slide1Lines[i].text, typingSpeed, slide1Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
    
          if (i === 1) {
            slideInPromise = slideInImagesAndCaptions();
          }
        }
    
        if (slideInPromise) {
          await slideInPromise;
          await renderNextLine(slide1Lines[2]);
        }
    
        slideContent[0] = slideContainer.innerHTML;
      }
    }                      

    async function typeOutSlide2() {
      const slide2Lines = slideLines[1]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[1]; // Get the stored content for slide 2
    
      if (content) {
        slide2Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide2Lines.length; i++) {
          await typeOutText(slide2Container, slide2Lines[i].text, typingSpeed, slide2Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[1] = slide2Container.innerHTML;
      }
    }          

    async function fadeInSlide3List1() {
      const catFood = true;
      const slide3List1 = slide3Lists[0];
      const container = document.querySelector('.design-list1');
      container.style.visibility = 'hidden';
    
      let nextItemSpeed = 2000;
    
      for (let i = 0; i < slide3List1.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = slide3List1[i];
        listItem.style.opacity = 0;
        listItem.style.transition = "opacity 1.5s";
    
        container.appendChild(listItem);
      }
    
      container.style.visibility = 'visible';
    
      return new Promise((resolve) => {
        const fadeNextItem = async (index) => {
          if (index < slide3List1.length) {
            const listItem = container.children[index];
            await new Promise((resolve) => setTimeout(resolve, nextItemSpeed));
            listItem.style.opacity = 1;
            fadeNextItem(index + 1);
          } else {
            window.removeEventListener("keydown", handleKeyPress); // Remove the event listener after the final list item is faded in
            resolve(); // Resolve the promise when list 1 finishes fading in
          }
        };
    
        const handleKeyPress = (event) => {
          const keyPressed = event.key;
          if (keyPressed === "Enter" || keyPressed === " ") {
            nextItemSpeed = 500;
            fadeNextItem(0);
          }
        };
    
        window.addEventListener("keydown", handleKeyPress);
    
        fadeNextItem(0);
      });
    }
    
    async function fadeInSlide3List2() {
      const slide3List2 = slide3Lists[1];
      const container = document.querySelector('.design-list2');
      container.style.visibility = 'hidden';
    
      let nextItemSpeed = 2000;
    
      for (let i = 0; i < slide3List2.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = slide3List2[i];
        listItem.style.opacity = 0;
        listItem.style.transition = "opacity 1.5s";
    
        container.appendChild(listItem);
      }
    
      container.style.visibility = 'visible';
    
      return new Promise((resolve) => {
        const fadeNextItem = async (index) => {
          if (index < slide3List2.length) {
            const listItem = container.children[index];
            await new Promise((resolve) => setTimeout(resolve, nextItemSpeed));
            listItem.style.opacity = 1;
            fadeNextItem(index + 1);
          } else {
            window.removeEventListener("keydown", handleKeyPress); // Remove the event listener after the final list item is faded in
            resolve(); // Resolve the promise when list 2 finishes fading in
          }
        };
    
        const handleKeyPress = (event) => {
          const keyPressed = event.key;
          if (keyPressed === "Enter" || keyPressed === " ") {
            nextItemSpeed = 500;
            fadeNextItem(0);
          }
        };
    
        window.addEventListener("keydown", handleKeyPress);
    
        fadeNextItem(0);
      });
    }            
    
    async function typeOutSlide3() {
      const slide3Lines = slideLines[2];
      const content = slideContent[2];

      if (content) {
        slide3Container.innerHTML = content;
      } else {
        let nextLineSpeed = typingSpeed;
        let delay = 1500;

        const renderNextLine = async (i) => {
          const line = slide3Lines[i];
          await new Promise((resolve) => setTimeout(resolve, delay));
          await typeOutText(slide3Container, line.text, nextLineSpeed, line.elementType);
        };

        for (let i = 0; i < slide3Lines.length; i++) {
          await renderNextLine(i);
        }

        slideContent[2] = slide3Container.innerHTML;
      }

      const paragraphs = slide3Container.getElementsByTagName('p');
      if (paragraphs.length >= 2) {
        paragraphs[1].classList.add('second-p');
      }

      await fadeInSlide3List1(); // Render and fade-in list 1
      await fadeInSlide3List2(); // Render and fade-in list 2
    }                    

    async function typeOutSlide4() {
      let slide4Lines = slideLines[3]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[3]; // Retrieve the stored content

      if (content) {
        slide4Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide4Lines.length; i++) {
          await typeOutText(slide4Container, slide4Lines[i].text, typingSpeed, slide4Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[3] = slide4Container.innerHTML;
      }
    }

    async function typeOutSlide5() {
      const slide5Lines = slideLines[4]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[4];

      if (content) {
        slide5Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide5Lines.length; i++) {
          await typeOutText(slide5Container, slide5Lines[i].text, typingSpeed, slide5Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[4] = slide5Container.innerHTML;
      }
    }
    
    async function typeOutSlide6() {
      const slide6Lines = slideLines[5]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[5];

      if (content) {
        slide6Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide6Lines.length; i++) {
          await typeOutText(slide6Container, slide6Lines[i].text, typingSpeed, slide6Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[5] = slide6Container.innerHTML;
      }
    }

    async function typeOutSlide7() {
      const slide7Lines = slideLines[6]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[6];
      
      if (content) {
        slide7Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide7Lines.length; i++) {
          await typeOutText(slide7Container, slide7Lines[i].text, typingSpeed, slide7Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[6] = slide7Container.innerHTML;
      }
    }

    async function typeOutSlide8() {
      const slide8Lines = slideLines[7]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[7];
      const bootyButtCheeks = true;

      if (content) {
        slide8Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide8Lines.length; i++) {
          await typeOutText(slide8Container, slide8Lines[i].text, typingSpeed, slide8Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[7] = slide8Container.innerHTML;
      }
    }

    async function typeOutSlide9() {
      const slide9Lines = slideLines[8]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[8];

      if (content) {
        slide9Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide9Lines.length; i++) {
          await typeOutText(slide9Container, slide9Lines[i].text, typingSpeed, slide9Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[8] = slide9Container.innerHTML;
      }
    }
    
    function fadeImagesIntoContainers(images, container, fadeDuration) {
      images.forEach((image, index) => {
        const { src, alt } = image;
        const img = new Image();
        img.src = src;
        img.alt = alt;
        img.style.opacity = '0';
        img.style.transition = `opacity ${fadeDuration}ms`;
    
        if (src === './images/illustrator.svg') {
          img.setAttribute('id', 'illustrator-image');
        } else if (src === './images/figma.png') {
          img.setAttribute('id', 'figma-image');
        } else if (src == './images/shopify.svg') {
          img.setAttribute('id', 'shopify-image');
        }
    
        if (index === 0 && src === './images/react.png') {
          img.setAttribute('id', 'react-image');
        }
    
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        });
    
        container.appendChild(img);
      });
    }                   

    async function typeOutSlide10() {
      // Set image array
      const slide10Images = [
        { src: './images/react.png', alt: 'React logo' },
        { src: './images/flask.png', alt: 'Flask logo' },
        { src: './images/shopify.svg', alt: 'Shopify partner logo' },
        { src: './images/illustrator.svg', alt: 'Shopify partner logo' },
        { src: './images/figma.png', alt: 'Shopify partner logo' },
      ];

      const slide10Lines = slideLines[9]; // Retrieve the appropriate lines from the lines array
      const content = slideContent[9];
      
      if (content) {
        slide10Container.innerHTML = content;
      } else {
        for (let i = 0; i < slide10Lines.length; i++) {
          await typeOutText(slide10Container, slide10Lines[i].text, typingSpeed, slide10Lines[i].elementType);
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        slideContent[9] = slide10Container.innerHTML;
        const imageContainers = document.querySelectorAll('.image-container2');
        for (let i = 0; i < imageContainers.length; i++) {
          fadeImagesIntoContainers([slide10Images[i]], imageContainers[i], 1000);
        }
      }
    }
    
    async function typeOutSlide11() {
      // Set list array
      const slide11Lists = [
        ['$5,000+', 'None', 'Full', 'Full', 'Varies', '✔',  '✔', '✘', '✘', '✘'],
        ['$5-$500+', 'Varies', 'Limited', 'Limited', 'Basic', '✘', '✘', '✘', '✘', '✘'],
        ['$100+', 'None', 'Full', 'Full', '90d', '✔', '✔', '✔', '✔', '✔']
      ];

      // Retrieve appropriate lists from list array
      const [slide11List1, slide11List2, slide11List3] = slide11Lists;
      
      // Apply the 'fade' class to all elements with class 'fade11'
      const fadeElements = document.getElementsByClassName('fade11');
      for (let i = 0; i < fadeElements.length; i++) {
        fadeElements[i].classList.add('fade');
      }
    
      // Helper function to type out list items with a delay between each
      const typeOutListItems = async (list, containerId) => {
        const container = document.getElementById(containerId);
        const existingListItems = container.getElementsByTagName('li');
    
        await new Promise(resolve => setTimeout(resolve, 2500));
    
        let delay = 1000;
        let skipDelay = false;
        let typingSpeedModifier = 1;
    
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);
    
        function handleKeyPress(event) {
          if (!skipDelay && (event.key === 'Enter' || event.key === ' ')) {
            skipDelay = true;
          }
    
          if (event.repeat && (event.key === 'Enter' || event.key === ' ')) {
            typingSpeedModifier = 0.1; // Speed up typing to 100ms
          }
        }
    
        function handleKeyUp(event) {
          if (skipDelay && (event.key === 'Enter' || event.key === ' ')) {
            skipDelay = false;
          }
    
          if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) {
            typingSpeedModifier = 1; // Reset typing speed to default
          }
        }
    
        for (let i = 0; i < list.length; i++) {
          await new Promise(resolve => setTimeout(resolve, skipDelay ? 0 : delay * typingSpeedModifier));
    
          const listItem = existingListItems[i];
          const existingText = listItem.textContent;
          const newText = existingText + ' ' + list[i];
    
          const appendedText = document.createElement('span');
          appendedText.style.opacity = '1';
          appendedText.style.marginLeft = '.25rem';
          appendedText.style.fontFamily = 'var(--font2)';
          appendedText.textContent = '';
    
          listItem.appendChild(appendedText);
    
          for (let j = existingText.length + 1; j < newText.length; j++) {
            await new Promise(resolve => setTimeout(resolve, 65 * typingSpeedModifier));
            appendedText.textContent += newText[j];
          }
        }
    
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('keyup', handleKeyUp);
      };
    
      // Fade in list items from slide11List1 into container11-list1
      await typeOutListItems(slide11List1, 'container11-list1');
    
      // Fade in list items from slide11List2 into container11-list2
      await typeOutListItems(slide11List2, 'container11-list2');
    
      // Fade in list items from slide11List3 into container11-list3
      await typeOutListItems(slide11List3, 'container11-list3');
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
    } else if (currentSlideIndex === 3 && !slideAnimationTriggered[3]) {
      slideAnimationTriggered[3] = true;
      await typeOutSlide4();
    } else if (currentSlideIndex === 4 && !slideAnimationTriggered[4]) {
      slideAnimationTriggered[4] = true;
      await typeOutSlide5();
    } else if (currentSlideIndex === 5 && !slideAnimationTriggered[5]) {
      slideAnimationTriggered[5] = true;
      await typeOutSlide6();
    } else if (currentSlideIndex === 6 && !slideAnimationTriggered[6]) {
      slideAnimationTriggered[6] = true;
      await typeOutSlide7();
    } else if (currentSlideIndex === 7 && !slideAnimationTriggered[7]) {
      slideAnimationTriggered[7] = true;
      await typeOutSlide8();
    } else if (currentSlideIndex === 8 && !slideAnimationTriggered[8]) {
      slideAnimationTriggered[8] = true;
      await typeOutSlide9();
    } else if (currentSlideIndex === 9 && !slideAnimationTriggered[9]) {
      slideAnimationTriggered[9] = true;
      await typeOutSlide10();
    } else if (currentSlideIndex === 10 && !slideAnimationTriggered[10]) {
      slideAnimationTriggered[10] = true;
      await typeOutSlide11();
    }
  }, 1500); // Delay in milliseconds
}

// Initialize the first slide
startTypingAnimation();

// Event listener for keyboard events
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault();
    if (isScrollAllowed && (currentSlideIndex !== 0 || isFirstSlideRendered)) {
      currentSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
      startTypingAnimation(); // Start typing animation for the new slide
      updateScrollPosition();
    }
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault();
    if (isScrollAllowed && currentSlideIndex !== 0) {
      currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
      startTypingAnimation(); // Start typing animation for the new slide
      updateScrollPosition();
    }
  }
});

// Event listener for mousewheel events
window.addEventListener('wheel', function(event) {
  event.preventDefault();
  if (isScrollAllowed && (currentSlideIndex !== 0 || isFirstSlideRendered)) {
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
