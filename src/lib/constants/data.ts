import type { LucideIcon } from '$lib/types/icon';
import { FilmIcon, TvIcon } from '@lucide/svelte';
import type { Country, MediaEn, MediaFa, Role, Type } from '../types/data';

export const MEDIA_EN = [
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
] as const satisfies MediaEn[];

export const COUNTRY_LABEL_MAP_EN = {
	korea: 'South Korea',
	china: 'China',
	japan: 'Japan',
	thai: 'Thailand'
} as const satisfies Record<Country, string>;

export const TYPE_LABEL_MAP_EN = {
	movie: 'Movie',
	tv: 'TV'
} as const satisfies Record<Type, string>;

export const MEDIA_FA = [
	{
		id: 1,
		poster: '/image/poster/1.jpg',
		backdrop: '/image/backdrop/1.jpg',
		type: 'tv',
		titleEn: 'Squid Game',
		titleFa: 'بازی مرکب',
		year: 2021,
		genres: ['هیجانی', 'درام', 'بقا'],
		score: 8.0,
		country: 'korea',
		synopsis:
			'صدها شرکت‌کننده بی‌پول و مستأصل، دعوت عجیبی را برای رقابت در یک سری بازی‌های کودکانه می‌پذیرند. اگرچه بازی‌ها در ابتدا ساده به نظر می‌رسند، اما به زودی مشخص می‌شود که شکست در آن‌ها به معنای مرگ است. برنده نهایی صاحب جایزه‌ای کلان می‌شود که می‌تواند زندگی‌اش را زیر و رو کند، اما بهایی که باید بپردازد، انسانیت و جان دیگران است.',
		personnel: [
			{ id: 101, name: 'Lee Jung-jae', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 102, name: 'Park Hae-soo', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 103, name: 'HoYeon Jung', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 104, name: 'O Yeong-su', image: '/image/personnel/4.webp', role: ['supporting'] },
			{
				id: 105,
				name: 'Hwang Dong-hyuk',
				image: '/image/personnel/5.webp',
				role: ['writer', 'director']
			}
		],
		releaseDate: new Date('2021-09-17'),
		nextEpisodeDate: new Date('2025-12-26'),
		episodeCount: 9,
		network: 'Netflix',
		rating: 18
	},
	{
		id: 2,
		poster: '/image/poster/2.jpg',
		backdrop: '/image/backdrop/2.jpg',
		type: 'tv',
		titleEn: 'Crash Landing on You',
		titleFa: 'سقوط بر روی تو',
		year: 2019,
		genres: ['عاشقانه', 'کمدی', 'درام'],
		score: 8.7,
		country: 'korea',
		synopsis:
			'یون سه-ری، وارث ثروتمند و تاجر موفق اهل کره جنوبی، هنگام پاراگلایدر سواری گرفتار طوفان شده و به ناچار در منطقه غیرنظامی کره شمالی فرود می‌آید. در آنجا او با ری جونگ-هیوک، یک افسر ارتش کره شمالی آشنا می‌شود. ری جونگ-هیوک تصمیم می‌گیرد از او محافظت کرده و او را پنهان کند، که این موضوع منجر به شکل‌گیری داستانی عاشقانه و پرمخاطره میان دو دنیای متفاوت می‌شود.',
		personnel: [
			{ id: 201, name: 'Hyun Bin', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 202, name: 'Son Ye-jin', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 203, name: 'Seo Ji-hye', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 204, name: 'Kim Jung-hyun', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 205, name: 'Park Ji-eun', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 206, name: 'Lee Jung-hyo', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2019-12-14'),
		nextEpisodeDate: null,
		episodeCount: 16,
		network: 'tvN',
		rating: 15
	},
	{
		id: 3,
		poster: '/image/poster/3.jpg',
		backdrop: '/image/backdrop/3.jpg',
		type: 'movie',
		titleEn: 'Parasite',
		titleFa: 'انگل',
		year: 2019,
		genres: ['کمدی سیاه', 'هیجانی', 'درام'],
		score: 8.5,
		country: 'korea',
		synopsis:
			'خانواده کیم، که در آپارتمانی کثیف و نیمه‌زیرزمینی زندگی می‌کنند و با فقر دست و پنجه نرم می‌کنند، راهی برای ورود به زندگی خانواده ثروتمند پارک پیدا می‌کنند. آن‌ها با جعل هویت و نقش بازی کردن، یکی‌یکی به عنوان خدمه در خانه پارک‌ها استخدام می‌شوند. اما این رابطه همزیستی میان دو طبقه اجتماعی مختلف، به زودی به مسیری تاریک، خشن و غیرقابل پیش‌بینی کشیده می‌شود که زندگی هر دو خانواده را برای همیشه تغییر می‌دهد.',
		personnel: [
			{ id: 301, name: 'Song Kang-ho', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 302, name: 'Lee Sun-kyun', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 303, name: 'Cho Yeo-jeong', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 304, name: 'Choi Woo-shik', image: '/image/personnel/4.webp', role: ['supporting'] },
			{
				id: 305,
				name: 'Bong Joon-ho',
				image: '/image/personnel/5.webp',
				role: ['writer', 'director']
			}
		],
		releaseDate: new Date('2019-05-30'),
		nextEpisodeDate: null,
		episodeCount: 1,
		network: null,
		rating: 18
	},
	{
		id: 4,
		poster: '/image/poster/4.jpg',
		backdrop: '/image/backdrop/4.jpg',
		type: 'tv',
		titleEn: 'Extraordinary Attorney Woo',
		titleFa: 'وکیل ووی خارق‌العاده',
		year: 2022,
		genres: ['حقوقی', 'درام', 'عاشقانه'],
		score: 8.7,
		country: 'korea',
		synopsis:
			'وو یونگ-وو وکیلی نابغه با طیف اوتیسم است که حافظه‌ای تصویری و بهره هوشی بسیار بالایی دارد. او فعالیت خود را در یک شرکت حقوقی معتبر آغاز می‌کند، اما به دلیل تفاوت در مهارت‌های اجتماعی، با چالش‌ها و قضاوت‌های زیادی روبرو می‌شود. سریال به تلاش‌های او برای اثبات توانمندی‌هایش در دادگاه، حل پرونده‌های پیچیده و برقراری ارتباط با دنیای اطراف می‌پردازد.',
		personnel: [
			{ id: 401, name: 'Park Eun-bin', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 402, name: 'Kang Tae-oh', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 403, name: 'Kang Ki-young', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 404, name: 'Joo Hyun-young', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 405, name: 'Moon Ji-won', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 406, name: 'Yoo In-shik', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2022-06-29'),
		nextEpisodeDate: new Date('2026-03-20'),
		episodeCount: 16,
		network: 'ENA',
		rating: 13
	},
	{
		id: 5,
		poster: '/image/poster/5.jpg',
		backdrop: '/image/backdrop/5.jpg',
		type: 'movie',
		titleEn: 'Train to Busan',
		titleFa: 'قطار بوسان',
		year: 2016,
		genres: ['اکشن', 'ترسناک', 'هیجانی'],
		score: 7.6,
		country: 'korea',
		synopsis:
			'در حالی که یک ویروس زامبی به طور ناگهانی در سراسر کره جنوبی شیوع پیدا می‌کند، سئوک-وو به همراه دخترش سوار بر قطار سریع‌السیر از سئول به مقصد بوسان هستند. مسافران قطار باید برای بقای خود در مقابل گله‌های زامبی‌های گرسنه که در واگن‌ها نفوذ کرده‌اند مبارزه کنند. این سفر تبدیل به نبردی نفس‌گیر برای بقا می‌شود، جایی که شخصیت‌های مختلف باید میان خودخواهی و فداکاری یکی را انتخاب کنند.',
		personnel: [
			{ id: 501, name: 'Gong Yoo', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 502, name: 'Ma Dong-seok', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 503, name: 'Jung Yu-mi', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 504, name: 'Kim Su-an', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 505, name: 'Park Joo-suk', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 506, name: 'Yeon Sang-ho', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2016-07-20'),
		nextEpisodeDate: null,
		episodeCount: 1,
		network: null,
		rating: 15
	},
	{
		id: 6,
		poster: '/image/poster/6.jpg',
		backdrop: '/image/backdrop/6.jpg',
		type: 'tv',
		titleEn: 'Vincenzo',
		titleFa: 'وینچنزو',
		year: 2021,
		genres: ['جنایی', 'کمدی', 'درام'],
		score: 8.4,
		country: 'korea',
		synopsis:
			'وینچنزو کاسانو، وکیل و مشاور مافیای ایتالیایی که اصالتاً کره‌ای است، پس از بروز درگیری‌های داخلی در خانواده مافیایی، به سئول بازمی‌گردد. هدف او بازیابی مقدار زیادی طلای پنهان شده در زیر یک ساختمان قدیمی است. اما او درگیر نبردی با یک شرکت بزرگ و فاسد می‌شود و تصمیم می‌گیرد با استفاده از روش‌های بی‌رحمانه مافیایی خود، عدالت را به سبک خودش اجرا کند.',
		personnel: [
			{ id: 601, name: 'Song Joong-ki', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 602, name: 'Jeon Yeo-been', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 603, name: 'Ok Taec-yeon', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 604, name: 'Kwak Dong-yeon', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 605, name: 'Park Jae-bum', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 606, name: 'Kim Hee-won', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2021-02-20'),
		nextEpisodeDate: null,
		episodeCount: 20,
		network: 'tvN',
		rating: 15
	},
	{
		id: 7,
		poster: '/image/poster/7.jpg',
		backdrop: '/image/backdrop/7.jpg',
		type: 'tv',
		titleEn: 'Reply 1988',
		titleFa: 'پاسخ به ۱۹۸۸',
		year: 2015,
		genres: ['کمدی', 'برشی از زندگی', 'خانوادگی'],
		score: 9.1,
		country: 'korea',
		synopsis:
			'این درام نوستالژیک و صمیمانه به زندگی پنج خانواده می‌پردازد که در یک محله در سئول زندگی می‌کنند. داستان حول محور پنج دوست صمیمی است که از دوران کودکی با هم بزرگ شده‌اند و اکنون در آستانه جوانی هستند. سریال با تمرکز بر پیوندهای خانوادگی، عشق‌های اول و چالش‌های زندگی در دهه ۸۰ میلادی، تصویری گرم و دلنشین از دوستی و انسانیت را به نمایش می‌گذارد.',
		personnel: [
			{ id: 701, name: 'Lee Hye-ri', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 702, name: 'Park Bo-gum', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 703, name: 'Ryu Jun-yeol', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 704, name: 'Go Kyung-pyo', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 705, name: 'Lee Woo-jung', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 706, name: 'Shin Won-ho', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2015-11-06'),
		nextEpisodeDate: null,
		episodeCount: 20,
		network: 'tvN',
		rating: 15
	},
	{
		id: 8,
		poster: '/image/poster/8.jpg',
		backdrop: '/image/backdrop/8.jpg',
		type: 'movie',
		titleEn: 'The Host',
		titleFa: 'میزبان',
		year: 2006,
		genres: ['هیولا', 'اکشن', 'علمی-تخیلی'],
		score: 7.1,
		country: 'korea',
		synopsis:
			'پس از تخلیه مواد شیمیایی سمی در رودخانه هان توسط ارتش آمریکا، موجودی جهش‌یافته و غول‌پیکر از اعماق آب پدیدار می‌شود و به مردم حمله می‌کند. وقتی این هیولا دختر کوچک یک خانواده معمولی را می‌رباید، اعضای خانواده که ناامید از کمک دولت هستند، خودشان دست به کار می‌شوند تا او را نجات دهند. فیلم ترکیبی از وحشت، نقد سیاسی و پیوند عمیق خانوادگی است.',
		personnel: [
			{ id: 801, name: 'Song Kang-ho', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 802, name: 'Byun Hee-bong', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 803, name: 'Park Hae-il', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 804, name: 'Bae Douna', image: '/image/personnel/4.webp', role: ['supporting'] },
			{
				id: 805,
				name: 'Bong Joon-ho',
				image: '/image/personnel/5.webp',
				role: ['writer', 'director']
			}
		],
		releaseDate: new Date('2006-07-27'),
		nextEpisodeDate: null,
		episodeCount: 1,
		network: null,
		rating: 15
	},
	{
		id: 9,
		poster: '/image/poster/9.jpg',
		backdrop: '/image/backdrop/9.jpg',
		type: 'tv',
		titleEn: 'Guardian: The Lonely and Great God (Goblin)',
		titleFa: 'گابلین',
		year: 2016,
		genres: ['فانتزی', 'عاشقانه', 'درام'],
		score: 8.6,
		country: 'korea',
		synopsis:
			'کیم شین، یک ژنرال جنگی سابق، به دلیل نفرینی باستانی به یک گابلین جاودانه تبدیل شده است و قرن‌هاست که شاهد مرگ عزیزانش بوده است. تنها راه پایان دادن به این زندگی ابدی، یافتن "عروس گابلین" است که می‌تواند شمشیر فرو رفته در سینه او را بیرون بکشد. داستان زمانی پیچیده می‌شود که او با دختری دبیرستانی آشنا می‌شود که ادعا می‌کند عروس اوست، در حالی که یک فرشته مرگ نیز در کنار آن‌ها زندگی می‌کند.',
		personnel: [
			{ id: 901, name: 'Gong Yoo', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 902, name: 'Kim Go-eun', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 903, name: 'Lee Dong-wook', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 904, name: 'Yoo In-na', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 905, name: 'Kim Eun-sook', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 906, name: 'Lee Eung-bok', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2016-12-02'),
		nextEpisodeDate: null,
		episodeCount: 16,
		network: 'tvN',
		rating: 15
	},
	{
		id: 10,
		poster: '/image/poster/10.jpg',
		backdrop: '/image/backdrop/10.jpg',
		type: 'tv',
		titleEn: 'Moving',
		titleFa: 'متحرک',
		year: 2023,
		genres: ['اکشن', 'ماوراء طبیعی', 'هیجانی'],
		score: 8.5,
		country: 'korea',
		synopsis:
			'این سریال داستان سه دانش‌آموز دبیرستانی را روایت می‌کند که قدرت‌های ماوراء طبیعی خود را از والدینشان به ارث برده‌اند. در حالی که آن‌ها تلاش می‌کنند توانایی‌هایشان را از دیگران پنهان کنند، والدینشان در تکاپو هستند تا از آن‌ها در برابر سازمان‌های جاسوسی و دشمنان مرموزی که به دنبال شکار افراد با استعداد هستند، محافظت کنند. داستان میان گذشته والدین و زمان حال فرزندان در نوسان است.',
		personnel: [
			{ id: 1001, name: 'Ryu Seung-ryong', image: '/image/personnel/1.webp', role: ['main'] },
			{ id: 1002, name: 'Han Hyo-joo', image: '/image/personnel/2.webp', role: ['main'] },
			{ id: 1003, name: 'Zo In-sung', image: '/image/personnel/3.webp', role: ['main'] },
			{ id: 1004, name: 'Go Yoon-jung', image: '/image/personnel/4.webp', role: ['supporting'] },
			{ id: 1005, name: 'Kang Full', image: '/image/personnel/5.webp', role: ['writer'] },
			{ id: 1006, name: 'Park In-je', image: '/image/personnel/6.webp', role: ['director'] }
		],
		releaseDate: new Date('2023-08-09'),
		nextEpisodeDate: new Date('2025-10-15'),
		episodeCount: 20,
		network: 'Disney+',
		rating: 18
	}
] as const satisfies MediaFa[];

export const ROLE_LABEL_MAP = {
	main: 'نقش اصلی',
	supporting: 'نقش مکمل',
	director: 'کارگردان',
	writer: 'نویسنده'
} as const satisfies Record<Role, string>;

export const COUNTRY_LABEL_MAP_FA = {
	korea: 'کرهٔ جنوبی',
	china: 'چین',
	japan: 'ژاپن',
	thai: 'تایلند'
} as const satisfies Record<Country, string>;

export const TYPE_LABEL_MAP_FA = {
	movie: 'فیلم',
	tv: 'سریال'
} as const satisfies Record<Type, string>;

export const TYPE_ICON_MAP = {
	movie: FilmIcon,
	tv: TvIcon
} as const satisfies Record<Type, LucideIcon>;
