export interface Note {
  _id: String;
  userID: String | undefined;
  title: String;
  company?: String;
  description: String;
  clickup?: String;
  note: String;
  createdAt: String;
  tags: String[];
  // key?: React.Key;
}
