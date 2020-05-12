var age, daysBetweenDates;
daysBetweenDates = function(d1, d2) {
  var diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
};

age = function() {
   $('#myAge').text("Age: " + daysBetweenDates('Dec 11, 1996 00:00:00', new Date()) / 365);
};

setInterval(age, 250);