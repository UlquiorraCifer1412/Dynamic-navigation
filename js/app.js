'use strict';

// Selecting Sections
const sections = document.querySelectorAll('section');

/****************************** Building The Navigation Links - Start *************************/
// Selecting Elements
const ul = document.querySelector('ul');
const nav = document.querySelector('nav');

// Creating Elements 
const h2 = document.createElement('h2');
const i = document.createElement('i');

// Add Classes
ul.classList = 'navbar__links';
i.classList = 'fas fa-dumbbell';
h2.className = 'navbar__logo';

// Changing Content 
h2.textContent = 'fitmax';


// Inserting Elements 
h2.insertAdjacentElement('afterbegin', i);
nav.insertAdjacentElement('afterbegin', h2);

// Building Navigation Links Data Structure
let navLinks = [];
sections.forEach((section) => {
  navLinks.push(section.id);
})


// 

for (let i = 0; i < navLinks.length; i++) {
  // Creating Anchor Inside Li Element For Each Section Name
  const listItem = document.createElement('li');
  let link = document.createElement('a');

  // Set Each Link Name Based On Section Name
  link.textContent = navLinks[i];

  // Add Class
  link.classList = 'menu__link';

  // Add Href Attribute To Navigate To The Section
  link.setAttribute('href', `#${navLinks[i]}`);

  // Inserting The Created Elements Inside The Ul
  listItem.appendChild(link);
  ul.appendChild(listItem);
}
/****************************** Building The Navigation Links - End *************************/

/*********************************** Smooth Scroll - Start ***********************************/
// Helper Function
const smoothScroll = (target, duration) => {
  // Selecting Elements 
  const location = document.querySelector(target);
  const targetPosition = location.getBoundingClientRect().top - 65;
  const currentPosition = window.pageYOffset;

  let startTime = null;

  // Animation Function 
  const animation = currentTime => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, currentPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  // Ease Function
  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// Applying The Smooth Scroll Function To Each Link
const links = document.querySelectorAll('.menu__link');
links.forEach(link => {
  link.addEventListener('click', () => {
    const textValue = `#${link.textContent}`;
    smoothScroll(textValue, 1000);
  });
});
/*********************************** Smooth Scroll - End ***********************************/

// Applying Active Class On Navbar Items
onscroll = () => {
  const scrollPosition = document.documentElement.scrollTop;

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop - 66 && scrollPosition < section.offsetTop + section.offsetHeight) {
      const currentId = section.attributes.id.value;
      removeAllActiveClasses();
    
      addActiveClass(currentId);
    }
  });
};

// Removing Active Class
const removeAllActiveClasses = () => {
  document.querySelectorAll('.menu__link').forEach(link => {
      link.classList.remove('current');
  });
};

// Add Active Class
const addActiveClass = id => {
  const selector = `ul li a[href='#${id}']`;
    document.querySelector(selector).classList.add('current');
};


// Mobile Menu Toggle
const navMenu = () => {
  const burger = document.querySelector('.burger');

  burger.addEventListener('click', () => {
    ul.classList.toggle('menu-open');
  });
};

navMenu();
