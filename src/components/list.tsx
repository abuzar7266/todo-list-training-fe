import React, { useState } from "react";
import ListItem from "containers/todoContainers/todoItemContainer";
import { IListProps, IEditState } from "../interfaces";
import "assets/css/list.css";

const List: React.FC<IListProps> = ({ taskList, loading, idTodo }) => {
  const [state, setState] = useState<IEditState>({
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
              <div className="todo-item">
                {loading && idTodo === data.id ? (
                  <p>Loading the item...</p>
                ) : (
                  <ListItem
                    key={idx}
                    task={data}
                    state={state}
                    handleEditable={handleEditable}
                  />
                )}
              </div>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
