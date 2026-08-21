# Real-Time Chat App

A small Node.js HTTP API built with Express and native ES modules. The current
project provides health/welcome, addition, and string-concatenation endpoints,
with integration tests powered by Jest and Supertest.

> **Project status:** despite the repository name, real-time chat and WebSocket
> features have not been implemented yet. This repository currently contains
> the tested HTTP API foundation.

## Features

- Express 5 HTTP server
- Request logging with Morgan
- Native ECMAScript modules (`import` / `export`)
- Endpoint integration tests with Jest and Supertest
- Text, LCOV, and browsable HTML coverage reports
- Graceful test imports—the server does not bind to a port when
  `NODE_ENV=test`

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

The project was last verified with Node.js `24.11.1` and npm `11.6.2`.

## Installation

Clone the repository, enter its directory, and install the exact dependency
versions recorded in `package-lock.json`:

```bash
git clone <repository-url>
cd real_time_chatApp
npm ci
```

Use `npm install` instead when intentionally adding or updating dependencies.
Commit both `package.json` and `package-lock.json` so local, CI, and deployment
installations remain reproducible.

## Run the application

```bash
npm start
```

The server starts at [http://localhost:8000](http://localhost:8000). The port is
currently defined as `8000` in `src/server.js`; it is not read from `.env`.

For automatic restarts during local development, Nodemon is installed as a
development dependency and can be run with:

```bash
npx nodemon src/server.js
```

## API reference

| Method | Route | Parameters | Successful response |
| --- | --- | --- | --- |
| `GET` | `/` | None | `200` with `hello world` |
| `GET` | `/sum` | Query: `a`, `b` (numbers) | `200` with `{ "sum": 8 }` |
| `GET` | `/concat` | Query: `str1`, `str2` | `200` with `{ "result": "HelloWorld" }` |
| Any | Unknown route | None | `404` with `this route is not available` |

Example requests:

```bash
curl "http://localhost:8000/"
curl "http://localhost:8000/sum?a=5&b=3"
curl "http://localhost:8000/concat?str1=Hello&str2=World"
```

Invalid or missing query parameters for `/sum` and `/concat` return a `400 Bad
Request` response with a JSON error message.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Runs the API with Node.js using `src/server.js`. |
| `npm test` | Runs all Jest test suites once. |
| `npm run test:watch` | Runs Jest in watch mode and reruns affected tests as files change. |
| `npm run test:coverage` | Runs all tests and generates text, LCOV, and HTML coverage reports. |

The test scripts enable Node's experimental VM modules support because the
application and tests use native ES modules.

## Testing

Run the complete test suite:

```bash
npm test
```

Run tests continuously while developing:

```bash
npm run test:watch
```

The suite contains 9 integration tests across 3 suites. It covers the root
route, unknown routes, valid and invalid sums, and valid and invalid string
concatenation.

## Code coverage

Generate a coverage report:

```bash
npm run test:coverage
```

Jest prints a summary in the terminal and writes reports to `coverage/`:

- `coverage/lcov-report/index.html` — browsable, line-by-line HTML report
- `coverage/lcov.info` — LCOV data for CI services and editor integrations

Open `coverage/lcov-report/index.html` in a browser to inspect uncovered code.
The latest verified run produced:

| Metric | Coverage |
| --- | ---: |
| Statements | 91.66% |
| Branches | 90% |
| Functions | 80% |
| Lines | 91.66% |

Coverage output is generated locally and excluded from Git.

## Libraries and versions

The manifest uses compatible-version (`^`) ranges. The **Resolved version**
column shows the exact version currently recorded in `package-lock.json`.

### Runtime dependencies

| Library | Manifest version | Resolved version | Purpose |
| --- | --- | --- | --- |
| `express` | `^5.2.1` | `5.2.1` | Defines routes, middleware, request handling, and responses. |
| `morgan` | `^1.11.0` | `1.11.0` | Logs incoming HTTP requests in the concise `tiny` format. |
| `http` | `^0.0.1-security` | `0.0.1-security` | npm security placeholder; it does not provide the server implementation. The application imports Node's built-in `http` module. |

### Development dependencies

| Library | Manifest version | Resolved version | Purpose |
| --- | --- | --- | --- |
| `jest` | `^30.4.2` | `30.4.2` | Test runner, assertions, test discovery, and coverage generation. |
| `supertest` | `^7.2.2` | `7.2.2` | Sends simulated HTTP requests to the Express app in integration tests. |
| `nodemon` | `^3.1.14` | `3.1.14` | Restarts the development server when source files change. |

Because `http` is built into Node.js, the npm `http` security placeholder is
not required by the application and can be removed in a future dependency
cleanup.

## Project structure

```text
.
├── src/
│   └── server.js          # Express application, routes, and HTTP server
├── tests/
│   ├── app.test.js        # Root and not-found route tests
│   ├── concat.test.js     # Concatenation endpoint tests
│   └── sum.test.js        # Addition endpoint tests
├── jest.config.js         # Test discovery and coverage configuration
├── package.json           # Scripts and dependency ranges
├── package-lock.json      # Exact dependency tree
└── .gitignore             # Files excluded from version control
```

## Configuration notes

- The package uses `"type": "module"`, so source files use ES module syntax.
- Jest discovers files matching `tests/**/*.test.js`.
- Coverage includes JavaScript files under `src/`.
- `.env`, `node_modules/`, and generated coverage reports are ignored by Git.
- No environment variables are required by the current implementation.

## License

This project is licensed under the ISC license, as declared in `package.json`.
