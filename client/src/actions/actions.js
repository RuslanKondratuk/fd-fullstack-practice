export const incrementActionCreater = () => {
    const action = {
        type: "INCREMENT"
    }
    return action
}

export const decrementActionCreater = () => {
    const action = {
        type: "DECREMENT"
    }
    return action
}

export const stepActionCreater = ({target: {value}}) => {
    const action = {
        type: "CHANGE_STEP",
        value: Number(value)
    }
    return (action)
}
