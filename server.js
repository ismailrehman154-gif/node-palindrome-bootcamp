const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    // homepage or inital loading screne
    if (page == "/") {

        fs.readFile('index.html', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading file');
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.end(data);
        });

    }

    // CSS
    else if (page == '/css/styles.css') {

        fs.readFile('css/styles.css', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading CSS');
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            res.end(data);
        });

    }

    // frontend javascript
    else if (page == '/js/main.js') {

        fs.readFile('js/main.js', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading JavaScript');
            }

            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });

            res.end(data);
        });

    }

    // palindrome API
    else if (page == '/api') {

        if ('palindrome' in params) {    

            const userInput = params['palindrome'];
            const inputCleaned = userInput.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // using this for edge cases, like spaces or characters other than letters and numbers to be removed and uppercase letters
            //check if name is a palindrome, it is the same words forwards and backwards
            if (inputCleaned === inputCleaned.split('').reverse().join('')) {   // check if the cleaned input is the same forwards and backwards, join it together and compare it to the original cleaned input

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });



                res.end(JSON.stringify({ isPalindrome: true }));

            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });


                return res.end(JSON.stringify({ isPalindrome: false }));
            }
        }
    }
});

server.listen(process.env.PORT || 8050, () => {
    console.log('Server is running on port 8050');
});