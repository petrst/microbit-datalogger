bluetooth.onBluetoothConnected(function () {
    connected = 1
    starttime = input.runningTime()
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
    basic.showString("D")
})
input.onButtonPressed(Button.A, function () {
    togglePause()
})
function show_status () {
    if (pause2) {
        show_delay()
    } else {
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
    }
}
function transmitData () {
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
message.setNumber(NumberFormat.Int32BE, 1, timestamp);
message.setNumber(NumberFormat.Int16BE, 5, value1);
message.setNumber(NumberFormat.Int16BE, 7, 0);
message.setNumber(NumberFormat.Int16BE, 9, 0);
bluetooth.uartWriteBuffer(message)
}
input.onButtonPressed(Button.B, function () {
    if (pause2) {
        delay_index = (delay_index + 1) % delays.length
        show_delay()
    }
})
function togglePause () {
    pause2 = !(pause2)
    show_status()
}
function show_delay () {
    if (delay_index == 0) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            # . # . .
            `)
    } else if (delay_index == 1) {
        basic.showLeds(`
            . . # # .
            . . . # .
            . . # # .
            . . . # .
            # . # # .
            `)
    } else if (delay_index == 2) {
        basic.showLeds(`
            . . # # .
            . . # . .
            . . # # .
            . . . # .
            # . # # .
            `)
    } else if (delay_index == 3) {
        basic.showLeds(`
            . # . . .
            . # . . #
            . # . # .
            . # . . #
            . # . # #
            `)
    } else if (delay_index == 4) {
        basic.showLeds(`
            # # . . .
            . # . . #
            # # . # .
            . # . . #
            # # . # #
            `)
    } else if (delay_index == 5) {
        basic.showLeds(`
            # # . . .
            # . . . #
            # # . # .
            . # . . #
            # # . # #
            `)
    } else if (delay_index == 6) {
        basic.showLeds(`
            . # . # .
            . # . # .
            . # . . .
            . # . . .
            . # . . .
            `)
    } else if (delay_index == 7) {
        basic.showLeds(`
            # # . # .
            . # . # .
            # # . . .
            . # . . .
            # # . . .
            `)
    } else if (delay_index == 8) {
        basic.showLeds(`
            # # . # .
            # . . # .
            # # . . .
            . # . . .
            # # . . .
            `)
    }
}
let value3 = 0
let value2 = 0
let starttime = 0
let connected = 0
let delay_index = 0
let delays: number[] = []
let pause2 = false
let value4 = 0
let value1 = 0
let timestamp = 0
let message_type = 0
let message = pins.createBuffer(11);
pause2 = false
togglePause()
show_status()
bluetooth.startUartService()
delays = [100, 300, 500, 1000, 3000, 5000, 60000, 180000, 300000]
delay_index = 3
basic.forever(function () {
    if (!(pause2)) {
        timestamp = input.runningTime() - starttime
        value1 = pins.analogReadPin(AnalogPin.P0)
        value2 = pins.analogReadPin(AnalogPin.P1)
        value3 = pins.analogReadPin(AnalogPin.P2)
        serial.writeLine("" + timestamp + "," + value1 + "," + value2 + "," + value3)
        if (connected == 1) {
            message_type = 1
            transmitData()
            message_type = 2
            value1 = value2
            transmitData()
            message_type = 3
            value1 = value3
            transmitData()
        }
        basic.pause(delays[delay_index])
    }
})
