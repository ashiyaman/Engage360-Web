import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LeadContext } from "../../contexts/LeadContext"
import Summary from "./Summary"
import { SOURCES, FUNNEL_STAGES, PRIORITY } from "../../utils/constants"

const LeadDetails = () => {
    const { leadId } = useParams()
    const { leads } = useContext(LeadContext)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)

    const lead = leads.find(lead => lead._id === leadId)

    useEffect(() => {
        if(lead){
            setFormData({...lead})
        }
    }, [lead])
   
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = (e) => {
        e.preventDefault()
    }

    return(
        <div>
            <h3 className="font-semibold">Lead Details - {formData?.name}</h3>
            <Summary lead={lead}/>
            <form className="text-left" onSubmit={handleSave}>
                <div className="space-y-6">
                    <div>
                        <label>Name: </label>
                        <input type="text" 
                        value={formData?.name || ""}
                        readOnly={!isEditing}
                        onChange={e => {
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }}/>
                    </div>
                    <div>
                        <label>Sales Agent: </label>
                        <input type="text" value={lead.salesAgent.name}/>
                    </div>
                    <div>
                        <label>Source: </label>
                        <select
                            value = {formData?.source}
                            disabled={!isEditing}
                            onChange={e => {
                                setFormData({
                                    ...formData,
                                    source: e.target.value
                                })
                            }}>
                            {SOURCES.map(source => <option className="bg-#242424 text-white" key={source} value={source}>{source}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Status: </label>
                        <select
                            value = {formData?.status}
                            disabled={!isEditing}
                            onChange={e => {
                                setFormData({
                                    ...formData, 
                                    status: e.target.value})
                            }}>
                            {FUNNEL_STAGES.map(status => <option className="bg-#242424 text-white" key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Priority: </label>
                        <select
                            value = {formData?.priority}
                            disabled={!isEditing}
                            onChange={e => {
                                setFormData({
                                    ...formData, 
                                    priority: e.target.value})
                            }}>
                            {PRIORITY.map(priority => <option className="bg-#242424 text-white" key={priority} value={priority}>{priority}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Time to Close: </label>
                        <input 
                            type="number" 
                            value={formData?.timeToClose}
                            readOnly={!isEditing}
                            onChange={e => {
                                setFormData({
                                    ...formData,
                                    timeToClose: e.target.value
                                })
                            }}/>
                    </div>
                </div>
                {!isEditing 
                    ? (<button type="button" onClick={handleEdit}>Edit</button>)
                    :  (<button type="submit">Update</button>)
                }
            </form>
            <div>
                <h2>Comments</h2>
                <textarea placeholder="Add your comments here..."></textarea>
                <select>
                    <option>Sales Agent</option>
                </select>
                <button>Add Comment</button>
            </div>
        </div>
    )
}

export default LeadDetails