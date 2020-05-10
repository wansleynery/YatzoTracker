
import express from 'express';
import { SETTINGS, translationFile, getLanguage, translationUrl } from '../assets/server/server';
import { requestJson } from '../assets/processor/commsProcessor';
import { isNullOrUndefined } from 'util';
import { readFilenames } from '../assets/processor/fileProcessor';

let epidemyList: [] = [];
let regionList: [] = [];

export function homeRouter(request: express.Request, response: express.Response, _next: () => void) {
    
    const vanillaCok: any = request.signedCookies.language;

    let root: any =
        {
            page: 'HOME',
            title: SETTINGS.service,
            isLogged: false
        };

    let data: any =
        {
            language: !isNullOrUndefined(vanillaCok) ? getLanguage(vanillaCok) : getLanguage(),
            languageList: readFilenames({ url: translationUrl, extension: 'json' }),
            languageSelected: vanillaCok,
            menu:
            [
                {
                    title: translationFile.label.menu.home,
                    link: '/'
                },
                {
                    title: translationFile.label.menu.epidemies,
                    link: '/epidemies'
                }
            ],
            epidemyList: epidemyList,
            regionList: regionList,
            periodList:
            [
                translationFile.label.periods.daily,
                translationFile.label.periods.weekly,
                translationFile.label.periods.monthly,
                translationFile.label.periods.annually
            ]
        };

    homeRequests()
        .then(() => {
            response.render(`index.pug`,
            {
                root: root,
                rootStr: JSON.stringify(root),
                data: data,
                dataStr: JSON.stringify(data)
            });
        });

}


function homeRequests (): Promise<any> {

    return new Promise<boolean> (async (resolve, reject) => {

        await requestJson('http://localhost:3000/epidemy/list')
            .then((result: any) => {
                epidemyList = result;
            })
            .catch((error) => reject(Error(error)));

        await requestJson('http://localhost:3000/')
            .then((result: any) => {
                regionList = result.regions;
            })
            .catch((error) => reject(Error(error)));

        resolve(true);
    });

}