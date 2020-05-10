
const axios = require('axios').default;


export function requestJson (urlRequest: string, data?: any): Promise<any> {

    return new Promise((resolve, _reject) => {

        if (data === null) { data = {} }

        const options =
        {
            url: urlRequest,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json;charset=UTF-8'
            },
            data: data
        };

        axios(options)
            .then((resultData: any) => resolve(resultData.data))
            .catch((error: any) => new Error(error));

    });

}