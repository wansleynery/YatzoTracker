
import express from 'express';
import { SETTINGS, translationFile, getLanguage, translationUrl } from '../assets/server/server';
import { requestJson } from '../assets/processor/commsProcessor';
import { isNullOrUndefined } from 'util';
import { readFilenames } from '../assets/processor/fileProcessor';
// import { checkExistsCountry } from '../assets/enum/countries';


export function statsRouter(request: express.Request, response: express.Response, _next: () => void) {
    
    const vanillaCok: any = request.signedCookies.language;
    
    // console.log(checkExistsCountry('US'));

    // requestJson('https://api.quarantine.country/api/v1/summary/region?region=' + region)
    requestJson('http://localhost:3000/region')
        .then((result: any) => {
            
            result = result.data;

            let root: {} =
                {
                    page: 'STATS',
                    title: SETTINGS.service,
                    isLogged: false
                };

            let data: {} =
                {
                    language: !isNullOrUndefined(vanillaCok) ? getLanguage(vanillaCok) : getLanguage(),
                    languageList: readFilenames({ url: translationUrl, extension: 'json' }),
                    languageSelected: vanillaCok,
                    epidemy: request.params.epidemy,
                    region: request.params.region,
                    period: request.params.period,
                    maxSample: result.summary.total_cases,
                    progressStats:
                    [
                        {
                            name: translationFile.label.summary.total_cases,
                            value: result.summary.total_cases
                        },
                        {
                            name: translationFile.label.summary.active_cases,
                            value: result.summary.active_cases
                        },
                        {
                            name: translationFile.label.summary.recovered,
                            value: result.summary.recovered
                        },
                        {
                            name: translationFile.label.summary.deaths,
                            value: result.summary.deaths
                        }
                    ],
                    majorStats:
                    [
                        {
                            name: translationFile.label.summary.total_cases,
                            value: parseFloat(result.summary.total_cases).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.active_cases,
                            value: parseFloat(result.summary.active_cases).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.deaths,
                            value: parseFloat(result.summary.deaths).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.recovered,
                            value: parseFloat(result.summary.recovered).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.critical,
                            value: parseFloat(result.summary.critical).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.tested,
                            value: parseFloat(result.summary.tested).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.death_ratio,
                            value: (parseFloat(result.summary.death_ratio) * 100).toFixed(2) + '%'
                        },
                        {
                            name: translationFile.label.summary.recovery_ratio,
                            value: (parseFloat(result.summary.recovery_ratio) * 100).toFixed(2) + '%'
                        }
                    ],
                    dailyStats:
                    [
                        {
                            name: translationFile.label.summary.total_cases,
                            value: parseFloat(result.change.total_cases).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.active_cases,
                            value: parseFloat(result.change.active_cases).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.deaths,
                            value: parseFloat(result.change.deaths).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.recovered,
                            value: parseFloat(result.change.recovered).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.critical,
                            value: parseFloat(result.change.critical).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.tested,
                            value: parseFloat(result.change.tested).toLocaleString()
                        },
                        {
                            name: translationFile.label.summary.death_ratio,
                            value: (parseFloat(result.change.death_ratio) * 100).toFixed(2) + '%'
                        },
                        {
                            name: translationFile.label.summary.recovery_ratio,
                            value: (parseFloat(result.change.recovery_ratio) * 100).toFixed(2) + '%'
                        }
                    ],
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
                
        });
}
    