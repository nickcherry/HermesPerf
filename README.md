# Hermes v V8 Performance Benchmarks

A toy app to compare the performance of Hermes and V8.

## :package: Installing Dependencies

To install NPM dependencies, run `yarn install` from the project root.

## :rocket: Running the App

To run the app, start the Metro server by running `yarn start`, then launch the Android app by running `yarn android`.

## :microscope: Benchmarking

Tap the "Rerender Pizzas" button to re-render all the pizzas, then observe the average duration with Hermes vs V8.

You can benchmark versions of the app with different runtimes by checking out the following commits. Note that you'll need to run `(cd android && ./gradlew clean) && yarn install && yarn android` to rebuild the app each time.

- **Hermes:** 3f369a773194404c00e69be51ff39dd500c37d8d ([view results](./doc/benchmarks/hermes.mov))
- **V8 Without JIT:** 6f18cdf241926fb45d9019ccb5a3eba89f641796 ([view results](./doc/benchmarks/v8-jit.mov))
- **V8 With JIT:** 0f011d3bd29fc304d85bfa3aa54d022da23acb7b ([view results](./doc/benchmarks/v8-no-jit.mov))
