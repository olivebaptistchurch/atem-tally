#!/usr/bin/env python3

import socket
import json
import RPi.GPIO as GPIO # Raspberry PI GPIO
GPIO.setmode(GPIO.BCM)

HOST = '10.15.10.255'
PORT = 59090

with open('../config.json') as f:
  data = json.load(f)

previousProgramTally = 1
previousPreviewTally = 1
  
tallyData = data["tallySettings"]
gpioData = data["relayGPIO"]

tallyInfo = {}
switcherInputs = []

for k in tallyData:
  tally = tallyData[k]
  # This returns: { 1: [14, 15], 2: [18, 23], etc } Program is first in array and preview is second
  tallyInfo[tally["cameraInput"]] = gpioData[tally["relayOutput"]]
  switcherInputs.append(tally["cameraInput"])
  for pin in tallyInfo[tally["cameraInput"]]:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
  s.connect((HOST, PORT))
  while True:
    data = s.recv(1024)
    if not data: break # Close socket if server is disconnected
    programTally, previewTally = data.decode().split(';')
    
    print('Previous Program Tally: ', int(previousPreviewTally))
    print('Program Tally: ', int(previewTally))
    if programTally is not previousProgramTally:
      if int(previousProgramTally) in switcherInputs:
        gpioPreviousProgram = tallyInfo[int(previousProgramTally)]
        GPIO.output(gpioPreviousProgram[0], GPIO.LOW)
      if int(programTally) in switcherInputs:
        gpioProgram = tallyInfo[int(programTally)]
        GPIO.output(gpioProgram[0], GPIO.HIGH)
    if previewTally is not previousPreviewTally:
      if int(previousPreviewTally) in switcherInputs:
        gpioPreviousPreview = tallyInfo[int(previousPreviewTally)]
        print('Previous GPIO: ',gpioPreviousPreview[1])
        GPIO.output(gpioPreviousPreview[1], GPIO.LOW)
      if int(previewTally) in switcherInputs:
        gpioPreview = tallyInfo[int(previewTally)]
        print('Current GPIO: ',gpioPreview[1])
        GPIO.output(gpioPreview[1], GPIO.HIGH)

    previousProgramTally = programTally
    previousPreviewTally = previewTally

  s.close()
  GPIO.cleanup()
