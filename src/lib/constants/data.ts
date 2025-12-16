import type { Country, Media, Type } from '../types/data';

export const DATA_EN = [
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

export const DATA_FA = [
	{
		id: 1,
		poster: '/image/poster/1.jpg',
		backdrop: '/image/backdrop/1.jpg',
		type: 'tv',
		title: 'بازی مرکب',
		year: 2021,
		genres: ['هیجانی', 'درام', 'بقا'],
		score: 8.0,
		country: 'korea',
		synopsis:
			'صدها شرکت‌کننده بی‌پول و مستأصل، دعوت عجیبی را برای رقابت در یک سری بازی‌های کودکانه می‌پذیرند. این رقابت در جزیره‌ای منزوی برگزار می‌شود و شرکت‌کنندگان به سرعت درمی‌یابند که ریسک‌ها فوق‌العاده بالاست. تنها یک برنده با جایزه نقدی هنگفت از مسابقه خارج می‌شود، اما عواقب باخت، مرگی ناگهانی و وحشیانه است. این سریال، ماجراهای شخصیت اصلی، سئونگ گی-هون را دنبال می‌کند که در میان رقابت مرگبار و روابط پیچیده با هم‌بازی‌هایش، در تلاش است تا با هزینه اخلاقی بقا کنار بیاید.'
	},
	{
		id: 2,
		poster: '/image/poster/2.jpg',
		backdrop: '/image/backdrop/2.jpg',
		type: 'tv',
		title: 'سقوط بر روی تو',
		year: 2019,
		genres: ['عاشقانه', 'کمدی', 'درام'],
		score: 8.7,
		country: 'korea',
		synopsis:
			'یون سه-ری، وارث و تاجر موفق اهل کره جنوبی، زندگی‌اش به دلیل یک حادثه پاراگلایدر ناشی از طوفان ناگهانی، مسیری غیرمنتظره پیدا می‌کند و مجبور به فرود اضطراری می‌شود. در کمال تعجب، او در آن سوی مرز به شدت حفاظت شده، در عمق قلمرو کره شمالی، فرود می‌آید. او توسط کاپیتان ری جونگ-هیوک، افسر ارشد و بااصول ارتش کره شمالی، پیدا می‌شود که با اکراه می‌پذیرد به او کمک کند تا پنهان بماند و راهی برای بازگشت به خانه پیدا کند. با گذشت زمان، یک رابطه عاشقانه غیرمنتظره و دلنشین در میان تنش‌های سیاسی شدید و خطر همیشگی کشف شدن، شکوفا می‌شود.'
	},
	{
		id: 3,
		poster: '/image/poster/3.jpg',
		backdrop: '/image/backdrop/3.jpg',
		type: 'movie',
		title: 'انگل',
		year: 2019,
		genres: ['کمدی سیاه', 'هیجانی', 'درام'],
		score: 8.5,
		country: 'korea',
		synopsis:
			'خانواده کیم، که در آپارتمانی کثیف و نیمه‌زیرزمینی زندگی می‌کنند، در تلاش برای تأمین هزینه‌های زندگی در سئول هستند. بخت آنها زمانی تغییر می‌کند که پسر خانواده، کی-وو، شغلی را برای تدریس خصوصی دختر خانواده متمول پارک پیدا می‌کند. از طریق یک نقشه استادانه، کیم‌ها به تدریج وارد زندگی لوکس پارک‌ها می‌شوند و با وانمود کردن به متخصصان ماهر، برای هر یک از اعضای خانواده شغل پیدا می‌کنند. جهان این دو خانواده با هم برخورد می‌کند و منجر به یک رابطه همزیستی ناپایدار می‌شود که در نهایت در یک اوج تکان‌دهنده و خشن، از هم می‌پاشد. این فیلم به عنوان یک نقد اجتماعی تند بر مبارزه طبقاتی، نابرابری ثروت و استیصال ذاتی جامعه سرمایه‌داری مدرن عمل می‌کند.'
	},
	{
		id: 4,
		poster: '/image/poster/4.jpg',
		backdrop: '/image/backdrop/4.jpg',
		type: 'tv',
		title: 'وکیل ووی خارق‌العاده',
		year: 2022,
		genres: ['حقوقی', 'درام', 'عاشقانه'],
		score: 8.7,
		country: 'korea',
		synopsis:
			'وو یونگ-وو وکیلی فوق‌العاده باهوش با حافظه‌ای چشمگیر و بهره هوشی بالا است، اما او همچنین به اختلال طیف اوتیسم مبتلا است، که بر تعاملات اجتماعی و مهارت‌های ارتباطی‌اش تأثیر می‌گذارد. با وجود تعصبات و چالش‌هایی که با آنها روبرو است، او در یک شرکت حقوقی معتبر شغلی پیدا می‌کند، جایی که دیدگاه منحصر به فرد و رویکرد غیرمتعارفش به پرونده‌ها اغلب به او اجازه می‌دهد که حفره‌های قانونی و راه‌حل‌های درخشانی را ببیند که همکاران نوروتیپیکش از دست می‌دهند. هر قسمت یک پرونده حقوقی جذاب را دنبال می‌کند، در حالی که رشد شخصی یونگ-وو، روابطش با همکاران و سفر او به سوی پذیرش در دنیای حرفه‌ای پرتقاضا را نیز دنبال می‌کند.'
	},
	{
		id: 5,
		poster: '/image/poster/5.jpg',
		backdrop: '/image/backdrop/5.jpg',
		type: 'movie',
		title: 'قطار بوسان',
		year: 2016,
		genres: ['اکشن', 'ترسناک', 'هیجانی'],
		score: 7.6,
		country: 'korea',
		synopsis:
			'سئوک-وو، یک مدیر صندوق پرمشغله و خودمحور، دختر جوانش، سو-آن را با قطار سریع‌السیر از سئول به بوسان می‌برد تا مادرش را ببیند. کمی پس از حرکت قطار، یک شیوع ویروسی شروع به گسترش در سراسر کشور می‌کند و مردم را به زامبی‌های بسیار پرخاشگر تبدیل می‌کند. قطار، که مملو از مسافران مختلف است، به یکی از آخرین مناطق امن تبدیل می‌شود، اما افراد آلوده و بی‌امان به سرعت وارد واگن‌ها می‌شوند. سئوک-وو و سو-آن، به همراه گروهی از بازماندگان، باید راه خود را از میان فضای محدود قطار در حالی که با انبوهی از مردگان متحرک مبارزه می‌کنند، باز کنند. این فیلم یک سواری پر تنش و احساسی است که محدودیت‌های انسانیت، فداکاری و پیوند بین پدر و دختر را در مواجهه با یک آخرالزمان وحشتناک مورد آزمایش قرار می‌دهد.'
	},
	{
		id: 6,
		poster: '/image/poster/6.jpg',
		backdrop: '/image/backdrop/6.jpg',
		type: 'tv',
		title: 'وینچنزو',
		year: 2021,
		genres: ['جنایی', 'کمدی', 'درام'],
		score: 8.4,
		country: 'korea',
		synopsis:
			'وینچنزو کاسانو، یک مشاور کاریزماتیک و بی‌رحم برای یک خانواده مافیایی ایتالیایی، پس از یک درگیری خطرناک در داخل سازمانش، مجبور به فرار از ایتالیا و بازگشت به سرزمین مادری خود، کره جنوبی، می‌شود. مأموریت اصلی او بازیابی مخفیانه مقدار زیادی طلا است که زیر یک ساختمان تجاری مخروبه در سئول پنهان شده است. با این حال، او به زودی خود را درگیر یک نبرد حقوقی تلخ علیه گروه قدرتمند و فاسد بابل می‌بیند که به طور غیرقانونی مالکیت ساختمان را به دست گرفته است. وینچنزو با استفاده از حس عدالت تاریک و تاکتیک‌های مافیایی خود، با یک وکیل پرشور، هونگ چا-یونگ، همکاری می‌کند تا این شرکت غیرقابل لمس را سرنگون کند و طعم داروهای بی‌رحمانه خودشان را به آنها بچشاند.'
	},
	{
		id: 7,
		poster: '/image/poster/7.jpg',
		backdrop: '/image/backdrop/7.jpg',
		type: 'tv',
		title: 'پاسخ به ۱۹۸۸',
		year: 2015,
		genres: ['کمدی', 'برشی از زندگی', 'خانوادگی'],
		score: 9.1,
		country: 'korea',
		synopsis:
			'این درام صمیمانه، که در سال ۱۹۸۸ جریان دارد، حول محور زندگی پنج دوست دبیرستانی و خانواده‌هایشان می‌چرخد که همگی در محله نزدیک و متحد سانگ‌موندونگ در شمال سئول زندگی می‌کنند. داستان یک سفر نوستالژیک در میان مبارزات روزمره، پیروزی‌ها و تجربه جهانی بزرگ شدن آنها در طول یک دوره فرهنگی و سیاسی مهم در کره جنوبی است. روایت، مضامین عشق اول، قدرت پیوندهای خانوادگی و نیروی پایدار دوستی را در هم می‌آمیزد. این سریال به زیبایی گرما، طنز و روحیه اجتماعی گذشته را به تصویر می‌کشد، با معمای اصلی کشف اینکه کدام یک از دوستان مرد در نهایت در زمان حال، همسر شخصیت زن اصلی می‌شود.'
	},
	{
		id: 8,
		poster: '/image/poster/8.jpg',
		backdrop: '/image/backdrop/8.jpg',
		type: 'movie',
		title: 'میزبان',
		year: 2006,
		genres: ['هیولا', 'اکشن', 'علمی-تخیلی'],
		score: 7.1,
		country: 'korea',
		synopsis:
			'فیلم سال‌ها پس از آن شروع می‌شود که یک آسیب‌شناس نظامی آمریکایی به دستیار کره‌ای خود دستور می‌دهد صدها بطری فرمالدئید را به داخل فاضلابی که به رودخانه هان در سئول می‌ریزد، تخلیه کند و اکوسیستم را آلوده سازد. سال‌ها بعد، یک موجود جهش‌یافته غول‌پیکر و دوزیست از رودخانه آلوده بیرون می‌آید و به آشوب می‌پردازد و مردم را می‌رباید—از جمله هیون-سئو، دختر جوان کانگ-دو، فروشنده خیابانی تنبل. دولت با قرار دادن منطقه تحت قرنطینه و گمراه کردن مردم در مورد شیوع بیماری، واکنش نشان می‌دهد. کانگ-دو و خانواده ناکارآمدش، که توسط مقامات نادیده گرفته شده و به دلیل آلوده بودن طرد شده‌اند، باید دولت را به چالش بکشند و برای نجات هیون-سئو از لانه هیولا به منطقه قرنطینه شده بروند.'
	},
	{
		id: 9,
		poster: '/image/poster/9.jpg',
		backdrop: '/image/backdrop/9.jpg',
		type: 'tv',
		title: 'گابلین',
		year: 2016,
		genres: ['فانتزی', 'عاشقانه', 'درام'],
		score: 8.6,
		country: 'korea',
		synopsis:
			'کیم شین یک ژنرال نظامی پرافتخار از سلسله گوریو است که به طرز وحشیانه‌ای توسط پادشاه جوان حسود اعدام می‌شود. او به جای مردن، توسط قادر متعال نفرین می‌شود تا تبدیل به یک *دوککبی* یا گابلین شود، موجودی جاودانه که باید مرگ عزیزانش را تحمل کند و یک شمشیر عرفانی و نامرئی سینه او را سوراخ کرده است. تنها راه او برای سرانجام به آرامش رسیدن، پیدا کردن عروس انسانی تعیین‌شده‌اش است، کسی که می‌تواند شمشیر را ببیند و آن را بیرون بکشد. ۹۰۰ سال بعد، او جی ایون-تاک را ملاقات می‌کند، یک دانش‌آموز دبیرستانی با توانایی دیدن ارواح و احضار گابلین با فوت کردن شعله. سرنوشت آنها با سرنوشت یک فرشته مرگ زیرک که از فراموشی رنج می‌برد، گره می‌خورد و منجر به یک داستان عمیق، کمدی و دلخراش از عشق، سرنوشت و تناسخ می‌شود.'
	},
	{
		id: 10,
		poster: '/image/poster/10.jpg',
		backdrop: '/image/backdrop/10.jpg',
		type: 'tv',
		title: 'متحرک',
		year: 2023,
		genres: ['اکشن', 'ماوراء طبیعی', 'هیجانی'],
		score: 8.5,
		country: 'korea',
		synopsis:
			'این سریال بر گروهی از دانش‌آموزان دبیرستانی تمرکز دارد که توانایی‌های مافوق بشری مختلفی—مانند پرواز، بازسازی با سرعت بالا و حواس تقویت‌شده—را از والدین خود به ارث برده‌اند، والدینی که ماموران مخفی نخبه بودند و برای سرویس اطلاعات ملی (NIS) دولت کره جنوبی کار می‌کردند. پس از انحلال ناگهانی واحد ویژه آنها، والدین پنهان شدند و فرزندان خود را مجبور کردند تا قدرت‌های خود را برای زندگی عادی سرکوب کنند و از شناسایی شدن دوری کنند. با این حال، هنگامی که یک قاتل مرموز و بی‌رحم شروع به هدف قرار دادن سیستماتیک افراد دارای قدرت می‌کند، هم دانش‌آموزان و هم والدین آنها مجبور می‌شوند از سایه‌ها بیرون بیایند. آنها باید از توانایی‌های فوق‌العاده خود برای محافظت از خود و افشای اسرار تاریک برنامه NIS که آنها را ایجاد کرده است، استفاده کنند.'
	}
] as const satisfies Media[];

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
