import { AxiosResponse } from "axios";
import BaseApiService from "./BaseApiService";
import handleResponseApi from "../handleResponseApi/handleResponseApi";

export interface Color {
    id: number;
    name: string;
    status: number;
}

interface ColorListResponse {
    limit: number;
    list: Color[];
    total_record: number;
}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

class ColorApi extends BaseApiService {
    constructor(token?: string) {
        super(token);
    }

    // Fetch all colors with pagination
    async findAll(params: {
        key_search?: string;
        status?: number;
        page?: number;
        limit?: number;
    }): Promise<ApiResponse<ColorListResponse>> {
        try {
            const response: AxiosResponse<ApiResponse<ColorListResponse>> = await this.api.get("/color", {
                params: {
                    key_search: params.key_search || "",
                    status: params.status || -1,
                    page: params.page || 1,
                    limit: params.limit || 10
                }
            });
            handleResponseApi.handleResponse(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Fetch a single color by ID
    async findOne(id: number): Promise<ApiResponse<Color>> {
        try {
            const response: AxiosResponse<ApiResponse<Color>> = await this.api.get(`/color/${id}`);
            handleResponseApi.handleResponse(response);
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Change color status (active/inactive)
    async changeStatus(id: number): Promise<ApiResponse<Color>> {
        try {
            const response: AxiosResponse<ApiResponse<Color>> = await this.api.post(`/color/${id}/change-status`);
            handleResponseApi.handleResponse(response);
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Create a new color
    async create(color: {
        name: string;
    }): Promise<ApiResponse<Color>> {
        try {
            const response: AxiosResponse<ApiResponse<Color>> = await this.api.post("/color/create", color);
            handleResponseApi.handleResponse(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update an existing color
    async update(id: number, color: {
        name: string;
    }): Promise<ApiResponse<Color>> {
        try {
            const response: AxiosResponse<ApiResponse<Color>> = await this.api.post(`/color/${id}/update`, color);
            handleResponseApi.handleResponse(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

const token = localStorage.getItem("token") || undefined;
const colorApi = new ColorApi(token);
export default colorApi;