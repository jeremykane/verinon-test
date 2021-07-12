import axios from 'axios'
import { BACKEND_URL } from '../Constants.js'

class DashboardService {
    getData() {
        return axios.get(`${BACKEND_URL}/get-data`)
    }
    filter(filter1, filter2) {
        return axios.post(`${BACKEND_URL}/filter-data`, filter1, filter2)
    }
    countChartData(data) {
        return axios.post(`${BACKEND_URL}/count-chart-data`, data)
    }
}
export default new DashboardService();