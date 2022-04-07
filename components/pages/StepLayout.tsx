import Step from "../Step";

interface Props {
  from: number;
  to: number;
}

const StepLayout: React.FC<Props> = ({ children, from, to }) => {
  return (
    <main className="text-white flex justify-center align-middle overflow-hidden">
      <div className="bg-player-bg  w-full sm:w-1/2	 p-8 m-8 rounded-md black text-center">
        <h1 className="text-3xl"> Welcome to your cloud music</h1>

        <p className="my-2 text">
          {" "}
          Here are few steps to set before you enjoy...
        </p>
        <Step className={"my-0 mx-auto"} from={from} to={to}></Step>
        {children}
      </div>
    </main>
  );
};

export default StepLayout;
