import Services from "../../types/services";
import pool from "../../database";
import order from "../../types/order_types";
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

    async addservices(o: order): Promise<order> {
        try {
            const connection = await pool.connect();
            const sql = 'INSERT INTO public."order"(user_id, "Service_ID")VALUES ($1, $2) returning *';
            const result = await connection.query(sql, [
                o.user_id,
                o.Service_ID,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Error while order services !");
        }
    }
}
export default ServicesModel;