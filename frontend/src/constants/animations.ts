// export const pageVariants = {
//   initial: {
//     opacity: 0,
//   },
//   animate: {
//     opacity: 1,
//   },
// };

export const pageVariants = {
  initial: {
    opacity: 0,
    x: 5,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.5 },
  },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

export const listItemHover = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export const listItemAnimation = {
  hidden: {
    opacity: 0,
    x: -20,
    height: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    x: 0,
    height: 'auto',
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    x: 20,
    height: 0,
    transition: { duration: 0.2 },
  },
};
