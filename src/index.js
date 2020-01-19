const app = require("./app");

require("./api/rx.js");
require("./api/tx.js");

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
