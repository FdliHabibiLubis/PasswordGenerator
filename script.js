let passwordLength = document.getElementById("passwordLength");
let password = document.getElementById("password");

function generatePassword(length) {
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numeric = "123456789"
    const symbol = "!@#$%^&*"

    const data  = lowerAlphabet + upperAlphabet + numeric + symbol;
    let generator = "";
    for(let index = 0; index < length; index++){
        generator += data[~~(Math.random() * data.length)];
    }
    return generator;
}

function getPassword() {
    const newPassword = generatePassword(passwordLength.value)
    password.value = newPassword;
    alert("Password has been generated");
}
 
function savePassword() {

}