# Kairos Bulk SMS Node 


[![Dev Status](https://img.shields.io/badge/Status-WIP-yellowgreen)](https://img.shields.io/badge/Status-WIP-yellowgreen)
[![CI Status](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml/badge.svg)](https://github.com/Kairos-Afrika/sms-node/actions/workflows/ci.yml)
[ ![Tests](https://img.shields.io/badge/Tests-100%25%20Passed-green)](https://img.shields.io/badge/Tests-100%25%20Passed-green)
[![Code Coverage](https://badgen.net/codecov/c/github/vercel/nft)](https://codecov.io/gh/vercel/nft)

A Observable-based wrapper implementation that exposes all of Kairos' SMS APIs making integration into your backend for sending SMS easier and faster
## Table Of Contents
- [Features](#features)
- [Installing](#installation)
- [Request Structure](#request-structure)
- [Response Structure](#response-structure)
- [Example](#example)
- [Creating an instance](#creating-an-instance)

## Features
### Installation
Quickly use the package by running either of the below commands
```bash
npm i @kairos/sms
```
or
```bash
yarn add @kairos/sms
```
## Request Structure
Find the request structure when making an API request.
```json
{
    "to": "xxxxxxxxx",
    "from": "KAIROS",
    "message": "this is a test message"
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
> Note: This package is implemented in typescript hence to need to install typings

```js
// importing the package as a default
import KairosSMS from "@kairos/sms";
```
or
```js
import {KairosSMS} from "@kairos/sms"
```
```js
KairosSMS
    .send({ apiKey: 'xxxxxxxxx', apiSecret: 'xxxxxxx', timeout: 90000}, {to: "xxxxxxxxxxx", from: "kairos", message: "this is a test message"})
    .asQuick()
    .subscribe(response => {
        // handle response 
        console.log(response)
})
```
## Creating an instance
## Methods
After installation is complete, package exposes all these available methods to allow developers to quickly start integration
### send()
#### asQuick()
#### asBulk()
#### asQuickMultipleMSISDN()
#### asPing()
