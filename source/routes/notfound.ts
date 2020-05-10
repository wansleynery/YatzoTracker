
import express from 'express';
import { SETTINGS, translationFile, getLanguage, translationUrl } from '../assets/server/server';
import { isNullOrUndefined } from 'util';
import { readFilenames } from '../assets/processor/fileProcessor';

export function notFoundRouter(request: express.Request, response: express.Response, _next: () => void) {

    const vanillaCok: any = request.signedCookies.language;

    let root: {} =
        {
            page: 'NOTFOUND',
            title: SETTINGS.service,
            isLogged: false
        };

    let data: {} =
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
            ]
        };

    response.render(`index.pug`,
        {
            root: root,
            rootStr: JSON.stringify(root),
            data: data,
            dataStr: JSON.stringify(data)
        });

}