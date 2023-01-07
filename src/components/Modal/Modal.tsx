import React from "react";
import { createPortal } from "react-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";

type ModalTypes = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

const Modal: React.FC<ModalTypes> = ({ children, isOpen, onClose }) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const devRef = React.useRef(null);
  const [mount, setMount] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const onClickOut = () => {
    onClose?.();
    setOpen(false);
  };

  useOnClickOutside(devRef, onClickOut);

  React.useEffect(() => {
    if (typeof isOpen === "boolean") {
      setOpen(!!isOpen);
    }
  }, [isOpen]);

  React.useEffect(() => {
    ref.current = document.body;
    setMount(true);
  }, []);

  if (!open) return null;

  return ref.current && mount
    ? createPortal(
        <div
          className="fixed z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-[#0000009e] bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-lg">
                <div
                  ref={devRef}
                  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default Modal;
