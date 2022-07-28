import React from 'react'

export default function taskItems({
    classes,
    filtered,
    doneItem,
    delItem,
    a,
    doneDel,

}) {
  return (
          <div className={classes.taskItems}>
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
  )
}
