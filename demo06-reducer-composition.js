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


const visibilityFilter = (state = {filter: 'SHOW_ALL'}, action) => {
    switch (action.type) {
        case 'SHOW_ALL':
            return {filter: 'SHOW_ALL'};
        case 'SHOW_COMPLETED':
            return {filter: 'SHOW_COMPLETED'};
        case 'SHOW_ACTIVE':
            return {filter: 'SHOW_ACTIVE'};
        default:
            return state;
    }
};


const {createStore, combineReducers} = Redux;
const reducers = combineReducers({todos, visibilityFilter});
const store = createStore(reducers);

const testReducers = () => {
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

    console.log('SHOW_COMPLETED');
    store.dispatch({
        type: 'SHOW_COMPLETED'
    });
    console.log(store.getState());
    console.log('----------------');


    console.log('SHOW_ACTIVE');
    store.dispatch({
        type: 'SHOW_ACTIVE'
    });
    console.log(store.getState());
    console.log('----------------');

};

testReducers();