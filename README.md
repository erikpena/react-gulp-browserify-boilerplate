# react-gulp-browserify-boilerplate

## Introduction
> There are already so many different boilerplates out there for building static front end sites.  But none of the ones that I had evaluated used the *best of the breed* systems for building, compiling, bundling and testing.

Until now.

## Technologies Used
Below is the set of high-level technologies used.  Plugins for the below are mostly omitted but can be easily understood by looking at gulpfile.js and package.json files.

  - [Gulp][gulp] - The streaming build system.
  - [React][react] - The front end UI library.
  - [Bootstrap][bootstrap] - Front end responsive UI framework.
  - [Bower][bower] - Front end package manager.
  - [Browserify][browserify] - Dependency bundler.
  - [Babel][babel] - JavaScript compiler.

## Features

- Source compilation and bundling into single JavaScript file.
- Example [React][react] components that are rendered.
- Two Gulp tasks for deployments--
  - *Development* live building using Watchify for quicker iterations.
  - *Production* build with minifying/Uglifying sources along with source maps.

## Caveats
- It was a conscious decision to not include front end dependencies as part of the [Browserify][browserify] bundling task process simply because support for complex packages such as [Bootstrap][bootstrap] (where there are js, fonts, and css assets) is not where it needs to be in today's state.  [Bower][bower] is used because it is a *tried and true* package manager.

## Prerequisites
- NodeJS with NPM (Generally bundled together).

## Installation
You need Gulp installed globally--
```sh
$ npm install -g gulp
```

Next, clone the boilerplate locally-- 
```sh
$ git clone https://github.com/erikpena/react-gulp-browserify-boilerplate.git
$ cd react-gulp-browserify-boilerplate
$ npm install
```

## Development

Kick off the snapshot build and start the watchify process (typing default is optional)!
```sh
$ gulp default
```
Your deployables will be located in `./dist/snapshot/`

## Production Build
To build your sources into something that can be deployed, use the following command
```sh
$ gulp production
```
Your deployables will be located in `./dist/build/`

## Todos
Here are some things that are currently not in, but that I will like to add going forward--
 - Write Test Examples
 - Add Code Comments
 - Add LESS compiling

## Extra Jazz
If you decide to incorporate this boilerplate into your project and if you are also on a Microsoft Windows based platform, you may eventually run into a situation where you are unable to delete packages from your `node_modules` directory due to the path length.

If this happens, I **highly** recommend using a NodeJS package called [rimraf][rimraf].  Which can be used via a CLI to remove said problem director(y|ies).

### Installation
```sh
$ npm install -g rimraf
```

### Usage
```sh
$ rimraf <directory_name>
```

## License
MIT

[gulp]: <http://gulpjs.com/>
[react]: <https://facebook.github.io/react/>
[bootstrap]: <http://getbootstrap.com/>
[bower]: <http://bower.io/>
[browserify]: <http://browserify.org/>
[babel]: <https://babeljs.io/>
[rimraf]: <https://github.com/isaacs/rimraf>
