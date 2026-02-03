import { FUNNEL_STAGES } from "../utils/constants";

const FunnelComponent = ({ stats }) => {
  console.log(stats);

  return (
    <>
      <section className="bg-pink-300">
        <h3>Funnel Bar</h3>
        <ul>
          {FUNNEL_STAGES.map((stage) => {
            const statusCount = stats[stage];
            return (
              <li>
                <span>{stage}: </span>{" "}
                <span className="font-extrabold w-5xl">
                  [{Array(stats[stage]).fill("|").join(" ")}] {stats[stage] || 0}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default FunnelComponent;
