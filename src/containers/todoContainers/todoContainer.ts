import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTask, fetchTodo } from "redux/feature/todo/todoSlice";
import Todo from "pages/Todo";

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      addTask,
      fetchTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Todo);
