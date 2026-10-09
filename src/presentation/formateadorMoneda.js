const formatoDolares = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatearMoneda(valor) {
  return formatoDolares.format(valor)
}
