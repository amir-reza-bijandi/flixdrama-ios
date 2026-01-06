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
	import type { SwiperRootProps } from './swiper/root.svelte';

	type Props = Pick<SwiperRootProps, 'offset'> & {
		options: T;
		alignment?: 'start' | 'center';
		value?: OptionsValue<T>;
	};
	let {
		options,
		alignment = 'start',
		offset,
		value: currentValue = $bindable(options[0]?.value ?? '')
	}: Props = $props();

	const optionElms = $state<HTMLElement[]>([]);
</script>

<div class={[alignment === 'center' && 'flex justify-center']}>
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
