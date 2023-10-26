const APP_ID = "5666a0c27b174cf4ba760547e5b89b1b"

let uid = sessionStorage.getItem("uid")
if (!uid){
    uid = String(Math.floor(Math.random()* 100000))
    sessionStorage.setItem("uid", uid)
}

let token = null;
let client;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if (!roomId){
    roomId = "main"
}

let localTracks = []
let remoteUsers = {}

let joinRoomInit = async () => {
    client = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'})
    await client.join(APP_ID, roomId, token, uid)

    client.on('user-published', handleUserPublished)
    client.on('user-left', handleUserLeft)

    joinStream()
}

let joinStream = async () => { 
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div> 
                  </div>`
    document.getElementById('streams__container').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${uid}`)
    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user

    await client.subscribe(user, mediaType)
    let player = document.getElementById(`user-container-${user.uid}`)
    if (player === null){

        player = `<div class="video__container" id="user-container-${user.uid}">
                    <div class="video-player" id="user-${user.uid}"></div> 
                </div>`
    
    document.getElementById('streams__container').insertAdjacentHTML('beforeend', player)
    }

    if(mediaType === "video"){
        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType === "audio"){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) =>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

// let toggleCamera = async (e) => {
//     let button = e.currentTarget

//     if(localTracks[1].muted){
//         await localTracks[1].setMuted(false)
//         button.classList.add('active')
//     }else{
//         await localTracks[1].setMuted(true)
//         button.classList.remove('active')
//     }
// }

// document.getElementById('camera-btn').addEventListener('click', toggleCamera)

joinRoomInit()