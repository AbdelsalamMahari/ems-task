interface OptionItem {
  label: string;
  value: string;
}

export interface StyledDropDownProps {
  label?: string;
  placeholder?: string;
  options: OptionItem[];
  value: string;
  onChange: (e:any) => void;
}