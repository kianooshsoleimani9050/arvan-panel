import { FormControlProps } from "react-bootstrap";

export type InputListenerPropsType = FormControlProps & {
  onEnterKeydown: (value: string) => void;
};
