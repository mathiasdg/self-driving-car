<script>
    import Controls from './Classes/Controls.js';
	
    function start() {
		const lala = new Controls();
		console.log('we zieng wel!');
        lala.accelerate = true;
		
        console.log(lala);
	}

</script>

<button onclick={start}>Let's go!</button>

<style>
	button {
		font-size: 2em;
	}
</style>