<template>
    <div id='container'>
		<div id="title-container">
			<input 
				id="title"
				placeholder="name your coffee"
				type="text" 
				@value="cup.title"
				@input="e => cup.changeTitle(e.target.value)"
			/>
			<label for="title">Name your coffee</label>
		</div>
		<button @click="this.sendCup">Send!</button>
    </div>
</template>

<script>
import cup from '../models';

export default {
    name: 'Description',
    data: () => ({
		cup
    }),
    methods: {
        sendCup: () => {
            cup.changeDate(new Date().toISOString().slice(0, 19).replace('T', ' '))
            cup.send()
        }
    }
};
</script>

<style scoped>
div#container div#title-container {
    display: flex;
    flex-direction: column;
    margin: 25px;
}

div#title-container {
    position: relative;
    padding-top: 2rem;
}

div#title-container label {
    position: absolute;
    top: 0;
    font-size: var(--font-size-small);
    opacity: 1;
    transform: translateY(0);
    transition: all 0.2s ease-out;
    font-size: 20px;
}

input#title:placeholder-shown + label {
    opacity: 0;
    transform: translateY(1rem);
}

input#title::placeholder {
    text-align: center;
    font-size: 30px;
    padding: 5px;
    padding-top: 10px;
}

input#title {
    border: 0;
    height: 50px;
    font-size: 30px;
}

button {
    font-size: 14px;
    justify-content: center;
    min-height: 32px;
    min-width: 32px;
    transition: all .2s ease-in-out;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    background-color: rgb(255, 199, 0.8);
    border: 'none';
	color: black;
	border-radius: 10%;
}

button:hover {
	opacity: 0.6;
}
</style>
