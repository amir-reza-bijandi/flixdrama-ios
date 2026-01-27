import Accordion from './accordion.svelte';
import Body from './body.svelte';
import Footer from './footer.svelte';
import Group from './group.svelte';
import MultiSelect from './multi-select.svelte';
import Number from './number.svelte';
import Root from './root.svelte';
import Scroll from './scroll.svelte';
import SingleSelect from './single-select.svelte';
import Switch from './switch.svelte';
import Tabs from './tabs.svelte';
import TextArea from './text-area.svelte';
import Text from './text.svelte';
export const Drawer = {
	Root,
	Body,
	Footer,
	Tabs,
	SingleSelect,
	MultiSelect,
	Switch,
	Number,
	Text,
	TextArea,
	Group,
	Accordion,
	Scroll
};
export type {
	FooterData as DrawerFooterData,
	FooterDataItem as DrawerFooterDataItem
} from './footer.svelte';
export type {
	MultiSelectOptions as DrawerMultiSelectOptions,
	MultiSelectOptionsValues as DrawerMultiSelectOptionsValues
} from './multi-select.svelte';
export type {
	SingleSelectOption as DrawerSingleSelectOption,
	SingleSelectOptions as DrawerSingleSelectOptions,
	SingleSelectOptionsValue as DrawerSingleSelectOptionsValue
} from './single-select.svelte';
export type { SwitchSelectEventHandler as DrawerSwitchSelectEventHandler } from './switch.svelte';
export type {
	TabsData as DrawerTabsData,
	TabsDataValue as DrawerTabsDataValue
} from './tabs.svelte';
