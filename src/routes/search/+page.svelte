<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
  import { getUser } from "$lib/db";

    let packages = [];
    let query = "";

    if (browser) {
        query = new URLSearchParams(window.location.search).get("q");
    }
    
    onMount(async () => {
        const response = await fetch("/api/v1/search?q=" + query);

        if (response.ok) {
            const data = await response.json();

            if (data.length === 1 && data[0].name.toLowerCase() === query.toLowerCase()) {
                window.location.href = `/package/${data[0].name}`;
            }

            packages = await Promise.all(data.map(async (pkg) => {
                const user = await getUser(pkg.ownerId);
                return {
                    ...pkg,
                    username: user?.username || "Unknown"
                };
            }));
        }
    });
</script>

<div class="flex flex-col h-screen w-full">
    <NavBar />

    <div class="flex flex-col w-full justify-center items-center mt-6">
        <h1 class="text-2xl font-semibold">Search results</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 px-2 md:px-8 lg:px-12 xl:px-64 w-full mb-4">
            {#each packages as pkg}
                <a class="bg-ctp-mantle rounded-md p-4 border border-ctp-mantle hover:border-ctp-surface0 transition-all duration-300" href={`/package/${pkg.name}`}>
                    <div class="flex">
                        <h1 class="text-xl font-semibold">{pkg.name}</h1>
                        <p class="ml-auto text-ctp-subtext0">v{pkg.latestVersion}</p>
                    </div>
                    <p class="text-lg">{pkg.description}</p>
                    <div class="flex">
                        <p class="mt-2 text-ctp-subtext0">{pkg.downloadCount} downloads</p>
                        <p class="mt-2 ml-auto text-ctp-subtext0">By {pkg.username}</p>
                    </div>
                </a>
            {/each}
        </div>

        {#if packages.length === 0}
            <div class="flex flex-col items-center justify-center w-full">
                <p class="text-lg">No packages found</p>
            </div>
        {/if}
    </div>

    <Footer />
</div>