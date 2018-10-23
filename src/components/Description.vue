<template>
    <div id='container'>
		<div id="title-container">
			<input 
				id="title"
				placeholder="name your coffee"
				type="text" 
				@value="model.cup.title"
				@input="e => model.cup.changeTitle(e.target.value)"
			/>
			<label for="title">Name your coffee</label>
		</div>
		<button @click="this.sendCup">Send!</button>
    </div>
</template>

<script>
import model from '../models';

export default {
    name: 'Description',
    data: () => ({
		model
    }),
    methods: {
        sendCup: () => {
			model.cup.changeDate(new Date().toISOString().slice(0, 19).replace('T', ' '))
			
            fetch(`${process.env.serverEndpoint || 'http://localhost:3000'}/coffee`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(model)
            }, );
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
	color: black;
	font-size: 20px;
	border: none;
	border-radius: 10%;
	background-color: rgb(255, 203, 15, 0.4);
}

button:hover {
	background-color: rgb(255, 199, 0);
}
</style>
