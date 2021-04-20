import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE TABLE moveit."session" (
            id serial NOT NULL,
            user_id int8 NOT NULL,
            access_token varchar(300),
            token_type varchar(50),
            CONSTRAINT session_pk PRIMARY KEY (id),
            CONSTRAINT session_fk FOREIGN KEY (user_id) REFERENCES moveit."user"(githubId) ON DELETE CASCADE ON UPDATE CASCADE
        );    
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
        DROP TABLE moveit."session";
    `)
}

