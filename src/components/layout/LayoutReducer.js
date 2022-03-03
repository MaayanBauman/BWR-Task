import { merge, keyBy } from "lodash";

export default function LayoutReducer(state, action) {
    switch (action.type) {
        case "addTempItem":
            if (state.findIndex(item => item.temp) !== -1) {
                return state;
            }

            return [
                ...state,
                {
                    x: 0,
                    y: 0,
                    h: action.h ? action.h : 1,
                    w: action.w ? action.w : 1,
                    content: action.content ? action.content : 'default',
                    temp: true,
                    mouseEvent: action.mouseEvent,
                    isResizable: false,
                    i: "" + state.length
                }
            ];
        case "clearTempItem":
            return state.filter(item => !item.temp);
        case "finaliseTempItem":
            return state.map(item => ({ ...item, temp: false }));
        case "changeLayout":
            if (state.findIndex(item => item.temp) !== -1) {
                return state;
            }

            const mergedState = merge(keyBy(state, 'i'), keyBy(action.layout, 'i'));
            return Object.values(mergedState);
        default:
            return state;
    }
};
