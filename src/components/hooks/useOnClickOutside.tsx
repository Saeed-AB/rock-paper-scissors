import React, { RefObject } from "react";

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  outsideClickHandler: () => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref.current.contains(event?.target as Node)) {
        outsideClickHandler?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, outsideClickHandler]);
}

export default useOnClickOutside;
