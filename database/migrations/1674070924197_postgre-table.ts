exports.up = (pgm) => {
    pgm.createTable('classes', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true, unique: true },
        description: { type: 'text', notNull: true },
        advantage: { type: 'varchar(12)', notNull: true },
        health: { type: 'integer', notNull: true },
        damage: { type: 'integer', notNull: true },
        attack_type: { type: 'integer', notNull: true },
        ability: { type: 'integer', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createTable('users', {
        id: 'id',
        username: { type: 'varchar(100)', notNull: true, unique: true },
        email: { type: 'varchar(100)', notNull: true, unique: true },
        password: { type: 'varchar(100)', notNull: true },
        class_id: { type: 'integer', notNull: true, references: '"classes"' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

}

exports.down = pgm => {};
