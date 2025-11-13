import type { Country, Media, Type } from '../types/data';

export const DATA = [
	{
		id: 1,
		poster: '/image/poster/1.jpg',
		backdrop: '/image/backdrop/1.jpg',
		type: 'tv',
		title: 'Squid Game',
		year: 2021,
		genres: ['Thriller', 'Drama', 'Survival'],
		score: 8.0,
		country: 'korea',
		synopsis:
			"Hundreds of cash-strapped and desperate contestants accept a strange invitation to compete in a series of children's games. The competition is held on a secluded island, and the participants quickly discover that the stakes are incredibly high. Only one winner will walk away with the massive cash prize, but the consequence of losing is a sudden and brutal death. The series follows protagonist Seong Gi-hun as he navigates the deadly competition and the complex relationships with his fellow players, all while grappling with the moral cost of survival."
	},
	{
		id: 2,
		poster: '/image/poster/2.jpg',
		backdrop: '/image/backdrop/2.jpg',
		type: 'tv',
		title: 'Crash Landing on You',
		year: 2019,
		genres: ['Romance', 'Comedy', 'Drama'],
		score: 8.7,
		country: 'korea',
		synopsis:
			'Yoon Se-ri, a successful South Korean heiress and businesswoman, finds her life taking an unexpected turn when a paragliding accident caused by a sudden storm forces her to make an emergency landing. To her shock, she lands across the heavily fortified border, deep within North Korean territory. She is discovered by Captain Ri Jeong-hyeok, a high-ranking and principled North Korean army officer, who reluctantly agrees to help her hide and find a way back home. As they spend time together, an unlikely and poignant romance begins to blossom amidst the heightened political tensions and the ever-present danger of discovery.'
	},
	{
		id: 3,
		poster: '/image/poster/3.jpg',
		backdrop: '/image/backdrop/3.jpg',
		type: 'movie',
		title: 'Parasite',
		year: 2019,
		genres: ['Black Comedy', 'Thriller', 'Drama'],
		score: 8.5,
		country: 'korea',
		synopsis:
			"The Kim family, living in a squalid semi-basement apartment, is struggling to make ends meet in Seoul. Their fortunes begin to change when the son, Ki-woo, secures a job tutoring the daughter of the affluent Park family. Through an elaborate scheme, the Kims gradually infiltrate the Parks' luxurious lives, securing jobs for every family member by impersonating highly-qualified professionals. The two families' worlds collide, leading to a precarious, symbiotic relationship that ultimately unravels in a shocking, violent climax. The film serves as a stinging social commentary on class struggle, wealth inequality, and the desperation inherent in modern capitalist society."
	},
	{
		id: 4,
		poster: '/image/poster/4.jpg',
		backdrop: '/image/backdrop/4.jpg',
		type: 'tv',
		title: 'Extraordinary Attorney Woo',
		year: 2022,
		genres: ['Legal', 'Drama', 'Romance'],
		score: 8.7,
		country: 'korea',
		synopsis:
			"Woo Young-woo is an incredibly intelligent attorney with an impressive memory and a high IQ, but she also has Autism Spectrum Disorder, which affects her social interactions and communication skills. Despite the prejudices and challenges she faces, she lands a job at a prestigious law firm, where her unique perspective and unconventional approach to cases often allow her to spot legal loopholes and brilliant solutions that her neurotypical colleagues miss. Each episode follows a compelling legal case, while also tracking Young-woo's personal growth, her relationships with her co-workers, and her journey toward acceptance in a demanding professional world."
	},
	{
		id: 5,
		poster: '/image/poster/5.jpg',
		backdrop: '/image/backdrop/5.jpg',
		type: 'movie',
		title: 'Train to Busan',
		year: 2016,
		genres: ['Action', 'Horror', 'Thriller'],
		score: 7.6,
		country: 'korea',
		synopsis:
			'Seok-woo, a busy and self-centered fund manager, is taking his young daughter, Su-an, by high-speed train from Seoul to Busan to see her mother. Shortly after the train departs, a viral outbreak begins sweeping across the country, transforming people into highly aggressive zombies. The train, packed with various passengers, becomes one of the last safe zones, but the relentless infected quickly breach the carriages. Seok-woo and Su-an, along with a group of survivors, must battle their way through the narrow confines of the train while fighting off hordes of the undead. The film is a tense, emotional roller coaster that tests the limits of humanity, sacrifice, and the bond between father and daughter in the face of a terrifying apocalypse.'
	},
	{
		id: 6,
		poster: '/image/poster/6.jpg',
		backdrop: '/image/backdrop/6.jpg',
		type: 'tv',
		title: 'Vincenzo',
		year: 2021,
		genres: ['Crime', 'Comedy', 'Drama'],
		score: 8.4,
		country: 'korea',
		synopsis:
			'Vincenzo Cassano, a charismatic and ruthless consigliere for an Italian Mafia family, is forced to flee Italy and return to his motherland, South Korea, following a dangerous conflict within his organization. His primary mission is to secretly retrieve a massive amount of gold hidden beneath a dilapidated commercial building in Seoul. However, he soon finds himself entangled in a bitter legal battle against the powerful and corrupt Babel Group, which has illegally taken ownership of the building. Employing his dark sense of justice and Mafia tactics, Vincenzo teams up with a feisty lawyer, Hong Cha-young, to bring down the untouchable conglomerate, giving them a taste of their own ruthless medicine.'
	},
	{
		id: 7,
		poster: '/image/poster/7.jpg',
		backdrop: '/image/backdrop/7.jpg',
		type: 'tv',
		title: 'Reply 1988',
		year: 2015,
		genres: ['Comedy', 'Slice of Life', 'Family'],
		score: 9.1,
		country: 'korea',
		synopsis:
			"Set in the year 1988, this heartfelt drama revolves around the lives of five high school friends and their families who all reside in the same close-knit Ssangmundong neighborhood in northern Seoul. The story is a nostalgic journey through their daily struggles, triumphs, and the universal experience of growing up during a significant cultural and political period in South Korea. The narrative weaves together themes of first love, the strength of familial bonds, and the enduring power of friendship. It beautifully captures the warmth, humor, and communal spirit of the past, with the overarching mystery of uncovering which of the male friends ultimately becomes the female lead's husband in the present day."
	},
	{
		id: 8,
		poster: '/image/poster/8.jpg',
		backdrop: '/image/backdrop/8.jpg',
		type: 'movie',
		title: 'The Host',
		year: 2006,
		genres: ['Monster', 'Action', 'Sci-Fi'],
		score: 7.1,
		country: 'korea',
		synopsis:
			"The film begins years after an American military pathologist orders his Korean assistant to dump hundreds of bottles of formaldehyde down a drain leading into the Han River in Seoul, contaminating the ecosystem. Years later, a giant, amphibious, mutated creature emerges from the polluted river and goes on a rampage, snatching people—including Hyun-seo, the young daughter of the slacker street vendor, Kang-doo. The government responds by placing the area under quarantine and misleading the public about the outbreak. Disregarded by authorities and shunned for being infected, Kang-doo and his dysfunctional family must defy the government and venture into the quarantined zone to rescue Hyun-seo from the creature's lair."
	},
	{
		id: 9,
		poster: '/image/poster/9.jpg',
		backdrop: '/image/backdrop/9.jpg',
		type: 'tv',
		title: 'Guardian: The Lonely and Great God (Goblin)',
		year: 2016,
		genres: ['Fantasy', 'Romance', 'Drama'],
		score: 8.6,
		country: 'korea',
		synopsis:
			'Kim Shin is a decorated military general from the Goryeo Dynasty who is cruelly executed by the jealous young king. Instead of dying, he is cursed by the Almighty to become a *Dokkaebi*, or Goblin, an immortal being who must endure seeing his loved ones die, carrying a mystical, invisible sword piercing his chest. The only way for him to finally pass on is by finding his designated human bride, who can see the sword and pull it out. 900 years later, he meets Ji Eun-tak, a high school student with the ability to see ghosts and call the Goblin by blowing out a flame. Their fates become intertwined with that of a witty Grim Reaper who is suffering from amnesia, leading to a profound, comedic, and heartbreaking tale of love, destiny, and reincarnation.'
	},
	{
		id: 10,
		poster: '/image/poster/10.jpg',
		backdrop: '/image/backdrop/10.jpg',
		type: 'tv',
		title: 'Moving',
		year: 2023,
		genres: ['Action', 'Supernatural', 'Thriller'],
		score: 8.5,
		country: 'korea',
		synopsis:
			"The series centers on a group of high school students who have inherited various superhuman abilities—such as flight, high-speed regeneration, and enhanced senses—from their parents, who were elite secret agents working for the South Korean government's National Intelligence Service (NIS). After their special unit was suddenly disbanded, the parents went into hiding, forcing their children to suppress their powers to live ordinary lives and avoid detection. However, when a mysterious and ruthless assassin begins systematically targeting people with powers, both the students and their parents are forced to step out of the shadows. They must use their formidable abilities to protect themselves and expose the dark secrets of the NIS program that created them."
	}
] as const satisfies Media[];

export const COUNTRY_LABEL_MAP = {
	korea: 'South Korea',
	china: 'China',
	japan: 'Japan',
	thai: 'Thailand'
} as const satisfies Record<Country, string>;

export const TYPE_LABEL_MAP = {
	movie: 'Movie',
	tv: 'TV'
} as const satisfies Record<Type, string>;
