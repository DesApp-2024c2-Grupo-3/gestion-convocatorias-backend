import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioDocument } from '../../usuarios/usuarios.schema';

export type Tokens = {
    access_token: string,
    refresh_token: string
}

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateTokens(usuario: UsuarioDocument): Promise<Tokens> {
        const jwtPayload = {
            sub: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
            roles: usuario.roles,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1d',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'jwt_secret_refresh',
                expiresIn: '7d',
            }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}