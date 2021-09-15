import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
	@IsOptional()
	@IsString({
		message: 'Informe um nome de usuário válido',
	})
	@ApiProperty({
		description: 'nome usuário',
		default: 'String',
		type: String
	})
	name: string;

	@IsOptional()
	@IsEmail(
		{},
		{
			message: 'Informe um endereço de email válido',
		},
	)
	@ApiProperty({
		description: 'email usuario',
		default: 'String',
		type: 'String',
	})
	email: string;

	@IsOptional()
	@ApiProperty({
		description: 'funcao usuario',
		required: false,
		default: UserRole,
		type: 'String'
	})
	role: UserRole;

	@IsOptional()
	status: boolean;
}
