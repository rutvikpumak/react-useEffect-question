export default function AddressForm({
  addForm,
  setAddForm,
  formDisplay,
  setFormDisplay,
  formSaveHandler,
  formValue
}) {
  function fillFormValue(event, fieldName) {
    const { value } = event.target;
    setAddForm((prev) => ({ ...prev, [fieldName]: value }));
  }

  function cancelForm(e) {
    e.preventDefault();
    setFormDisplay(false);
    setAddForm(formValue);
  }

  function fillFormValueWithDummy(e) {
    e.preventDefault();
    setAddForm((form) => ({
      ...form,
      name: "Admin",
      address: "33 , Baner Road",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      zipcode: "411046",
      mobile: "12345678"
    }));
  }

  return (
    <div
      style={{ display: formDisplay ? "flex" : "none" }}
      className="address-form-container"
    >
      <form className="address-form">
        <h4>ADD NEW ADDRESS</h4>
        <div className="form-input">
          <input
            placeholder="Enter Name"
            className="text-input address-form-input"
            type="text"
            value={addForm.name}
            onChange={(e) => fillFormValue(e, "name")}
          />
          <input
            placeholder="Enter House No. , Road , Colony"
            className="text-input address-form-input"
            type="text"
            value={addForm.address}
            onChange={(e) => fillFormValue(e, "address")}
          />
          <input
            placeholder="Enter City"
            className="text-input address-form-input"
            type="text"
            value={addForm.city}
            onChange={(e) => fillFormValue(e, "city")}
          />
          <input
            placeholder="Enter State"
            className="text-input address-form-input"
            type="text"
            value={addForm.state}
            onChange={(e) => fillFormValue(e, "state")}
          />
          <input
            placeholder="Enter Country"
            className="text-input address-form-input"
            type="text"
            value={addForm.country}
            onChange={(e) => fillFormValue(e, "country")}
          />
          <input
            placeholder="Enter Postal Code"
            className="text-input address-form-input"
            type="text"
            value={addForm.zipcode}
            onChange={(e) => fillFormValue(e, "zipcode")}
          />
          <input
            placeholder="Enter Mobile Number"
            className="text-input address-form-input"
            type="text"
            value={addForm.mobile}
            onChange={(e) => fillFormValue(e, "mobile")}
          />
        </div>
        <div className="address-form-btn">
          <input
            className="btn link-btn address-save"
            type="submit"
            value="Save"
            onClick={formSaveHandler}
          />

          <input
            type="reset"
            className="btn danger address-cancel"
            onClick={cancelForm}
            value="Cancel"
          />
          <input
            type="submit"
            className="btn default address-cancel"
            onClick={fillFormValueWithDummy}
            value="Fill with Dummy Values"
          />
        </div>
      </form>
    </div>
  );
}
