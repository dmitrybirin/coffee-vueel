<template>
<div>
  <input 
	type="range"
	min="0"
	max="5"
	step="1" 
	orient="vertical"
	v-model="value"/>
	<p>{{ value }}</p>
	</div>
</template>

<script>
export default {
    name: 'app',
    data: () => ({
		value: 0
    })
};
</script>

<style scope>
input {
	transform: rotate(45deg);
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 175px;
    padding: 0 5px;
}
</style>

