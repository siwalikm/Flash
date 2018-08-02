<img src="https://github.com/siwalikm/FLASH/blob/master/public/assets/flash.gif?raw=true" width="200" title="hover text">

## Flash [![Build Status](https://travis-ci.org/siwalikm/Flash.svg?branch=master)](https://travis-ci.org/siwalikm/FLASH)

#### A test service to mock slow server responses.


### Description

A test service to mock a slow api response - simply append the Flash app URL with delay configuration to your usual API URL and make a request, the response will be delayed.

This can be used to simulate timeouts so that you can see how your application responds with slow API requests or if it fails where you expect it to fail.

Right now **Flash** supports only `GET` requests with configurable delay and URL parameters.


#### Try it out

At http://flash-the-slow-api.herokuapp.com/](http://flash-the-slow-api.herokuapp.com/)
or go ahead and use it or run locally (steps below).

#### This project aims to

* Provide delayed response for `GET` requests
* Not intefere too much with calling code making the request. We don't want users to have to modify request params to use this, editing code just to test something is a pain - the delay parameter and the URL should be the minimum required change to use this.
* Return redirect after delay; It is useful to actually see how you code works with the real response returned after a delay. Note: obviously requires clients to follow redirects ;)


#### Request

Build a URL with the following params:

```bash
https://flash-the-slow-api.herokuapp.com/delay/{delay_time}
```
```bash
https://flash-the-slow-api.herokuapp.com/delay/{delay_time}/url/{url}
```

### Read More on the [documentation website](https://flash-the-slow-api.herokuapp.com/doc.html)


### Getting started

It's a simple Rack app so you can run it anywhere;

```bash
$ git clone git@github.com:siwalikm/FLASH.git
$ cd FLASH
$ npm install
$ npm start
```

### Contributions

Please use the GitHub pull-request mechanism to submit contributions.


### License

This project is available for use under the MIT software license.
