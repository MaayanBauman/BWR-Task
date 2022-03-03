import React, { useRef, useEffect } from "react";
import { pick } from 'lodash'

const createDragStartEvent = (element, mouseEvent) => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("mousedown", true, true);

    const original = element.getBoundingClientRect;
    element.getBoundingClientRect = () => {
        element.getBoundingClientRect = original;

        return {
            left: mouseEvent.clientX,
            top: mouseEvent.clientY
        };
    };

    element.dispatchEvent(event);
};

const createDragStopEvent = element => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("mouseup", true, true);
};

export default function LayoutItem({ temp, children, mouseEvent, ...rest }) {
    const forwardProps = pick(rest, [
        "style",
        "className",
        "onMouseDown",
        "onMouseUp",
        "onTouchEnd",
        "onTouchStart"
    ]);

    const ref = useRef();

    useEffect(() => {
        const refCur = ref && ref.current;

        if (refCur && temp) {
            createDragStartEvent(refCur, mouseEvent);
        }

        return () => refCur && temp && createDragStopEvent(refCur);
    }, [ref, temp, mouseEvent]);

    return (
        <div ref={ref} {...forwardProps}>
            {children}
        </div>
    );
};
