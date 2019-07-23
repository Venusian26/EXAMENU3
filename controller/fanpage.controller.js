const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');


let _fanpage;



const createFanpage = (req, res) => {
    const fanpage = req.body;
    _fanpage.create(fanpage)
        .then((data) => {
            res.status(200);    
            res.json({ msg:"Fanpage register"+"\n"+data});
            
        })
        .catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        });    
}

const findAllP = (req, res) => {
    _fanpage.find()
        .then ((data) =>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro la fanpage"});
            }
            else{
                res.status(status.OK);
                res.json({msg:"Exito!!!", data:data});
            }
        })
        .catch((err) =>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"})
        });
}


const findID = (req, res) => {
    const {id}=req.params;
    const params = {
        _id:id
    };
    _fanpage.findOne(params)
        .then((data) =>{
            res.status(status.OK);
            res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}

//buscar fanpage por palabra clave
const findByKey = (req, res) => {
   const {keyword}=req.params;

    const params = {
        keywords:keyword
    
    };

    _fanpage.find(params)
        .then((data) =>{
            
          res.status(status.OK);
          res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}


const calificacionGlobal = (req, res) => {
    const {id}=req.params;
 
     const params = {
         _id:id  
     };
 
     _fanpage.findOne(params)
         .then((data) =>{
            var calf = data.calificaciones;
            var suma =0;
            var promedio =0;
            for(let i=0; i<calf.length;i++){
                suma = suma + parseInt(calf[i]);
                promedio = suma / calf.length;
            }
           
            
            
           res.status(status.OK);
           res.json({msg:"PROMEDIO DE CALIFICACIONES :",data:promedio});
         })
         .catch((err) =>{
             res.status(status.NOT_FOUND);
             res.json({msg:"Error!!! No se encontro",err:err})
         });
 }

 const insertarKey = (req,res) =>{
    const {id} = req.params;
    const fanpage = req.body.keywords;

    const params = {
        _id:id
    }
    
    _fanpage.findByIdAndUpdate(params,fanpage,{new:true})
        .then((data)=>{
            var key = (fanpage+"");
            Data.keywords.push(key); //Creo que aqui se lo estoy mandando al objeto y no al documento

            res.status(status.OK);
            res.json({msg:"Update correcto",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error, documento no actualizado",err:err});
        })
}
 



const updateById = (req,res) =>{
    const {id} = req.params;
    const fanpage = req.body;

    const params = {
        _id:id
    }
    
    _fanpage.findByIdAndUpdate(params,fanpage,{new:true})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Update correcto",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error, documento no actualizado",err:err});
        })
}



module.exports = (Fanpage) => {
    _fanpage = Fanpage;
    return ({
        createFanpage,
        findAllP,
        findID,
        updateById,
        findByKey,
        calificacionGlobal,
        insertarKey
    });
}
