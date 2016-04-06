/**
 * Created by rtrompier on 11/03/16.
 */
import TranslationService from './TranslationService';
    
class CountriesService{
    static list(){
        let lang = TranslationService.getCurrentLang();
        return fetch(`https://www.ilo.org/ilostatcp/rest/country/${lang}?_dc=${new Date().getTime()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json());
    }

    static detail(countryCode = 'FRA'){
        let lang = TranslationService.getCurrentLang();
        return fetch(`https://www.ilo.org/ilostatcp/rest/flat/${countryCode}/${lang}?_dc=${new Date().getTime()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json());

    }
}

export default CountriesService;