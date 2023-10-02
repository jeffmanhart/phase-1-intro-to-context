// Your code here
function createEmployeeRecord(employee){
    let empObj={
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empObj;
}

function createEmployeeRecords(employeeArray){
    let allEmployees = []
    employeeArray.forEach(employee => {
        allEmployees.push(createEmployeeRecord(employee))
    });
    return allEmployees;
}

function createTimeInEvent(emplObj, time){
    let dateTime = time.split(' ')
    let timeInEvent = {
        type: 'TimeIn',
        date: dateTime[0],
        hour: Number(dateTime[1])
    }
    emplObj.timeInEvents.push(timeInEvent)
    return emplObj
}
function createTimeOutEvent(emplObj, time){
    let dateTime = time.split(' ')
    let timeOutEvent = {
        type: 'TimeOut',
        date: dateTime[0],
        hour: Number(dateTime[1])
    }
    emplObj.timeOutEvents.push(timeOutEvent)
    return emplObj
}

const hoursWorkedOnDate=(record,date)=>{
    const filterTimeIn = record.timeInEvents.filter(e=>e.date ===date)
    const filterTimeOut = record.timeOutEvents.filter(e=>e.date ===date)
    const timeIn = filterTimeIn[0].hour
    const timeOut = filterTimeOut[0].hour
    return (timeOut - timeIn )/ 100

}
function wagesEarnedOnDate(record,date){
    const payRate = record.payPerHour
    const hours = hoursWorkedOnDate(record,date)
    return hours * payRate
}
function allWagesFor(employee){
    const temp = employee.timeInEvents
    let allWages = 0
    temp.forEach(element => {
        debugger
        allWages += wagesEarnedOnDate(employee,element.date)
    });
    return allWages
}
function calculatePayroll(employees){
    let payroll = 0
    employees.forEach(empl=> {
        payroll+= allWagesFor(empl)
    });
    return payroll
}