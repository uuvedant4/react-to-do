import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems, setIsEditItems] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("List is empty!");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItems) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItems(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItems = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItems(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>To Do List 📃</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add task"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* {show items} */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItems(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove items */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Mark Done</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
