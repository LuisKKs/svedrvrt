
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch,
        getUsuarioPorId } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El nombre es obligatorio').not().isEmpty(),
    check('phonenumber', 'El numero telefonico es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 8 caracteres').isLength({min:8}),
    check('email',  'El email es obligatorio').not().isEmpty(),
    //check('email').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

// TODO: Aquí
router.get('/:id',[
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], getUsuarioPorId );



router.patch('/', usuariosPatch );





module.exports = router;