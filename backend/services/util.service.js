import fs from 'fs'

export const utilService = {
    readJsonFile,
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getAssetSrc,
    formatTimestamp,
    getFileNameFromUrl,
    formatImgTime,
    getDominantColor,
    isRgbBright,
    delay,
    formatDate
}

function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function formatDate(timestamp){
    const now = Date.now()
    const differenceInSeconds = (now - timestamp) / 1000;
    const differenceInMinutes = differenceInSeconds / 60
    const differenceInHours = differenceInMinutes / 60

    if (differenceInMinutes < 1) {
    return 'just now'
    } else if (differenceInHours < 1) {
    return `${Math.round(differenceInMinutes)} minutes ago`
    } else if (differenceInHours < 24) {
    return `${Math.round(differenceInHours)} hours ago`
    } else if (differenceInHours < 48) {
    const date = new Date(timestamp * 1000)
    return `yesterday at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    } else {
    const date = new Date(timestamp * 1000)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// util function
function getAssetSrc(name) {
    const path = `/src/assets/${name}`
    const modules = import.meta.glob('/src/assets/*', { eager: true })
    const mod = modules[path]
    return mod.default
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const currentDate = new Date();

    const monthShort = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = date.getDate();
    const year = date.getFullYear();

    if (year === currentDate.getFullYear()) {
        // If it's the current year, return the short month and day only
        return `${monthShort} ${day}`;
    } else {
        // If it's a different year, return the short month, day, and full year
        return `${monthShort} ${day}, ${year}`;
    }
}

function getFileNameFromUrl(url) {
    try {
        const urlArr = url.split('.')
        const imgFormat = urlArr.pop()
        const urlLeft = urlArr.join().split(/[,|;_%//]/);
        const urlName = urlLeft.pop()

        const fileName = `${urlName}.${imgFormat}`
        return fileName;
    }
    catch (error) {
        console.error('Error parsing URL:', error);
    }
}
// Return the original URL if parsing fails or no filename found


function formatImgTime(timestamp) {
    const now = new Date().getTime();
    const differenceInMilliseconds = now - timestamp;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInMinutes < 1) {
        return "just now";
    } else if (differenceInMinutes < 60) {
        return differenceInMinutes + " min ago";
    } else if (differenceInHours < 24) {
        return differenceInHours + " hours ago";
    } else {
        return differenceInDays + " days ago";
    }
}

function getDominantColor(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelArray = imageData.data;

            const colorMap = {};
            let maxCount = 0;
            let dominantColor = null;

            for (let i = 0; i < pixelArray.length / 4; i += 4) {
                const rgba = `${pixelArray[i]},${pixelArray[i + 1]},${pixelArray[i + 2]}`;
                colorMap[rgba] = (colorMap[rgba] || 0) + 1;
                if (colorMap[rgba] > maxCount) {
                    maxCount = colorMap[rgba];
                    dominantColor = rgba;
                }
            }

            const [r, g, b] = dominantColor.split(',').map(Number);
            resolve({ rgb: `${r},${g},${b}` });
        };
        img.onerror = function () {
            reject("Failed to load image");
        };
        img.src = imageUrl;
    });
}

function isRgbBright(rgb) {
    let rgbColor = `rgb(${rgb})`
    const colorValues = rgbColor.match(/\d+/g);
    const r = parseInt(colorValues[0]);
    const g = parseInt(colorValues[1]);
    const b = parseInt(colorValues[2]);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const res = brightness >= 128 ? true : false;
    console.log('colorRes', res);
    return res
}
