let express = require('express');
let app = express();

app.get('/', function (req, res){
    res.sendFile('/Users/eelisn/Study/веб/yandexMap/index.html')
});

app.listen(8089);

