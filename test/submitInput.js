import { fireEvent } from '@testing-library/react-native';

const submitInput = (targetInput, itemText) => {
  fireEvent.changeText(targetInput, itemText);
  fireEvent(targetInput, 'submitEditing');
};

export * from '@testing-library/react-native';
export { submitInput };
