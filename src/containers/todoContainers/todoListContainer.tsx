import { connect } from "react-redux";
import { RootState } from "redux/store";
import TodoList from "components/list";

const mapStateToProps = (state: RootState) => ({
  taskList: state.todo.taskList,
  loading: state.todo.loading,
  idTodo: state.todo.id,
});

export default connect(mapStateToProps)(TodoList);
