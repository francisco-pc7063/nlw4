class DatePostgres{
    date: Date
    fullYear: number
    month: number
    dayOfMonth: number
    hourOfDay: number
    minutes: number
    second: number

    constructor( date?: Date | string ){
        if(typeof(date) === 'string'){
            this.date = new Date(date)
        }
        else {
            this.date = date || new Date()
        }
        this.fullYear = this.date.getFullYear()
        this.month = this.date.getMonth()
        this.dayOfMonth = this.date.getDate()
        this.hourOfDay = this.date.getHours()
        this.minutes = this.date.getMinutes()
        this.second = this.date.getSeconds()

    }
    getDate(): string{
        let result = `${this.fullYear}-${this.month}-${this.dayOfMonth} ${this.hourOfDay}:${this.minutes}:${this.second}`
        return result
    }
}

export default DatePostgres