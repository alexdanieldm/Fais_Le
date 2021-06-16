const LogWithTime = (message, statesArray) => {
	let timeStamp = `@ ${new Date().getHours()}hrs ${new Date().getMinutes()}min ${new Date().getSeconds()}s ${new Date().getMilliseconds()}s`;

	if (message) {
		console.log(`${message} ${timeStamp}`);
	}
	else {
		console.log(`<----- ${timeStamp} ----->`);
	}
	if (statesArray) {
		statesArray.map((stateItem) => {
			console.log(stateItem);
		});
	}
	console.log('');
};

// ! DEBUG FUNCTIONS ROUTE
// import LogWithTime from './utils/logWithTime'
// ! DEBUG FUNCTIONS ROUTE

export default LogWithTime;
