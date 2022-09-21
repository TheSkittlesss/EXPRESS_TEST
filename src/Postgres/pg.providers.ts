import { DataSource } from 'typeorm';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'P@ssw0rd',
        database: 'new-task',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      });

      
      return dataSource.initialize();
      
    },
  },
];
