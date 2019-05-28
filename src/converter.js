const fs = require('fs');
const parseString = require('xml2js').parseString;

const xmltojson = async () => {
    await fs.readFile(__dirname + '/../assets/horario.xml', "utf-8", (err, xml) => {
        if (err) { console.log(err) }
        parseString(xml, (err, result) => {
            result = result.Workbook.Worksheet[0].Table[0]
            if (err) throw err;
            var aulas = []

            for (var i = 0; i < result.Row.length; i++) {
                try {
                    var newAula = {
                        "sigla": (result.Row[i].Cell[3].Data[0]._).toString(),
                        "turma": (result.Row[i].Cell[4].Data[0]._).toString(),
                        "materia": (result.Row[i].Cell[5].Data[0]._).toString(),
                        "periodo": (result.Row[i].Cell[6].Data[0]._).toString(),
                        "dias": (result.Row[i].Cell[7].Data[0]._).toString(),
                        "professor": (result.Row[i].Cell[9].Data[0]._).toString(),
                        "sala": (result.Row[i].Cell[10].Data[0]._).toString(),
                    }
                    aulas.push(newAula)
                } catch (e) {
                    console.log("Olou")
                } finally {
                    console.log("vamo que vamo")
                }
            }
            console.log(JSON.stringify(aulas))

            fs.appendFile(__dirname + '/../assets/horarios.json', JSON.stringify(aulas), (err) => { });
        });
    })
}
xmltojson()






