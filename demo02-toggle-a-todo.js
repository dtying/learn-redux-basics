const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: action.id,
                text: action.text,
                completed: false
            }];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (action.id !== todo.id) {
                    return todo;
                }
                return {...todo, completed: !todo.completed};
            });
        default:
            return state;

    }
};


const testToggleTodo = () => {
    const stateBefore = [{
        id: '0',
        text: 'Learn redux',
        completed: false
    }, {
        id: '1',
        text: 'Go shopping',
        completed: false
    }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: '1'
    };
    const stateAfter = [{
        id: '0',
        text: 'Learn redux',
        completed: false
    },{
        id: '1',
        text: 'Go shopping',
        completed: true
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    console.log(todos(stateBefore,action));
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testToggleTodo();
console.log('All tests passed');