import { Injectable } from '@nestjs/common';
import { AddLeadDto } from './dto/add-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  private leads: Lead[] = []; // In-memory storage, replace with database later

  async addLead(addLeadDto: AddLeadDto): Promise<{ message: string; lead: Lead }> {
    const newLead: Lead = {
      id: Date.now().toString(),
      firstName: addLeadDto.firstName,
      lastName: addLeadDto.lastName,
      price: addLeadDto.price,
      address: addLeadDto.address,
      state: addLeadDto.state,
      city: addLeadDto.city,
      zip: addLeadDto.zip,
      dob: new Date(addLeadDto.dob),
      ssn: addLeadDto.ssn,
      email: addLeadDto.email,
      createdAt: new Date(),
    };

    this.leads.push(newLead);

    return {
      message: 'Lead added successfully',
      lead: newLead,
    };
  }

  async getAllLeads(): Promise<Lead[]> {
    return this.leads;
  }
}

