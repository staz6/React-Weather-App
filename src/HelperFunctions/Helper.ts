export default function convertKelvinToCelsius(
  kelvin: number | undefined,
): number | undefined {
  return kelvin !== undefined ? kelvin - 273.15 : undefined;
}
