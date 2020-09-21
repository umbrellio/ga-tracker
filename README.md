# @umbrellio/ga-tracker

[![Coverage Status](https://coveralls.io/repos/github/umbrellio/ga-tracker/badge.svg?branch=master)](https://coveralls.io/github/umbrellio/ga-tracker?branch=master)
[![Build Status](https://travis-ci.com/umbrellio/ga-tracker.svg?branch=master)](https://travis-ci.com/umbrellio/ga-tracker)

Google Analytics tracker for web env (no `window` object required).

## Install

```sh
$ yarn add @umbrellio/ga-tracker
```

## Usage

```js
import GATracker from "@umbrellio/ga-tracker"

const emitter = GATracker.Emitter.create(<tracking-id>, <uuid>)

emitter.pageView("/contacts")
```

Where `tracking-id` is your app id (like `UA-XXXXXXXXX-X`), and `uuid` is your customer unique identifier.

Available methods:

- `setVisitor({ identifier, uuid })` – set visitor's identifiers

- `commit()` – send batch of tracked events

- `pageView(path)` – track page viewing

  `path` - request path (eg. "/contacts")

- `time(category, name, duration)` – track custom time

  `category` – measurement category

  `name` – measurement name

  `duration` – measurement duration

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/umbrellio/ga-tracker.

## License

Released under MIT License.

## Authors

Created by [Aleksei Bespalov](https://github.com/nulldef),

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
