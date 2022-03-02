
// Your code here
function createEmployeeRecords(array){

    let employees = []

    for(let element of array){
        employees.push(createEmployeeRecord(element))
    }

    return employees
}

function createEmployeeRecord(array){

    let obj = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }

    return obj
}

function createTimeInEvent(obj, dateStamp){

    let recordObj = obj
    let inHour = parseInt(dateStamp.slice(11))
    let inDate = dateStamp.slice(0,10)

    let timeInObj = {
        "type": "TimeIn",
        "hour": inHour,
        "date": inDate
    }

    recordObj.timeInEvents.push(timeInObj)

    return recordObj
}

function createTimeOutEvent(obj, dateStamp){

    let recordObj = obj
    let outHour = parseInt(dateStamp.slice(11))
    let outDate = dateStamp.slice(0,10)

    let timeOutObj = {
        "type": "TimeOut",
        "hour": outHour,
        "date": outDate
    }

    recordObj.timeOutEvents.push(timeOutObj)

    return recordObj
}

function hoursWorkedOnDate(obj, date){

    let foundInTime = obj.timeInEvents.find(function(f){
        if(f.date === date){
            return f
        }
    })

    let foundOutTime = obj.timeOutEvents.find(function(f){
        if(f.date === date){
            return f
        }
    })

    return (foundOutTime.hour - foundInTime.hour) / 100
}

function wagesEarnedOnDate(obj, date){

    let payPerHour = obj.payPerHour

    let hours = hoursWorkedOnDate(obj, date)

    return (payPerHour * hours)
}

function allWagesFor(obj){

    let eligibleDates = obj.timeInEvents.map(function (e) {
        return e.date
    })

    let totalWages = eligibleDates.reduce(function(p, c){
        return p + wagesEarnedOnDate(obj, c)
    }, 0)

    return totalWages
}

function calculatePayroll(array){

    let total = array.reduce(function(c, t){
        return c + allWagesFor(t)
    }, 0)

    return total
}
