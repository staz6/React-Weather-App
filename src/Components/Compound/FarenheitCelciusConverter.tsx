import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";

const FarenheitCelciusConverter: React.FC = () => {
  const { isFarenheit, setIsFarenheit } = useWeatherContext();
  return (
    <div className="relative w-24 h-9">
      <div
        data-testid="tempSlider"
        className={`transition-all duration-200 absolute w-[3rem] rounded-3xl bg-white bg-opacity-30 h-9 ${isFarenheit ? "left-0" : "left-[calc(100%-3.5rem)]"}`}
      />
      <Button
        description=""
        icon=""
        testid="TempConverter"
        onClick={() => setIsFarenheit((prev) => !prev)}
        className="bg-white rounded-3xl relative bg-opacity-20 w-[5.5rem] h-9 text-[1.4rem] flex items-center justify-center gap-6 px-3 text-white"
      >
        <span>F</span>
        <span>C</span>
      </Button>
    </div>
  );
};
export default FarenheitCelciusConverter;
