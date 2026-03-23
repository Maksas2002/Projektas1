import postgres from "postgres";
import 'dotenv/config';

export const sql = postgres(process.env.DATABASE_URL);

export const testConnection = async () => {
    try {
        await sql`select 1 as result`;
        console.log(`Connection to the database ${process.env.DB_NAME} was successful`);
    } catch (err) {
        console.log(`Failed to connect to the database ${process.env.DB_NAME}, ${err}`);
    }
}
