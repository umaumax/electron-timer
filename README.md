## electron-timer

* floating window

##Installation

```
git clone https://github.com/umaumax/electron-timer
cd electron-timer
npm install
```

##Execution

Pass the time in seconds in the command line.

```
electron .
electron . -n 60
electron . --debug
```

## ISSUE
* if press many start button, maybe multiple `setInterval()` will be called (accelerate timer spped).
* 60:00 is shown as 00:00
* 11:00 font is smaller than other time

## FYI
* [klugjo/electron\-timer\-app: Small Timer App]( https://github.com/klugjo/electron-timer-app )
