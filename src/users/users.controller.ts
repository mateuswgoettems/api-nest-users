import {
	Controller,
	Post,
	Body,
	ValidationPipe,
	UseGuards,
	Get,
	Param,
	Patch,
	ForbiddenException,
	Delete,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ApiTags, ApiBody, ApiResponse, ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';


@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
	constructor(private usersService: UsersService) { }

	@Post()
	@ApiNotFoundResponse({ description: 'Not Found' })
	@ApiOkResponse({ description: 'Response OK' })
	@ApiInternalServerErrorResponse({ description: 'Algum dado não foi enviado ou foi enviado incorretamente' })
	@ApiUnauthorizedResponse({ description: 'Sem Autorização' })
	@Role(UserRole.ADMIN)
	@ApiBody({ description: 'Criação de usuário ADMIN', type: CreateUserDto })
	async createAdminUser(
		@Body(ValidationPipe) createUserDto: CreateUserDto,
	): Promise<ReturnUserDto> {
		const user = await this.usersService.createAdminUser(createUserDto);
		return {
			user,
			message: 'Administrador cadastrado com sucesso',
		};
	}

	@ApiNotFoundResponse({ description: 'Not Found' })
	@ApiOkResponse({ description: 'Response OK' })
	@ApiInternalServerErrorResponse({ description: 'Algum dado não foi enviado ou foi enviado incorretamente' })
	@ApiUnauthorizedResponse({ description: 'Sem Autorização' })
	@ApiParam({
		name: 'id',
		description: 'id do usuário',
		allowEmptyValue: false,
		required: true,
		type: String,
	})
	@Get(':id')
	@Role(UserRole.ADMIN)
	async findUserById(@Param('id') id): Promise<ReturnUserDto> {
		const user = await this.usersService.findUserById(id);
		return {
			user,
			message: 'Usuário encontrado',
		};
	}

	@ApiNotFoundResponse({ description: 'Not Found' })
	@ApiOkResponse({ description: 'Response OK' })
	@ApiInternalServerErrorResponse({ description: 'Algum dado não foi enviado ou foi enviado incorretamente' })
	@ApiUnauthorizedResponse({ description: 'Sem Autorização' })
	@ApiParam({
		name: 'id',
		description: 'id usuário',
		allowEmptyValue: false,
		required: true,
		type: String
	})
	@ApiBody({
		description: 'Update User',
		type: UpdateUserDto,
	})
	@Patch(':id')
	async updateUser(
		@Body(ValidationPipe) updateUserDto: UpdateUserDto,
		@GetUser() user: User,
		@Param('id') id: string,
	) {
		if (user.role != UserRole.ADMIN && user.id.toString() != id) {
			throw new ForbiddenException(
				'Você não tem autorização para acessar esse recurso',
			);
		} else {
			return this.usersService.updateUser(updateUserDto, id);
		}
	}


	@ApiNotFoundResponse({ description: 'Not Found' })
	@ApiOkResponse({ description: 'Response OK' })
	@ApiInternalServerErrorResponse({ description: 'Algum dado não foi enviado ou foi enviado incorretamente' })
	@ApiUnauthorizedResponse({ description: 'Sem Autorização' })
	@ApiParam({
		name: 'id',
		description: 'id usuário',
		allowEmptyValue: false,
		required: true,
		type: String
	})
	@Delete(':id')
	@Role(UserRole.ADMIN)
	async deleteUser(@Param('id') id: string) {
		await this.usersService.deleteUser(id);
		return {
			message: 'Usuário removido com sucesso',
		};
	}

}
