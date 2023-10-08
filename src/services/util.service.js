export const utilService = {
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
    formatImgTime
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
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const parts = pathname.split('/');
        const fileNameWithExtension = parts.pop();
        const fileNameParts = fileNameWithExtension.split('.');
        if (fileNameParts.length >= 2) {
            // Extract the last two parts as the filename and extension
            const fileName = fileNameParts.slice(-2).join('.');
            return fileName;
        }
    } catch (error) {
        console.error('Error parsing URL:', error);
    }
    // Return the original URL if parsing fails or no filename found
    return url;
}


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