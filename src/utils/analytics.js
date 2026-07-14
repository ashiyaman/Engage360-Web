import { ONE_WEEK_MS } from "./constants";

const getAnalytics = (leads) => {
 const getForwardedLeads = (leads) => {
  return (leads || []).filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();
    if (isNaN(updatedAt)) return false;
    return lead.status !== "Closed" && Date.now() - updatedAt < ONE_WEEK_MS;
  });
};

 const getStalledPriorityLeads = (leads) => {
  return (leads || []).filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();
    return lead.priority === "High" && Date.now() - updatedAt > ONE_WEEK_MS;
  });
};

 const getStalledLeads = (leads) => {
  return (leads || []).filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();
    return lead.status !== "Closed" && Date.now() - updatedAt >= ONE_WEEK_MS;
  });
};

 const getStats = (leads) => {
  return (leads || []).reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});
}

const getClosedLeads = (leads) => {
    return (leads || []).filter(lead => lead.status === "Closed")
}

const getAgentPerformance = (leads) => {
    return (leads || []).reduce((acc, lead) => {
        const name = lead.salesAgent?.name
        if(!name) return acc
        if(!acc[name]){
            acc[name] = {total: 0, high: 0, stalled: 0, closed: 0}
        }
        const updatedAt = new Date(lead.updatedAt).getTime()
         const isStalled = lead.status !== "Closed" && Date.now() - updatedAt >= ONE_WEEK_MS;

    acc[name].total += 1;
    if (lead.priority === "High") acc[name].high += 1;
    if (isStalled) acc[name].stalled += 1;
    if (lead.status === "Closed") acc[name].closed += 1;
    return acc
    }, {})
}

const getPriorityDistributionLeads = (leads) => {
    return leads
        .filter(lead => lead.status !== "Closed")
        .reduce((acc, lead) => {
            acc[lead.priority] = (acc[lead.priority] || 0) + 1
            return acc
        }, 
    {})
}

return {
    stats: getStats(leads),
    forwardedLeads: getForwardedLeads(leads),
    stalledLeads: getStalledLeads(leads),
    stalledPriorityLeads: getStalledPriorityLeads(leads),
    closedLeads: getClosedLeads(leads),
    agentPerformance: getAgentPerformance(leads),
    priorityDistributionLeads: getPriorityDistributionLeads(leads)
}

}

export default getAnalytics

