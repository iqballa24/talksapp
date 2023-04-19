import { useState, useEffect } from 'react';

type Props = {
  onOpen: () => void;
  onClose: () => void;
};

export const useDisclosure = (
  initialState = false,
  { onOpen, onClose }: Props
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    if (isOpen !== initialState) {
      setIsOpen(initialState);
    }
  }, [initialState]);

  const open = () => {
    setIsOpen(true);
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const close = () => {
    setIsOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
