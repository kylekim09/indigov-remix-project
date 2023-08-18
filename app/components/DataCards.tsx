import { Constituent } from "~/types"

interface DataCardsProps {
  dataList: Constituent[]
} 

/**
 * 
 * @param param0 
 * @returns Data
 */
export default function DataCards({dataList}: DataCardsProps) {
  return (
    <div className="card-view">
      {dataList.map((value, index) => {
        return (
          <section className="card" key={value.email}>
            <header>
              <h3>{value.first_name} {value.last_name}</h3>
            </header>
            <div className="card-body">
              <div>
                <p>Email: {value.email}</p>
                <p>Phone Number: {value.phone_number}</p>
              </div>
              <div>
                <p>Address: {value.street_address_1}</p>
                <p>Address 2: {value.street_address_2 === "" ? "N/A" : value.street_address_2} </p>
              </div>
              <div>
                <p>City: {value.city}</p>
                <p>State: {value.state}</p>
                <p>Zip Code: {value.zip_code}</p>
              </div>
            </div>
          </section>
        )})}
    </div>
  )
}
