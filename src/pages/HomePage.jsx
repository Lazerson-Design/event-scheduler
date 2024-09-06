// plceholder
export default function HomePage() {
  return (
    <div className="container mx-auto">
      Welcome to the Home Page
      <ul className="flex flex-wrap justify-center gap-6">
        <li>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://imgs.search.brave.com/cKUyB8cK4e0PdHTJK5lAGYJqFdZmSx2r_T8Yfs4ZKqc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTIy/Nzc3OTMvcGhvdG8v/c2hvcC1pbnRlcmlv/ci5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9U0RiOUszZWdw/eGxieWI1V0VQZER1/bEZSVlpIUC1BUWtQ/dW1IWHZQTmpRMD0"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shopping!</h2>
              <p>Click the button form many details</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View details</button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://imgs.search.brave.com/pg4RLxOLUuLMsN4MBIa6ebtdNe26IWjOGl7-esDuOYE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzgwLzE2LzM3/LzM2MF9GXzI4MDE2/Mzc0M19VeDEwZ1RP/Ymo5WWRRVTg2cFhL/NzVLUmdkSmxsUWxQ/ay5qcGc"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Wedding!</h2>
              <p>Click the button form many details</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View details</button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://imgs.search.brave.com/mXZhQ2UkDLCJ_EmTLqYIF7xefH_x10LORjx2_FEZDu8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9idXNpbmVzcy1t/ZWV0aW5nLXNjZW5l/XzkwNjM4NS0yOTYz/Ni5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Meeting!</h2>
              <p>Click the button form many details</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View details</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
