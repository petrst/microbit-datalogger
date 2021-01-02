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
    bluetooth.startUartService()
    basic.showString("B")
})
function transmitData () {
    timestamp = input.runningTime() - starttime
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
message.setNumber(NumberFormat.Int32BE, 1, timestamp);
message.setNumber(NumberFormat.Int16BE, 5, value1);
message.setNumber(NumberFormat.Int16BE, 7, 0);
message.setNumber(NumberFormat.Int16BE, 9, 0);
bluetooth.uartWriteBuffer(message)
}
input.onButtonPressed(Button.B, function () {
    serial.redirectToUSB()
    serial.setBaudRate(BaudRate.BaudRate115200)
    basic.showString("S")
})
let value3 = 0
let value2 = 0
let starttime = 0
let connected = 0
let value4 = 0
let value1 = 0
let timestamp = 0
let message_type = 0
let message = pins.createBuffer(11);
basic.forever(function () {
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
    basic.pause(1000)
})
