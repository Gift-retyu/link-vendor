import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import microConfig from './micro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { LinkResolver } from './resolvers/link'
import { UserResolver } from './resolvers/user'
import connectRedis from 'connect-redis'

import redis from 'redis'
import session from 'express-session'
import { MyContext } from './types'
import cors from 'cors'



declare module "express-session" {
  interface Session {
    userId: number;
  }
}
const main = async () => {
  const orm = await MikroORM.init(microConfig)
  await orm.getMigrator().up()


  console.log(__prod__);

  const app = express()

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()


  app.set("trust proxy", 1);
  app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:3006',

  }))
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie:{
       maxAge: 1000 * 60  * 60 * 24 * 365 , // year
       httpOnly : true,
       sameSite: 'lax',
       secure : __prod__ // cookie only works in https
      },
      saveUninitialized: false,
      secret: '43grvfwjkemfpo2i3gf',
      resave: false,
  
    }),
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LinkResolver, UserResolver],
    
      validate: false,
     
    }),
    context: ({req, res}) : MyContext => ({ em: orm.em, req, res }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors:false})

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.error(err)
})
