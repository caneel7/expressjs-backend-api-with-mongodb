const Employee = require('../model/Employee');

const getAllEmployees = async (req,res)=>{

    const employees = await Employee.find()
    if(employees.length === 0){                               //if employees' length is 0 
        res.json({"message":"no employees currently"})
    }else{
        res.json(employees)
    }
}

const createNewEmployee = async (req,res)=>{

    if(!req.body.firstName || !req.body.lastName){
        return res.status(400).json({"message":"first name and last name are required"})
    }
    const duplicate = await Employee.findOne({firstName: req.body.firstName}).exec()
    if(duplicate){                                            
        return res.sendStatus(409)                //find employee with same name. not necessary two employees can have same name
    }
    try{
        const newEmployee = await Employee.create({                    //creating a new employee using mongoose.create 
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        const employees = await Employee.find()                      //finding all of the employees again to send in res
        res.json(employees)
    }catch(err){
        console.log(err)
    }
}

const updateEmployee = async(req,res)=>{

    const foundEmployee = await Employee.findOne({_id:req.body.id}).exec()
    if(!foundEmployee){
        res.status(404).json({"message":`Employee with id ${req.body.id} was not found.`})
    }
    if(req.body.firstName) foundEmployee.firstName = req.body.firstName             //if req has lastname or firstname then change it
    if(req.body.lastName) foundEmployee.lastName = req.body.lastName
    await foundEmployee.save()                                                     //updating employee
    const employees = await Employee.find()
    res.json(employees)
}

const deleteEmployee = async(req,res)=>{

    const foundEmployee = await Employee.findOne({id:req.body.id}).exec()
    if(!foundEmployee){
        res.status(404).json({"message":`Employee with id ${req.body.id} was not found.`})
    }
    try{
        await Employee.deleteOne({_id:req.body.id})                          //deleting employee with same id
        const employees = await Employee.find()
        res.json(employees)
    }catch(err){
        console.log(err)
    } 
}

const getEmployee = async (req,res)=>{

    const foundEmployee = await Employee.findOne({_id:req.params.id}).exec()
    if(!foundEmployee){
        res.status(404).json({"message":`Employee with id ${req.params.id} was not found.`})
    }
    res.json(foundEmployee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}