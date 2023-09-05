import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { updateTask, deleteTask, taskMarkDone } from 'redux/feature/todo/todoSlice';
import ListItem from 'components/listItem';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        updateTask,
        deleteTask,
        taskMarkDone
      },
      dispatch
    );
};

export default connect(null, mapDispatchToProps)(ListItem);
