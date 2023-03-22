import { RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (e: Event) => void, refNotTouch?: RefObject<T>) => {
    useEffect(() => {
        const listener = (e : Event) => {
            const element = ref?.current;
            const elementNotTouch = refNotTouch?.current;

            if ((!element || element.contains((e?.target as Node) || null))) {
                return;
            }
            if(elementNotTouch && elementNotTouch.contains((e?.target as Node) || null)){
                return;
            }

            handler(e);
        };

        document.addEventListener('mousedown', listener);

        return () => document.removeEventListener('click', listener);
    })
}
