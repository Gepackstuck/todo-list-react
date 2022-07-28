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
          {filtered.map((item) => (
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
          <p className={classes.count}>Задач осталось: {filtered.length}</p>
          <div className={classes.sections}>
            <button value="all" onClick={a}>
              Все
            </button>
            <button value="active" onClick={a}>
              Активные
            </button>
            <button value="done" onClick={a}>
              Выполненные
            </button>
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
