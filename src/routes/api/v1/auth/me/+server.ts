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

    return Response.json(data);
}