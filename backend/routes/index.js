var fs = require('fs');

module.exports = function(express){
    var router = express.Router();
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(router);
    });

    return router;
}
