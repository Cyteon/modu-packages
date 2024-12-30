<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";

    let topPackages = [];
    let totalPackages = 0;
    let totalDownloads = 0;

    onMount(async () => {
        const response = await fetch("/api/v1/home");

        if (response.ok) {
            const data = await response.json();

            topPackages = data.topPackages;
            totalPackages = data.totalPackages;
            totalDownloads = data.totalDownloads;

            console.log(data);
        }
    });
</script>

<div class="flex flex-col h-screen w-full">
    <NavBar />

    <h1 class="text-4xl font-bold text-center mt-16">Hosting the packages of the future</h1>
    <p class="text-center text-lg mt-1">Currently hosting <span class="font-bold">{totalPackages}</span> packages with a total of <span class="font-bold">{totalDownloads}</span> downloads</p>

    <div class="flex flex-col w-full justify-center items-center mt-6">
        <h1 class="text-2xl font-semibold">And here are the top ones</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 px-64 w-full">
            {#each topPackages as pkg}
                <a class="bg-ctp-mantle rounded-md p-4 border border-ctp-mantle hover:border-ctp-surface0 transition-all duration-300" href={`/package/${pkg.name}`}>
                    <div class="flex">
                        <h1 class="text-xl font-semibold">{pkg.name}</h1>
                        <p class="ml-auto text-ctp-subtext0">{pkg.latestVersion}</p>
                    </div>
                    <p class="text-lg">{pkg.description}</p>
                    <p class="mt-2 text-ctp-subtext0">{pkg.downloadCount} downloads</p>
                </a>
            {/each}
        </div>
    </div>

    <Footer />
</div>