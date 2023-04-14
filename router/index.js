const Router = require('koa-router');
const router = new Router();
const Task = require('../api/add_task');
let allTicketFull = []
let allticket = []
class TicketFull {
    constructor(name, discription, status){
        this.id = (+new Date).toString(16)        
        this.name = name
        this.status = status
        this.description = discription
        this.created = Date.now()
    }   
    
}
//// For API ///////
router.post('/addTask',(cxt,next) =>{
    console.log('It Is from AddTicket')
    console.log(cxt.request.body)
    cxt.response.body = Task.addTask({...cxt.request.query})
    next()
} )
/// ------------///

/// For cxt.request.query 
router.get('/', (cxt, next) => {
    // cxt.body = 'HEllo my friend It is get request'
    
    console.log(cxt.request.query)
    if ('method' in cxt.request.query){
        cxt.body = 'HEllo';
        console.log("with method")
        if (cxt.request.query['method'] === 'allTickets'){
            console.log("allTic")
            cxt.response.body = allticket;
            console.log(allticket)
            next();        
            return                     
           
        }
        else if (cxt.request.query['method'] === 'ticketById'){
            console.log("Find ID");
            const needItem = allTicketFull.find(el => el.id === cxt.request.query['id']);
            if(! needItem) {
                cxt.response.body = "There is no Item such ID";
                return;
            }
            cxt.response.body = needItem;          

        }
        next();
        return;
    }
    console.log("get_withOUT_method");
    cxt.response.body = 'I don\'t know such GET ';   
    
    next()
})
router.post('/', (cxt, next) => {
    console.log(cxt.request.query);
    console.log(cxt.request.body);    
    const newTicketFull = new TicketFull()
    newTicketFull.name = cxt.request.body['name'];
    newTicketFull.description = cxt.request.body['descreption'];
    newTicketFull.status = cxt.request.body['status'];
    allTicketFull.push(newTicketFull);
    const { description, ...newTiket } = newTicketFull; 
    allticket.push(newTiket);    
    cxt.response.body = newTicketFull;
    console.log(allTicketFull);
    next();
})

router.delete('/', (cxt, next) => {
    console.log('МЕТОД Удаления');
    
    const {id} = cxt.request.query 
    console.log(id) 
    if (allTicketFull.every(item => item.id !== id)) {
        cxt.response.status = 400;
        cxt.response.body = { 
            method: "DELETE",
            data: {
                status: 'There is no such Element '
            }
            } ;
        return
    }
    allTicketFull = allTicketFull.filter(item => item.id !== id);
    allticket = allticket.filter(item => item.id !== id);
    console.log(allTicketFull)
    cxt.response.body = { 
        method: "DELETE",
        data: {
            status: 'OK'
        }
        }   

    next();
})

router.put('/', (cxt, next) => {
    console.log('Метод PUT');
    const {name, description, id} = cxt.request.body;
    console.log(description)
    const inexIDfull = allTicketFull.findIndex(item => item.id == id)
    // const inexID = allticket.indexOf(id)
    console.log(inexIDfull)
    if (inexIDfull < 0) {
        
        cxt.response.status = 400;
        
        return
    }
    allTicketFull[inexIDfull].name = name;
    allTicketFull[inexIDfull].descreption = description;
    allticket[inexIDfull].name = name; 
    cxt.response.body = {
        method : 'PUT',
        data: {
            status : 'OK',
            res: allticket[inexIDfull]
        }

        };
    next()
    
})




////   ///////
module.exports = router;
