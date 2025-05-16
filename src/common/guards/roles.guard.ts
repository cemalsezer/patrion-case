import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Eğer herhangi bir rol belirtilmemişse erişim açık
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('🧠 req.user:', user);
    if (!user) {
    console.warn('⚠️ user boş geldi, erişim reddedildi.');
    return false;
    }
    console.log('🔐 Kullanıcı:', user);
    return requiredRoles.includes(user.role);


    return requiredRoles.includes(user.role);
  }
}
