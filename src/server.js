import express from 'express';
import http from 'http';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.status(200)
        .type('text/plain')
        .send('hello world');
});

app.get('/sum', (req, res) => {
    // Convert query parameters into integers.
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    /*
     parseInt(undefined, 10) produces NaN when a value is missing.

     parseInt('invalid', 10) also produces NaN.

     Therefore, this condition handles both missing
     and non-numeric query parameters.
    */
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({
            message:
                'Invalid query parameters. Ensure "a" and "b" are numbers.'
        });
    }

    // Explicitly return status 200 and the calculated sum.
    return res.status(200).json({
        sum: a + b
    });
});

// concat 

app.get('/concat', (req, res) => {
    // Read str1 and str2 from the URL query parameters.
    const str1 = req.query.str1;
    const str2 = req.query.str2;

    /*
     Check whether either query parameter is missing.

     If str1 is missing:
     req.query.str1 will be undefined.

     If str2 is missing:
     req.query.str2 will be undefined.
    */
    if (str1 === undefined || str2 === undefined) {
        // Return 400 Bad Request because required input is missing.
        return res.status(400).json({
            message:
                'Invalid query parameters. Ensure "str1" and "str2" are provided.'
        });
    }

    /*
     Query parameters are received as strings.

     Example:
     str1 = 'Hello'
     str2 = 'World'

     'Hello' + 'World' produces 'HelloWorld'.

     If str1 = '12' and str2 = '34',
     the result will be '1234', not 46.
    */
    const result = str1 + str2;

    // Return status 200 and the concatenated result.
    return res.status(200).json({
        result
    });
});

// This handles routes that do not exist.
app.use((req, res) => {
    return res.status(404)
        .type('text/plain')
        .send('this route is not available');
});

const PORT = 8000;

// Use the exact same capitalization everywhere.
const httpServer = http.createServer(app);

// Do not bind a port when Jest imports the application for request testing.
if (process.env.NODE_ENV !== 'test') {
    httpServer.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/`);
    });
}

export { app, httpServer };