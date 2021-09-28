import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { userDataBuilder, itemDataBuilder } from 'dataBuilders';
import { submitInput, submitMultiples } from 'submitInput';

import Todo from '../src/screens/todo';

const user = userDataBuilder();
const todoItem = itemDataBuilder();

test('should only show active items when using "ACTIVE" filter', () => {
  // render the todo screen
  const {
    getByPlaceholderText,
    getByText,
    getByLabelText,
    getAllByRole,
    queryByText,
  } = render(<Todo user={user} />);

  // get to-do list and input
  const todoList = getByLabelText(/todo-list/i);
  const input = getByPlaceholderText(/What needs to be done?/i);

  //* type in the input field & click submits multiple words
  submitMultiples(input, todoItem.extraWords);

  //* get one switch for each to-do item and toggle it
  const switchArray = getAllByRole('switch');

  switchArray.forEach((switchElement) => {
    fireEvent(switchElement, 'onValueChange', true);
  });

  //* type in the input field & click submit sentence
  submitInput(input, todoItem.sentence);

  // Press ACTIVE filter
  fireEvent.press(getByLabelText('show-active-items-button'));

  expect(todoList).toContainElement(getByText(todoItem.sentence));

  todoItem.extraWords.forEach((word) => {
    expect(todoList).not.toContainElement(queryByText(word));
    expect(queryByText(word)).toBeNull();
  });
});

test('should only show completed items when using "COMPLETED" filter', () => {
  // render the todo screen
  const {
    getByPlaceholderText,
    getByText,
    getByLabelText,
    getAllByRole,
    queryByText,
  } = render(<Todo user={user} />);

  // get to-do list and input
  const todoList = getByLabelText(/todo-list/i);
  const input = getByPlaceholderText(/What needs to be done?/i);

  //* type in the input field & click submits multiple words
  submitMultiples(input, todoItem.extraWords);

  //* get one switch for each to-do item and toggle it
  const switchArray = getAllByRole('switch');

  switchArray.forEach((switchElement) => {
    fireEvent(switchElement, 'onValueChange', true);
  });

  //* type in the input field & click submit sentence
  submitInput(input, todoItem.sentence);

  fireEvent.press(getByLabelText('show-completed-items-button'));

  expect(todoList).not.toContainElement(queryByText(todoItem.sentence));
  expect(queryByText(todoItem.sentence)).toBeNull();

  todoItem.extraWords.forEach((word) => {
    expect(todoList).toContainElement(getByText(word));
  });
});

test('should show ALL items again after using the "ACTIVE" or "COMPLETED" filter', () => {
  const { getByPlaceholderText, getByText, getByLabelText, getAllByRole } =
    render(<Todo user={user} />);

  // get to-do list and input
  const todoList = getByLabelText(/todo-list/i);
  const input = getByPlaceholderText(/What needs to be done?/i);

  //* type in the input field & click submits multiple words
  submitMultiples(input, todoItem.extraWords);

  //* get one switch for each to-do item and toggle it
  const switchArray = getAllByRole('switch');

  switchArray.forEach((switchElement) => {
    fireEvent(switchElement, 'onValueChange', true);
  });

  //* type in the input field & click submit sentence
  submitInput(input, todoItem.sentence);

  fireEvent.press(getByLabelText('show-completed-items-button'));
  fireEvent.press(getByLabelText('show-all-items-button'));

  expect(todoList).toContainElement(getByText(todoItem.sentence));
  todoItem.extraWords.forEach((word) => {
    expect(todoList).toContainElement(getByText(word));
  });

  // Press ACTIVE filter
  fireEvent.press(getByLabelText('show-active-items-button'));
  fireEvent.press(getByLabelText('show-all-items-button'));

  expect(todoList).toContainElement(getByText(todoItem.sentence));
  todoItem.extraWords.forEach((word) => {
    expect(todoList).toContainElement(getByText(word));
  });
});
