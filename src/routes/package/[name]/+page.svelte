<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import { marked } from "marked";
    import DOMPurify from "dompurify";

    export let data;

    let pkg = {}

    let version = "latest";
    let error = "";

    onMount(async () => {
        if (data.props.name.split("@").length > 1) {
            const parts = data.props.name.split("@");
            data.props.name = parts[0];
            version = parts[1];
        }

        const res = await fetch(`/api/v1/packages/${data.props.name}/${version}`);

        if (res.ok) {
            pkg = await res.json();
            pkg.readme = DOMPurify.sanitize(marked(pkg.readme));
        } else {
            error = await res.text();

            if (error.length === 0 || error.length > 100) {
                error = "An unknown error has occurred";
            }
        }
    });
</script>

<div class="flex flex-col h-screen w-full">
    <NavBar />

    {#if error}
        <div class="m-auto text-center">
            <h1 class="text-4xl font-bold">An error occurred</h1>
            <p class="text-xl text-ctp-red">{error}</p>
        </div>
    {:else}
        <div class="flex flex-col px-2 mx-auto w-full md:w-1/2 mt-16 mb-4">
            <div>
                <div class="flex">
                    <h1 class="text-4xl font-bold">{data.props.name}</h1>
                    <p class="text-ctp-subtext0 ml-auto text-xl">v{pkg.version}</p>
                </div>
                <p class="text-lg">{pkg.description}</p>
                <div class="flex mt-2">
                    <p class="text-ctp-subtext0">{pkg.downloadCount} downloads</p>
                    <a href={pkg.zipUrl} target="_blank" rel="noopener noreferrer" class="ml-auto text-ctp-blue hover:underline">Download ZIP</a>
                </div>
            </div>
            <code class="bg-ctp-mantle rounded-md p-4 mt-4">modu install {data.props.name}@{pkg.version}</code>
            <div class="bg-ctp-mantle rounded-md mt-4 p-4">
                <p class="text-lg prose">{@html pkg.readme}</p>
            </div>
        </div>
    {/if}
    
    <Footer />
</div>