<script module>
	export type Option = Readonly<{
		label: string;
		value: unknown;
	}>;
	type Options = ReadonlyArray<Option>;
	export type OptionsValue<T extends Options> = T[number]['value'];
</script>

<script lang="ts" generics="T extends Options">
	import { Pressable } from '$lib/components/pressable';
	import { Swiper } from '$lib/components/swiper';
	import { langStore } from '$lib/store/lang-store.svelte';
	import { Lang } from '$lib/types/general';
	import { cn, type ClassValue } from 'tailwind-variants';
	import type { SwiperRootProps } from './swiper/root.svelte';

	const SESSION_STORAGE_KEY = 'select-value';
	function getSelectValues() {
		if ('sessionStorage' in window) {
			const storageData = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
			if (storageData) return JSON.parse(storageData) as Record<string, unknown>;
		}
		return null;
	}
	function saveSelectValue(key: string) {
		const selectValues = getSelectValues();
		window.sessionStorage.setItem(
			SESSION_STORAGE_KEY,
			JSON.stringify({ ...selectValues, [key]: bindableValue })
		);
	}

	type Props = Pick<SwiperRootProps, 'offset'> & {
		options: T;
		class?: ClassValue;
		alignment?: 'start' | 'center';
		value?: OptionsValue<T>;
		preservationKey?: string;
	};
	let {
		options,
		class: extraClass,
		alignment = 'start',
		offset,
		value: bindableValue = $bindable(options[0]?.value ?? ''),
		preservationKey
	}: Props = $props();

	let currentValue = $state(
		preservationKey ? (getSelectValues()?.[preservationKey] ?? bindableValue) : bindableValue
	);
	const optionElms = $state<HTMLElement[]>([]);

	$effect(() => {
		bindableValue = currentValue;
	});
	$effect(() => {
		if (preservationKey) {
			saveSelectValue(preservationKey);
		}
	});
</script>

<div class={cn(alignment === 'center' && 'flex justify-center', extraClass)}>
	<Swiper.Root class="mt-3 mb-4" {offset} spaceBetween={8}>
		<Swiper.Wrapper>
			{#each options as { label: name, value }, index (value)}
				<Swiper.Slide>
					<div bind:this={optionElms[index]}>
						<Pressable.Root class="inline-block" onClick={() => (currentValue = value)}>
							<Pressable.Content
								class={[
									'p-2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient before:bg-gradient-primary before:outline before:-outline-offset-1 before:outline-stroke-tertiary before:transition-[scale,opacity,rotate]',
									value === currentValue
										? 'before:ease-overshoot-heavy'
										: 'before:scale-75 before:opacity-0 before:duration-250'
								]}
							>
								<span
									class={[
										'inline-block text-sm leading-none transition-colors duration-250',
										langStore.current === Lang.En && 'translate-y-px',
										value === currentValue && 'text-foreground-accent'
									]}
								>
									{name}
								</span>
							</Pressable.Content>
						</Pressable.Root>
					</div>
				</Swiper.Slide>
			{/each}
		</Swiper.Wrapper>
	</Swiper.Root>
</div>
