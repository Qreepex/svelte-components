<script lang="ts">
	export let src: string;
	export let fullSource: string | undefined = undefined;
	export let classes = undefined;
	export let style = undefined;
	export let alt: string;
	export let text: string | undefined = alt;
	export let rounded = false;

	export let extendable = false;

	let extended = false;

	const extend = () => {
		if (!extendable) return;

		extended = !extended;
	};

	let highLoaded = false;
	const highLoad = () => {
		highLoaded = true;
	};

	$: highLoaded;
</script>

{#if extended}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="background extended" style="z-index: 9999;" on:click={() => extend()}>
		{#if fullSource}
			{#if !highLoaded}
				<img {src} class={classes} {style} class:rounded {alt} />
			{/if}

			<img
				src={fullSource}
				class={classes}
				style="{style}; opacity: {highLoaded ? 1 : 0};"
				on:load={() => highLoad()}
				class:rounded
				{alt}
			/>
		{:else}
			<img {src} class={classes} {style} class:rounded {alt} />
		{/if}

		{#if text}
			<p>{text}</p>
		{/if}
	</div>
	<img {src} class={classes} {style} class:rounded {alt} />
{:else if extendable && !extended}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div class="background">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img {src} class={classes} {style} class:rounded {alt} on:click={() => extend()} />
	</div>
{:else}
	<img {src} class={classes} {style} class:rounded {alt} />
{/if}

<style lang="scss">
	.background {
		&.extended {
			background-color: rgba(0, 0, 0, 0.5);

			top: 0px;
			left: 0px;
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 1;

			img {
				border-radius: 8px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				max-width: 80vw;
				max-height: 80vh;
			}

			p {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				max-width: 80vw;
				max-height: 80vh;
				color: white;
				font-size: 1.5rem;
				font-weight: 700;
				text-align: center;
				margin-top: 1rem;
				top: 85vh;
			}
		}
	}

	img.rounded {
		border-radius: 0.25rem;
	}
</style>
