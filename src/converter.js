const fs = require('fs');
const parseString = require('xml2js').parseString;

const dias2dia = ['segunda','terça','quarta','quinta','sexta','sabado']
const periodo2hora = [[],['07:00','07:45'],['7:45','8:30'],['08:30','9:15'],['9:30','10:15'],['10:15','11:00'],['11:00','11:45'],['11:45','12:30'],['13:00','13:45'],['13:45','14:30'],['14:30','15:15'],['15:30','16:15'],['16:15','17:00'],['17:00','17:45'],['17:45','18:30'],['19:00','19:45'],['19:45','20:30'],['20:30','21:15'],['21:30','22:15'],['22:15','23:00']]

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
                        "horaInicio": (periodo2hora[(result.Row[i].Cell[6].Data[0]._)][0]).toString(),
                        "horaFim": (periodo2hora[(result.Row[i].Cell[6].Data[0]._)][1]).toString(),
                        "professor": (result.Row[i].Cell[9].Data[0]._).toString(),
                        "sala": (result.Row[i].Cell[10].Data[0]._).toString(),
                       
                    }
                    var dias = (result.Row[i].Cell[7].Data[0]._).toString()
                    for(var p = 0; p < dias.length ; p++){
                        if(dias[p] == '1'){
                            newAula.dia = dias2dia[p].toString()
                            aulas.push(newAula)
                        }
                    }

                } catch (e) {
                    console.log("Erro: ", e)
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






