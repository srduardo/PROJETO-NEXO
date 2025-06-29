export type InputProps = {
    width?: number | string,
    placeholder: string | undefined,
    value: string | undefined,
    margin?: number | string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string
}