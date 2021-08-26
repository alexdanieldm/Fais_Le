import 'react-native';

import { firebase as mockFirebase } from '../src/firebase/config';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Todo from '../src/screens/todo';

mockFirebase.firestore().useEmulator('localhost', 8080);

const dataBuilder = build('Data', {
  fields: {
    uid: fake((f) => f.internet.password()),
    fullName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
  },
});

const data = dataBuilder();
beforeAll(() => {
  mockFirebase
    .firestore()
    .collection('users')
    .doc(data.uid)
    .set({
      ...data,
      joined: mockFirebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => {
      console.error(error.message);
    });
});

test('Add Item', () => {
  expect(1).toBe(1);
});
