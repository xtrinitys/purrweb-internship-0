const $slider = document.querySelector('.slider');

document.addEventListener('DOMContentLoaded', () => slider($slider));

function slider($slider) {
  // Query HTMLElements
  const
    $sliderRow = $slider.querySelector('.slider__slides'),
    $items = $sliderRow.querySelectorAll('.slider__slide'),
    $nav = $slider.querySelector('.slider__nav'),
    $prev = $slider.querySelector('.slider__prev'),
    $next = $slider.querySelector('.slider__next');

  // Consts for slider
  const
    nSlides = $items.length,
    cloneFirst = $items[0].cloneNode(true),
    cloneLast = $items[nSlides - 1].cloneNode(true),
    slidesGap = parseInt(getComputedStyle($sliderRow).gap, 10),
    slideWidth = parseInt(getComputedStyle($items[0]).width, 10) + slidesGap,
    initialOffsetLeft = $sliderRow.offsetLeft,
    shiftStep = 10;

  // Consts for navigation
  const
    navItemClass = "slider__nav-item",
    navItemClassActive = navItemClass + '--active',
    $navigationItems = setNavigation();

  let
    index = 0,
    allowShift = true,
    currentOffsetLeft = $sliderRow.offsetLeft;


  $sliderRow.appendChild(cloneFirst);
  $sliderRow.insertBefore(cloneLast, $items[0]);
  $slider.classList.add('slider--loaded');

  $prev.addEventListener('click', () => shiftTo(prev));
  $next.addEventListener('click', () => shiftTo(next));

  function shiftTo(shiftFunction) {
    if (allowShift) {
      let offset = 0;

      const shiftSlide = () => {
        shiftFunction();

        offset += shiftStep;

        if (offset == slideWidth) {
          clearInterval(timerId);

          if (shiftFunction == next) {
            index++;
          } else if (shiftFunction == prev) {
            index--;
          }

          checkIndex();
          updateNav();

          allowShift = true;
        }
      }

      let timerId = setInterval(shiftSlide, 1);
    }

    allowShift = false;
  }

  function next() {
    $sliderRow.style.left = (currentOffsetLeft - shiftStep) + 'px';
    currentOffsetLeft -= shiftStep;
  }

  function prev() {
    $sliderRow.style.left = (currentOffsetLeft + shiftStep) + 'px';
    currentOffsetLeft += shiftStep;
  }

  function checkIndex() {
    if (index == -1) {
      $sliderRow.style.left = -(nSlides * slideWidth) + 'px';
      index = nSlides - 1;
      currentOffsetLeft = initialOffsetLeft * nSlides;
    }

    if (index == nSlides) {
      $sliderRow.style.left = -slideWidth + 'px';
      index = 0;
      currentOffsetLeft = initialOffsetLeft;
    }
  }

  function setNavigation() {
    for (const key of $items.keys()) {
      const newItem = document.createElement("div");

      if (key == 0) {
        newItem.classList.add(navItemClassActive);
      } else {
        newItem.classList.add(navItemClass);
      }

      newItem.addEventListener('click', () => jumpToSlide(key));

      $nav.appendChild(newItem);
    }

    return $nav.childNodes;
  }

  function updateNav() {
    const isActive = ($item) => {
      return $item.classList.contains(navItemClassActive);
    }

    for (let i = 0; i < $navigationItems.length; i++) {
      const item = $navigationItems[i];

      if (i == index && !isActive(item)) {
        item.classList.add(navItemClassActive);
      } else if (i != index && isActive($navigationItems[i])) {
        item.classList.replace(navItemClassActive, navItemClass);
      }
    }
  }

  function jumpToSlide(i) {
    if (i != index) {
      const newOffset = -(i * slideWidth) + initialOffsetLeft

      $sliderRow.style.left = newOffset + 'px';

      currentOffsetLeft = newOffset;
      index = i;

      updateNav();
    }
  }
}