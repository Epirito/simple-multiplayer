function inputEquals(x,y) {
    return JSON.stringify(x)===JSON.stringify(y)

}
class Model {
    constructor(makeGame, emptyInput, nPlayers) {
        this.game = makeGame()
        this.predictedGame = makeGame()
        this.inputQueues = Array(nPlayers).fill(0).map(_=>[])
        this.currentInputs = Array(nPlayers).fill(0).map(_=>emptyInput())
    }
    predict() {
        this.predictedGame = this.game.copy()
        let i = 0

        console.log("predicting")
        while(this.inputQueues.some(x=>x.length>i)) {
            console.log("prediction step")
            this.predictedGame.update(this.inputQueues.map((x, player)=>[
                player, 
                x.length===0 ? this.currentInputs[player] 
                    : x[Math.min(x.length-1, i)]// extrapolates from the last known input
            ]))
            i++
        }
    }
    update(player, input) {
        console.log({player})
        if (this.inputQueues[player].length === 
                Math.max(...this.inputQueues.map(x=>x.length))) {
            this.inputQueues[player].push(input)
            this.predictedGame.update(this.inputQueues.map((x,i)=> [i, x.length===0 ? 
                this.currentInputs[i] : x[x.length-1]]))
            return
        }
        const oldInput = this.inputQueues[player].length===0 ? 
        this.currentInputs[player] 
        : this.inputQueues[player][this.inputQueues[player].length-1]
        this.inputQueues[player].push(input)
        
        

        if (this.inputQueues.every(x => x.length>=1)) {
            this.inputQueues.forEach((x,i)=>{
                this.currentInputs[i] =  x.shift()
            })
            this.game.update(this.currentInputs.map((x,i)=>[i, x]))
        }
        
        if (!inputEquals(oldInput, input)) {
            this.predict()
        }
    }
}
export default Model