type CloseFunction = () => void;

export const handleBackdropClick = (e: React.MouseEvent, closeFunction: CloseFunction) => {
  if (e.target === e.currentTarget) {
    closeFunction();
  }
};
