import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { build, fake } from '@jackfranklin/test-data-bot';

import Todo from '../src/screens/todo';

const userDataBuilder = build('Data', {
  fields: {
    uid: fake((f) => f.internet.password()),
    fullName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
  },
});
const user = userDataBuilder();

test('user is able to add an item to the to-do list', () => {
  // render the todo list
  const { getByTestId, getByText, getByPlaceholderText } = render(
    <Todo user={user} />,
  );

  const input = getByPlaceholderText('What needs to be done?');

  //* user should type in the input field
  fireEvent(input, 'onChangeText', 'Go to the gym');

  //* user click submits
  fireEvent(input, 'submitEditing');

  //* todo item should be added to the list
  expect(getByText('Go to the gym')).toBeDefined();
});

// import { firebase as mockFirebase } from '../src/firebase/config';

// mockFirebase.firestore().useEmulator('localhost', 8080);

// beforeAll(() => {
//   mockFirebase
//     .firestore()
//     .collection('users')
//     .doc(user.uid)
//     .set({
//       ...user,
//       joined: mockFirebase.firestore.FieldValue.serverTimestamp(),
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// });
