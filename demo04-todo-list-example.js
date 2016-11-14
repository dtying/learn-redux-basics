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

const {Component} = React;

let todoId = 0;
class TodoApp extends Component {
    render() {
        const {todos} = this.props;
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
                    {todos.map(todo => (
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
            </div>
        );
    }
}
;


const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState()}/>,
        document.getElementById('root'));
};

render();
store.subscribe(render);