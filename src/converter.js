const fs = require('fs');
const parseString = require('xml2js').parseString;

const xmltojson = async () => {
await fs.readFile(__dirname + '/../assets/horario.xml', "utf-8", (err, xml) => {
    if (err) { console.log(err) }
    parseString(xml, (err, result) => {
        result = result.Workbook.Worksheet[0].Table[0]
        var json = JSON.stringify(result)
        fs.appendFile(__dirname + '/../assets/horarios.json', JSON.stringify(result), (err) => {
            if (err) throw err;
            var aulas = []

            for(var i = 0; i < result.Row.length; i++){
                for(var j = 0; j < result.Row[i].Cell.length; j++){
                    var newAula = {}
                    /*
                        [4] 
                    */
                    console.log(result.Row[i].Cell[j].Data[0]._)
                }
            }
            
        });
    });
})
}
xmltojson()






