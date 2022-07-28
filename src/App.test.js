import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './components/Todo'

test('Input Value', () => {
  render(<Todo />);
  const input = screen.getByTestId('input-data');
  expect(input).toContainHTML('');
  fireEvent.input(input, {
    target: {value: 'Пункт 1'}
  })
  expect(input).toContainHTML('Пункт 1');
});

test('Add Task & delete task', () => {
  render(<Todo />);
  const input = screen.getByTestId("input-data");
  fireEvent.input(input, {
    target: {value: 'Пункт 1'}
  })
  fireEvent.keyPress(input, {key: 'Enter', code: 13, charCode: 13});
  expect(input).not.toContainHTML('Пункт 1'); // Поле input очистилось после добавления элемента
  const res = screen.getByTestId("input-result");
  expect(res).toBeInTheDocument(); // Элемент добавился
  expect(res).toContainHTML('Пункт 1'); // Текст элемента соотвествует введенным в input Данным
  const delbtn = screen.getByTestId("delete-elem");
  fireEvent.click(delbtn); // Вызов функции удаления
  expect(res).not.toBeInTheDocument(); // Элемент удален
  screen.debug();
});
