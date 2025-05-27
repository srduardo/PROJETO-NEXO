import type {InputProps} from './InputProps';

export default function Input({width, placeholder, value, margin, onChange}: InputProps) {
    return (
        <input type="text" style={{width: width, height: 40, fontSize: 20, borderRadius: 8, paddingInlineStart: 10, paddingInlineEnd: 10, borderStyle: 'none', margin: margin}} onChange={onChange} placeholder={placeholder} value={value} />
    )
}