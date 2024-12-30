import CliCode from '$lib/models/CliCode';

export async function GET({ request }) {
    const code = request.headers.get('Authorization');

    if (!code) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const found = await CliCode.findOne({ code });

    if (!found) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return new Response(found.userId.toString());
};