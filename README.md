## Table of Contents
- **[Requirements](#requirements)**
- **[Installation](#installation)**
- **[Usage](#usage)**
  - [Run the app](#run-the-app)
  - [Access To Pages](#access-to-pages)
- **[Docker](#docker)**

## Requirements
- `git`
- `yarn` or `npm`
- `docker` and `docker-compose` (Optional)

## Installation

```bash
git clone https://github.com/xtrinitys/purrweb-internship-0

cd purrweb-internship-0

yarn install # or npm install
```

## Usage
### Run the app
Use this scripts to run app:

- `yarn run serve:main` - for main template
- `yarn run serve:slider` - for slider

Also `build:main` and `build:slider` could be used for building production builds accordingly.

### Access to pages
Pages will be accessible at:
|Page|Address|
|----|-------|
|Main Template | ```http://localhost:3000```|
|Slider        | ```http://localhost:3001```|

## Docker

To use application in docker:

- Start app: `docker-compose up -d`
- Stop  app: `docker-compose down`
- Rebuild app: `docker-compose up -d --build`

To access webpage see [Access to pages](#access-to-pages)

## TODO
- [X] Write README
- [ ] Add information about repo in README
- [ ] Slider navigation dots