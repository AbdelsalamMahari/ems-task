interface OptionItem {
  full_name: string;
  id: string;
}

export interface StyledDropDownProps {
  label?: string;
  placeholder?: string;
  options: OptionItem[];
  value: string;
  onChange: (e:any) => void;
  name: string
}