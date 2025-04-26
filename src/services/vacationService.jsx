import api from './apiRH';

export const createVacation = async (vacation) => {
    try {
        const response = await api.post('/vacation', vacation);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findAllVacations = async () => {
    try {
        const response = await api.get(`/vacation`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findVacationById = async (id) => {
    try {
        const response = await api.get(`/vacation/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVacation = async (id, vacation) => {
    try {
        const response = await api.patch(`/vacation/${id}`, vacation);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteVacation = async (id) => {
    try {
        const response = await api.delete(`/vacation/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}