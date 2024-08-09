import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";

const KelvinCelciusConverter: React.FC = () => {
  const { isKelvin, setIsKelvin } = useWeatherContext();
  return (
    <Button
      testid="TempConverter"
      description=""
      icon=""
      onClick={() => setIsKelvin((prev) => !prev)}
      className="w-fit bg-white bg-opacity-20  items-center  rounded-3xl flex text-2xl text-white "
    >
      <span
        className={`${isKelvin ? "bg-white bg-opacity-25 " : ""} w-12 rounded-3xl py-0.5 transition duration-300  pb-1`}
      >
        F
      </span>
      <span
        className={`${isKelvin ? "" : "bg-white bg-opacity-25 "} w-12 rounded-3xl py-0.5 transition duration-300 pr-0.5 pb-1 `}
      >
        C
      </span>
    </Button>
  );
};
export default KelvinCelciusConverter;
