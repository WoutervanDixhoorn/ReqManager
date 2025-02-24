<script lang="ts">
import Button from "$lib/Button.svelte";
import { addUsecase, type UsecaseInfo } from "$lib/usecases.svelte"

async function onAddUseCase()
{
    let usecase: UsecaseInfo = {
        index: -1,
        title: "Post case",
        text: "Use case added from post request!"
    };

    addUsecase(usecase);
}

function onAddSnowCard()
{
    console.log("Adding Snow Card");
}

</script>

<nav>
    <div class="navbar-container">
        <Button 
            label="Add Use Case"
            onClick={onAddUseCase}
        />

        <Button 
            label="Add SnowCard"
            onClick={onAddSnowCard}
        />
    </div>
</nav>

<style>
nav
{
    grid-area: navbar;
}

.navbar-container
{
    margin: 1em;
}
</style>