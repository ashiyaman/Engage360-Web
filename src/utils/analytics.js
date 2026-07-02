import { ONE_WEEK_MS } from "./constants";

const getAnalytics = (leads) => {
 const getForwardedLeads = (leads) => {
  return leads.filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();
    if (isNaN(updatedAt)) return false;
    return lead.status !== "Closed" && Date.now() - updatedAt < ONE_WEEK_MS;
  });
};

 const getStalledPriorityLeads = (leads) => {
  return leads.filter((lead) => {
    const updatedAt = new Date(lead.updatedAt).getTime();
    return lead.priority === "High" && Date.now() - updatedAt > ONE_WEEK_MS;
  });
};

 const getStalledLeads = (leads) => {
  return leads.filter((lead) => {
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
    return leads.filter(lead => lead.status === "Closed")
}

return {
    stats: getStats(leads),
    forwardedLeads: getForwardedLeads(leads),
    stalledLeads: getStalledLeads(leads),
    stalledPriorityLeads: getStalledPriorityLeads(leads),
    closedLeads: getClosedLeads(leads)
}

}

export default getAnalytics
