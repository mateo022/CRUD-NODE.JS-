const fs = require('fs');
const path = require('path');

// Escribir fecha y hora de la solicitud de inserción en el archivo inserts.json
function storage (fridge){
    const insertsFile = path.join(__dirname, 'inserts.json');
    const now = new Date();
    const formattedDate = `${now.toLocaleTimeString('en-US')} ${now.toLocaleDateString('en-US')}`;
    fs.readFile(insertsFile, 'utf-8', (error, data) => {
      if (error) {
        console.error(error);
      } else {
        const insertsJson = JSON.parse(data);
        insertsJson.insert_request_dates.push(formattedDate);
        fs.writeFile(insertsFile, JSON.stringify(insertsJson, null, 2), error => {
          if (error) {
            console.error(error);
          } else {
            console.log(`Fecha y hora de solicitud de inserción guardadas en ${insertsFile}`);
          }
        });
      }
    });
}

 module.exports = {storage}