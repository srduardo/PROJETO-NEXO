import type {InputProps} from './InputProps';

export default function Input({width, placeholder, value, onChange}: InputProps) {
    return (
        <input type="text" style={{width: width, height: 40, fontSize: 20, borderRadius: 8, paddingInlineStart: 10, paddingInlineEnd: 10, borderStyle: 'none', margin: 15}} onChange={onChange} placeholder={placeholder} value={value} />
    )
}