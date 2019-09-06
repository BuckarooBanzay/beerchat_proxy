const app = require("./app");

require("./rx.js");
require("./tx.js");

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
