const mongoose = require('mongoose');

let fanPageSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    keywords:[{
            type:String,
            required:true 
    }],
   coments:[{
            type:String,
            required:true  
    }],
    calificaciones:[{
                type:Number,
                required:true
        }]
});

const fanpageModel = mongoose.model('Fanpage', fanPageSchema, 'fanpage');
module.exports = fanpageModel;