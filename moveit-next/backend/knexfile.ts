const path = require('path')

require('dotenv').config()

const { NODE_ENV, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB }  = process.env

if(NODE_ENV === 'test') undefined
else console.log("[DATABASE]: Initializing database connections on ENV:", NODE_ENV)

var pg
if (process.env.DB_HOST === 'production'){
    pg = {
        client: 'pg',
        connection: {
            host: POSTGRES_HOST,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DB
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
}
else {
    pg = {
        client: 'pg',
        connection: {
            host: POSTGRES_HOST || '127.0.0.1',
            user: POSTGRES_USER || 'nextleveluser',
            password: POSTGRES_PASSWORD || 'notNextLevelPassword',
            database: POSTGRES_DB || 'dev'
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
}

module.exports = pg