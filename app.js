// select form element
document.getElementById('loan-form').addEventListener('submit', function(e) {

    // Hide the results when the calculate function is clicked
    document.getElementById('results').style.display = 'none';

    // show the loading image once the submit function is clicked
    document.getElementById('loading').style.display = 'block';

    // set a timer for the loading icon
    setTimeout(calculateResult, 2000); // call the function calculateResult after 2 seconds
    // prevent default submition
    e.preventDefault();
});

// function to calculate the payment
function calculateResult(e) {
    // grab UI elements
    const amount = document.getElementById('amount'); // amount
    const interest = document.getElementById('interest'); // interest
    const yearsToRepay = document.getElementById('years'); // years to repay
    const monthlyPayment = document.getElementById('monthly-payment'); // monthly payment
    const totalPayment = document.getElementById('total-payment'); // total payment
    const totalInterest = document.getElementById('total-interest'); // total interest

    const principal = parseFloat(amount.value); // store the amount into principal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; // store the calculated interest into calculatedInterest
    const calculatedPayments = parseFloat(years.value) * 12; // multiple the years inputed by the user by 12 and store it into calculatedPayments
        

    // computer monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // check if monthly is finite
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); // store the monthly payment input as the value calculated and stored into monthly. Also round it to two decimal places.
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed();

        document.getElementById('results').style.display = 'block'; // display results
        document.getElementById('loading').style.display = 'none'; // hide loading icon
    }
    else {
        displayError('Please check your numbers');
    }
}

function displayError(error) {
    // if the user didn't input all numbers then we called this
    document.getElementById('results').style.display = 'none'; // hide results
    document.getElementById('loading').style.display = 'none'; // hide loading icon
    const errorDiv = document.createElement('div'); // create a div
    errorDiv.className = 'alert alert-danger'; // add bootstrap classes
    errorDiv.appendChild(document.createTextNode(error)); // create text node and append to the newly created div

    // get elements from ui
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // interest error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds (3000 miliseconds)
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove(); // select the error then remove it. It will disappear after 3 seconds
}