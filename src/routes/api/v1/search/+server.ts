import Package from '$lib/models/Package';

export async function GET({ url }) {
    const query = url.searchParams.get('q');

    if (!query) {
        return new Response('Invalid request', { status: 400 });
    }

    const packages = await Package.find({ $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }] });

    return new Response(JSON.stringify(packages));
}