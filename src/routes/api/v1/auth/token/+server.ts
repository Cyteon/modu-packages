import { PUBLIC_GITHUB_CLIENT_ID } from '$env/static/public';
import { GITHUB_CLIENT_SECRET } from '$env/static/private';

export async function GET({ url }) {
    const code = url.searchParams.get('code');

    const res = await fetch(`https://github.com/login/oauth/access_token?client_id=${PUBLIC_GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await res.json();

    if (data.error) {
        return Response.json({ error: data.error }, { status: 400 });
    }

    return Response.json(data);
}