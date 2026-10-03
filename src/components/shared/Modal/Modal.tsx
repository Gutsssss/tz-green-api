import { type ReactNode } from "react";
import React from "react";
import { Portal } from "../Portal/Portal";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = React.memo((props: ModalProps) => {
  const { children, isOpen, onClose } = props;

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className={`fixed inset-0 z-[10] flex items-center justify-center bg-black/60 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`p-5 rounded-xl bg-white text-black max-w-[70%] min-w-[30%] transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-50"
          }`}
          onClick={onContentClick}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
