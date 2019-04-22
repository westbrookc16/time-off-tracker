import moment from 'moment';
const validateDate = (date, message) => {
	if (!moment(date, 'M/D/YYYY', true).isValid()) {
		return message;
	} else return '';
};
const validateNumber = (number, message) => {
	if (number === '' || isNaN(number)) {
		return message;
	} else {
		return '';
	}
};
const validateText = (text, message) => {
	return text === '' ? message : '';
};
export { validateDate, validateText, validateNumber };
