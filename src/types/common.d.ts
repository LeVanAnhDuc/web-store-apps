interface ResponsePattern<T> {
  data: T;
  message: string;
  status: number;
  reasonStatusCode: string;
}

interface ValidationErrorItem {
  field: string;
  reason: string;
  message: string;
}

interface ErrorResponsePattern {
  code: string;
  message: string;
  timestamp: string;
  path: string;
  errors?: ValidationErrorItem[];
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type Nullable<T> = T | null;
type UnionEnum<T> = `${T}`;
