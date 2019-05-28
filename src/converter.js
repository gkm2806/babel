const fs = require('fs');
var parseString = require('xml2js').parseString;

fs.readFile(__dirname+'/../assets/horario.xml', "utf-8", (err, xml) => {
    if (err) { console.log(err) }
    parseString(xml, (err, result) => {
        var json = JSON.stringify(result)
        fs.appendFile(__dirname+'/../assets/horarios.json', json, (err) => {
            if (err) throw err;
            console.log(result.Workbook.Worksheet[0].Table[0].Row[1].Cell[9]);
        });
    });
}) 






