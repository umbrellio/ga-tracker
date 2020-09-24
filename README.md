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

const tracker = GATracker.create(trackingId)

tracker.pageview({ dp: "/contacts", dt: "Contacts" })
```

Where `trackingId` is your app tracking id (like `UA-XXXXXXXXX-X`).

Available methods:

- `set(key, value)` – set any global var (like [user params](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#user))

- `pageview({ dl, dh, dp, dt })` – track page viewing ([Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#content))

- `timing({ utc, utv, utt, utl })` – track custom timings ([Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#timing))

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/umbrellio/ga-tracker.

## License

Released under MIT License.

## Authors

Created by [Aleksei Bespalov](https://github.com/nulldef),

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
