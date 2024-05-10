import { createClient } from "@libsql/client";
import { DB_TOKEN } from '$env/static/private'
import { DB_LINK } from '$env/static/private'

const client = createClient({
    url: DB_LINK,
    authToken: DB_TOKEN,
});



export async function load({ locals }) {
	let user = locals.session.userId
	const data = await client.execute({
		sql: "SELECT * FROM notes where userid = ?;",
		args: [user]
	});
	return {
		data: data.rows
	};
}


