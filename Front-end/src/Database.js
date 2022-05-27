const API_BASE = 'localhost:8080/api/v1';

const basicFetch = async (endpoint) => {
    const request = await fetch(`${API_BASE}${endpoint}`);
    const json = await request.json();
    return json;
}
export default {
    getRegisters: async () => {
        return await basicFetch('/employee-hours');
    },
    postRegister: async (description, startHour, endHour, date) => {
        const request = await fetch(`${API_BASE}/new-employee-hours`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({description, startHour, endHour, date})
        });
        const json = await request.json();
        return json;
    },
    updateRegister: async (id, description, startHour, endHour, date) => {
        const request = await fetch(`${API_BASE}/employee-hours/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({description, startHour, endHour, date})
        });
        const json = await request.json();
        return json;
    },
    removeRegister: async (id) => {
        const request = await fetch(`${API_BASE}/remove-employee-hours/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await request.json();
        return json;
    },
    returnId: async(description, startHour, endHour, date) => {
        const dataList = await basicFetch('/employee-hours');
        const dataArray = dataList.employeeHours.data;
        let id = "";
        dataArray.forEach((item) => {
            if(item.date === date){
                item.dayWorked.forEach((register)=> {
                    if(register.description === description && register.startHour === startHour && register.endHour === endHour){
                        id = register.id;
                    }
                })
            }
        })
        return id;
    }
}