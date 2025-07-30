import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/user/Role";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector ,private jwtService:JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    
  const request = context.switchToHttp().getRequest();

  // Extract the JWT token from the Authorization header
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    return false; // No token provided, deny access
  }
  const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
  if (!token) {
    return false; // No token after "Bearer", deny access
  }
    // Get the required roles from metadata
   
    
    
  // Verify and decode the token
  try {
    const decoded = this.jwtService.verify(token);

    // Extract the user's role from the decoded token
    const userRole = decoded.role;
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // Check if the user's role matches any required role
    return requiredRoles.includes(userRole);
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return false; // Invalid token, deny access
  }

    
  }

  


}
