import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { build, fake } from '@jackfranklin/test-data-bot';
import { firebase as mockFirebase } from '../src/firebase/config';

import Todo from '../src/screens/todo';

// mockFirebase.firestore().useEmulator('localhost', 8080);

const userDataBuilder = build('User Data', {
  fields: {
    uid: fake((f) => f.internet.password()),
    fullName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
  },
});
const user = userDataBuilder();

const dataBuilder = build('Data', {
  fields: {
    word: fake((f) => f.lorem.word()),
  },
});
const data = dataBuilder();

const addItem = (targetInput, itemText) => {
  fireEvent.changeText(targetInput, itemText);
  fireEvent(targetInput, 'submitEditing');
};

afterEach(() => cleanup());

test('user is able to add an item to the to-do list', async () => {
  //* render the todo list
  const { getByText, getByPlaceholderText } = render(<Todo user={user} />);

  //* type in the input field & click submits
  addItem(getByPlaceholderText('What needs to be done?'), data.word);

  //* todo item should be added to the list
  expect(getByText(data.word)).toBeDefined();
  expect(getByText('1 items')).toBeDefined();
});

test('user should be able to toggle to-do item', async () => {
  //* render the todo list
  const { getByPlaceholderText, getByLabelText } = render(<Todo user={user} />);

  //* type in the input field & click submits
  addItem(getByPlaceholderText('What needs to be done?'), data.word);
  const itemSwitch = getByLabelText(`${data.word}-switch`);

  //* toggle switch
  fireEvent(itemSwitch, 'onValueChange', true);

  //* todo item should be completed
  expect(itemSwitch).toHaveProp('value', true);

  //* toggle switch
  fireEvent(itemSwitch, 'onValueChange', false);

  //* todo item should be active
  expect(itemSwitch).toHaveProp('value', false);
});

test('user should able to delete a to-do item ', async () => {
  //* render the todo list
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <Todo user={user} />,
  );
  const flatlist = getByLabelText('todo-list');

  //* type in the input field & click submit
  addItem(getByPlaceholderText('What needs to be done?'), data.word);
  const todoItem = getByText(data.word);
  const deleteButton = getByLabelText(`${data.word}-delete-button`);

  // * user press delet button
  fireEvent.press(deleteButton);

  //* todo item should be deleted from the list
  expect(getByText('0 items')).toBeDefined();
});
