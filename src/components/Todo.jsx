import React from "react";
import { useState, useEffect } from "react";
import classes from "./Todo.module.css";
import TaskItems from "./TaskItems.jsx";
import InputField from "./InputField.jsx";

//LockalStorage
const getLocalItems = () => {
  let lists = localStorage.getItem("lists");
  if (lists) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

//APP
const Todo = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState(getLocalItems());
  const [status, setStatus] = useState("all");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "active":
          setFiltered(list.filter((item) => item.complete === false));
          break;
        case "done":
          setFiltered(list.filter((item) => item.complete === true));
          break;
        default:
          setFiltered(list);
      }
    };
    filterHandler();
  }, [list, status]);

  const addItem = () => {
    if (!userInput) return;
    const NewItemData = {
      id: Date.now(),
      name: userInput,
      complete: false,
    };
    setUserInput("");
    setList([...list, NewItemData]);
  };

  const doneDel = () => {
    let que = window.confirm("Точно удалить все выполненные задачи?");
    if (que) {
      const Dones = list.filter((e) => e.complete !== true);
      setList(Dones);
    }
  };

  const delItem = (id) => {
    const NewList = list.filter((e) => e.id !== id);
    setList(NewList);
  };

  const doneItem = (id) => {
    const doneList = list.map((task) => {
      return task.id === id
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setList(doneList);
  };

  const a = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <h1>TODOS</h1>
      </div>
      <InputField
        classes={classes}
        setUserInput={setUserInput}
        userInput={userInput}
        addItem={addItem}
      />
      <TaskItems
        classes={classes}
        filtered={filtered}
        doneItem={doneItem}
        delItem={delItem}
        a={a}
        doneDel={doneDel}
      />
    </div>
  );
};

export default Todo;
