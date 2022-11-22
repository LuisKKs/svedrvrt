
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname:{
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    phonenumber:{
        type: String,
        default: 'No proporcionado'
    },
    role:{
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'EMANAGER_ROLE','CMANAGER_ROLE']
    },
    status:{
       type: Boolean,
       default: true 
    },
    google:{
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
