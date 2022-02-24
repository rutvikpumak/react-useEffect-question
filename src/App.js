import "./styles.css";
import AddressForm from "./AddressForm";
import axios from "axios";
import { useEffect, useState } from "react";
export const apiUrl =
  "https://6215fb587428a1d2a356934b.mockapi.io/api/address/useraddress";

export default function App() {
  const formValue = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    mobile: ""
  };
  const [address, setAddress] = useState([]);
  const [flag, setFlag] = useState(false);
  const [formDisplay, setFormDisplay] = useState(false);
  const [addForm, setAddForm] = useState(formValue);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(apiUrl);
      setAddress(data);
      setFormDisplay(false);
    })();
  }, [flag]);

  async function removeAddress(id) {
    await axios.delete(`${apiUrl}/${id}`).then((res) => {
      res.status === 200 && setFlag(!flag);
    });
  }

  async function formSaveHandler(e) {
    e.preventDefault();
    let response;
    try {
      if (!addForm.id) {
        response = await axios.post(apiUrl, addForm);
        console.log("This is post response", response);
      } else {
        response = await axios.put(`${apiUrl}/${addForm.id}`, addForm);
        console.log("This is put method", response);
      }
    } catch (error) {
      console.log("this is error", error);
    }
    if (response && (response.status === 201 || response.status === 200)) {
      setFlag(!flag);
      setAddress([...address, response.data]);
      response.status === 200 && setFormDisplay(false);
    }
  }

  async function editAddress(item) {
    setFormDisplay(true);
    setAddForm((form) => ({
      ...form,
      id: item.id,
      name: item.name,
      address: item.address,
      city: item.city,
      state: item.state,
      country: item.country,
      zipcode: item.zipcode,
      mobile: item.mobile
    }));
  }

  return (
    <>
      <div className="App tab flex-center">
        <h3 className="details-header">My Addresses</h3>
        {address.map((ele) => {
          return (
            <>
              <div key={ele.id} className="address-container">
                <p className="paragraph-md">{ele.name}</p>
                <p className="paragraph-sm">
                  {ele.address} , {ele.city} ,
                </p>
                <p className="paragraph-sm">
                  {ele.state}. {ele.zipcode}
                </p>
                <p className="paragraph-sm">{ele.country}.</p>
                <p className="paragraph-sm">Phone Number : {ele.mobile}</p>
                <div className="address-btn">
                  <button
                    onClick={() => editAddress(ele)}
                    className="btn outlined-default address-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeAddress(ele.id)}
                    className="btn outlined-danger address-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
        <button
          onClick={() => {
            setFormDisplay(true);
            setAddForm(formValue);
          }}
          className="btn default address-add"
        >
          + Add New Address
        </button>
      </div>
      <AddressForm
        addForm={addForm}
        setAddForm={setAddForm}
        formDisplay={formDisplay}
        setFormDisplay={setFormDisplay}
        formSaveHandler={formSaveHandler}
        formValue={formValue}
      />
    </>
  );
}
