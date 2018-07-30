// for usage throughout documentation and examples
window.hostUrl = window.location.origin;

// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

jQuery(document).ready(() => {
  $('.hostUrl').text(window.hostUrl);
  $.get('https://api.github.com/repos/siwalikm/FLASH/releases',
    data => {
      if (data.length) {
        data.forEach(releaseItem => {
          var newDate = new Date(releaseItem.published_at).toDateString();
          var body = releaseItem.body.replace(/\n/g, "<br />");
          var domItem = `<div class="changelog__item">
          <div class="changelog__meta">
            <h4 class="changelog__title">${releaseItem.name}</h4>
            <small class="changelog__date">${newDate}</small>
          </div>
          <div class="changelog__detail">
            <span>
            ${body}
            </span>
          </div>
        </div> `;
          jQuery('.changelog .items').append(domItem);
        });
      } else {
        jQuery('.changelog').hide();
      }
    });


});

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `// GET() mock response after specific delay
  > $.get(${window.hostUrl}/delay/3000', data=> {console.log(data)});

  // api response
  > {status: 200, delay: "3000 ms", message: "Mock response from Flash"}

  // GET() mock response after random delay
  > $.get('${window.hostUrl}/delay/random', data=> {console.log(data)});

  // api response
  > {status: 200, delay: "8000 ms", message: "Mock response from Flash"}

  // GET() API response after specific delay
  > $.get('${window.hostUrl}/delay/1000/url/api.github.com/users/siwalikm', data=> {console.log(data)});

  // api response
  > {login: "siwalikm", id: 20061595, node_id: "MDQ6VXNlcjIwMDYxNTk1", …}


  
                `;
  var block = `// after 3000ms delay
  ▶ { login: "siwalikm", id: 20061595, ... }`;
  var speed = 60;

  function typeItOut() {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);

    }
  }

  setTimeout(typeItOut, 1800);

}

// toggle tabs on codeblock
window.addEventListener("load", function () {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick(event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}


// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if (docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function () {
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});