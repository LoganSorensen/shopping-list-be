const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

const date = new Date();
const [month, weekday, day, year] = [
  date.getMonth(),
  date.getDay(),
  date.getDate(),
  date.getFullYear(),
];

const formatMonthAndYear = () => `${months[month]} ${year}`;

const formatDate = () => `${daysOfTheWeek[weekday]} ${month}.${day}.${year}`

module.exports = { formatMonthAndYear, formatDate };
