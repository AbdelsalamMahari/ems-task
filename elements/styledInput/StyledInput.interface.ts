export interface StyledInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  isTextArea?: boolean;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  required?: boolean;
  msg?: any
}