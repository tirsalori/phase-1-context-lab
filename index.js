/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedEmpArray){
    const newEmpArray = []
    for (let array of nestedEmpArray) {
        newEmpArray.push(createEmployeeRecord(array))
    }
    return newEmpArray
}

function createTimeInEvent(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    })
    return this
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    })
    return this
}

function hoursWorkedOnDate(dateStamp){
    for (let i = 0; i < this.timeInEvents.length; i++){
        if(this.timeInEvents[i].date === dateStamp.slice(0,10)){
            return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour)/100
        }
    }
}

function wagesEarnedOnDate(dateStamp){
    return parseInt(hoursWorkedOnDate.call(this, dateStamp)) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(empArray, firstName){
    for (let i = 0; i < empArray.length; i++){
        if (empArray[i].firstName === firstName){
            return empArray[i]
        } else {
            return undefined
        }
    }
}

function calculatePayroll(empRecordArray){
    let payroll = 0
    for (let empRecord of empRecordArray){
        payroll += allWagesFor.call(empRecord)
    }
    return payroll
}
