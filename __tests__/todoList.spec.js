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

  //* get to-do list, items counter and input
  const counter = getByText(/active: */i);
  const input = getByPlaceholderText(/What needs to be done?/i);

  //* type in the input field & click submits multiple times
  submitMultiples(input, todoItem.extraWords);

  //* Press toggle-all button
  fireEvent.press(getByLabelText('complete-all-button'));

  //* get one switch for each to-do item
  const switchArray = getAllByRole('switch');

  //* to-do list counter should decrease to zero
  expect(counter).toHaveTextContent(/ *0/i);

  //* check all switches with words
  switchArray.forEach((switchElement) => {
    //* value prop should be true
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
  } = render(<Todo user={user} />);

  //* get to-do list, items counter and input
  const todoList = getByLabelText(/todo-list/i);
  const counter = getByText(/active: */i);
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

  //* Press toggle-all button
  fireEvent.press(getByLabelText('clear-completed-items-button'));

  //* to-do list counter should decrease to 1
  expect(counter).toHaveTextContent(/ *1/i);

  //* to-do item with a sentence should still be on the list
  expect(todoList).toContainElement(getByText(todoItem.sentence));

  // //* check all switches with words
  todoItem.extraWords.forEach((word) => {
    //* to-do item should be remove
    expect(todoList).not.toContainElement(queryByText(word));
    expect(queryByText(word)).toBeNull();
  });
});
