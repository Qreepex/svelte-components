<script lang="ts">
	import { onMount } from 'svelte';
	import { images } from '../../../stores';
	import Spinner from '../spinner/Spinner.svelte';

	export let src;
	export let id: string;
	export let file: File;
	export let noUpload: boolean = false;

	let description: string;

	let progress = 0;

	onMount(() => {
		if (noUpload) {
			progress = 100;
			return;
		}
		setTimeout(startUpload, 100);
	});

	async function startUpload() {
		const formData = new FormData();
		formData.append('file', file);

		const xhr = new XMLHttpRequest();

		xhr.upload.addEventListener('progress', (event) => {
			if (event.lengthComputable) {
				progress = (event.loaded / event.total) * 100;
			}
		});

		xhr.upload.addEventListener('error', () => {
			alert('Upload failed');
		});

		xhr.open('POST', `/verwalten/images/upload?id=${id}`);
		xhr.send(formData);
	}

	function submit() {
		fetch(`/verwalten/images/update?id=${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				description
			})
		});
	}

	function remove() {
		fetch(`/verwalten/images/remove?id=${id}`, {
			method: 'POST'
		});

		$images = $images.filter((image) => image.id !== id);
	}
</script>

<div class="flex flex-wrap py-2 image">
	<div class="w-1/4">
		<img {src} alt="Uploaded Pic"/>
		{#if progress < 100}
			<Spinner size="10" color="#5865f2" />
		{/if}
	</div>

	<div class="w-3/5 px-2">
		<input
			type="text"
			placeholder="Bildbeschreibung eingeben (optional)"
			on:change={() => submit()}
			bind:value={description}
		/>
	</div>

	<button class="remove-image nosty" type="button" on:click={() => remove()}>Bild entfernen</button>
</div>

<style lang="scss">
	.image {
		padding: 0.75rem;
		margin: 1rem 0rem;
		background-color: #e9e9e9;
		border-radius: 0.5rem;

		input {
			width: 100%;
			border: 1px solid;
			padding: 0.5rem;
			border-radius: 0.5rem;
			height: 3rem;
		}

		img {
			max-height: 10rem;
			border-radius: 0.5rem;
		}

		button {
			border: 1px solid red;
			background-color: #ff8a8a;
			padding: 0.5rem;
			border-radius: 0.5rem;
			height: 3rem;
			transition: 0.2s ease-in-out;

			&:hover {
				background-color: #ff0000;
			}
		}
	}
</style>
