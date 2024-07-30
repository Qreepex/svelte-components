<script>
	import Alert from '$lib/components/alert/Alert.svelte';
	import CustomImage from '$lib/components/custom-image/CustomImage.svelte';
	import ImageManager from '$lib/components/image-manager/ImageManager.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Alert type="error" title="Error" text="This is an error alert" duration={5000} color="#f44336" />

<CustomImage src="https://via.placeholder.com/150" alt="Placeholder" rounded extendable />

<ImageManager
	endpoints={{
		create: '/api/image/create',
		upload: '/api/image/upload',
		remove: '/api/image/remove'
	}}
	prefills={[]}
/>
