"use strict";
import { v4 as uuidv4 } from 'uuid';

function randomPassword() {
    const randomNumber = Math.floor(Math.random() * 100);
    let password = `${uuidv4()}-${randomNumber}`;
    if (password.length > randomNumber + 1) {
        password = password.slice(0, randomNumber) +
            password[randomNumber + 1] +
            password[randomNumber] +
            password.slice(randomNumber + 2);
    }
    return password;
}

export default randomPassword;
