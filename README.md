# Kairos Bulk SMS Node 


[![Dev Status](https://img.shields.io/badge/Status-WIP-yellowgreen)](https://img.shields.io/badge/Status-WIP-yellowgreen)
[![CI Status](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml/badge.svg)](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/Tests-100%25%20Passed-green)](https://img.shields.io/badge/Tests-100%25%20Passed-green)
[![Code Coverage](https://img.shields.io/badge/Coverage-87.5%25-success)](https://img.shields.io/badge/Coverage-87.5%25-success)
[![Node](https://img.shields.io/badge/Node-12.x%2C14.x%2C16.x-blue)](https://img.shields.io/badge/Node-12.x%2C14.x%2C16.x-blue)
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
npm i @kairosafrika/sms
```
or
Using yarn:
```bash
yarn add @kairosafrika/sms
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
> Note: type is optional but accepts only two values; Quick & Flash
## Response Structure
Find the response structure when a successful or failed response is returned.

<span style="color: #39d353;font-size: 14px;">200 OK</span>
```json
{
  "statusMessage": "SMS scheduled successfully",
  "statusCode": 200,
  "success": true,
  "data":  true,
  "timestamp": "2022-04-21T06:46:22.983Z"
}
```
<span style="color: #f05252;font-size: 14px;">400 Bad Request</span>
```json
{
  "statusMessage": "Invalid path params passed",
  "statusCode": 200,
  "success": true,
  "data":  { 
    "message": "URl accept the id of sent message"
  },
  "timestamp": "2022-04-21T06:46:22.983Z"
}
```
## Example
> Note: This package is implemented in typescript hence no need to install typings

```js
// importing the package as a default
import KairosSMS from "@kairosafrika/sms";
```
or
```js
import { KairosSMS } from "@kairosafrika/sms"
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
import { asPromise } from "@kairos/sms";
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
| contacts()         | called when you want to GET,PATCH,DELETE contact details associated with an account

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
#### Contacts()
Contacts method also exposes a handful of functions that to allow you to GET,PATCH, POST contacts to your accounts
| HTTP Verb | Methods                        | Descriptions                                           | Active |
|-----------|--------------------------------|--------------------------------------------------------|--------|
| GET       | setPage(), setSize(), asList() | Get a paginated list of all your contacts              |  :heavy_check_mark:  |

##### setPage()
##### setSize()
##### asList()
Get a paginated list of your contacts from the Kairos Afrika Bulk SMS Platform by calling `asList()`

Make a request by passing *page* and *size* directly to the `contacts()` method
```js
response
     .contacts({
         page: 1,
         size: 15
     })
     .asList()
     .subscribe(response => {
         //handle repsonse here
        console.log(response)
    })
```

Make a request by performing method chaining
```js
response
      .contacts()
      .setPage(1)
      .setSize(15)
      .asList().subscribe(response => {
          // handle response here
        console.log(response)
    })
```

Make a request by passing `configs` and optional `options` to the static `contacts()` method

Options  - the current page and the total size to show per page
```js
{
    page: 1, 
    size: 15
}
```
Example
```js
const response = KairosSMS
    .contacts(configs, {page: 1, size: 15})
    .asList()
    .subscribe(response => {
    //handle response here
    console.log(response)
})
```
>NB. calling setPage & setSize overrides what's been set as the static contacts method.

## Credits
Kairos SMS Node is heavily inspired by [axios](https://github.com/axios)

## License
[MIT](LICENSE)