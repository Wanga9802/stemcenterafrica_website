import "../../Styles/WhoWeServe.css";
import { FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";

const AUDIENCES = [
  "Schools",
  "Teachers",
  "Students",
  "NGOs",
  "Governments",
  "Corporations",
  "Foundations",
  "Universities",
];

export default function WhoWeServe() {
  return (
    <section className="wws">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="wws__inner">
              <span className="wws__eyebrow">Who we serve</span>

              <h2 className="wws__heading">
                STEM solutions designed around your goals.
              </h2>

              <p className="wws__body">
                Whether you are a school looking to establish a STEM program, an
                NGO scaling an education intervention, a company investing in
                STEM, or a government agency seeking innovation partners, SCA can
                co-design a solution with you.
              </p>

              <ul className="wws__pills">
                {AUDIENCES.map((audience) => (
                  <li className="wws__pill" key={audience}>
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="wws__custom-card">
              <div className="wws__custom-icon" aria-hidden="true">
                <FaMagic />
              </div>
              <h3 className="wws__custom-title">Need something custom?</h3>
              <p className="wws__custom-body">
                We can combine multiple services into one program—for example, a
                STEM lab setup + teacher training + student program + innovation
                challenge + impact evaluation.
              </p>
              <Link className="wws__custom-cta" to="/conversation">
                Discuss Your Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
