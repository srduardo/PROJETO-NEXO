import type {TextBoxProps} from './TextBoxProps';

export default function TextBox({width, margin, value}: TextBoxProps) {
    return (
        <div style={{display: 'flex', alignItems:'center', width: width, height: 40, borderRadius: 8, paddingInlineStart: 10, paddingInlineEnd: 10, borderStyle: 'none', margin: margin, backgroundColor:'#C7C7C7'}}>
            <p style={{fontSize:20, fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{value}</p>
        </div>
    )
}