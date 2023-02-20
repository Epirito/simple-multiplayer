function inputTemplate() {
    return ({
        xDirection: 0,
        yDirection: 0,
        button0: false,
        button1: false,
        start: false
    })
}
let up = false
let down = false
let left = false
let right = false
let button0 = false
let button1 = false
let start = false
const addKeyboardListeners = ()=>{
    document.addEventListener("keydown", (e)=>{
        switch(e.key) {
            case "ArrowUp":
                up = true
                break
            case "ArrowDown":
                down = true
                break
            case "ArrowLeft":
                left = true
                break
            case "ArrowRight":
                right = true
                break
            case "z":
            button0 = true
                break
            case "x":
                button1 = true
                break
            case "Enter":
                start = true
                break
        }
    })
    document.addEventListener("keyup", (e)=>{
        switch(e.key) {
            case "ArrowUp":
                up = false
                break
            case "ArrowDown":
                down = false
                break
            case "ArrowLeft":
                left = false
                break
            case "ArrowRight":
                right = false
                break
            case "z":
                button0 = false
                break
            case "x":
                button1 = false
                break
            case "Enter":
                start = false
                break
        }
    })
}
function getInput() {
    return ({
        xDirection: right - left,
        yDirection: down - up,
        button0,
        button1,
        start
    })
}
export {addKeyboardListeners, getInput, inputTemplate}