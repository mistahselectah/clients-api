## Type ORM utilities

### Migrations

#### Sync database schema

```bash
npm run schema:sync
```

#### Generate migration according to entities changes

```bash
npm run migration:generate  src/db/migrations/<MIGRATION_NAME>
```

#### Create boilerplate migration file

```bash
npm run migration:create src/db/migrations/<MIGRATION_NAME>
```

#### Execute all pending migrations


```bash
npm run migration:run
```

#### Revert the most recently executed migration

```bash
npm run migration:revert
```

#### Show all migrations and whether they've been run or not

```bash
npm run migration:show
```

### Seeding

#### Create boilerplate seed file

```bash
npm run seed:create src/db/seeds/<SEED_NAME>
```

#### Execute all pending seeds

```bash
npm run seed:run
```

#### Revert the most recently executed seed

```bash
npm run seed:revert
```
