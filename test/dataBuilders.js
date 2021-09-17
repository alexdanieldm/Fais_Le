import { build, fake } from '@jackfranklin/test-data-bot';

const ramdomWords = (wordsNumber) => {
  let wordsArray = [];
  for (let i = 0; i < wordsNumber; i++) {
    wordsArray.push(fake((f) => f.lorem.word()));
  }
  return wordsArray;
};

const userDataBuilder = build('User Data', {
  fields: {
    uid: fake((f) => f.random.uuid()),
    fullName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
  },
});

const itemDataBuilder = build('Fake Item', {
  fields: {
    key: fake((f) => f.random.uuid()),
    word: fake((f) => f.lorem.word()),
    sentence: fake((f) => f.lorem.sentence(3)),
    extraWords: ramdomWords(5),
  },
});

export * from '@jackfranklin/test-data-bot';
export { userDataBuilder, itemDataBuilder };
