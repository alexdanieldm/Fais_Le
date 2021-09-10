import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { build, fake } from '@jackfranklin/test-data-bot';
import { firebase as mockFirebase } from '../src/firebase/config';

import Todo from '../src/screens/todo';

// mockFirebase.firestore().useEmulator('localhost', 8080);

const userDataBuilder = build('User Data', {
  fields: {
    uid: fake((f) => f.random.uuid()),
    fullName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
  },
});
const user = userDataBuilder();

const itemBuilder = build('Fake Item', {
  fields: {
    key: fake((f) => f.random.uuid()),
    word: fake((f) => f.lorem.word()),
  },
});
const todoItem = itemBuilder();

const addItem = (targetInput, itemText) => {
  fireEvent.changeText(targetInput, itemText);
  fireEvent(targetInput, 'submitEditing');
};

test('user is able to add an item to the to-do list', async () => {
  //* render the todo list
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <Todo user={user} />,
  );

  //* get ToDo list and items counter
  const counter = getByText(/Items: */i);
  const todoList = getByLabelText(/todo-list/i);

  //* type in the input field & click submits
  addItem(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* todo item should be added to the list and counter should increse by one
  expect(todoList).toContainElement(getByText(todoItem.word));
  expect(counter).toHaveTextContent(/ *1/i);
});

test('user should be able to toggle to-do item', async () => {
  //* render the todo list
  const { getByPlaceholderText, getByRole, getByText, debug } = render(
    <Todo user={user} />,
  );

  //* type in the input field & click submits
  addItem(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* get ToDo item text and switch
  const itemText = getByText(todoItem.word);

  //* toggle switch
  fireEvent(getByRole('switch'), 'onValueChange', true);

  //* todo item should be active
  expect(itemText).toHaveStyle([{ textDecorationLine: 'line-through' }]);
});

test('user should able to delete a to-do item ', async () => {
  //* render the todo list
  const { getByText, getByPlaceholderText, getByLabelText, queryByText } =
    render(<Todo user={user} />);

  //* get ToDo list and items counter
  const counter = getByText(/Items: */i);

  //* type in the input field & click submits
  addItem(getByPlaceholderText(/What needs to be done?/i), todoItem.word);

  //* get ToDo list and items counter
  const deleteButton = getByLabelText('delete-button');
  fireEvent(deleteButton, 'onPress');

  //* todo item should be added to the list and counter should increse by one
  expect(queryByText(todoItem.word)).toBe(null);
  expect(counter).toHaveTextContent(/ *0/i);
});
