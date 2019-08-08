const express = require('express')

const app = express()
app.use(express.static('public'));
app.disable('etag');

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'))