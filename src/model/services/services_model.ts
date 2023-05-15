import Services from "../../types/services";
import pool from "../../database";
class ServicesModel {
    async getServices(): Promise<Services[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.services';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error("Error while Fetching Data");
        }
    }
}
export default ServicesModel;