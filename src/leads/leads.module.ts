import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { RolesGuard } from '../users/guards/roles.guard';

@Module({
  imports: [PassportModule],
  controllers: [LeadsController],
  providers: [LeadsService, RolesGuard],
  exports: [LeadsService],
})
export class LeadsModule {}

