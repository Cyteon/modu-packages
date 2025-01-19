import Package from "$lib/models/Package";

export async function GET({}) {
  const topPackages = await Package.find()
    .sort({ downloadCount: -1 })
    .limit(20);
  const totalPackages = await Package.countDocuments();
  const totalDownloads = await Package.aggregate([
    { $group: { _id: null, total: { $sum: "$downloadCount" } } },
  ]);

  return new Response(
    JSON.stringify({
      topPackages,
      totalPackages,
      totalDownloads: totalDownloads[0].total,
    }),
  );
}
