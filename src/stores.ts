import { writable } from 'svelte/store';

export const images = writable<{ id: string; url?: string; src: string; file: File }[]>([]);
