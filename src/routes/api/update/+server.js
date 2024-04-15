import { error } from '@sveltejs/kit';
import { createClient } from "@libsql/client";
import { DB_TOKEN } from '$env/static/private'
import { DB_LINK } from '$env/static/private'

const client = createClient({
    url: DB_LINK,
    authToken: DB_TOKEN,
});



export async function POST({ request, locals }) {
	const { name, width, height, top, left, content } = await request.json();
    let user = locals.session.userId

    console.log("top")

    client.execute({
        sql: "INSERT OR REPLACE INTO notes (userid, name, width, height, top, left, content) VALUES (?, ?, ?, ?, ?, ?, ?);",
		args: [user, name, width, height, top, left, content]
	});
	
    return new Response(String(1));
}