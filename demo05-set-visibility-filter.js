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

const {createStore} = Redux;
const store = createStore(visibilityFilter);


const testVisibilityFilter = () => {
    console.log('Initial State');
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


testVisibilityFilter();