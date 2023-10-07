const $slider = document.querySelector('.slider');

slider($slider);

function slider($slider) {
  const
    $sliderRow = $slider.querySelector('.slider__slides'),
    $items = $sliderRow.querySelectorAll('.slider__slide'),
    $prev = $slider.querySelector('.slider__prev'),
    $next = $slider.querySelector('.slider__next'),
    nSlides = $items.length,
    cloneFirst = $items[0].cloneNode(true),
    cloneLast = $items[nSlides - 1].cloneNode(true),
    slideWidth = parseInt(getComputedStyle($items[0]).width, 10),
    initialOffsetLeft = $sliderRow.offsetLeft,
    shiftStep = 10;

  let
    index = 0,
    allowShift = true,
    currentOffsetLeft = $sliderRow.offsetLeft;

  $sliderRow.appendChild(cloneFirst);
  $sliderRow.insertBefore(cloneLast, $items[0]);
  $slider.classList.add('slider--loaded');

  $prev.addEventListener('click', () => shiftTo(prev));
  $next.addEventListener('click', () => shiftTo(next));

  function shiftTo(callback) {
    if (allowShift) {
      let offset = 0;

      const shiftSlide = () => {
        callback();

        offset += shiftStep;

        if (offset == slideWidth) {
          clearInterval(timerId);

          if (callback == next) {
            index++;
          } else if (callback == prev) {
            index--;
          }
          checkIndex();

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
}