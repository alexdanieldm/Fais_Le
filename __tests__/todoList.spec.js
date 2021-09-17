import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { userDataBuilder, itemDataBuilder } from 'dataBuilders';
import { submitInput, submitMultiples } from 'submitInput';

import Todo from '../src/screens/todo';

const user = userDataBuilder();
const todoItem = itemDataBuilder();

test('all item should be toggle at the same time', () => {
  //* render the todo screen
  const { getByPlaceholderText, getByText, getByLabelText, getAllByRole } =
    render(<Todo user={user} />);

  //* get items counter
  const counter = getByText(/Items: */i);

  //* type in the input field & click submits multiple times
  submitMultiples(
    getByPlaceholderText(/What needs to be done?/i),
    todoItem.extraWords,
  );

  //* Press toggle-all button
  fireEvent.press(getByLabelText('complete-all-button'));

  //* get one switch for each to-do item
  const switchArray = getAllByRole('switch');

  //* to-do list counter should decrease to zero
  expect(counter).toHaveTextContent(/ *0/i);

  //* check value prop of all switch should be true
  switchArray.forEach((switchElement) => {
    expect(switchElement).toHaveProp('value', true);
  });
});

test('all completed item should be deleted at the same time', () => {
  //* render the todo screen
  const {
    getByPlaceholderText,
    getByText,
    getByLabelText,
    getAllByRole,
    queryByText,
    debug,
  } = render(<Todo user={user} />);

  //* get to-do list and items counter
  const todoList = getByLabelText(/todo-list/i);
  const counter = getByText(/Items: */i);

  //* type in the input field & click submits multiple words
  submitMultiples(
    getByPlaceholderText(/What needs to be done?/i),
    todoItem.extraWords,
  );

  //* get one switch for each to-do item and toggle it
  const switchArray = getAllByRole('switch');

  switchArray.forEach((switchElement) => {
    fireEvent(switchElement, 'onValueChange', true);
  });

  //* type in the input field & click submit sentence
  submitInput(
    getByPlaceholderText(/What needs to be done?/i),
    todoItem.sentence,
  );

  //* Press toggle-all button
  fireEvent.press(getByLabelText('clear-completed-items-button'));

  //* to-do list counter should decrease to 1
  expect(counter).toHaveTextContent(/ *1/i);

  expect(todoList).toContainElement(getByText(todoItem.sentence));

  // //* check value prop of all switch should be true
  todoItem.extraWords.forEach((todoItemWord) => {
    expect(todoList).not.toContainElement(queryByText(todoItemWord));
    expect(queryByText(todoItemWord)).toBeNull();
  });
});
