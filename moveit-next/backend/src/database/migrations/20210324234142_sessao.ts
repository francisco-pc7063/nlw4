import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE TABLE moveit."session" (
            id serial NOT NULL,
            user_id int,
            user_headers varchar(33),
            state varchar(150) NOT NULL,
            ip varchar(40) NOT NULL,
            CONSTRAINT session_pk PRIMARY KEY (id),
            CONSTRAINT session_fk FOREIGN KEY (user_id) REFERENCES moveit.users(id) ON DELETE CASCADE ON UPDATE CASCADE
        );    
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
        DROP TABLE moveit."session";
    `)
}

