
<img src="https://github.com/siwalikm/Flash/blob/master/public/assets/flash.png?raw=true" width="150" title="flash logo">


# Flash 
[![Build Status](https://travis-ci.org/siwalikm/Flash.svg?branch=master)](https://travis-ci.org/siwalikm/FLASH)
## A test service to mock slow server responses. 


### Description

**Flash** lets you simulate a slow server response, when you make a request.
This can come handy while testing how your  application responds to a slow external service or API.

Right now **Flash** supports only `GET` requests with configurable delay and URL parameters. 
> Checkout the app at [https://flash.siwalik.in](https://flash.siwalik.inl).

Using **Flash** is really easy. 
eg. On visiting https://flash.siwalik.in/delay/5000/url/api.github.com
You'll be redirected to api.github.com's response after a 5000ms delay.


### Request Structures

##### Delay Mode
```bash
https://flash-the-slow-api.herokuapp.com/delay/{delay_time}
```
##### Delay and URL Mode
```bash
https://flash-the-slow-api.herokuapp.com/delay/{delay_time}/url/{url}
```

Learn more on usage here - [documentation link](https://flash.siwalik.in/doc.html).


### Dev Setup

##### Running the app
```bash
$ git clone git@github.com:siwalikm/Flash.git
$ cd Flash
$ npm install
$ npm start
```
##### Running tests
```bash
$ npm test
```
If you're using vs-code for development, I've already included the `launch.json` scripts for running app and test server in debug mode.

### Contributions

For contributing, please raise a pull request with your code and test. You can also contribute by reporting issues and adding feature requests.


### License

This project is available for use under the MIT software license.
