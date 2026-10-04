export const site = {
  name: 'प्रयास सहयोग सेवा समिति',
  shortName: 'प्रयास सहयोग',
  place: 'बरेली, उत्तर प्रदेश',
  tagline: 'निःस्वार्थ सेवा • सहयोग • समाज कल्याण',
  promise: 'सेवा केवल एक प्रयास नहीं, समाज के प्रति हमारी जिम्मेदारी है।',
  description: 'प्रयास सहयोग सेवा समिति बरेली में समाज सेवा और जनकल्याण के लिए कार्यरत संस्था है। वर्ष 2013 से सेवा, सहयोग और जरूरतमंदों तक सहायता पहुँचाने के प्रयास इसकी पहचान रहे हैं।',
  contactEmail: '',
};

export const navigation = [
  { label: 'होम', path: '/' }, { label: 'हमारे बारे में', path: '/about' }, { label: 'सेवा कार्य', path: '/activities' },
  { label: 'पदाधिकारी', path: '/core-team' }, { label: 'सदस्यता', path: '/members' }, { label: 'दस्तावेज़', path: '/documents' }, { label: 'संपर्क', path: '/contact' },
];

export const serviceAreas = [
  { category: 'स्वास्थ्य', title: 'रक्तदान एवं स्वास्थ्य सेवा', text: 'रक्तदान, स्वास्थ्य जागरूकता और जरूरतमंदों तक स्वास्थ्य संबंधी सहयोग पहुँचाने के प्रयास।', mark: '01' },
  { category: 'राहत', title: 'भोजन वितरण', text: 'जरूरतमंद परिवारों और लोगों तक भोजन एवं खाद्य सामग्री पहुँचाने का प्रयास।', mark: '02' },
  { category: 'राहत', title: 'कपड़ा एवं कंबल वितरण', text: 'मौसम और आवश्यकता के अनुसार वस्त्र, कंबल तथा उपयोगी सामग्री का वितरण।', mark: '03' },
  { category: 'सेवा', title: 'अनाथालय सेवा', text: 'अनाथालयों में बच्चों के साथ समय बिताना और आवश्यक सहयोग उपलब्ध कराना।', mark: '04' },
  { category: 'सेवा', title: 'वृद्धाश्रम सेवा', text: 'वृद्धजनों के साथ समय, सम्मान और आवश्यक सहयोग साझा करने का प्रयास।', mark: '05' },
  { category: 'जनसहयोग', title: 'जरूरी दस्तावेज़ में सहायता', text: 'आधार एवं अन्य आवश्यक दस्तावेज़ संबंधी सहायता के लिए जनसहयोग।', mark: '06' },
  { category: 'राहत', title: 'आपदा एवं विशेष राहत', text: 'आपदा या कठिन समय में जरूरतमंदों तक राहत सामग्री पहुँचाने का प्रयास।', mark: '07' },
  { category: 'समाज', title: 'अन्य जनकल्याण पहल', text: 'समाज की आवश्यकता के अनुसार समय-समय पर अन्य सेवा एवं जनकल्याण गतिविधियाँ।', mark: '08' },
];

export const impactItems: { label: string; value: string; note: string }[] = [];

export const activityEvidence = [
  { id: 'blood-donation', category: 'स्वास्थ्य', title: 'रक्तदान एवं स्वास्थ्य सेवा', summary: 'रक्तदान और स्वास्थ्य सेवा समिति के प्रमुख सेवा क्षेत्रों में शामिल रहे हैं। उपलब्ध स्वीकृत फोटो और कार्यक्रम विवरण यहाँ प्रदर्शित किए जा सकते हैं।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'food-distribution', category: 'राहत', title: 'भोजन वितरण', summary: 'जरूरतमंदों तक भोजन और खाद्य सामग्री पहुँचाने के सेवा कार्यों को इस अनुभाग में क्रमवार दिखाया जाएगा।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'clothing-distribution', category: 'राहत', title: 'कपड़ा एवं कंबल वितरण', summary: 'जरूरतमंद लोगों तक कपड़े, कंबल और मौसम के अनुरूप आवश्यक सामग्री पहुँचाने का प्रयास।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'medical-camps', category: 'स्वास्थ्य', title: 'स्वास्थ्य शिविर', summary: 'स्वास्थ्य जांच, जागरूकता और जरूरतमंदों तक स्वास्थ्य सहयोग पहुँचाने से जुड़े कार्यक्रम।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'documentation', category: 'जनसहयोग', title: 'दस्तावेज़ सहायता', summary: 'जरूरतमंद लोगों को आधार एवं अन्य आवश्यक दस्तावेज़ संबंधी सहायता उपलब्ध कराने के प्रयास।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'orphanage-support', category: 'सेवा', title: 'अनाथालय सेवा', summary: 'अनाथालयों में बच्चों के लिए समय, सामग्री और सहयोग उपलब्ध कराने की सेवा भावना।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'old-age-home-support', category: 'सेवा', title: 'वृद्धाश्रम सेवा', summary: 'वृद्धजनों के साथ समय बिताने, उनका सम्मान करने और आवश्यक सहयोग देने के प्रयास।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
  { id: 'covid-relief', category: 'राहत', title: 'कोविड-19 राहत सेवा', summary: 'कठिन समय में जरूरतमंद परिवारों तक राहत सामग्री और सहयोग पहुँचाने के प्रयास।', when: 'ऐतिहासिक सेवा कार्य', where: 'बरेली एवं आसपास', evidence: 'उपलब्ध स्वीकृत सामग्री के साथ विवरण जोड़ा जाएगा।' },
  { id: 'other-initiatives', category: 'समाज', title: 'अन्य समाज सेवा पहल', summary: 'समाज की जरूरत के अनुसार किए गए अन्य सेवा कार्यों को फोटो और संक्षिप्त विवरण के साथ यहाँ साझा किया जाएगा।', when: 'कार्यक्रम विवरण जोड़े जा रहे हैं', where: 'बरेली एवं आसपास', evidence: 'स्वीकृत फोटो/रिपोर्ट उपलब्ध होने पर जोड़ी जाएगी।' },
];

export interface GalleryPhoto {
  id: string;
  activityId: string;
  category: string;
  src: string;
  alt: string;
  caption: string;
}

// अपनी स्वीकृत तस्वीरें public/images/activities/ में रखकर यहाँ उनके paths जोड़े जा सकते हैं।
export const galleryPhotos: GalleryPhoto[] = [];

export const teamRoles = ['अध्यक्ष', 'कार्यकारी अध्यक्ष', 'महासचिव', 'कोषाध्यक्ष', 'वरिष्ठ उपाध्यक्ष', 'कोर टीम'];
export const expectedCoreTeamSize = 25;
export const memberCategories = [
  { key: 'lifetime', title: 'आजीवन सदस्य', duration: 'आजीवन' },
  { key: 'fiveYear', title: 'पाँच वर्षीय सदस्य', duration: '5 वर्ष' },
  { key: 'oneYear', title: 'एक वर्षीय सदस्य', duration: '1 वर्ष' },
] as const;
export const publicMembers: { id: string; name: string; category: string; since?: string; photo?: string }[] = [];
export const publicTeam: { id: string; name: string; role: string; workplace?: string; bio?: string; photo?: string; phone?: string }[] = [];
export const documentCategories = ['पंजीकरण एवं संचालन', 'वार्षिक एवं सेवा रिपोर्ट', 'वित्तीय पारदर्शिता', 'सूचनाएँ एवं अन्य रिकॉर्ड'];
export const publicDocuments: { id: string; title: string; category: string; year?: string; description: string; fileUrl?: string }[] = [];
export const plannedActivities: { title: string; status: 'Planned' | 'Ongoing'; date?: string; place?: string; summary: string }[] = [];

export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'होम', description: site.description },
  '/about': { title: 'हमारे बारे में', description: 'प्रयास सहयोग सेवा समिति का परिचय, उद्देश्य, सेवा यात्रा और भविष्य की दिशा।' },
  '/activities': { title: 'सेवा कार्य', description: 'प्रयास सहयोग सेवा समिति द्वारा किए गए एवं किए जा रहे समाज सेवा कार्य।' },
  '/core-team': { title: 'पदाधिकारी एवं टीम', description: 'समिति के पदाधिकारी और सेवा कार्य से जुड़े सदस्यों का परिचय।' },
  '/members': { title: 'सदस्यता', description: 'समिति की सदस्यता श्रेणियाँ और सार्वजनिक सदस्य जानकारी।' },
  '/transparency': { title: 'पारदर्शिता', description: 'समिति के कार्य, दस्तावेज़ और जनसहयोग के प्रति पारदर्शिता का हमारा दृष्टिकोण।' },
  '/documents': { title: 'दस्तावेज़', description: 'समिति के सार्वजनिक दस्तावेज़, रिपोर्ट और महत्वपूर्ण रिकॉर्ड।' },
  '/contact': { title: 'संपर्क', description: 'प्रयास सहयोग सेवा समिति से संपर्क करने के लिए जानकारी।' },
};
