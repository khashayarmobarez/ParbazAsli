
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NATIONAL_CODE_REGEX = /^\d{10}$/;

const USER_REGEX = /^[\u0600-\u06FF\s]+$/;

const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;

const PHONE_REGEX = /^09\d{9}$/;

const EMAIL_OR_PHONE_REGEX = /^(09\d{9}|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/;

// Regex patterns
const EQUIPMENT_SERIAL_NUMBER_PATTERN = /^[a-zA-Z0-9\-_ ]*$/;


export { EMAIL_REGEX, NATIONAL_CODE_REGEX, USER_REGEX, PWD_REGEX, PHONE_REGEX, EMAIL_OR_PHONE_REGEX, EQUIPMENT_SERIAL_NUMBER_PATTERN };