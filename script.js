let passwordLength = document.getElementById("passwordLength");
let password = document.getElementById("password");
let saveButton = document.getElementById("saveButton");

function generatePassword(length) {
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeric = "123456789";
  const symbol = "!@#$%^&*";

  const data = lowerAlphabet + upperAlphabet + numeric + symbol;
  let generator = "";
  for (let index = 0; index < length; index++) {
    generator += data[~~(Math.random() * data.length)];
  }
  return generator;
}

function getPassword() {
if(passwordLength.value === "") {
  alert("Please fill in the length of the password");
  return;
}

  const newPassword = generatePassword(passwordLength.value);
  password.value = newPassword;
  alert("Password has been generated");
}

function savePassword() {
  document.title = password.value;
  saveButton.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," 
    +encodeURIComponent(`password saya : ${document.title}`),
  );
  saveButton.setAttribute('Download', 'MyPasswordGeneratorLOG.txt');
  alert("Berhasil disimpan");
}
