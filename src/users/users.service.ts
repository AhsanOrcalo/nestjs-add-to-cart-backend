import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // In-memory storage, replace with database later

  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto): Promise<{ message: string; user: { id: string; userName: string; email: string; phoneNumber: string } }> {
    const { userName, email, phoneNumber, password, confirmPassword } = registerDto;

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    // Check if username already exists
    const existingUserByUsername = this.users.find((u) => u.userName === userName);
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingUserByEmail = this.users.find((u) => u.email === email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if phone number already exists
    const existingUserByPhone = this.users.find((u) => u.phoneNumber === phoneNumber);
    if (existingUserByPhone) {
      throw new ConflictException('Phone number already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser: User = {
      id: Date.now().toString(),
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; user: { id: string; userName: string } }> {
    const { userName, password } = loginDto;

    // Find user
    const user = this.users.find((u) => u.userName === userName);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, userName: user.userName };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        userName: user.userName,
      },
    };
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }
}

