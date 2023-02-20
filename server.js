import {Server} from "socket.io"
import http from "http"
function createServer(origin, nPlayers) {
    const server = http.createServer()
    const io = new Server(server, {
        cors: {
            origin,
            methods: ["GET", "POST"]
        }
    })

    const players = []
    io.on("connection", (socket) => {
        console.log("Player connected")
        socket.on("disconnect", (socket) => {
            console.log("Player disconnected")
            players[players.indexOf(socket)] = null
        })
        const idx = players.indexOf(null)
        if (idx === -1) {
            players.push(socket)
            if (players.length===nPlayers) {
                players.forEach((x,i)=>{x.emit("player", i)})
            }
        }else {
            players[idx] = socket
        }

        socket.on("input", (input) => {
            //console.log(input)
            io.emit("relayedInput", {
                player: players.indexOf(socket),
                input
            })
        })
    })

    const port = 3000
    server.listen(port, () => {console.log(`Server started on port ${port}`)})
}
export default createServer