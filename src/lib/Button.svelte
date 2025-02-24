<script lang="ts">
  export let label: string;
  export let onClick: () => void;
</script>

<button class="reqButton" onclick={onClick}>
  {label}
</button>

<style>
  .reqButton
  {
      margin-right: 0.5em;
      padding: 0.5em;    

      font-size: medium;
      font-weight: bold;
  }
</style>
