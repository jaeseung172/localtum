# LocalTum (localhost + momentum clone project)

PUT IMAGES!

### What is LocalTum?

It's momentum's localhost version, using node.js backend to caching weather and dust data, passing through json data type.

Weather Data from [OpenWeatherMap](http://openweathermap.org) API [**You Shoud get API Key!**], Dust Data from [AQICN](http://aqicn.org) API

(Both are Free to request Single-User Data, Just Sign-in and request for api key)

### Support Functions

- Transport Information

    - My Area's Bus Stop(Go-Eun House, Bus No.12), Timetables are Down Below

    - My Area's LRT(Aka. [Everline](https://en.wikipedia.org/wiki/Everline)) Information Based on TimeTables

- Weather Information

    - OpenWeatherMap Information for Weather Information

    - AQICN Information for Retrive Dust Information

    - ~~Korea Meteological Agency RSS Data for Retrive Tomorrow's Weather Information~~

### URL Schema Information

- `/` for call web page

- `/data` for retrive json data

```json
// return data look like this...
{
    "weathercode":200,
    "aqimeter":35,
    "Celcious":28
}
```

## Install & Run

- Zero. You need to Install node.js and npm on your operating system

    - Look http://nodejs.org to More Information about Install node

    - Recommend for LTS Version.

- First. You need to clone this Repository, just type `git clone https://github.com/jaeseung172/localtum` on your console.

- Second. `npm install` to Install Dependency to run this app
> ### Dependency
> express, request, ~~pug~~
> I've Removed Pug! Cause I dont have any reason to use Pug!

- Third. `npm start` to Run the Engine.

    - Runs on Port Number 80

    - If you have already Run Application on port 22 be sure you need to fix port number on source code