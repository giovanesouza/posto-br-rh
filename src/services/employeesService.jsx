import api from './apiRH';

export const createEmployee = async (employee) => {
    try {
        const response = await api.post('/employees', employee);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findAllEmployees = async (name) => {
    try {
        const response = await api.get(`/employees?name=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findEmployeeById = async (id) => {
    try {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await api.patch(`/employees/${id}`, employee);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteEmployee = async (id) => {
    try {
        const response = await api.delete(`/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}