const timed_log = (message, statesArray) => {
  let timeStamp = `@ ${new Date().getHours()}hrs ${new Date().getMinutes()}min ${new Date().getSeconds()}s ${new Date().getMilliseconds()}s`;

  if (message) {
    console.log(`${message} ${timeStamp}`);
  } else {
    console.log(`<----- ${timeStamp} ----->`);
  }

  if (statesArray) {
    statesArray.map((stateItem) => {
      console.log(stateItem);
    });
  }
};

// ! DELETE AFTER DEBUGGING SESSION
// import timed_log from '../utils/logWithTime';
// ! DELETE AFTER DEBUGGING SESSION

export default timed_log;
