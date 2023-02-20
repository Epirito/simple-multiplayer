import Model from "./model";
import io from "socket.io-client";

class Client {
    constructor(makeGame, emptyInput, makeInput, render, nPlayers, serverURL, fps=30) {
        this.model = new Model(makeGame, emptyInput, nPlayers)
        this.player = undefined
        this.socket = io(serverURL, {
            reconnectionDelay: 10000
        })
        this.makeInput = makeInput
        this.render = render
        this.socket.on("player", (player) => {
            if (player>=nPlayers) {
                throw new Error("Too many players")
            }
            this.player = player
            setInterval(() => {
                /*
                const lengths = this.model.inputQueues.map(x=>x.length).sort()
                const greatest = lengths[lengths.length-1]
                const secondGreatest = lengths[lengths.length-2]
                if (greatest-secondGreatest >= 1 && greatest===this.model.inputQueues[this.player].length) {
                    return
                }*/
                
                
                while(Math.max(...this.model.inputQueues.map(x=>x.length)) > 
                        this.model.inputQueues[this.player].length) {
                    this.tick(false)
                }
                this.tick()
            }, 1000 / fps)
        })
        this.socket.on("relayedInput", (msg) => {
            if (msg.player === this.player) return

            //console.log(msg)
            this.model.update(msg.player, msg.input)
        })
    }
    tick(render=true) {
        const input = this.makeInput()
        this.socket.emit("input", input)
        this.model.update(this.player, input)
        if (render) this.render(this.model.predictedGame)
    }
}

export default Client