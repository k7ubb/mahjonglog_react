import { TextField } from '@mui/material';

type Props = {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const CustomTextField = ({ label, type, required, value, onChange }: Props) => {
  return (
    <TextField
      label={label}
      type={type}
      required={required}
      variant="outlined"
      fullWidth
      value={value} 
      onChange={onChange} 
      style={{ marginBottom: "16px" }}
    />
  );
};
