<template>
<div >
	<div v-for="(value, key, index) in wheel" :key="index" >
		<!-- {{ key }} {{ value }} {{ index }} {{ angleStep }}  -->
		<Input :key="key" :name="key" :angle="angleStep*index"/>
	</div>
</div>
</template>

<script>
import wheel from '../models/wheel';
import Input from './Input';

export default {
	name: 'app',
	components: {
		Input
	},
	computed: {
		angleStep: () => 360/Object.keys(wheel).length,
	},
    data: () => ({
		wheel,
    })
};
</script>
