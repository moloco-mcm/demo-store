const transitionProperty = {
  common:
    'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  dimensions: 'width, height',
  position: 'left, right, top, bottom',
  background: 'background-color, background-image, background-position',
};

const transitionTimingFunction = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const transitionDuration = {
  ultraFast: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  ultraSlow: '500ms',
};

const transition = {
  property: transitionProperty,
  timingFn: transitionTimingFunction,
  duration: transitionDuration,
};

export default transition;
