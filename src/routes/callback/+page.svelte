<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { setCookie } from "typescript-cookie";

    let code: string | null = null;
    let status = "loading";

    onMount(async () => {
        if (browser) {
            const url = new URL(window.location.href);
            code = url.searchParams.get("code");

            if (code) {
                status = "Authorizing with GitHub...";

                const res = await fetch(`/api/v1/auth/token?code=${code}`);
                
                if (res.ok) {
                    status = "Authorized with GitHub, redirecting...";

                    const data = await res.json();

                    setCookie("access_token", data.access_token, { expires: 60 * 60 * 24 * 7 });

                    window.location.href = "/";
                } else {
                    status = "Failed to authorize with GitHub";
                }

            } else {
                status = "Required URL parameter 'code' not provided";
            }
        }
    });
</script>

<div class="flex h-screen w-full">
    <div class="m-auto text-center">
        <h1 class="font-bold text-4xl">Authorization Callback</h1>

        <p class="text-xl">{status}</p>
    </div>
</div>