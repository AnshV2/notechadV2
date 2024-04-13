import { error } from '@sveltejs/kit';
import { createClient } from "@libsql/client";
import { DB_TOKEN } from '$env/static/private'
import { DB_LINK } from '$env/static/private'

const client = createClient({
    url: DB_LINK,
    authToken: DB_TOKEN,
});



export function DELETE({ id }) {
	client.execute({
        sql: "DELETE FROM stuff WHERE ID = ?;",
		args: [id]
	});

	return ("success")
}