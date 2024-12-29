<script lang="ts">
	import '../app.css';
	import { getCookie, removeCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import state from '$lib/state.svelte';

	let { children } = $props();

	onMount(async () => {
		const token = getCookie('access_token');

		if (token) {
			const res = await fetch('/api/v1/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (res.ok) {
				const data = await res.json();
				state.user = data;

				console.log('User:', data);
			} else {
				removeCookie('access_token');
			}
		}
	});
</script>

{@render children()}
