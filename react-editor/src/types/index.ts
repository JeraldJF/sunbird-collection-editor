export interface Node {
  id: string;
  name: string;
  primaryCategory: string;
  mimeType: string;
  children?: Node[];
  metadata?: any;
  root?: boolean;
}

export interface EditorConfig {
  context: {
    identifier: string;
    channel: string;
    framework: string;
    user: {
      id: string;
      name: string;
    };
  };
  config: {
    objectType: string;
    primaryCategory: string;
    mode: 'edit' | 'read' | 'review';
  };
}
