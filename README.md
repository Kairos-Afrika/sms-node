# Kairos Bulk SMS Node 


[![Dev Status](https://img.shields.io/badge/Status-WIP-yellowgreen)](https://img.shields.io/badge/Status-WIP-yellowgreen)
[![CI Status](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml/badge.svg)](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/Tests-100%25%20Passed-green)](https://img.shields.io/badge/Tests-100%25%20Passed-green)
[![Code Coverage](https://img.shields.io/badge/Coverage-87.5%25-success)](https://img.shields.io/badge/Coverage-87.5%25-success)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://img.shields.io/badge/License-MIT-blue)

A Observable-based wrapper implementation that exposes all of Kairos' SMS APIs making integration into your backend for sending SMS easier and faster
## Table Of Contents
- [Features](#features)
- [Installing](#installation)
- [Request Structure](#request-structure)
- [Response Structure](#response-structure)
- [Example](#example)
- [Kairos SMS API](#kairos-sms-api)
- [Creating an instance](#creating-an-instance)
- [Instance methods](#instance-methods)

## Features
- Send Quick SMS 
- Send Bulk SMS
- Ping the status of an already sent SMS
- Check your account balance
- Provides method chaining under-the-hood
- Supports typescript from the get-go
- Unsubscribed to method calls with the `unsubscribe()` method from `rxjs`

## Installation
Quickly use the package by running either of the below commands

Using npm:
```bash
npm i @kairos/sms
```
or
Using yarn:
```bash
yarn add @kairos/sms
```
## Request Structure
Find the request structure when making an API request for Quick SMS.
```json
{
    "to": "xxxxxxxxx",
    "from": "KAIROS",
    "message": "this is a test message"
}
```
Find the request structure when making an API request for Quick SMS with multiple phone numbers or msisdns.
```json
{
    "to": "233200746423,23094990599",
    "from": "KAIROS",
    "message": "this is a test message"
}
```
Find the request structure when making an API request for Bulk SMS.
```json
{
  "messages": [
    {
      "to": "233200746417",
      "from": "Kairos Test",
      "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "type": "Quick"
    }
  ]
}

```
## Response Structure
Find the response structure when a successful or failed response is returned

```json
{
  "statusMessage": "SMS scheduled successfully",
  "statusCode": 200,
  "success": true,
  "data":  true,
  "timestamp": "2022-04-21T06:46:22.983Z"
}
```
## Example
> Note: This package is implemented in typescript hence no need to install typings

```js
// importing the package as a default
import KairosSMS from "@kairos/sms";
```
or
```js
import { KairosSMS } from "@kairos/sms"
```
#### Sending a quick SMS
```js
KairosSMS
    .send({ apiKey: 'xxxxxxxxx', apiSecret: 'xxxxxxx', timeout: 90000}, {to: "xxxxxxxxxxx", from: "kairos", message: "this is a test message"})
    .asQuick()
    .subscribe(response => {
        // handle response 
        console.log(response)
})
```
#### Sending a bulk SMS
```js
KairosSMS
    .send({apiKey: 'xxxxxxxx', apiSecret: 'xxxxxxxx', timeout: 90000},{
        "messages": [
            {
                "to": "233200746417",
                "from": "Kairos Test",
                "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "type": "Quick"
            }
        ]
    })
    .asBulk()
    .subscribe(response => {
        // handle response
        console.log(response)
    })
```
> **NOTE:** Kairos SMS package also exposes an independent function that allows you to convert Observables to Promises to use `async/await`

```js
import { asPromise } from "@kairos/sms/as-promise";
// always don't forget to append `async` if the function is created as found below
async function sendSMS() {
    const response = await asPromise(
        KairosSMS
        .send({ apiKey: 'xxxxxxxxx', apiSecret: 'xxxxxxx', timeout: 90000}, {to: "xxxxxxxxxxx", from: "kairos", message: "this is a test message"})
        .asQuick()
    )
    console.log(response)
}
```
## Kairos SMS API

Requests can be made by passing the relevant configs to `KairosSMS.create()`

### Creating an instance

You can create an instance of KairosSMS with the relevant configs

#### KairosSMS.create([config])
```js
const instance = KairosSMS.create({ 
    apiKey: 'xxxxxxxxxxx', 
    apiSecret: 'xxxxxxxxxx', 
    timeout: 800000
})
```
### Instance Methods
There are two main available instance methods that exposes send methods and check balance methods, This includes
| Method             | description             |
|--------------------|-------------------------|
| send(data)         | called when you want to send sms or check the current status of an already sent sms
| account()          | called when you want to check the account balance

#### Send(data)
After you've created the instance, you can then call the `send(data)` method,
```js
const response = instance.send(data)
```
Which exposes all the necessary methods below
##### asQuick()
##### asBulk()
##### asQuickMultipleMSISDN()
This method allows customer to send same message to multiple msisdns or phone numbers by using a comma separated values for the `to` property in the request object at [Request Structure](#request-structure)
```text
  "to":"233200746423,23094990599"
```
Example
```js
response
    .asQuickMultipleMSISDN()
    .subscribe(data => {
        // handle response here
        console.log(data)
    })
```
##### asPing()
This method is a bit different because it accepts the `id`  of the sent sms instead of an object to make the request.
Hence, something like so
```js
instance
    .send("2")
    .asPing()
    .subscribe(response => {
        // handle response here
        console.log(response)
    })
```

#### Account()
After you've created the instance, you can then call the `account()` method,
```js
const response = instance.account()
```
Which exposes the method below
##### balance()
Get current user balance with this
```js
response
    .balance()
    .subscribe(response => {
        // handle response here
        console.log(response)
})
```

## Credits
Kairos SMS Node is heavily inspired by [axios](https://github.com/axios)

## License
[MIT](LICENSE)