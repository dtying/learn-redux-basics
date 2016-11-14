const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: action.id,
                text: action.text,
                completed: false
            }];
        case 'TOGGLE_TODO':
            state.map(todo => {
                if (action.id !== todo.id) {
                    return;
                }
                return {...todo, completed: !todo.completed};
            });
        default:
            return state;

    }
};


const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: '0',
        text: 'Learn redux'
    };
    const stateAfter = [{
        id: '0',
        text: 'Learn redux',
        completed: false
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed');