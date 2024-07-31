import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'test';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);