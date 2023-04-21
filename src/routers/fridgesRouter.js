const express = require('express')
const sql = require('../../db')
const fridgesjson = require ('../../fridgesJson')

const fridgesRouter = express.Router()

async function store ( fridge){
    const response = await sql `
    INSERT INTO fridges(
        reference_fridges, capacity_fridges, has_water_dispenser_fridges, energy_clasification_fridges, status_fridges)
        VALUES (${fridge.reference_fridges}, ${fridge.capacity_fridges}, ${fridge.has_water_dispenser_fridges},${fridge.energy_clasification_fridges},${fridge.status_fridges});`
        fridgesjson.storage( fridge)
        return response
}

async function update ( fridge){
    const response = await sql `
    UPDATE fridges SET
        reference_fridges=${fridge.reference_fridges}, 
        capacity_fridges=${fridge.capacity_fridges},  
        has_water_dispenser_fridges=${fridge.has_water_dispenser_fridges},
        energy_clasification_fridges=${fridge.energy_clasification_fridges},
        status_fridges=${fridge.status_fridges}
         WHERE id_fridges=${fridge.id_fridges}`
        return response
}
//---------------------------------------------------------
//Obtener todos los registros
fridgesRouter.route('/').get(async (req,res)=>{
    //Obtener el listado de Sesiones
    const fridges = await sql`SELECT id_fridges, reference_fridges, capacity_fridges, has_water_dispenser_fridges, energy_clasification_fridges, status_fridges
	FROM fridges;`
    res.render('fridges', {
        fridges: fridges
    });
})
//---------------------------------------------------------
//Insertat  registro

fridgesRouter.route('/create').get((req, res)=>{
    res.render('create')
   
})

fridgesRouter.route('/store').post(async(req, res)=>{
    console.log(req.body);
    await store(req.body) //Almacenamos en DB
    res.redirect('/fridges')
})

//---------------------------------------------------------
//Editar todos los registros

    fridgesRouter.route('/edit/:id').get(async(req, res)=>{
    //1.Consultar ek registro en la DB a partir de su ID
    const id_fridges = req.params.id
    const fridge = await sql`SELECT id_fridges, reference_fridges, capacity_fridges, has_water_dispenser_fridges, energy_clasification_fridges, status_fridges
	FROM fridges
	where id_fridges= ${id_fridges};`
    

    //2. Enviar el registro a la plantilla
    res.render('edit',{
        fridge: fridge[0]
    })
   
})

fridgesRouter.route('/update').post(async(req, res)=>{
    //1.Consultar ek registro en la DB a partir de su ID
    console.log(req.body);
    await update (req.body)
   
    res.redirect('/fridges')
})



//-----------------------DELETE
fridgesRouter.route('/destroy/:id').post(async(req, res)=>{
    const id_fridges = req.params.id
    const response = await sql`
    DELETE  FROM fridges
    WHERE id_fridges=${id_fridges};`

    res.redirect('/fridges')
})


module.exports = fridgesRouter