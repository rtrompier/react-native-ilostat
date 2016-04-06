/**
 * Created by rtrompier on 01/04/16.
 */
let instance = null;

class FilterService{
    static currentYear = '2014';
    static currentCountry = 'FRA';

    constructor(){
        if(!instance){
            instance = this;
        }

        return instance;
    }

    static getCurrentYear(){
        return FilterService.currentYear;
    }

    static setCurrentYear(year){
        this.currentYear = year;
    }

    static getCurrentCountry(){
        return FilterService.currentCountry;
    }

    static setCurrentCountry(country){
        this.currentCountry = country;
    }

    static getYears(){
        return ['2008','2009','2010','2011','2012','2013','2014','2015','2016'];
    }
}

export default FilterService;