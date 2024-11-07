// Select all input elements with the class "card__input"
let inputElement = document.querySelectorAll(".card__input");

// Select the submit button with the class "card__button"
let submitButton = document.querySelector(".card__button");

// Function to validate the day. Checks if the day is between 1 and 31
let validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

// Function to validate the month. Checks if the month is between 1 and 12
let validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};

// Function to validate the year. Checks if the year is greater than 0 and less than or equal to the current year
let validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

// Function to validate the complete date (day, month, year). Adds or removes the error class based on the validity of each field
let isDateValid = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false]; // Array to track the validity of the day, month, and year
  
  // Validate the day and add/remove the error class based on the result
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }
  
  // Validate the month and add/remove the error class based on the result
  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  }
  
  // Validate the year and add/remove the error class based on the result
  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }
  
  // Return true if all values in the isValid array are true (i.e., the date is valid)
  return isValid.every((item) => item === true);
};

// Function to calculate the age based on the given year, month, and day
const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day); // Create a date object for the user's birthdate
  let age = today.getFullYear() - birthdate.getFullYear(); // Calculate the initial age based on the years
  let monthDiff = today.getMonth() - birthdate.getMonth(); // Calculate the difference between the current month and the birth month

  // Adjust the age if the birth month has not passed yet or if today is before the birthdate in the current month
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age; // Return the final age
};

// Event handler that is executed when the submit button is clicked or the "Enter" key is pressed
const onClickHandler = () => {
  // Get the input elements for day, month, and year
  let dayElement = document.querySelector('.card__input[name="day"]');
  let monthElement = document.querySelector('.card__input[name="month"]');
  let yearElement = document.querySelector('.card__input[name="year"]');
  
  // Get the element that will display the result (calculated age)
  let resultElement = document.querySelector(".card__resultValue");
  
  // Validate the date before calculating the age. If invalid, set the result to "__"
  if (!isDateValid(dayElement, monthElement, yearElement)) {
    resultElement.textContent = "__";
    return;
  }
  
  // Calculate the age based on the valid date and display it
  resultElement.textContent = calculateAge(yearElement.value, monthElement.value, dayElement.value);
};

// Add "Enter" key event listeners to all input elements to trigger the onClickHandler function
inputElement.forEach((item) => {
  item.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && onClickHandler()
  );
});

// Add a click event listener to the submit button to trigger the onClickHandler function
submitButton.addEventListener("click", onClickHandler);
