<template>
    <div id='container'>
		<input 
			type="text" 
			@value="cup.title"
			@input="e => cup.changeTitle(e.target.value)"
		/>

		<textarea 
			type="text" 
			rows="3" cols="33"
			@value="cup.description"
			@input="e => cup.changeDescription(e.target.value)"
		/>
    </div>
</template>

<script>
import cup from '../models/cup';

export default {
    name: 'Description',
    data: () => ({
        cup
    })
};
</script>

<style scoped>
div#container {
    display: flex;
    flex-direction: column;
}
</style>
