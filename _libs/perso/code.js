function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}

const chars = [0x2200, 0x2203, 0x2207, 0x2211, 0x220F, 0x221a, 0x2264, 0x003e, 0x222b,
               0x222c, 0x222d, 0x21d4, 0x22c2, 0x22c3, 0x22a8, 0x2202, 0x221d, 0x211a,
               0x2124, 0x2102, 0x2205, 0x2208, 0x2229, 0x222a, 0x2286]

function getChar() {
  return String.fromCharCode(pick(chars));
}

function pick(arr) {
  return arr[r(0, arr.length - 1)];
}

class RandbgElement {
  constructor() {
    this.element = document.createElement('div');
    this.element.textContent = getChar();

    let color = pick(["#21c36f", "#feb308", "#c95efb", "#00022e", "#fe7b7c"])
    this.element.style.setProperty('--colorbg',color);
    this.element.style.setProperty('--colortx',color);

    this.element.style.fontSize = (Math.random() + 1 / 2) * 2 + "em"

    let rotation = (Math.random() - 0.5) * 45 + "deg";
    let translation_x = (Math.random() - 0.5) * 75 + "px";
    let translation_y = (Math.random() - 0.5) * 75 + "px";
    this.element.style.transform =
      "translate(" + translation_x + ", " + translation_y + ")" +
      "rotate(" + rotation + ")";

    this.element.className = "randbg-element";
  }
}

function cons(target) {
  let root = document.createDocumentFragment();
  let randbg = document.createElement("div");
  randbg.id = "randbg";
  root.appendChild(randbg);

  // Compute the number of character to generate as a function of viewport width
  // and height.
  const vw = Math.max(document.documentElement.clientWidth || 0,
                      screen.width || 0) * window.devicePixelRatio;
  const vh = Math.max(document.documentElement.clientHeight || 0,
                      window.height || 0) * window.devicePixelRatio;

  const grid_auto_row_px = 100;
  const grid_auto_col_px = 100;
  randbg.style.gridAutoRows = grid_auto_row_px + "px";
  randbg.style.gridAutoColumns = grid_auto_col_px + "px";
  randbg.style.gridTemplateColumns =
    "repeat(auto-fill, " +
    randbg.style.gridAutoRows + ")";

  const nrows = vw / grid_auto_row_px;
  const ncols = vh / grid_auto_col_px;
  const n = nrows * ncols * 1.5**2;

  // Generate background.
  for(let i = 0; i < n; i ++) {
    let div = new RandbgElement();
    randbg.appendChild(div.element);
  }

 body.appendChild(root);
}

// Generate background.
const body = document.querySelector('body');
cons(body);

// Regenerate again when windows is resized.
function debounce(f) {
  let timeout;

  return function() {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function() {
      f.apply(this, arguments);
    });
  }
}

function throttle(f, delay) {
  let throttled = false;

  return function() {
    if (!throttled) {
      throttled = true;

      f.apply(this, arguments);

      setTimeout(function() {throttled = false;}, delay);
    }
  }
}

window.addEventListener('resize',
                        throttle(function(event) {cons(body);}, 2000),
                        false);

// Add a "top" button after every h1 and h2 title.
function add_top(elem) {
  elem.innerHTML += " <span class=\"top\"><a href=\"#top-page\">&#10847;</a></span>";
}

const h1s = document.getElementsByTagName("h1")
for (h1 of h1s) {
  if (h1.className != "page title") {
    add_top(h1)
  }
}

const h2s = document.getElementsByTagName("h2")
for (h2 of h2s) {
  add_top(h2)
}

$(function() {
  // Position the nav menu.
  const menubutton_height = $("label.menu-button").height();
  $(window).on("resize load", function() {
    const offset = $("label.menu-button").position();
    $("nav").css({"top": offset.top + menubutton_height,
                  "left": offset.left});
  });
});
