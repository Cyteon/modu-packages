import Release from "$lib/models/Release";
import Package from "$lib/models/Package";

async function updateStats(pkg, release) {
  pkg.downloadCount++;
  await pkg.save();

  release.downloadCount++;
  await release.save();
}

export async function GET({ params, url }) {
  let searchParams = new URLSearchParams(url.search);
  let forDownload = (searchParams.get("isDownload") || "false") === "true";

  const { name, version } = params;
  let release;

  if (version === "latest") {
    release = await Release.findOne({ packageName: name }).sort({
      version: -1,
    });
  }

  if (!release) {
    release = await Release.findOne({ packageName: name, version });
  }

  if (!release) {
    return new Response(`Package ${name}, version ${version} not found`, {
      status: 404,
    });
  }

  const pkg = await Package.findOne({ name });

  if (forDownload) {
    Promise.all([updateStats(pkg, release)]);
  }

  const { zipUrl, readme, description } = release;

  return new Response(
    JSON.stringify({
      zipUrl,
      readme,
      description,
      version: release.version,
      downloadCount: pkg.downloadCount,
      ownerId: pkg.ownerId,
    }),
  );
}
