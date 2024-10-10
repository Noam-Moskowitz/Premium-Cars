interface ITabHeaders {
  value: string;
  name: string;
}

interface ITabContent {
  value: string;
  status?: string;
  title: string;
}
export interface ITab {
  headers: ITabHeaders[];
  content: ITabContent[];
}
