import { connect } from 'react-redux';
import TodoList from 'components/list';
import { RootState } from 'redux/store';

  
const mapStateToProps = (state: RootState) => ({
    taskList: state.todo.taskList,
    loading: state.todo.loading,
    idTodo: state.todo.id
});


export default connect(mapStateToProps)(TodoList);
