const Employee = require ('../models/employee');
const employeeCtrl = {};


employeeCtrl.getEmployees = async (req, res) => {
    // res.json({
    //     status: 'los empleados aqui'
    // });
    const employees =  await Employee.find()
    res.json(employees);
};

employeeCtrl.createEmployee = async (req, res) => {
    // const employee = new Employee(req.body);
    const employee = new Employee({
        name : req.body.name, 
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    });
    console.log(req.body);
    await employee.save();
    res.json({
        status : 'empleado guardado'
    });
    
}

employeeCtrl.getEmployee = async (req , res) => {
    console.log(req.params.id);
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
    // res.json({
    //     status : 'recibido'
    // });
     
}


employeeCtrl.editEmployee = async  (req, res) => {
    console.log(req.params.id);
    const { id} = req.params;
    console.log(req.body);
    const employee ={
        name : req.body.name,
        position: req.body.position,
        office : req.body.office,
        salary : req.body.salary 
    };
    await Employee.findByIdAndUpdate(id, {$set : employee}, {new:true});
    res.json({status:'employe update'});
}

employeeCtrl.deleteEmployee = async (req, res) => {

    console.log(req.params.id);
    const { id } = req.params;
    await Employee.findByIdAndRemove(id)
    res.json({status:'employe delete'});
}

module.exports = employeeCtrl;