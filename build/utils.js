"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types/types");
const types_2 = require("./types/types");
const parseComment = (commentFromReq) => {
    if (!isString(commentFromReq)) {
        throw new Error('Incorrect or missing comment');
    }
    return commentFromReq;
};
const parseDate = (dateFromReq) => {
    if (!isString(dateFromReq) || !isDate(dateFromReq)) {
        throw new Error('Incorrect or missing date');
    }
    return dateFromReq;
};
const parseWeather = (weatherFromReq) => {
    if (!isString(weatherFromReq) || !isWeather(weatherFromReq)) {
        throw new Error('Incorrect or missing weather');
    }
    return weatherFromReq;
};
const parseVisibility = (visibilityFromReq) => {
    if (!isString(visibilityFromReq) || !isVisibility(visibilityFromReq)) {
        throw new Error('Incorrect or missing weather');
    }
    return visibilityFromReq;
};
const isWeather = (param) => {
    return Object.values(types_2.Weather).includes(param);
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).includes(param);
};
const isString = (string) => {
    return typeof string === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const toNewDiaryEntry = (object) => {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility),
    };
    return newEntry;
};
exports.default = toNewDiaryEntry;
