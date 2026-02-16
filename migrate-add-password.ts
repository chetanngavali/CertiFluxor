import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

async function addPasswordColumn() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const db = drizzle(connection);

    try {
        console.log('Adding password column to users table...');
        await connection.execute(`
      ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT 'temp_password'
    `);
        console.log('✅ Password column added successfully!');
    } catch (error: any) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('⚠️  Password column already exists, skipping...');
        } else {
            console.error('❌ Error adding password column:', error.message);
            throw error;
        }
    } finally {
        await connection.end();
    }
}

addPasswordColumn()
    .then(() => {
        console.log('Migration completed!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
