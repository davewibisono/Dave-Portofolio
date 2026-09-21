/* VALUES AND VARIABLES
let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Matilda";

console.log(firstName);
console.log(firstName);
console.log(firstName);

//  Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";

console.log(myFirstJob);
*/

/* DATA TYPES
let javaScriptIsFun = true;
console.log(javaScriptIsFun);

// console.log(typeof true);
console.log(typeof javaScriptIsFun);
// console.log(typeof 23);
// console.log(typeof "Jonas");

javaScriptIsFun = "YES!";
console.log(typeof javaScriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);
*/

/* LET, CONST, VAR
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;
// const job;

var job = "programmer";
job = "teacher";

lastName = "Schmedtmann";
console.log(lastName);
*/

/* BASIC OPERATORS
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = "David";
console.log(firstName + " " + lastName);

// Assingment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
x--; // x = x - 1

console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/

/* OPERATOR PRECEDENCE
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/

/* IF / ELSE STATEMENT
const age = 15;

if (age >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/

/* TYPE CONVERSION AND COERCION
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Jonas")); // Nan = Not a Number (Invalid)
console.log(typeof NaN);

console.log(String(23), 23);

// TYPE COERCION
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" * "2");
console.log("23" / "2");

let n = "1" + 1; // '11'
n = n - 1; // 11 - 1 = 10
console.log(n); // = 10
*/

/* TRUTHY AND FALSY VALUES
// 5 FALSY VALUE: 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({}));
console.log(Boolean(""));

const money = 100;
if (money) {
  console.log("Don't spend it all :)");
} else {
  console.log("You should get a job!");
}

let height = 0;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}
*/

/* EQUALITY OPERATORS: == VS == (MIRIP BOOLEAN TRUTH / FALSE)
const age = "18";
if (age === 18) console.log("You just became an adult :D (strict)");

if (age == 18) console.log("You just became an adult :D(loose)");

const fav = Number(prompt("What's your fav number?"));
console.log(fav);
console.log(typeof fav);

if (fav === 23) {
  // 23 === 23 -> FALSE
  console.log("Cool! 23 is an amazing number!");
} else if (fav === 7) {
  console.log("7 is also a cool number");
} else if (fav === 9) {
  console.log("9 is also a cool number");
} else {
  console.log("Number is not 23 or 7 or 9");
}

if (fav !== 23) console.log("Why not 23?");
*/

// BOOLEAN LOGIC

/* LOGICAL OPERATORS
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//   console.log("Sarah is able to drive!");
// } else {
//   console.log("Someone else should drive...");
// }

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}
*/

/*  THE SWITCH STATEMENT
const day = "friday";

switch (day) {
  case "monday": // day === 'monday'
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record video");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weened :D");
    break;
  default:
    console.log("Not a valid day!");
}

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record video");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weened :D");
} else {
  console.log("Not a valid day!");
}
*/

/* STATEMENTS AND EXPRESSIONS
3 + 4;
1991;
true && false && !false;

if (23 > 10) {
  const str = "23 is bigger";
}

const me = "Jonas";
console.log(`I'm ${2037 - 1991} years old ${me}`);
*/

/* THE CONDITIONAL (TERNARY) OPERATOR
const age = 15;
// age >= 18
//   ? console.log("I like to drink wine 🍷")
//   : console.log("I like to drink water 💧");

const drink = age >= 18 ? "wine 🍷" : "water 💧";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine 🍷";
} else {
  drink2 = "water 💧";
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`);
*/

// ////////////////////////////////////////////////////////
/* Coding Challenge Part 1
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);
*/

/*
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName + ", a " + (year - birthYear) + "years old " + job + "!";
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} yaer old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log(
  "String with \n\
  multiple \n\
  lines"
);

console.log(`String 
  multiple 
  lines`);
*/

/* Coding Challenge Part 2
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's`);
}
*/

/* Coding Challenge Part 3
// const scoreDolphins = (96 + 108 + 89) / 3;
// const scroreKoalas = (88 + 91 + 110) / 3;
// console.log(scoreDolphins, scroreKoalas);

// if (scoreDolphins > scroreKoalas) {
//   console.log("Dolphins win the trophy 🏆");
// } else if (scoreDolphins < scroreKoalas) {
//   console.log("Koalas win the trophy 🏆");
// } else if (scoreDolphins === scroreKoalas) {
//   console.log("Both win the trophy!");
// }

// BONUS 1
const scoreDolphins = (97 + 112 + 80) / 3;
const scroreKoalas = (109 + 95 + 86) / 3;
console.log(scoreDolphins, scroreKoalas);

if (scoreDolphins > scroreKoalas && scoreDolphins >= 100) {
  console.log("Dolphins win the trophy 🏆");
} else if (scoreDolphins < scroreKoalas && scroreKoalas >= 100) {
  console.log("Koalas win the trophy 🏆");
} else if (
  scoreDolphins === scroreKoalas &&
  scoreDolphins >= 100 &&
  scroreKoalas >= 100
) {
  console.log("Both win the trophy!");
} else {
  console.log("No one wins the trophy 🥹");
}
*/

/* Coding Challenge Part 4
const bill = 430;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
*/
