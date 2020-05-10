
/********************************************************************************************************/
/* Application import
/********************************************************************************************************/

// External
import express from 'express';
import bodyParser from 'body-parser';

import { readFileSync } from 'fs';
import { join } from 'path';

// Internal



/********************************************************************************************************/
/* Controller variables
/********************************************************************************************************/

const port: number = 3000;



/********************************************************************************************************/
/* Server settings
/********************************************************************************************************/

const app = express();

// Identifica todas as requisições desconhecidas ou não bem sucedidas as rotas padrões
app.use('/*', async (_request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return next();

});

// Permite a interpretação de todo o 'corpo' das requisições POST
app.use(bodyParser.urlencoded({
    extended: true
}));

// Estiliza o retorno do JSON formatado
app.set('json spaces', 2);





/********************************************************************************************************/
/* Server routes
/********************************************************************************************************/

app.route('/')
    .post((_request, response) => {

        const responseApi: any =
            JSON.parse(
                readFileSync(
                    join(__dirname, 'world.json'),
                    'utf8').replace('\'', '\`'));

        response.status(200).json(responseApi);

    });



app.route('/region')
    .post((_request, response) => {

        const responseApi: any =
            JSON.parse(
                readFileSync(
                    join(__dirname, 'region.json'),
                    'utf8'));

        response.status(200).json(responseApi);
    });


app.route('/epidemy/list')
    .post((_request, response) => {

        const responseApi: any =
            JSON.parse(
                readFileSync(
                    join(__dirname, 'epidemies.json'),
                    'utf8'));

        response.status(200).json(responseApi);
    });


app.route('/epidemy')
    .post((_request, response) => {

        const responseApi: any =
            JSON.parse(
                readFileSync(
                    join(__dirname, 'epidemy.json'),
                    'utf8'));

        response.status(200).json(responseApi);
    });



/********************************************************************************************************/
/* Server initialization
/********************************************************************************************************/

app.listen(port, () => {

    console.log('Server running at port ' + port);

});