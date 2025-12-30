
export interface CountryInfo {
  name: string;
  regulator: string;
  url: string;
  region: string;
}

export interface Qualification {
  level: string;
  duration: string;
  description: string;
  nextSteps: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}
