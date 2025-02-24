<script lang="ts">
import { onMount } from "svelte";
import { loadUsecases } from "$lib/usecases.svelte";

import UsecaseContainer from "./UsecaseContainer.svelte";

onMount(async () => {
    await loadUsecases();
});

</script>

<div class="content-container">
            
    <UsecaseContainer />

    <div class="snowcard-container">
        <!--TODO-->
    </div>
</div>

<style>
.content-container {
    grid-area: content;
    
    margin: 0.5em;
    padding: 0.5em;

    display: grid;
    grid-template-columns: 1fr 3fr;

    gap: 0.5em;
}

.snowcard-container {
    background-color: #222;

    border: 2px solid #666;  
    border-radius: 5px;
    
    padding: 0.5em;
}
</style>