export function formatMoney(centsAmount){
    return `$${(centsAmount / 100).toFixed(2)}`
}