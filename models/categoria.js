const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    raceType:{
        type: Schema.Types.ObjectId,
        ref: 'TipoCarrera',
        required: true
    },
    categoryName:{
        type: String,
        required: [true, 'El nombre de categoria es obligatorio']
    },
    branch:{
        type: String,
        required: [true, 'La rama es obligatoria']
    },
    description:{
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    }
});


CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );
