# By Breed App

A React Native (Expo) app that displays cat and dog breeds from a local JSON dataset.

## What this app does

- Loads breed data from `cat-and-dog-breeds.json`
- Converts raw nested JSON into arrays of breed objects in `breeds.js`
- Exports ready-to-use arrays: `cats` and `dogs`
- Renders a simple list of breed names in the app using `FlatList`

## Tech stack

- Expo SDK 54
- React Native
- React

## Project structure

- `cat-and-dog-breeds.json`  
  Source dataset for cat and dog breeds.

- `breeds.js`  
  Data adapter layer:
  - imports JSON
  - creates `petTypes`
  - creates `cats` and `dogs` arrays
  - exports `{ petTypes, cats, dogs }`

- `App.js`  
  Main UI screen:
  - imports `cats` and `dogs`
  - combines them for display
  - renders breed names in a `FlatList`

- `index.js`  
  Registers the root app with Expo.

- `app.json`  
  Expo app configuration.

- `package.json`  
  Dependencies and scripts.

## How the data transformation works

The JSON shape is nested by category and breed name:

- `cat_breeds` -> object of cat breed entries
- `dog_breeds` -> object of dog breed entries

`breeds.js` loops over each category, then each breed key, and converts that into an array of objects.  
Each resulting object includes the breed name as `breed` plus all ratings/properties from the dataset.

Example usage:

```js
import { cats, dogs } from './breeds'

console.log(cats.length)
console.log(dogs[0])
```

## Getting started

1. Install dependencies

```bash
npm install
```

2. Start the Expo dev server

```bash
npx expo start
```

If default ports are busy, run on a custom port:

```bash
npx expo start --port 19051
```

3. Open on device
- iOS: scan QR with Camera (opens Expo Go)
- Android: scan QR with Expo Go

## NPM scripts

- `npm run start` - Start Expo
- `npm run ios` - Start for iOS
- `npm run android` - Start for Android
- `npm run web` - Start for web

## Current status

- Project is configured for Expo SDK 54 (compatible with latest Expo Go on iOS).
- Breed data imports are working.
- App currently renders a simple breed-name list.

## Notes

You may see warnings like:

- manifest asset resolution warnings (often non-blocking, especially in offline mode)
- `SafeAreaView` deprecation warning from React Native

These warnings do not prevent the app from running, but can be cleaned up in a next step.
