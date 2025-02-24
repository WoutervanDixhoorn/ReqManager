<script lang="ts">
import { draggable } from './draggable.svelte'
import type { UsecaseInfo } from './usecases.svelte';
 
let props: {
    usecaseInfo: UsecaseInfo
} = $props();

</script>

<div class="usecase-card" tabindex={props.usecaseInfo.index}
    role="cell"
    use:draggable={{
        index: props.usecaseInfo.index,
        onDragEnd: () => console.log("Drag end!")
    }}
    >
    <span class="usecase-title">{props.usecaseInfo.title}</span>
    <p class="usecase-text">{props.usecaseInfo.text}</p>
</div>

<style>
.usecase-card
{
    background-color: #333;
    
    border: 2px solid #666;
    border-radius: 5px;

    padding: 0.2em;
    margin-bottom: 0.5em;
}

:global(.usecase-card.dragging) {
    opacity: 40%;
}
.usecase-card:active {
    cursor: grabbing;
}

.usecase-title
{
    font-weight: bold;

    padding: 0px;
}

.usecase-text
{
    margin: 0; 
    padding: 0px;
}
</style>