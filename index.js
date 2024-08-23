/* Your Code Here */
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;

    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {

    let [date, time] = dateStamp.split(' ');
    let hour = parseInt(time);


    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    };

    this.timeInEvents = this.timeInEvents || [];
    this.timeInEvents.push(timeInEvent);

    return this;
}

function createTimeOutEvent(dateStamp) {

    let [date, time] = dateStamp.split(' ');
    let hour = parseInt(time);


    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    };

    this.timeOutEvents = this.timeOutEvents || [];
    this.timeOutEvents.push(timeOutEvent);

    return this;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);


    let hoursWorked = parseInt(timeOutEvent.hour) - parseInt(timeInEvent.hour);


    if (hoursWorked < 0) {
        hoursWorked += 24;
    }

    return hoursWorked / 100;
}

function wagesEarnedOnDate(employeeRecord, date, payPerHour) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let i = 0; i < srcArray.length; i++) {
      if (srcArray[i].firstName === firstName) {
        return srcArray[i];
      }
    }
    return undefined;
  }

function calculatePayroll(employeeRecords) {
    let totalPay = 0;
  
    for (const employeeRecord of employeeRecords) {
      const wages = allWagesFor(employeeRecord);
      totalPay += wages;
    }
  
    return totalPay;
}