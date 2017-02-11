# uploadly

![https://chrome.google.com/webstore/detail/uploadly/chapnejommikhigcaegmdijjjadaopce](https://img.shields.io/chrome-web-store/v/chapnejommikhigcaegmdijjjadaopce.svg?style=flat-square)
![https://travis-ci.org/rcsole/uploadly](https://img.shields.io/travis/rcsole/uploadly.svg?style=flat-square)
![https://github.com/jlongster/prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg?style=flat-square)
![https://chrome.google.com/webstore/detail/uploadly/chapnejommikhigcaegmdijjjadaopce](https://img.shields.io/chrome-web-store/rating/chapnejommikhigcaegmdijjjadaopce.svg?style=flat-square)
![https://chrome.google.com/webstore/detail/uploadly/chapnejommikhigcaegmdijjjadaopce](https://img.shields.io/chrome-web-store/d/chapnejommikhigcaegmdijjjadaopce.svg?style=flat-square)

Upload images to imgur you find while browsing and get a link copied to your
clipboard.

[Features](#features) | [Installation](#installation) | [Usage](#usage) |
[Configuration](#configuration) | [Development](#development)

![screenshot](https://raw.githubusercontent.com/rcsole/uploadly/master/docs/screenshot.png)

## Features

* **Upload images anonymously**: right click on any image you find and click
_Upload to imgur_!

* **Straight to your clipboard**: once the image is uploaded the URL to the
imgur upload will be in your clipboard.

* **~~Upload to your profile~~**: Coming soon!

* **Keep track of your uploads**: Click on the extension icon and you will
be able to see all the pictures you've previously uploaded! Across different
computers too!

## Installation

Install via the [Chrome Web Store].

## Usage

### Example

Navigate to http://coolpictures.tumblr.com/post/100659174051/norway-in-full-glory
in your browser, right-click on whichever image you like. Wait for the
notifications! You can also click on the last notification to open the image
on a new tab. Great, no?

### Caveats

Some images around the web are not posted as images, rather they are background
images! Those won't work. Sorry 😞. **For now!**.

## Configuration

Coming soon!

## Development

### Guidelines

Before making any contributions, please make sure you've read our [contributing]
guidelines.

### Up and running

Make sure you have [node] and [npm] installed. We recommend you use [nvm] to
install them if you haven't installed them yet. When that is done, copy or type
the following steps in your terminal:

```sh
git clone https://github.com/rcsole/uploadly.git && cd uploadly
npm i && npm run watch
```

Now you'll be watching for changes you do on the code! Next, you'll want to load
the browser extension on Chrome. You can do that by visiting
`chrome://extensions`, you'll want to click **Load unpacked extension**. A
dialog will prompt you for an extension, navigate to `<PROJECT_ROOT>/extension`
and click **select**. Now whenever you make a change (so long as the `npm run
watch` task is running) will get re-compiled, but you'll still have to
**refresh** the extension when a change has been made.

When submitting a patch or feature, do not bump the version on the
`manifest.json` or the `package.json` files. That will be done by the
maintainers of the project.

## Authors

* [Ricard Solé](https://github.com/rscole)

## License

MIT

[Chrome Web Store]: https://chrome.google.com/webstore/detail/uploadly/chapnejommikhigcaegmdijjjadaopce
[contributing]: https://github.com/rcsole/uploadly/blob/master/CONTRIBUTING.md
[nvm]: https://github.com/creationix/nvm
[npm]: https://npmjs.com
[nodejs]: https://nodejs.org/en/
