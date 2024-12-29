<script lang="ts">
    import state from "$lib/state.svelte";
    import { onMount } from "svelte";
    import { getCookie, setCookie } from "typescript-cookie";
    import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public";

    let code = "Generating code...";

    onMount(async () => {
        const token = getCookie("access_token");

        if (!token) {
            setCookie("redirect", window.location.href, { expires: 10 });
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${PUBLIC_GITHUB_CLIENT_ID}`;
        }

        const res = await fetch("/api/v1/auth/code", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            code = data.code;
        } else {
            code = "Failed to generate code";
        }
    });
</script>

<div class="flex h-screen w-full">
    <div class="m-auto text-center">
        <h1 class="font-bold text-3xl">Dont share this code, provide it to modu</h1>

        <p class="text-xl">{code}</p>
    </div>
</div>