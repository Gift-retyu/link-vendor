he project is using [Jest](https://jestjs.io/) as a test runner


Testing Strategies

Unit Testing
  1. Component Mounting - ensure components render without crashing
  2. Component Rendering - ensure components receives and render props correctly
  3. Api calls - to ensure that service calls are made correctly , with correct payload, and that api responses are handled gracefully by the front end.
 
 
Snapshot Testing

To ensure application’s behaviour isn’t changing unexpectedly during development and that the output continues to behave as expected. Any new changes  introduced on “good” components will require the snapshots to be updated otherwise tests will fail.

Running the test script

  ```bash
npm test
# or
yarn test
```

Updating the snapshot

  ```bash
jest --updateSnapshot
# or
jest up
```
