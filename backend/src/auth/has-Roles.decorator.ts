import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/Role';

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles);
