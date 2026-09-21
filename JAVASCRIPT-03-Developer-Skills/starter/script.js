// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAamplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAamplitude(temperatures);
console.log(amplitude);

const calcTempAamplitudeNew = function (t1, t2) {
  // const array1 = ["a", "b", "c"];
  // const array2 = ["d", "e", "f"];
  // const array1 = array1.concat(array2);

  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAamplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);
*/

/* DEBUGING WITH THE CONSOLE AND BREAKPOINTS

const measureKelvin = function () {
  const measurement = {
    typr: "temp",
    unit: "cels",

    // C) FIX
    // value: Number(prompt("Degrees celcius:")),
    valuse: 10,
  };

  // B) FIND
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENTIFY
console.log(measureKelvin());

// USING A DEBUGGER
const calcTempAamplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAamplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBug);
*/

/* CODING CHALLENGE 1

// 1) UNDERSTANDING THE PROBLEM

// 2) BREAKING UP INTO SUB-PROBLEMS

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

console.log(`... ${data1[0]}C ... ${data1[1]}C ... ${data1[2]}C ...`);

const printForecast = function (arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}C in ${i + 1} days ... `;
  }
  console.log("... " + str);
};
printForecast(data1);
*/

// CODING CHALLENGE 2

function analyzeWorkWeek(hours) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const totalHours = hours.reduce((sum, h) => sum + h, 0);
  const averageHours = +(totalHours / hours.length).toFixed(1);
  const maxHours = Math.max(...hours);
  const maxDayIndex = hours.indexOf(maxHours);
  const mostProductiveDay = days[maxDayIndex];
  const daysWorked = hours.filter((h) => h > 0).length;
  const isFullTime = totalHours >= 35;

  return {
    totalHoursWorked: totalHours,
    averageDailyHours: averageHours,
    mostProductiveDay: mostProductiveDay,
    daysWorked: daysWorked,
    fullTime: isFullTime,
  };
}

// Example usage
const weeklyHours = [7.5, 8, 6.5, 0, 8.5, 5, 0];
const analysis = analyzeWorkWeek(weeklyHours);
console.log(analysis);

// Example usage
const weeklyHours2 = [7.5, 8, 6.5, 0, 8.5];
const analysis2 = analyzeWorkWeek(weeklyHours2);
console.log(analysis2);
