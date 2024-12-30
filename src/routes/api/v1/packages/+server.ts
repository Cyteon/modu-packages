import CliCode from '$lib/models/CliCode';
import Release from '$lib/models/Release';
import Package from '$lib/models/Package';
import { Client } from 'minio';
import { S3_ENDPOINT, S3_PORT, S3_SECURE, S3_SECRET_KEY, S3_ACCESS_KEY, S3_BUCKET } from '$env/static/private';

var client = new Client({
    endPoint: S3_ENDPOINT,
    port: parseInt(S3_PORT),
    useSSL: S3_SECURE === 'true',
    accessKey: S3_ACCESS_KEY,
    secretKey: S3_SECRET_KEY,
});

export async function POST({ request }) {
    const code = request.headers.get('Authorization');

    if (!code) {
        return new Response('Unauthorized', { status: 401 });
    }

    const found = await CliCode.findOne({ code });

    if (!found) {
        return new Response('Unauthorized', { status: 401 });
    }

    let { name, version, file, readme, description } = await request.json();

    if (!name || !version || !file) {
        return new Response('Invalid request', { status: 400 });
    }

    if (!readme) {
        readme = "No readme provided";
    }

    let pkg = await Package.findOne({ name });

    if (!pkg) {
        pkg = new Package({ name, ownerId: found.userId });
        await pkg.save();
    }

    if (pkg.ownerId != found.userId) {
        return new Response('You do not own this package', { status: 403 });
    }

    pkg.description = description;
    pkg.latestVersion = version;
    await pkg.save();

    let release = await Release.findOne({ packageName: name, version });

    if (release) {
        return new Response(`Version ${version} already exists`, { status: 409 });
    }

    if (file.length > 1000000) {
        return new Response('File too large', { status: 413 });
    }

    let buffer = Buffer.from(file);

    client.putObject(S3_BUCKET, `${name}/${version}.zip`, buffer, (err, etag) => {
        if (err) {
            return new Response('Internal server error', { status: 500 });
        }

        console.log(`Uploaded ${name}/${version}.zip with etag ${etag}`);
    });

    release = new Release({ 
        packageName: name, 
        version, 
        zipUrl: `${S3_SECURE === 'true' ? 'https' : 'http'}://${S3_ENDPOINT}:${S3_PORT}/${S3_BUCKET}/${name}/${version}.zip`, 
        readme,
        description,
    });

    await release.save();

    return new Response('OK');
}