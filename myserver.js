const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const router = require('./router');

const app = new Koa();

app.use(koaBody({
  urlencode: true,
  multipart: true,
}));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = 3300;
const server = http.createServer(app.callback());
server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`My Server is running and listening post ${port}`);
});
