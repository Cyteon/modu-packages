<script lang="ts">
    import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public";
    import state from "$lib/state.svelte";
    import { removeCookie } from "typescript-cookie";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";

    let showUserMenu = false;
    let query = "";

    if (browser) {
        query = new URLSearchParams(window.location.search).get("q") || "";
    }
</script>

<nav class="flex flex-col md:flex-row px-1 md:px-16 py-2">
    <a href="/" class="text-3xl font-bold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-ctp-red to-75% to-ctp-yellow">Modu (Packages)</a>

    <div class="ml-auto flex my-auto w-full max-w-[700px] bg-ctp-crust rounded-md border border-ctp-surface0 mb-2 lg:mb-0 text-lg">
        <input type="text" class="leading-relaxed" placeholder="Search for packages" bind:value={query} />
        <button class="rounded-tr-md rounded-br-md bg-ctp-mantle font-semibold px-2" on:click={() => {
            if (query.trim() === "") return;

            goto(`/search?q=${query}`);
        }}>Search</button>
    </div>

    <div class="ml-auto flex my-auto">
        {#if state.user}
            <button class="flex" on:click={() => showUserMenu = !showUserMenu}>
                <img src={state.user.avatar_url} alt="User avatar" class="h-10 w-10 rounded-full" />
                <span class="text-2xl font-semibold ml-2 mt-0.5">{state.user.name}</span>
            </button>

            {#if showUserMenu}
                <div class="absolute mt-12 bg-ctp-crust rounded-md border border-ctp-surface0 text-xl w-36 flex flex-col">
                    <a href="/dashboard" class="w-full text-left px-2 py-1 hover:bg-ctp-surface0 rounded-t-md">
                        Dashboard
                    </a>
                    
                    <hr class="border-ctp-surface0" />

                    <button class="w-full text-left px-2 py-1 hover:bg-ctp-surface0 rounded-b-md" on:click={() => {
                        removeCookie("access_token");
                        state.user = null;  
                    }}>
                        Sign out
                    </button>
                </div>
            {/if}
        {:else}
            <a 
                href={`https://github.com/login/oauth/authorize?client_id=${PUBLIC_GITHUB_CLIENT_ID}`}
                class="text-2xl h-fit my-auto leading-relaxed px-3 pb-0.5 a-btn rounded-md"
            >
                Login
            </a>
        {/if}
    </div>
</nav>