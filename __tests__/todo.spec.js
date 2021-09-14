import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { userDataBuilder, itemDataBuilder } from 'dataBuilders';
import { submitInput } from 'submitInput';
// import { firebase as mockFirebase } from '../src/firebase/config';
// mockFirebase.firestore().useEmulator('localhost', 8080);

import Todo from '../src/screens/todo';

const user = userDataBuilder();
const todoItem = itemDataBuilder();

test('user is able to add an item to the to-do list', async () => {
  //* render the todo screen
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <Todo user={user} />,
  );

  //* get to-do list and items counter
  const counter = getByText(/Items: */i);
  const todoList = getByLabelText(/todo-list/i);

  //* type in the input field & click submits
  submitInput(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* todo item should be added to the list and counter should increse by one
  expect(todoList).toContainElement(getByText(todoItem.word));
  expect(counter).toHaveTextContent(/ *1/i);
});

test('user should be able to toggle to-do item', async () => {
  //* render the todo screen
  const { getByPlaceholderText, getByRole, getByText, debug } = render(
    <Todo user={user} />,
  );

  //* type in the input field & click submits
  submitInput(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* get to-do item text and switch
  const itemText = getByText(todoItem.word);

  //* toggle switch
  fireEvent(getByRole('switch'), 'onValueChange', true);

  //* to-do item should be active
  expect(itemText).toHaveStyle([{ textDecorationLine: 'line-through' }]);
});

test('user should be able to update to-do item text', async () => {
  //* render the todo screen
  const {
    getByPlaceholderText,
    getByText,
    getByLabelText,
    queryByText,
    debug,
  } = render(<Todo user={user} />);

  //* type in the input field & click submits
  submitInput(getByPlaceholderText(/What needs to be done?/i), todoItem.word);
  const todoList = getByLabelText(/todo-list/i);

  //* Long press to-do item
  fireEvent(getByText(todoItem.word), 'onLongPress');

  //* Update type on input inside to-do item
  fireEvent.changeText(
    getByLabelText(/update-item-text-input/i),
    todoItem.sentence,
  );

  //* Press save button
  fireEvent.press(getByText(/save/i));

  //* to-do item previus text should have change
  expect(queryByText(todoItem.word)).toBe(null);
  expect(todoList).toContainElement(getByText(todoItem.sentence));
});

test('user should able to delete a to-do item ', async () => {
  //* render the to-do list
  const { getByText, getByPlaceholderText, getByLabelText, queryByText } =
    render(<Todo user={user} />);

  //* get to-do list and items counter
  const counter = getByText(/Items: */i);

  //* type in the input field & click submits
  submitInput(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* get to-do list and items counter
  const deleteButton = getByLabelText('delete-button');
  fireEvent(deleteButton, 'onPress');

  //* todo item should be remove from the list and counter should decrese by one
  expect(queryByText(todoItem.word)).toBe(null);
  expect(counter).toHaveTextContent(/ *0/i);
});
