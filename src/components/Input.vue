<template>
<div id="container" :style="rotate(false)">
	<p id="name" :style="rotate(true)">{{ wheel[name] }}</p>
	<input 
		class="ray"
		type="range"
		min="0"
		max="5"
		step="1" 
		orient="vertical"
        value="wheel[name]"
		@input="(e) => wheel.changeItem(name, e.target.value)"/>
	</div>
</template>

<script>
import wheel from '../models/wheel';

export default {
    name: 'app',
    props: ['name', 'angle'],
    methods: {
        rotate(text) {
            return `transform: rotate(${text ? '-' : ''}${this.angle}deg) translateX(-100%);`;
        }
    },
    data: () => ({
        wheel
    })
};
</script>

<style scope>
div#container {
    display: flex;
    flex-direction: column;
    position: absolute;
    transform-origin: bottom left;
}

input.ray {
    margin: 0;
    padding: 0;
    color: blue;
    -webkit-appearance: slider-vertical;
    width: 1px;
    height: 175px;
}
</style>

