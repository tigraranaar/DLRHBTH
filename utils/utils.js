const scrollTo = (toElem, direction = -1) => {
  const start = window.scrollY;
  const end = direction === -1 ? start + toElem.getBoundingClientRect().top : toElem.getBoundingClientRect().top;

  const timeNow = performance.now();
  const velocity = 1.3;
  const acceleration = 0.01;
  const _direction = start > end ? -1 : 1;

  const scroll = (time) => {
    const timePassed = time - timeNow;
    const _start = start + _direction * (timePassed * velocity + acceleration * Math.pow(timePassed, 2));
    const isScrollEnd = _direction > 0 ? _start > end : _start < end;

    window.scroll(start, _start);

    if (!isScrollEnd) {
      requestAnimationFrame(scroll);
    } else {
      window.scroll(start, end);
    }
  };

  requestAnimationFrame(scroll);
};

export default {
  scrollTo
}