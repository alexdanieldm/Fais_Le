import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { build, fake } from '@jackfranklin/test-data-bot';

import Todo from '../src/screens/todo';

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

const addItem = (targetInput, itemText) => {
  //* user should type in the input field
  fireEvent.changeText(targetInput, itemText);

  //* user click submits
  fireEvent(targetInput, 'submitEditing');
};

test('user is able to add an item to the to-do list', () => {
  const data = dataBuilder();

  //* render the todo list
  const { getByText, getByPlaceholderText } = render(<Todo user={user} />);

  const input = getByPlaceholderText('What needs to be done?');

  //* user should type in the input field & click submits
  addItem(input, data.word);

  //* todo item should be added to the list
  expect(getByText(data.word)).toBeDefined();
  expect(getByText('1 count')).toBeDefined();
});

test('user should be able to complete to-do item', () => {
  const data = dataBuilder();

  //* render the todo list
  const { getByPlaceholderText, getByLabelText } = render(<Todo user={user} />);
  const input = getByPlaceholderText('What needs to be done?');

  //* user should type in the input field & click submits
  addItem(input, data.word);

  const itemSwitch = getByLabelText(`${data.word}-switch`);
  // //* user should toggle switch
  fireEvent(itemSwitch, 'onValueChange', true);

  //* todo item should be completed
  expect(itemSwitch).toHaveProp('value', true);
});
