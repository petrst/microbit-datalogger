function resetBuffer () {
    buff = []
    for (let index = 0; index <= bufflen; index++) {
        buff[index] = 0
    }
}
let buff: number[] = []
let bufflen = 0
bufflen = 30000
let index = 0
resetBuffer()
basic.forever(function () {
    buff[index] = pins.analogReadPin(AnalogPin.P0)
    index += 1
    index = index % bufflen
    basic.pause(1000)
})
