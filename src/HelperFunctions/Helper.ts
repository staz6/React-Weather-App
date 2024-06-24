const convertKelvinToCelsius = (
  kelvin: number | undefined,
): number | undefined => (kelvin !== undefined ? kelvin - 273.15 : undefined);

export default convertKelvinToCelsius;
