export type TargetComponent =
  | fabric.Text
  | fabric.Ellipse
  | fabric.Image
  | fabric.Polyline
  | fabric.Rect
  | fabric.Group
  | fabric.Object
  | fabric.ActiveSelection;

export interface ChoiceComponent {
  name: string | undefined;
  data: string | undefined;
  choice: TargetComponent;
  isCorrect: boolean;
}

export interface SavedComponent {
  name: string | undefined;
  info: TargetComponent;
}
export interface ChoiceOptionContent {
  id: number;
  order: number;
  name: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface HandledProblem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceOptionContent[];
}

export interface Problem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceComponent[];
}
