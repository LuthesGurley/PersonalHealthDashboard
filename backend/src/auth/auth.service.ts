import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: User; access_token: string } | null> {
    const { email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) return null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });
    const savedUser = await user.save();
    const payload = { email: savedUser.email, sub: savedUser._id };
    return { user: savedUser, access_token: this.jwtService.sign(payload) };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string } | null> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    const payload = { email: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}