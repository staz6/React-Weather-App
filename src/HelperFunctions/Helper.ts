export default function convertKelvinToCelsius(
  kelvin: number | undefined,
): number | undefined {
  return kelvin !== undefined ? kelvin - 273.15 : undefined;
}

export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
