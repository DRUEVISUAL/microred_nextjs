export default function ampersandConverter(value: string | undefined) {
    if (!value) return
    return value.split('&amp;').join('&')
}