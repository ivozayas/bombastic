const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const upBtn = document.getElementById('up')
const leftBtn = document.getElementById('left')
const downBtn = document.getElementById('down')
const rightBtn = document.getElementById('right')
const spanLives = document.getElementById('lives')
const spanTime = document.getElementById('time')
const spanRecord = document.getElementById('record')
const pResult = document.getElementById('result')


let elementsSize
let canvasSize
let level = 0
let lives = 3

let timeStart
let timeInterval

const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}

let bombsPosition = []

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7
    } else{
        canvasSize = window.innerHeight * 0.7
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

    elementsSize = parseFloat(elementsSize.toFixed(0))

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function startGame() {
    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'end'

    if(!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const map = maps[level]
    const mapRows = map.trim().split('\n')
    const mapElements = mapRows.map(row => row.trim().split(''))

    showLives()

    bombsPosition = []

    game.clearRect(0, 0, canvasSize, canvasSize)
    mapElements.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colIndex + 1) + 7
            const posY = elementsSize * (rowIndex + 1) - 7

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if(col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            } else if(col == 'X'){
                bombsPosition.push({
                    x: posX,
                    y: posY
                })
            }
            game.fillText(emoji, posX, posY)
        })
    })

    paintPlayer()
}

function paintPlayer() {
    checkGiftCollision(giftPosition.x, giftPosition.y)
    checkBombCollision(bombsPosition)

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function moveUp() {
    if((playerPosition.y * 2 - elementsSize) < elementsSize){
        return
    } else{
        playerPosition.y -= elementsSize
        startGame()
    }
}

function moveDown() {
    if((playerPosition.y + elementsSize) > canvasSize){
        return
    } else{
    playerPosition.y += elementsSize
    startGame()
    }
}

function moveLeft() {
    if((playerPosition.x - elementsSize) < elementsSize){
        return
    } else{
    playerPosition.x -= elementsSize
    startGame()
    }
}

function moveRight() {
    if(playerPosition.x > canvasSize){
        return
    } else{
    playerPosition.x += elementsSize
    startGame()
    }
}

function checkGiftCollision(giftX, giftY){
    if (giftY == playerPosition.y && giftX == playerPosition.x) {
        levelWin()
    }
}

function checkBombCollision(bombsPosition) {
    const bombCollision = bombsPosition.find(bomb =>{
        const y = bomb.y == playerPosition.y
        const x = bomb.x == playerPosition.x

        return x && y
    })

    if (bombCollision) {
        gameOver()
        console.log('COLISION');
    }
}

function levelWin(){
    level++
    console.log('Pasaste el nivel ' + level)
    if (maps.length > level) {
        startGame()
    } else{
        gameWin()
    }

}

function gameOver() {
    playerPosition.y = undefined
    playerPosition.x = undefined

    lives--

    if (lives == 0) {
        level = 0
        lives = 3
        timeStart = undefined
    }

    startGame()
}

function gameWin() {
    console.log('Felicidades, ganaste el juego')
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart

    if(recordTime){
        if(recordTime >= playerTime){
            pResult.innerHTML = 'Superaste el anterior record: ' + recordTime + '. El nuevo record es: ' + playerTime
            localStorage.setItem('record_time', playerTime)
        } else{
            pResult.innerHTML = 'No superaste el record'
        }
    } else{
        localStorage.setItem('record_time', playerTime)  
    }
    
    console.log({recordTime, playerTime});
}

function showLives(){
    // console.log('showLives: ' + lives)

    spanLives.innerHTML = emojis["HEART"].repeat(lives) // solución de un random

    // Solución del profe

    // let livesArray = Array(lives).fill(emojis['HEART']) // Array: objeto con los que creo array. Le digo que me cree un array con la cantidad de elementos que pongo entre paréntesis. Con .fill le digo que inserte algo en cada posición.

    // spanLives.innerHTML = '' // cada vez que llamo a showLives() limpio el span antes de mandarle las vidas porque si no se siguen imprimiendo corazones indefinidamente
    // livesArray.forEach(live => spanLives.append(live))
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

window.addEventListener('keydown', (e)=>{
    let key = e.key
    switch (key) {
        case 'ArrowUp':
            moveUp()
            break;
        case 'ArrowLeft':
            moveLeft()
        break;
        case 'ArrowDown':
            moveDown()
        break;
        case 'ArrowRight':
            moveRight()
        break;

        default:
            break;
    }
})
upBtn.addEventListener('click', moveUp())
leftBtn.addEventListener('click', moveLeft())
downBtn.addEventListener('click', moveDown())
rightBtn.addEventListener('click', moveRight())
