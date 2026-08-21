/*
 Jest configuration for a Node.js backend project.
*/
export default {
    /*
     Run tests in the Node.js environment.

     We are testing a backend server, so we do not
     need a browser-like environment.
    */
    testEnvironment: 'node',

    /*
     Our source code already uses native ES modules.
     Therefore, Jest should not transform the code.
    */
    transform: {},

    /*
     Look for test files inside the tests folder
     whose names end with .test.js.
    */
    testMatch: ['**/tests/**/*.test.js'],

    // Include every backend source file in the coverage report.
    collectCoverageFrom: ['src/**/*.js'],

    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],

    /*
     Display the name of each test while running.
    */
    verbose: true
};