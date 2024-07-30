<script lang="ts">
	import ImagePreview from './ImagePreview.svelte';
	import { images } from '../../../stores';
	import { onMount } from 'svelte';

	export let prefills: { src: string; id: string; url: string }[] = [];
	export let endpoints: { create: string; remove: string; upload: string };

	onMount(() => {
		if (!endpoints) {
			throw new Error('endpoints prop is required');
		}

		if (!endpoints.create) {
			throw new Error('endpoints.create prop is required');
		}

		if (!endpoints.remove) {
			throw new Error('endpoints.remove prop is required');
		}

		if (!endpoints.upload) {
			throw new Error('endpoints.upload prop is required');
		}

		if (prefills.length > 0) {
			images.set(prefills.map((x) => ({ src: x.url, id: x.id, file: null as unknown as File })));
		}
	});

	let fileInput: HTMLInputElement;

	let imageIdsString = $images.map((x) => x.id).join(',');
	$: imageIdsString = $images.map((x) => x.id).join(',');

	async function fileSelected(e: any) {
		for (const file of e.target!.files) {
			const data = await fetch(endpoints.create, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: file.name
				})
			});

			const res = await data.json();

			const id = res.id;

			images.set([...$images, { src: '', id, file }]);

			const reader = new FileReader();

			reader.onload = function (e) {
				images.set([
					...$images.filter((x) => x.id !== id),
					{ src: e.target!.result! as string, id, file }
				]);
			};

			reader.readAsDataURL(file);
		}

		e.target.value = null;
	}
</script>

<div>
	{#each $images as image}
		<ImagePreview
			src={image.src}
			id={image.id}
			file={image.file}
			noUpload={!!prefills?.find((x) => x.id === image.id)}
		/>
	{/each}

	<button class="add-image" type="button" on:click|preventDefault={() => fileInput.click()}
		>Bild hinzufügen</button
	>

	<input
		multiple
		type="file"
		accept="image/png, image/jpeg, image/webp"
		placeholder="Select"
		style="display: none;"
		bind:this={fileInput}
		on:change={(e) => fileSelected(e)}
	/>
	<input type="text" name="images" id="images" style="display: none;" bind:value={imageIdsString} />
</div>

<style lang="scss">
	.add-image {
		border: 1px solid;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
