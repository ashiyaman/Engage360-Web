import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { LeadContext } from "../../contexts/LeadContext";

const AddAgentForm = ({ agent = null }) => {
  const { fetchAgents } = useContext(LeadContext);
  const [formData, setFormData] = useState({
    name: agent?.name || "",
    email: agent?.email || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("formdata....", formData)
    if (agent) {
      console.log("we edit");
      try {
        const response = await axios.put(`${BASE_URL}/agents/edit/${agent._id}`, formData);
        console.log(response.data)
        if (response) {
          fetchAgents();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/agents`, formData);
        if (response) {
          fetchAgents();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form className="border-2 m-5 p-10" onSubmit={handleSave}>
      <div>
        <label>Name: </label>
        <input
          value={formData?.name}
          type="string"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          value={formData?.email}
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <button className="m-5" type="submit">
        {agent ? "Update" : "Add" }
      </button>
    </form>
  );
};

export default AddAgentForm;
