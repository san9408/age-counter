const inputDay = document.querySelector('#Bday')
const inputMonth = document.querySelector('#Bmonth')
const inputYear = document.querySelector('#Byear')
const submitButton = document.querySelector('#calculate')
const labelDay = document.querySelector('#days-result')
const labelMonth = document.querySelector('#months-result')
const labelYear = document.querySelector('#years-result')
const allInputs = document.querySelectorAll('.input')
const alllabels = document.querySelectorAll('.container__inputs__box')
const allInfo = document.querySelectorAll('.info')


const yearDiff = (date1, date2) => {
    let lastBdayYear = date2.getFullYear()
    let years
    if (date1.getMonth() > date2.getMonth()){
      years = (date2.getFullYear() - date1.getFullYear()) - 1
      lastBdayYear--
    } else {
      years = (date2.getFullYear() - date1.getFullYear())
    }
    return {years: years, lastBdayYear: lastBdayYear}
  }

const monthDiff = (date1, date2) => {
    let months
    months = (date2.getFullYear() - date1.getFullYear()) * 12
    months -= date1.getMonth()
    months += date2.getMonth()
    return months <= 0 ? 0 : months
}

const substractDates = (bYear, bMonth, bDay) => {
    const today = new Date()
    const bDate = new Date(bYear, bMonth - 1, bDay)
    const yearsDiff = yearDiff(bDate, today)
    const lastBday = new Date(yearsDiff.lastBdayYear, bDate.getMonth(), bDate.getDate())

    let years = yearsDiff.years
    let months = monthDiff(lastBday, today)
    let days = today.getDate() - bDate.getDate()

    return {years: years, months: months, days: days}
}


submitButton.addEventListener('click',() => {
    let result = substractDates(inputYear.valueAsNumber, inputMonth.valueAsNumber, inputDay.valueAsNumber)
    let emptyInputs = 0

    for (input = 0; input < allInputs.length; input++){
    //for (input in allInputs){
    
        if (allInputs[input].value ==''){

            allInputs[input].classList.add('required')
            alllabels[input].classList.add('label-required')
            allInfo[input].classList.add('show')
            emptyInputs ++

        } else {
            allInputs[input].classList.remove('required')
            alllabels[input].classList.remove('label-required')
            allInfo[input].classList.remove('show')
        }
    }   

    console.log(emptyInputs)

    if (emptyInputs==0){
        labelYear.innerHTML = result.years
        labelMonth.innerHTML = result.months
        labelDay.innerHTML = result.days
    } else {
        labelYear.innerHTML = '--'
        labelMonth.innerHTML = '--'
        labelDay.innerHTML = '--'
    }
    
})

