export type EventType = {
  name: string;
  date: string;
  location: string;
  status: string;
};

export type EditType = EventType & {
  id: number;
};
