
import { useState } from "react";


const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event:React.ChangeEvent<HTMLInputElement> | React.FormEvent) => {
    setValue(((event.target) as any).value);
  };
  return {
    value,
    onChange: handleChange
};
}

export default useInput