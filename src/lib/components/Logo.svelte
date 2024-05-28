<script lang="ts">
    import logo from '../assets/images/logos/debt-strategy-logo.svg?raw'
    export let name: keyof typeof icons;
    export let width = '48px';
    export let height = '48px';
    export let focusable: string | number | null | undefined = undefined;
    export let preserveAspectRatio: string = 'meet';
    let icons = {
        logo: {
            box: 400,
            svg: logo
        }
    } as const;
    let displayIcon = icons[name];
</script>

<svg
    class={$$props.class}
    {focusable}
    {width}
    {height}
    {preserveAspectRatio}
    viewBox="0 0 {displayIcon.box} {displayIcon.box}">{@html displayIcon.svg}</svg
>