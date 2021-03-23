import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE TABLE moveit.users (
            id serial NOT NULL,
            state varchar(150),
            access_token varchar(300),
            user_headers varchar(1200),
            token_type varchar(50),
            CONSTRAINT users_pk PRIMARY KEY (id),
            CONSTRAINT users_un UNIQUE (access_token)
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
        DROP TABLE moveit.users;
    `)
}

