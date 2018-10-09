<template>
<div>
  <input 
	type="range"
	min="0"
	max="5"
	step="1" 
	orient="vertical"
	@input="(e) => wheel.changeItem(name, e.target.value)"/>
	<p>{{ wheel[name] }}</p>
	</div>
</template>

<script>
import wheel from '../models/wheel';

export default {
	name: 'app',
	props: ['name'],
    data: () => ({
		wheel
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

