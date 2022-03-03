import React, { useState } from "react";
import Draggable from "react-draggable";

const elementIsInChain = (elementToTraverse, elementToFind) => {
    if (elementToTraverse === elementToFind) {
        return elementToFind;
    }

    if (elementToTraverse.parentElement) {
        return elementIsInChain(elementToTraverse.parentElement, elementToFind);
    }

    return false;
}

export default function Component({
    targetRef,
    dispatch,
    onDrag,
    onStop,
    children,
    h,
    w,
    content,
    ...rest
}) {
    const [inserted, setInserted] = useState(false);
    const onDragOverwrite = (e, data) => {
        if (onDrag) {
            onDrag(e, data);
        }

        const target = elementIsInChain(e.target, targetRef.current)

        if (!target && inserted) {
            dispatch({ type: "clearTempItem" });
            setInserted(false);
            const placeHolder = document.querySelector(".react-grid-placeholder");
            if (placeHolder) {
                placeHolder.style.transform = "translate(-8000px, 0px)";
            }

            return;
        }

        if (target && !inserted) {
            dispatch({ type: "addTempItem", mouseEvent: { clientX: e.clientX, clientY: e.clientY }, h, w, content });
            setInserted(true);

            return;
        }
    };
    const onStopOverwrite = (e, data) => {
        if (onStop) {
            onStop(e, data);
        }

        if (inserted) {
            dispatch({ type: "finaliseTempItem" });
            setInserted(false);
        } else {
            dispatch({ type: "clearTempItem" });
        }
    };

    return (
        <Draggable
            onDrag={onDragOverwrite}
            onStop={onStopOverwrite}
            {...rest}
            position={{ x: 0, y: 0 }}
        >
            {children}
        </Draggable>
    );
};
