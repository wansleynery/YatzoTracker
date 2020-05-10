
# YatkoTracker

## Briefing

Congrats.
Here has the basic source code of a tracker webpage with statistics of epidemies and regions affected.

This project was totally made as brand new one just for this job.


> **Note**: To test the API endpoint, I had created another _microservice_ to run the
tests with other epidemies. To run it, just install the requirements of this project
and run of the same way of this one. See on instructions step.

#

## System Info

### Main Structure

| Designation                   | Value             | Version           |
|-------------------------------|-------------------|-------------------|
| Main Programming Language     | Javascript        | ECMAScript 2019   |
| Secundary languages           | Typescript        | 3.8.3             |
| Server Environment Framework  | NodeJS            | 12.16.3           |
| Server Runtime Framework      | ExpressJS         | 4.17.1            |
| Webpage Script Framework      | VueJS             | 2.6.10            |

### Compilers

| Component                     | Compiler          | Version           |
|-------------------------------|-------------------|-------------------|
| Javascript                    | Ts-node           | 8.9.1 (Typescript)|
| HTML                          | Pug               | 2.0.4             |
| CSS                           | Stylus            | 0.54.7            |


### Functionalities

| Functionality                 | Module            | Version           |
|-------------------------------|-------------------|-------------------|
| External Communications       | Axios             | 0.19.2            |
| Incomming Data Manager        | Body-parser       | 1.19.0            |
| Cookie Manager                | Cookie-parser     | 1.4.5             |
| Log Manager                   | Minimalist-logger | 1.0.8             |
|                               | Morgan            | 1.10.0            |

#

## Requirements

### Hardware

| Version           | Software                      |
|-------------------|-------------------------------|
| CPU               | 2.0 Ghz Dual Core x64         |
| RAM               | 4 GB                          |
| HD                | 1 GB                          |
| Graphics Card     | 256 Mhz                       |
| Network           | Continuos connection          |


### Software

| Software                      | Version           |
|-------------------------------|-------------------|
| NodeJS (Non-nightfly edition) | 12.16.3 or better |
| NPM (Node Package Manager)    | 6.14.4 or better  |
| Typescript                    | 3.8.3 or better   |
| Ts-node                       | 3.8.3 or better   |

#

## Instructions

After install the NodeJS, verify the if Node and npm is ready.

Node
```bash
node -v
```

NPM
```bash
npm -v
```

If both commands bring the correct version, go ahead to other installations,
else try to reinstall following the official instruction on
[NodeJS](https://nodejs.org/en/download/) website.

On the command prompt or bash, install the Typescript compiler dependencies:

```bash
npm install -g typescript ts-node
```

If no errors are show on console, try verify to run the Ts-node that will show
the version itself installed.

```bash
ts-node -v
```

Now, browse to folder of project and run this command to install local
dependencies.

```bash
npm install
```

To finish, just run follow comand and open this [link](http://localhost:1100/)

```bash
npm start
```

##

**Note**: Run the Response microservice to get API feed of epidemies types. After above
instructions, go to microservice folder **_response_api_**, and install the dependencies:

```bash
npm install
```

And run:

```bash
npm start
```