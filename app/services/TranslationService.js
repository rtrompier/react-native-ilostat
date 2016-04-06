/**
 * Created by rtrompier on 01/04/16.
 */
import I18n from 'react-native-i18n';
var fr = require('../i18n/fr.json');
var en = require('../i18n/en.json');

let instance = null;

class TranslationService{
    static currentLang = 'en';

    constructor(){
        if(!instance){
            instance = this;
        }

        I18n.fallbacks = true;
        I18n.locale = TranslationService.currentLang;
        I18n.translations = {
            en: en,
            fr: fr
        };

        return instance;
    }

    static translate(key){
        return I18n.t(key);
    }

    static changeLang(lang = TranslationService.currentLang){
        TranslationService.currentLang = lang;
        I18n.locale = lang;
    }

    static getCurrentLang(){
        return TranslationService.currentLang;
    }

    static getLangs(){
        return [{
            key: 'en',
            label: 'English'
        },{
            key: 'fr',
            label: 'Français'
        }]
    }
}

export default TranslationService;