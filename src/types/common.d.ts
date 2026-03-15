interface ResponsePattern<T> {
  data: T;
  message: string;
  status: number;
  reasonStatusCode: string;
}

interface FieldError {
  field: string;
  message: string;
}

interface ErrorResponsePattern {
  timestamp: string;
  route: string;
  error: {
    code: string;
    message: string;
    fields?: FieldError[];
  };
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type Nullable<T> = T | null;
type UnionEnum<T> = `${T}`;
