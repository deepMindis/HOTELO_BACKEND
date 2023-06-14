import Services from "../../types/services";
import pool from "../../database";
import order from "../../types/order_types";
import resturant from '../../types/resturant.types';
import resturantOrder from "../../types/resturant_order.types";
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
    async getMeals(): Promise<resturant[]> {
        try {
            const connection = await pool.connect();
            const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = 'b7658996-0643-442e-91b0-0871d85e9dd5';";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error while order services !");
        }
    }
    async getDricks(): Promise<resturant[]> {
        try {
            const connection = await pool.connect();
            const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = '9e6183fb-f4aa-4f0d-9034-129a505f539f';";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error while order services !");
        }
    }
    async getSandwinch(): Promise<resturant[]> {
        try {
            const connection = await pool.connect();
            const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = 'eeefaa80-59f6-4ef7-8e57-2e722bd75c26';";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error while order services !");
        }
    }
    async servicesOrder(o: order): Promise<order> {
        try {
            const connection = await pool.connect();
            const sql = 'INSERT INTO public."order"(user_id, "Service_ID", amount,totalprice) VALUES ($1, $2, $3,$4);'
            const result = await connection.query(
                sql,
                [
                    o.user_id,
                    o.Service_ID,
                    o.amount,
                ],
            );
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Error while fetching data");
        }
    }
    async makeResturantOrder(r: resturantOrder): Promise<resturantOrder> {
        try {
            const connection = await pool.connect();
            const sql = 'INSERT INTO public.order_resturant(user_id, resturant_id, amount, totalprice)VALUES ($1, $2, $3, $4);';
            const result = await connection.query(sql, [r.user_id, r.resturant_id, r.amount, r.totalprice]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Error While fetching data");
        }
    }

}
export default ServicesModel;