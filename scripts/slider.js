slider();

function slider() {
  let DEFAULT_INTERVAL = 6000;
  const slider = document.querySelector(".slider");
  const leftBtn = slider.querySelector(".slider__btn-left");
  const rightBtn = slider.querySelector(".slider__btn-right");
  const row = slider.querySelector(".slider__active-content");

  const sliderItems = [...row.children];
  const sliderLength = row.children.length;
  let activeIndex = 0;
  let prevIndex = sliderLength - 1;

  const sliderControls = [...slider.querySelectorAll(".slider__control")];
  [sliderControls[1], sliderControls[2]] = [
    sliderControls[2],
    sliderControls[1],
  ];
  sliderControls[0].classList.add("slider__control_active");

  let intervalId;
  let timerId;
  let timeoutId;

  let timePassed;
  let startTime;
  let timeLeft;

  let widthPercent;

  startTimer();

  function startTimer(stamp) {
    startTime = Date.now() - (stamp || 0);
    timerId = setInterval(() => {
      timePassed = stamp || Date.now() - startTime;
      stamp = null;
      timeLeft = DEFAULT_INTERVAL - timePassed;
      if (timePassed > DEFAULT_INTERVAL) {
        startTime = Date.now();
        timePassed = 0;
      }
      widthPercent = Math.ceil((timePassed / DEFAULT_INTERVAL) * 100);

      document.querySelector(
        ".slider__control_active > .slider__filler"
      ).style.width = `${widthPercent}%`;
    }, 100);
  }

  function moveCarousel() {
    startTime = Date.now();
    timePassed = 0;

    sliderItems.forEach((item, i) => {
      if (i === activeIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_active");
        sliderControls[i].classList.add("slider__control_active");
        sliderControls[i].firstElementChild.style = `width: ${widthPercent}`;
      } else if (i === prevIndex) {
        item.className = "";
        item.classList.add("slider__item", "slider__item_prev");
        sliderControls[i].classList.remove("slider__control_active");
        sliderControls[i].firstElementChild.style = "";
      } else {
        item.className = "";
        item.classList.add("slider__item", "slider__item_next");
        sliderControls[i].classList.remove("slider__control_active");
        sliderControls[i].firstElementChild.style = "";
      }
    });
  }

  startInterval(DEFAULT_INTERVAL);

  function startInterval(delay) {
    intervalId = setInterval(() => {
      activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
      prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;

      moveCarousel();
    }, delay);
  }

  rightBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    clearInterval(timerId);
    clearTimeout(timeoutId);
    activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
    prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    moveCarousel();
    startInterval(DEFAULT_INTERVAL);
    startTimer();
  });

  leftBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    clearInterval(timerId);
    clearTimeout(timeoutId);
    activeIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
    moveCarousel();
    startInterval(DEFAULT_INTERVAL);
    startTimer();
  });

  handlePause();
  function handlePause() {
    row.addEventListener("mouseover", (e) => {
      const activeSliderItem = e.target.closest(".slider__item_active");
      if (!activeSliderItem) return;
      clearInterval(timerId);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      // console.log(
      //   "timePassed",
      //   timePassed
      // );
    });

    row.addEventListener("mouseout", (e) => {
      const activeSliderItem = e.target.closest(".slider__item_active");
      if (!activeSliderItem) return;

      startTimer(timePassed);

      timeoutId = setTimeout(() => {
        clearInterval(timerId);

        activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
        prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;

        moveCarousel();

        startTimer();
        startInterval(DEFAULT_INTERVAL);
      }, timeLeft);
    });

    row.addEventListener(
      "touchstart",
      (e) => {
        const activeSliderItem = e.target.closest(".slider__item_active");
        if (!activeSliderItem) return;
        clearInterval(timerId);
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      },
      { passive: true }
    );

    row.addEventListener("touchend", (e) => {
      e.preventDefault();
      const activeSliderItem = e.target.closest(".slider__item_active");
      if (!activeSliderItem) return;
      startTimer(timePassed);

      timeoutId = setTimeout(() => {
        clearInterval(timerId);

        activeIndex = activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
        prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;

        moveCarousel();

        startTimer();
        startInterval(DEFAULT_INTERVAL);
      }, timeLeft);
    });

    row.addEventListener("contextmenu", (e) => {
      const activeSliderItem = e.target.closest(".slider__item_active");
      if (!activeSliderItem) return;
      e.preventDefault();
    });
  }

  handleSwipe();
  function handleSwipe() {
    let xTouch;
    let yTouch;
    let xSwipe;
    let ySwipe;

    row.addEventListener(
      "touchstart",
      (e) => {
        const activeSliderItem = e.target.closest(".slider__item_active");
        if (!activeSliderItem) {
          xTouch = null;
          yTouch = null;
          xSwipe = null;
          ySwipe = null;
          return;
        }

        xTouch = e.touches[0].clientX;
        yTouch = e.touches[0].clientY;
      },
      { passive: true }
    );

    row.addEventListener(
      "touchmove",
      (e) => {
        const activeSliderItem = e.target.closest(".slider__item_active");
        if (!activeSliderItem || !xTouch || !yTouch) {
          xTouch = null;
          yTouch = null;
          xSwipe = null;
          ySwipe = null;
          return;
        }

        xSwipe = e.touches[0].clientX;
        ySwipe = e.touches[0].clientY;

        const deltaX = xSwipe - xTouch;
        const deltaY = ySwipe - yTouch;

        if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (Math.abs(deltaX) < 20) return;

        clearInterval(intervalId);
        clearInterval(timerId);
        clearTimeout(timeoutId);

        if (deltaX > 0) {
          activeIndex =
            activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
          prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
          moveCarousel();
          startInterval(DEFAULT_INTERVAL);
          startTimer();
        } else {
          activeIndex =
            activeIndex - 1 < 0 ? sliderLength - 1 : activeIndex - 1;
          prevIndex = activeIndex + 1 > sliderLength - 1 ? 0 : activeIndex + 1;
          moveCarousel();
          startInterval(DEFAULT_INTERVAL);
          startTimer();
        }
      },
      { passive: true }
    );
  }
}
