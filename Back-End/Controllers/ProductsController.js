const res = require('express/lib/response')
const phone = require('../Models/Products')


const phoneGetController = async (req, res)=>{
    try{
        const allPhones = await phone.find()
        res.status(200).send(allPhones)
        console.log();
    } catch(err){
        console.log(error);
    }
}

const phonePostController = async (req, res)=>{
    const { phoneName, model, color, price } = req.body

    try {
        const newPhone = new phone({
            phoneName,
            model,
            color,
            price,
        })
        const addPhone = await newPhone.save()
        res.status(200).send(addPhone)
        console.log(addPhone);
    } catch (error) {
        console.log(error);
    }
}

const getPhoneById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const phoneById = await phone.findById(id);
        res.status(200).send(phoneById)
        console.log(phoneById);
    } catch (error) {
        console.log(error);
    }
}

const deletePhoneById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedPhoneById = await phone.findByIdAndDelete(id);
        res.status(200).send('this Phone has been deleted')
    } catch (error) {
        console.log(error);
    }
}

const putPhoneById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const updatedPhoneById = await phone.findOneAndUpdate({_id:id}, {
            phoneName: req.body.phoneName,
            model: req.body.model, 
            color: req.body.color,
            price: req.body.price,
        },
        {
            new: true,
            message: 'This phone has been updated'
        }
        )
        
        console.log(updatedPhoneById);
        res.status(200).send(updatedPhoneById)
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    phoneGetController,
    phonePostController,
    getPhoneById,
    deletePhoneById,
    putPhoneById
}
