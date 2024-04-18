import { error } from '@sveltejs/kit';
import { createClient } from "@libsql/client";
import { DB_TOKEN } from '$env/static/private'
import { DB_LINK } from '$env/static/private'

const client = createClient({
    url: DB_LINK,
    authToken: DB_TOKEN,
});



export async function DELETE({ request, locals }) {
	const { name } = await request.json();
    let user = locals.session.userId

    client.execute({
        sql: "DELETE FROM notes WHERE userid = ? AND name = ?;",
		args: [user, name]
	});
	
    return new Response(String(1));
}