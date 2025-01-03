<script lang="ts">
    import { GithubIcon, Book } from "lucide-svelte";
</script>


<footer class="mt-auto bg-ctp-mantle p-2 border-t border-t-ctp-surface0 flex">
    Cyteon © 2024 - AGPL-3.0

    <a href="https://github.com/Cyteon/modu-packages" target="_blank" rel="noopener noreferrer" class="ml-auto hover:text-ctp-yellow transition-all duration-300">
        <GithubIcon class="h-6 w-6" />
    </a>

    <a href="https://www.cyteon.tech/modu/docs/libraries" target="_blank" rel="noopener noreferrer" class="ml-auto hover:text-ctp-yellow transition-all duration-300">
        <Book class="h-6 w-6" />
    </a>

    <a href="https://www.cyteon.tech/modu" target="_blank" rel="noopener noreferrer" class="ml-auto hover:text-ctp-yellow transition-all duration-300">
        <img src="/favicon.webp" class="h-6 w-6" />
    </a>
</footer>
