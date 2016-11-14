
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


const getVisibleTodos = (todos, currentFilter) => {
    switch (currentFilter.filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
};


const {createStore, combineReducers} = Redux;
const reducers = combineReducers({todos, visibilityFilter});
const store = createStore(reducers);

const {Component} = React;

class FilterLink extends Component {
    render() {
        const {filterType, currentFilter, text} = this.props;
        console.log(text);
        if (filterType === currentFilter.filter) {
            return (
                <span>{text}</span>
            );
        } else {
            return (
                <a href="#"
                   onClick={(e)=>{e.preventDefault(); store.dispatch({type: filterType});}}>{text}</a>
            );
        }
    }
}

let todoId = 0;
class TodoApp extends Component {
    render() {
        const {todos, visibilityFilter} = this.props.value;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        console.log(visibleTodos);
        return (
            <div>
                <input ref={(inputDOM) => {this.input = inputDOM}}/>
                <button onClick={() => {store.dispatch({
            type: 'ADD_TODO',
            id: todoId++,
            text: this.input.value
            });
            this.input.value='';
            }}>
                    Add Todo
                </button>
                <ul>
                    {visibleTodos.map(todo => (
                            <li key={todo.id}
                                onClick={()=>{
                            store.dispatch({
                            type: 'TOGGLE_TODO',
                            id: todo.id
                            });
                            }}
                                style={{textDecoration: todo.completed? 'line-through' : 'none'}}>{todo.text}</li>
                        )
                    )}
                </ul>
                <span>Show:
                    {' '}
                    <FilterLink filterType='SHOW_ALL' currentFilter={visibilityFilter} text={'All'} />
                    {' '}
                    <FilterLink filterType='SHOW_COMPLETED' currentFilter={visibilityFilter} text={'Completed'} />
                    {' '}
                    <FilterLink filterType='SHOW_ACTIVE' currentFilter={visibilityFilter} text={'Active'} />
                </span>
            </div>
        );
    }
}
;


const render = () => {
    ReactDOM.render(
        <TodoApp value={store.getState()}/>,
        document.getElementById('root'));
};

render();
store.subscribe(render);
