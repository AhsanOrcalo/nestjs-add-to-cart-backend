import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LeadsService } from './leads.service';
import { AddLeadDto } from './dto/add-lead.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { RolesGuard } from '../users/guards/roles.guard';
import { Role } from '../users/enums/role.enum';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('add-lead')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new lead (Admin only)' })
  @ApiBody({ type: AddLeadDto })
  @ApiResponse({
    status: 201,
    description: 'Lead successfully added',
    schema: {
      example: {
        message: 'Lead added successfully',
        lead: {
          id: '1234567890',
          firstName: 'John',
          lastName: 'Doe',
          price: 50000,
          address: '123 Main Street',
          state: 'California',
          city: 'Los Angeles',
          zip: '90001',
          dob: '1990-01-15T00:00:00.000Z',
          ssn: '123-45-6789',
          email: 'john.doe@example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin access required',
    schema: {
      example: {
        statusCode: 403,
        message: 'Insufficient permissions. Admin access required.',
        error: 'Forbidden',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: ['First name must be at least 2 characters long'],
        error: 'Bad Request',
      },
    },
  })
  async addLead(@Body() addLeadDto: AddLeadDto) {
    return this.leadsService.addLead(addLeadDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all leads (Admin and User access)' })
  @ApiResponse({
    status: 200,
    description: 'List of all leads',
    schema: {
      example: [
        {
          id: '1234567890',
          firstName: 'John',
          lastName: 'Doe',
          price: 50000,
          address: '123 Main Street',
          state: 'California',
          city: 'Los Angeles',
          zip: '90001',
          dob: '1990-01-15T00:00:00.000Z',
          ssn: '123-45-6789',
          email: 'john.doe@example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '9876543210',
          firstName: 'Jane',
          lastName: 'Smith',
          price: 75000,
          address: '456 Oak Avenue',
          state: 'New York',
          city: 'New York City',
          zip: '10001',
          dob: '1985-05-20T00:00:00.000Z',
          ssn: '987-65-4321',
          email: 'jane.smith@example.com',
          createdAt: '2024-01-02T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Authentication required',
    schema: {
      example: {
        statusCode: 403,
        message: 'Insufficient permissions. Admin access required.',
        error: 'Forbidden',
      },
    },
  })
  async getAllLeads() {
    return this.leadsService.getAllLeads();
  }
}

