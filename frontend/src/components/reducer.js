const reducer = (state, action) => {
    switch (action.type) {
        case "user logged":
            const newState = [...state];
            newState = true;
            return newState;
        default:
            return state;
    }
}

export default reducer;