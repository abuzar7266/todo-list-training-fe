import React, { useState } from "react";
import { connect } from "react-redux";
import ListItem from "./listItem";
import { RootState } from "redux/store";
import { ListProps, EditState } from "../interfaces";
import "../assets/css/list.css";

const mapStateToProps = (state: RootState) => ({
  taskList: state.todo.taskList,
});

const List: React.FC<ListProps> = ({ taskList }) => {
  const [state, setState] = useState<EditState>({
    id: "",
    isEditable: 0,
  });
  const handleEditable = (id: string, isEditable: number) => {
    setState({ id: id, isEditable: isEditable });
  };
  return (
    <>
      <table className="table table-sm list-block">
        <tbody className="list-body">
          {taskList.map((data, idx) => {
            return (
              <ListItem
                key={idx}
                task={data}
                state={state}
                handleEditable={handleEditable}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
// export default List;
export default connect(mapStateToProps)(List);
