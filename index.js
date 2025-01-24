import { Hono } from 'hono';
import { serve } from '@hono/node-server'

const app = new Hono();
const PORT = 3000;

const videoInstance = new Hono();

const middleware = async (c, next) =>{
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
}
videoInstance.use(middleware)

videoInstance.get('/',(c)=>{
  return c.text("Hello World!")
})

app.route('/', videoInstance);


app.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Custom Error Message', 500)
  })

app.notFound((c) => {
    return c.text('Custom 404 Message', 404)
  })

serve({
    fetch: app.fetch,
    port: PORT,
  })
