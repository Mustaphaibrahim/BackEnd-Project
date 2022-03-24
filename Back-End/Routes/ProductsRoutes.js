const router =require ('express').Router();

const {
    phoneGetController,
    phonePostController,
    getPhoneById,
    deletePhoneById,
    putPhoneById
} = require('../Controllers/ProductsController')

router.route('/')
.get(phoneGetController)

.post(phonePostController)

router.route('/:id')
.get(getPhoneById)
.delete(deletePhoneById,)
.put(putPhoneById)


module.exports = router;