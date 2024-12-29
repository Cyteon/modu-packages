import CliCode from '$lib/models/cliCode';

export async function GET({ request }) {
    const token = request.headers.get('Authorization');

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: token
        }
    });

    if (!res.ok) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await res.json();

    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    const code = btoa(String.fromCharCode(...bytes));

    await CliCode.create({
        userId: data.id,
        code,
    });

    return Response.json({ code });
}