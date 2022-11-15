import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { InputListenerPropsType } from "../@types/components/InputListener.model";

export const InputListener = ({
  onEnterKeydown,
  ...props
}: InputListenerPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && inputRef.current?.value) {
        onEnterKeydown(inputRef.current.value || "");
        inputRef.current.value = "";
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onEnterKeydown]);

  return <Form.Control ref={inputRef} {...props} />;
};
