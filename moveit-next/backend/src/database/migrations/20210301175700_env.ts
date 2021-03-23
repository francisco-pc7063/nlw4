import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE TABLE moveit.env (
            id serial NOT NULL,
            "name" varchar(100) NOT NULL,
            value varchar(2000) NOT NULL,
            CONSTRAINT env_pk PRIMARY KEY (id),
            CONSTRAINT env_un UNIQUE ("name")
        );    
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
        DROP TABLE moveit.env;
    `)
}

