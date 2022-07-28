import React from 'react'

export default function inputField({
    classes,
    setUserInput,
    userInput,
    addItem
}) {

  return (
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
  )
}
