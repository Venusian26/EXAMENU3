const router = require('express').Router();

module.exports = (wagner) => {

    const fanpageCtrl = wagner.invoke((Fanpage) =>
        require('../controller/fanpage.controller')(Fanpage));



    //post //http://localhost:3000/api/v1/fanpages/
    router.post('/', (req, res) =>
        fanpageCtrl.createFanpage(req, res));

    //get //http://localhost:3000/api/v1/fanpages/
    router.get('/', (req, res) =>
        fanpageCtrl.findAllP(req, res));

    
    //get by ID //http://localhost:3000/api/v1/fanpages/"id"
    router.get('/:id', (req, res) =>
        fanpageCtrl.findID(req, res));
    

    //update by ID //http://localhost:3000/api/v1/fanpages/"id"
   /* router.put('/:id', (req, res) =>
        fanpageCtrl.updateById(req, res));
    */    
    //delete by ID //http://localhost:3000/api/v1/fanpages/"id"
    router.delete('/:id', (req, res) =>
        fanpageCtrl.deleteByID(req, res));


    //Buscar por palabra clave una fanpage
    //get by ID //http://localhost:3000/api/v1/fanpages/key/"id"
    router.get('/key/:keyword', (req, res) =>
        fanpageCtrl.findByKey(req, res));
    
    //obtener calificaciones globales
    //get /http://localhost:3000/api/v1/fanpages/cal/"id"
    router.get('/cal/:id', (req, res) =>
    fanpageCtrl.calificacionGlobal(req, res));
        
    //insertar key words
    //put ///http://localhost:3000/api/v1/fanpages/insertKey/"id"
    router.put('/insertKey/:id', (req, res) =>
        fanpageCtrl.insertarKey(req, res));
        

    return router;

    

}