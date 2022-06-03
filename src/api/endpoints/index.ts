import axios from "../axios";

const endpoints = {
    lessons: (groupParam: string) => axios.get(`/groups/${groupParam}/lessons`),
    group: (groupParam: string) => axios.get(`/groups/${groupParam}`),
    groups: (groupName: string) => axios.get(`/groups/?search={'query':'${groupName}'}`),
    week: () => axios.get("/weeks")
};

export default endpoints;