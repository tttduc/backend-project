const js = require('fs');

//Save data to file
function write(file, data) {
    js.writeFileSync(file, JSON.stringify(data), function(err){
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = {write};