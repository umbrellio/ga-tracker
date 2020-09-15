# @umbrellio/ga-tracker

Google Analytics tracker for web env (no `window` object required).

## Install

```sh
$ yarn add @umbrellio/ga-tracker
```

## Usage

```js
import GATracker from "@umbrellio/ga-tracker"

const emitter = GATracker.Emitter.create(<tracking-id>, <customer-id>)

emitter.pageView("/contacts")
```

Where `tracking-id` is your app id (like `UA-XXXXXXXXX-X`), and `customer-id` is your customer identifier (can be empty).

Available methods:

- `pageView(path)` – track page viewing
  `path` - request path (eg. "/contacts")

- `time(category, name, duration)` – track custom time
  `category` – measurement category
  `name` – measurement name
  `duration` – measurement duration

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/umbrellio/observable.

## License

Released under MIT License.

## Authors

Created by [Aleksei Bespalov](https://github.com/nulldef),

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
