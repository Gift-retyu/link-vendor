import { __prod__ } from './constants'
import { Link } from './entities/Link'
import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import { User } from './entities/User'

export default {
  migrations: {
    path: path.join(__dirname,'./migrations'),
    pattern: /^[\w-]+\d+.[tj]s$/,
  },
  entities: [Link, User],
  dbName: 'linkVendor',
  user: 'postgres',
  password: 'password',
  debug: !__prod__,
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]
