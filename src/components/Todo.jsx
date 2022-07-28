import React from "react";
import { useState, useEffect } from "react";
import classes from "./Todo.module.css";

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

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
  }, [list]);

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

  return (
    <div className={classes.wrapper}>
      <div>
        <h1>TODOS</h1>
      </div>
      <div className={classes.inputField}>
        <input
          type="text"
          placeholder="Введите"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyPress={(e) => e.key === "Enter" && addItem()}
          data-testid="input-data"
        />
      </div>
      <div className={classes.listBox}>
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              <p
                onClick={() => doneItem(item.id)}
                className={item.complete ? classes.todostrike : classes.todo}
                data-testid="input-result"
              >
                {item.name}
              </p>
              <button
                onClick={() => delItem(item.id)}
                className={classes.delbtn}
                data-testid="delete-elem"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className={classes.underBlock}>
          <p className={classes.count}>Задач осталось: {list.length}</p>
          <div className={classes.sections}>
            <button>Все</button>
            <button>Активные</button>
            <button>Выполненные</button>
          </div>
          <button onClick={() => doneDel()} className={classes.done_del}>
            Удалить выполненные
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
