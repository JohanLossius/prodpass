export function firstNameCheck(firstName) {
    const firstNameLength = firstName.trim().length;
    console.log(firstNameLength);
    if (firstNameLength >= 2) {
        return true;
    } else {
        return false;
    }
};

export function lastNameCheck(lastName) {
    const lastNameLength = lastName.trim().length;
    console.log(lastNameLength);
    if (lastNameLength >= 2) {
        return true;
    } else {
        return false;
    }
};

export function emailCheck(email) {
    const regEx = /\S+@\S+\.\S+/;
    const validEmail = regEx.test(email);
    console.log(validEmail);

    const studNoroffCont = email.indexOf('@stud.noroff.no');
    const noroffCont = email.indexOf('@noroff.no');

    if(validEmail === true && (noroffCont > -1 === true || studNoroffCont > -1 === true)) {
        return true;
    } else {
        return false;
    };
};

export function passwordCheck(password) {
    const passwordLength = password.trim().length;
    console.log(passwordLength);
    if (passwordLength >= 8) {
        return true;
    } else {
        return false;
    }
};