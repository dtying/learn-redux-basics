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

const {createStore} = Redux;
const store = createStore(todos);


const testTodo = () => {
    console.log('Initial State');
    console.log(store.getState());
    console.log('----------------');

    console.log('ADD_TODO');
    store.dispatch({
        type: 'ADD_TODO',
        id: '0',
        text: 'Learn redux'
    });
    console.log(store.getState());
    console.log('----------------');


    console.log('ADD_TODO');
    store.dispatch({
        type: 'ADD_TODO',
        id: '1',
        text: 'Go shopping'
    });
    console.log(store.getState());
    console.log('----------------');

    console.log('TOGGLE_TODO');
    store.dispatch({
        type: 'TOGGLE_TODO',
        id: '1'
    });
    console.log(store.getState());
    console.log('----------------');

};


testTodo();
