/// <reference path="../typings/cheerio/cheerio.d.ts" />
/// <reference path="../typings/request/request.d.ts" />

"use strict";
import * as cheerio from 'cheerio';
import * as _request from 'request';
import * as fs from 'fs';

var topLevelDomain:string = 'http://www.generasia.com';
var jsonLocation:string = '../data/PerfumeHistory.json';

createDiscographyJson();

async function createDiscographyJson() {
    var urls = await getUrls();
    var discography = await Promise.all(urls.map(transformUrlToDiscography));

    fs.writeFile(jsonLocation, JSON.stringify(discography, null, 2), function(error) {
        if(error) {
            throw error;
        }
    });

    console.log(discography);
}
async function getUrls() {
    var body:string = await request(topLevelDomain + '/wiki/Template:Perfume');
    var $:CheerioStatic = cheerio.load(body);

    // Get the urls in the studio album, best album, and singles row in the Perfume footer
    var discographyUrls:Cheerio = $('table.navbox')

        .find('tr')

        // Get the rows that are grouped in a category
        .filter((index, element) => {
            return $(element).children().first().is('td.navbox-group');
        })

        // Map each category row into a link and associate that link as an album or single.
        .map((index, element) => {
            let $element:Cheerio = $(element);
            let category:string = $element.find('td.navbox-group').text().toLowerCase();
            let type:string = "";

            if (category.indexOf("albums") > -1) {
                type = "album";
            } else if (category.indexOf("singles") > -1) {
                type = "single";
            } else {
                return null;
            }

            return $element
                .find('a')

                .map((index, element) => {
                    return {
                        type: type,
                        url: topLevelDomain + $(element).attr('href')
                    };
                })
                .toArray()
                ;
        })
        ;
    return discographyUrls.toArray();
}

async function transformUrlToDiscography(discography) {
    var body = await request(discography.url);
    var $:CheerioStatic = cheerio.load(body);

    discography.title = getTitle($, discography.type);
    discography.date = getReleaseDate($);
    discography.description = getDescription($);
    if(discography.type === "album") {
       discography.tracks = getTracks($);
    }

    return discography
}

function getDescription($:CheerioStatic) {
    return $('dt:contains(Information)')
        .first()
        .parent()
        .next('p')
        .text()
        .trim()
        ;
}

function getReleaseDate($:CheerioStatic) {
    return $('dt:contains(Released)')
        .next('dd')
        .text()
        .trim()
        ;
}

function getTracks($:CheerioStatic) {
    return $('dt:contains(CD Tracklist)')
        .first()
        .parent()
        .next('ol')
        .text()
        .split('\n')
        .filter(x =>  x !== "")
        .map(function (line:String) {
            return line.trim();
        })
        ;
}

function getTitle($:CheerioStatic, type:string) {
    type = type.charAt(0).toUpperCase() + type.slice(1); //Capitalize
    return $('dt:contains(' + type + ')')
        .next('dd')
        .text()
        .trim()
        ;
}

async function request(url:string) {
    return new Promise<string>((resolve, reject) => {
        _request(url, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    });
}

