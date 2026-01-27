type Genre = {
	id: number;
	nameEn: string;
	nameFa: string;
};

export const GENRES = [
	{ id: 1, nameEn: 'Historical', nameFa: 'تاریخی' },
	{ id: 2, nameEn: 'Romance', nameFa: 'عاشقانه' },
	{ id: 3, nameEn: 'Wuxia', nameFa: 'زندگی دوباره' },
	{ id: 4, nameEn: 'Fantasy', nameFa: 'فانتزی' },
	{ id: 5, nameEn: 'Drama', nameFa: 'درام' },
	{ id: 6, nameEn: 'Political', nameFa: 'سیاسی' },
	{ id: 7, nameEn: 'Comedy', nameFa: 'کمدی' },
	{ id: 8, nameEn: 'School', nameFa: 'مدرسه' },
	{ id: 9, nameEn: 'Youth', nameFa: 'جوانان' },
	{ id: 10, nameEn: 'Family', nameFa: 'خانوادگی' },
	{ id: 11, nameEn: 'Melodrama', nameFa: 'ملودرام' },
	{ id: 12, nameEn: 'Mystery', nameFa: 'معمایی' },
	{ id: 13, nameEn: 'Supernatural', nameFa: 'ماوراء طبیعی' },
	{ id: 14, nameEn: 'Horror', nameFa: 'ترسناک' },
	{ id: 15, nameEn: 'Action', nameFa: 'اکشن' },
	{ id: 16, nameEn: 'Thriller', nameFa: 'هیجانی' },
	{ id: 17, nameEn: 'Medical', nameFa: 'پزشکی' },
	{ id: 18, nameEn: 'Life', nameFa: 'زندگی' },
	{ id: 19, nameEn: 'Business', nameFa: 'کسب و کار' },
	{ id: 20, nameEn: 'Psychological', nameFa: 'روانشانسی' },
	{ id: 21, nameEn: 'Friendship', nameFa: 'دوستانه' },
	{ id: 22, nameEn: 'Adventure', nameFa: 'ماجراجویی' },
	{ id: 23, nameEn: 'Martial Arts', nameFa: 'هنر های رزمی' },
	{ id: 24, nameEn: 'Music', nameFa: 'موسیقی' },
	{ id: 25, nameEn: 'Sports', nameFa: 'ورزشی' },
	{ id: 26, nameEn: 'Crime', nameFa: 'جنایی' },
	{ id: 27, nameEn: 'Military', nameFa: 'ارتش' },
	{ id: 28, nameEn: 'War', nameFa: 'جنگی' },
	{ id: 29, nameEn: 'Sci-Fi', nameFa: 'علمی تخیلی' },
	{ id: 30, nameEn: 'Food', nameFa: 'غذا' },
	{ id: 31, nameEn: 'Law', nameFa: 'حقوق' },
	{ id: 32, nameEn: 'Sitcom', nameFa: 'سیتکام' },
	{ id: 33, nameEn: 'Documentary', nameFa: 'مستند' }
] as const satisfies Genre[];
