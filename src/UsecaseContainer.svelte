<script lang="ts">
import { dropzone } from "$lib/draggable.svelte";
import UsecaseCard from "$lib/UsecaseCard.svelte";

import { getUsecases } from "$lib/usecases.svelte"

</script>

<div class="usecase-container" role="table" use:dropzone>
    {#each getUsecases() as usecase}
        <UsecaseCard
            usecaseInfo={usecase}
        />
    {/each}
</div>

<style>
.usecase-container {
    background-color: #222;

    border: 2px solid #666;  
    border-radius: 5px;
    
    padding: 0.5em;
}
</style>