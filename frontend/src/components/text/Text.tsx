import type {TextProps} from './TextProps';

export default function Text({size, color='white', weight='normal', children}: TextProps) {
    return (
        <p style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", fontSize: size, color: color, fontWeight: weight, textTransform: 'uppercase', margin:0, marginBottom:15, marginTop: 15, marginRight: 'auto'}}>{children}</p>
    )
}