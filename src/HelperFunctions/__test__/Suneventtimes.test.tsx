import suneventtimes from "../Suneventtimes";

describe("suneventtimes function Tests", () => {
  it("should return the correct sun event times for valid input", () => {
    const currentWeatherData = {
      sys: {
        sunrise: 1721780917,
        sunset: 1721830237,
      },
    };

    const result = suneventtimes(currentWeatherData);

    expect(result).toEqual([
      {
        name: "Sunrise",
        ampm: "5:28 AM", // Adjust based on your timezone
        militaryTime: "5:28",
      },
      {
        name: "Golden Hour",
        ampm: "6:28 AM", // Adjust based on your timezone
        militaryTime: "6:28",
      },
      {
        name: "Sunset",
        ampm: "7:10 PM", // Adjust based on your timezone
        militaryTime: "19:10",
      },
    ]);
  });

  it("should return an empty array when currentWeatherData is undefined", () => {
    const result = suneventtimes(undefined);

    expect(result).toEqual([]);
  });
});
