import CliCode from '$lib/models/cliCode';

export async function GET({ request }) {
    const code = request.headers.get('Authorization');

    if (!code) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const found = CliCode.findOne({ code });

    if (!found) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // return pure text
    return new Response(found.userId.toString());
};