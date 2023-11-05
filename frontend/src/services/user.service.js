import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDb'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
    // changeScore
}

window.userService = userService
const usersStorage = [
    { _id: 'r101', username: 'Reut', password: '0000', fullname: 'Reut Edry', imgUrl: "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg" },
    { _id: 's101', username: 'Sahar', password: '1234', fullname: 'Sahar Machpud', imgUrl: "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg" },
    { _id: 'm101', username: 'Maya', password: '1234', fullname: 'Maya Cohen', imgUrl: "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg" },
    { _id: 'guest', username: 'Guest', password: '1234', fullname: 'Guest', imgUrl: "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" },
]


async function getUsers() {

    // let users = utilService.loadFromStorage(STORAGE_KEY)
    // if (!users || !users.length) utilService.saveToStorage(STORAGE_KEY, usersStorage)
    // users = await storageService.query(STORAGE_KEY)
    // return users
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {

    // const user = await storageService.get(STORAGE_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {

    // return storageService.remove(STORAGE_KEY, userId)
    return httpService.delete(`user/${userId}`)
}

// async function update({ _id, score }) {
//     const user = await storageService.get('user', _id)
//     user.score = score
//     await storageService.put('user', user)

//     // const user = await httpService.put(`user/${_id}`, {_id, score})
//     // // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {
    // const users = await storageService.query(STORAGE_KEY)
    // const user = users.find(user => user.username.toLowerCase() === userCred.username.toLowerCase())
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) return saveLocalUser(user)
    } catch (err) {
        alert('Username or passward are wrong')
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post(STORAGE_KEY, userCred)
    try {
        const user = await httpService.post('auth/signup', userCred)
        return saveLocalUser(user)
    } catch (err) {
        alert('User name taken')
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    // console.log('save local user');
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, username: user.username }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    // console.log('get logged in uder');
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



