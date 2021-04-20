import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE TABLE moveit."user" (
            id serial NOT NULL,
            githubId int8 NOT NULL,
            avatarUrl varchar(300) NOT NULL,
            apiUrl varchar(300) NOT NULL,
            htmlUrl varchar(300) NOT NULL,
            CONSTRAINT user_pk PRIMARY KEY (id),
            CONSTRAINT githubId_un UNIQUE (githubId)
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
        DROP TABLE moveit."user";
    `)
}

