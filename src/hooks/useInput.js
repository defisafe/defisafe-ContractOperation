import { useState } from 'react';
 
export default function useInput({
 initValue = ''
} = {}) {
 // 保存用户输入的值，使用 initValue 作为初始值
 const [value, setValue] = useState(initValue);
 
 function onChange(e) {
  const { value } = e.target;
  setValue(value);
 }
 
 return {
  value,
  onChange,
 };
}