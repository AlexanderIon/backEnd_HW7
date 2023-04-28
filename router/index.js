const Router = require('koa-router');

const router = new Router();
const Task = require('../api/add_task.js');

let allTicketFull = [];
let allticket = [];
class TicketFull {
  constructor(name, discription, status) {
    this.id = (+new Date()).toString(16);
    this.name = name;
    this.status = status;
    this.description = discription;
    this.created = Date.now();
  }
}
/// / For API ///////
router.post('/addTask', (cxt, next) => {
  console.log('It Is from AddTicket');
  console.log(cxt.request.body);
  cxt.response.body = Task.addTask({ ...cxt.request.query });
  next();
});
/// ------------///

/// For cxt.request.query
router.get('/', (cxt, next) => {
  // cxt.body = 'HEllo my friend It is get request'

  console.log(cxt.request.query);
  if ('method' in cxt.request.query) {
    cxt.body = 'HEllo';
    console.log('with method');
    if (cxt.request.query.method === 'allTickets') {
      console.log('allTic');
      cxt.response.body = allticket;
      console.log(allticket);
      next();
      return;
    }
    if (cxt.request.query.method === 'ticketById') {
      console.log('Find ID');
      const needItem = allTicketFull.find((el) => el.id === cxt.request.query.id);
      if (!needItem) {
        cxt.response.body = 'There is no Item such ID';
        return;
      }
      cxt.response.body = needItem;
    }
    next();
    return;
  }
  console.log('get_withOUT_method');
  cxt.response.body = 'I don\'t know such GET ';

  next();
});
router.post('/', (cxt, next) => {
  console.log(cxt.request.query.method);
  if (cxt.request.query.method === 'createTicket') {
    console.log('CREATE NEW TICKET');
    const newTicketFull = new TicketFull();
    newTicketFull.name = cxt.request.body.name;
    newTicketFull.description = cxt.request.body.descreption;
    newTicketFull.status = cxt.request.body.status;
    allTicketFull.push(newTicketFull);
    const { description, ...newTiket } = newTicketFull;
    allticket.push(newTiket);
    cxt.response.body = newTicketFull;
  } else if (cxt.request.query.method === 'changeTicketId') {
    // const needId = allTicketFull.find(el => el.id === cxt.request.query['id'])
    const needIndex = allTicketFull.findIndex((el) => el.id === cxt.request.query.id);
    allTicketFull[needIndex].name = cxt.request.body.name;
    allTicketFull[needIndex].description = cxt.request.body.descreption;
    allTicketFull[needIndex].status = cxt.request.body.status;
    console.log('You want to change Element');
    console.log(needIndex);
    cxt.response.body = allTicketFull[needIndex];
  } else {
    console.log(cxt.request.query);
    console.log('Erro paranetr POST request ');
  }
  // console.log(cxt.request.body);

  console.log(allTicketFull);
  next();
});

router.delete('/', (cxt, next) => {
  console.log('МЕТОД Удаления');

  const { id } = cxt.request.query;
  console.log(id);
  if (allTicketFull.every((item) => item.id !== id)) {
    cxt.response.status = 400;
    cxt.response.body = {
      method: 'DELETE',
      data: {
        status: 'There is no such Element ',
      },
    };
    return;
  }
  allTicketFull = allTicketFull.filter((item) => item.id !== id);
  allticket = allticket.filter((item) => item.id !== id);
  console.log(allTicketFull);
  cxt.response.body = {
    method: 'DELETE',
    data: {
      status: 'OK',
    },
  };

  next();
});
/// /   ///////
module.exports = router;
