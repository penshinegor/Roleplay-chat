import {Pool} from 'pg';

class ClassRepository {
    private database: Pool;

    constructor(database: Pool) {
        this.database = database;
    }

    public async getListOfClasses() {
        return await this.database.query('SELECT id, name, description, advantage, health, damage, attack_type, ability FROM classes');
    }
}

export default ClassRepository;