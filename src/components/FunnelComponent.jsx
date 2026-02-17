import { FUNNEL_STAGES } from "../utils/constants";

const FunnelComponent = ({ stats }) => {

  return (
    <>
      <section className="bg-pink-300">
        <h3>Funnel Bar</h3>
        <ul>
          {FUNNEL_STAGES.map((stage) => {
            return (
              <li className="flex flex-row" key={stage}>
                <span>{stage}: </span>{" "}
                  <div 
                  style={{width: `${stats[stage] * 10}px`}} className="font-extrabold h-3 bg-amber-50">
                </div>
                
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default FunnelComponent;
