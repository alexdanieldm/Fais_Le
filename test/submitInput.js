import { fireEvent } from '@testing-library/react-native';

const submitInput = (targetInput, itemText) => {
  fireEvent.changeText(targetInput, itemText);
  fireEvent(targetInput, 'submitEditing');
};

const submitMultiples = (targetInput, wordsArray = []) => {
  for (let i = 0; i < wordsArray.length; i++) {
    submitInput(targetInput, wordsArray[i]);
  }
};

export * from '@testing-library/react-native';
export { submitInput, submitMultiples };
