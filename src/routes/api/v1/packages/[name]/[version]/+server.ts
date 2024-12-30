import Release from '$lib/models/Release';

export async function GET({ params }) {
    const { name, version } = params;
    let release;

    if (version === 'latest') {
        release = await Release.findOne({ packageName: name }).sort({ version: -1 });
    }

    if (!release) {
        release = await Release.findOne({ packageName: name, version });
    }

    if (!release) {
        return new Response('Not found', { status: 404 });
    }

    const { zipUrl, readme, description } = release;

    return new Response(JSON.stringify({ zipUrl, readme, description, version: release.version }));
}