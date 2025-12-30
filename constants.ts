
import { CountryInfo, Qualification, BlogPost } from './types';

export const COUNTRY_REGIONS: Record<string, string> = {
  "Afghanistan": "Asia", "Albania": "Europe", "Algeria": "Africa", "Andorra": "Europe", "Angola": "Africa",
  "Antigua and Barbuda": "Americas", "Argentina": "Americas", "Armenia": "Asia", "Australia": "Oceania", "Austria": "Europe",
  "Azerbaijan": "Asia", "Bahamas": "Americas", "Bahrain": "Asia", "Bangladesh": "Asia", "Barbados": "Americas",
  "Belarus": "Europe", "Belgium": "Europe", "Belize": "Americas", "Benin": "Africa", "Bhutan": "Asia",
  "Bolivia": "Americas", "Bosnia and Herzegovina": "Europe", "Botswana": "Africa", "Brazil": "Americas", "Brunei": "Asia",
  "Bulgaria": "Europe", "Burkina Faso": "Africa", "Burundi": "Africa", "Cabo Verde": "Africa", "Cambodia": "Asia",
  "Cameroon": "Africa", "Canada": "Americas", "Central African Republic": "Africa", "Chad": "Africa", "Chile": "Americas",
  "China": "Asia", "Colombia": "Americas", "Comoros": "Africa", "Congo (Congo-Brazzaville)": "Africa", "Costa Rica": "Americas",
  "Croatia": "Europe", "Cuba": "Americas", "Cyprus": "Europe", "Czechia (Czech Republic)": "Europe", "Democratic Republic of the Congo": "Africa",
  "Denmark": "Europe", "Djibouti": "Africa", "Dominica": "Americas", "Dominican Republic": "Americas", "Ecuador": "Americas",
  "Egypt": "Africa", "El Salvador": "Americas", "Equatorial Guinea": "Africa", "Eritrea": "Africa", "Estonia": "Europe",
  "Eswatini": "Africa", "Ethiopia": "Africa", "Fiji": "Oceania", "Finland": "Europe", "France": "Europe",
  "Gabon": "Africa", "Gambia": "Africa", "Georgia": "Asia", "Germany": "Europe", "Ghana": "Africa",
  "Greece": "Europe", "Grenada": "Americas", "Guatemala": "Americas", "Guinea": "Africa", "Guinea-Bissau": "Africa",
  "Guyana": "Americas", "Haiti": "Americas", "Holy See": "Europe", "Honduras": "Americas", "Hungary": "Europe",
  "Iceland": "Europe", "India": "Asia", "Indonesia": "Asia", "Iran": "Asia", "Iraq": "Asia",
  "Ireland": "Europe", "Israel": "Asia", "Italy": "Europe", "Ivory Coast": "Africa", "Jamaica": "Americas",
  "Japan": "Asia", "Jordan": "Asia", "Kazakhstan": "Asia", "Kenya": "Africa", "Kiribati": "Oceania",
  "Kuwait": "Asia", "Kyrgyzstan": "Asia", "Laos": "Asia", "Latvia": "Europe", "Lebanon": "Asia",
  "Lesotho": "Africa", "Liberia": "Africa", "Libya": "Africa", "Liechtenstein": "Europe", "Lithuania": "Europe",
  "Luxembourg": "Europe", "Madagascar": "Africa", "Malawi": "Africa", "Malaysia": "Asia", "Maldives": "Asia",
  "Mali": "Africa", "Malta": "Europe", "Marshall Islands": "Oceania", "Mauritania": "Africa", "Mauritius": "Africa",
  "Mexico": "Americas", "Micronesia": "Oceania", "Moldova": "Europe", "Monaco": "Europe", "Mongolia": "Asia",
  "Montenegro": "Europe", "Morocco": "Africa", "Mozambique": "Africa", "Myanmar (formerly Burma)": "Asia", "Namibia": "Africa",
  "Nauru": "Oceania", "Nepal": "Asia", "Netherlands": "Europe", "New Zealand": "Oceania", "Nicaragua": "Americas",
  "Niger": "Africa", "Nigeria": "Africa", "North Korea": "Asia", "North Macedonia": "Europe", "Norway": "Europe",
  "Oman": "Asia", "Pakistan": "Asia", "Palau": "Oceania", "Palestine State": "Asia", "Panama": "Americas",
  "Papua New Guinea": "Oceania", "Paraguay": "Americas", "Peru": "Americas", "Philippines": "Asia", "Poland": "Europe",
  "Portugal": "Europe", "Qatar": "Asia", "Romania": "Europe", "Russia": "Europe", "Rwanda": "Africa",
  "Saint Kitts and Nevis": "Americas", "Saint Lucia": "Americas", "Saint Vincent and the Grenadines": "Americas", "Samoa": "Oceania", "San Marino": "Europe",
  "Sao Tome and Principe": "Africa", "Saudi Arabia": "Asia", "Senegal": "Africa", "Serbia": "Europe", "Seychelles": "Africa",
  "Sierra Leone": "Africa", "Singapore": "Asia", "Slovakia": "Europe", "Slovenia": "Europe", "Solomon Islands": "Oceania",
  "Somalia": "Africa", "South Africa": "Africa", "South Korea": "Asia", "South Sudan": "Africa", "Spain": "Europe",
  "Sri Lanka": "Asia", "Sudan": "Africa", "Suriname": "Americas", "Sweden": "Europe", "Switzerland": "Europe",
  "Syria": "Asia", "Tajikistan": "Asia", "Tanzania": "Africa", "Thailand": "Asia", "Timor-Leste": "Asia",
  "Togo": "Africa", "Tonga": "Oceania", "Trinidad and Tobago": "Americas", "Tunisia": "Africa", "Turkey": "Asia",
  "Turkmenistan": "Asia", "Tuvalu": "Oceania", "Uganda": "Africa", "Ukraine": "Europe", "United Arab Emirates": "Asia",
  "United Kingdom": "Europe", "United States of America": "Americas", "Uruguay": "Americas", "Uzbekistan": "Asia", "Vanuatu": "Oceania",
  "Venezuela": "Americas", "Vietnam": "Asia", "Yemen": "Asia", "Zambia": "Africa", "Zimbabwe": "Africa"
};

export const ALL_COUNTRIES = Object.keys(COUNTRY_REGIONS).sort();

export const REGULATED_COUNTRIES: CountryInfo[] = [
  { name: 'United Kingdom', regulator: 'Social Work England / SSSC / Social Care Wales', url: 'https://www.socialworkengland.org.uk', region: 'Europe' },
  { name: 'United States', regulator: 'Association of Social Work Boards (ASWB)', url: 'https://www.aswb.org', region: 'North America' },
  { name: 'Canada', regulator: 'Canadian Association of Social Workers (CASW)', url: 'https://www.casw-acts.ca', region: 'North America' },
  { name: 'Australia', regulator: 'Australian Association of Social Workers (AASW)', url: 'https://www.aasw.asn.au', region: 'Oceania' },
  { name: 'New Zealand', regulator: 'Social Workers Registration Board (SWRB)', url: 'https://swrb.govt.nz', region: 'Oceania' },
  { name: 'South Africa', regulator: 'SACSSP', url: 'https://www.sacssp.co.za', region: 'Africa' },
  { name: 'Ireland', regulator: 'CORU', url: 'https://www.coru.ie', region: 'Europe' },
];

export const QUALIFICATIONS: Qualification[] = [
  {
    level: 'Certificate / Access Course',
    duration: '6-12 Months',
    description: 'Foundational understanding of social care and human behavior.',
    nextSteps: 'Leads to Diploma or entry-level care roles.'
  },
  {
    level: 'Diploma in Social Work',
    duration: '2 Years',
    description: 'Technical training for auxiliary social workers or social work assistants.',
    nextSteps: 'Eligible for certain paraprofessional roles or university bridge.'
  },
  {
    level: 'Bachelor of Social Work (BSW)',
    duration: '3-4 Years',
    description: 'The standard entry-level qualification for professional registration.',
    nextSteps: 'Eligible for professional licensure in most countries.'
  },
  {
    level: 'Master of Social Work (MSW)',
    duration: '2 Years',
    description: 'Advanced clinical practice and specialized training.',
    nextSteps: 'Required for private practice or specialized clinical roles.'
  },
  {
    level: 'PhD / DSW',
    duration: '3-5 Years',
    description: 'Research-focused or high-level clinical leadership qualification.',
    nextSteps: 'University lecturing, policy research, or executive leadership.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Self-Care in High-Stress Environments',
    date: '2024-05-15',
    excerpt: 'How to maintain your mental health while working on the frontline...',
    content: 'Social work is inherently stressful. This post explores the importance of professional boundaries and mindfulness practices to prevent burnout.'
  },
  {
    id: '2',
    title: 'Navigating Child Protection Legislation',
    date: '2024-04-20',
    excerpt: 'A brief guide to recent changes in international child welfare laws...',
    content: 'Legislation is constantly evolving. Staying updated on the Children’s Act and its counterparts in other nations is crucial for compliant practice.'
  },
  {
    id: '3',
    title: 'The Future of Social Work: AI and Ethics',
    date: '2024-03-10',
    excerpt: 'Can artificial intelligence help with case management?',
    content: 'We discuss the ethical implications of using AI for documentation and risk assessment in social work settings.'
  }
];
