
export async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable().unique();
        table.date('birthdate').notNullable();
        table.timestamps(true, true);
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists('users');
}
