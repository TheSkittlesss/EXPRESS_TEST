import { DataSource } from 'typeorm';
import { LOG } from './blockchain.entity';

export const LOGProviders = [
  {
    provide: 'LOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LOG),
    inject: ['DATA_SOURCE'],
  },
];