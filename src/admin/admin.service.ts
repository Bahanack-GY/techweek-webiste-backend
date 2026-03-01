import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService implements OnModuleInit {
    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    ) { }

    async onModuleInit() {
        // Check if any admin exists, if not, create a default root admin
        const count = await this.adminModel.countDocuments();
        if (count === 0) {
            console.log('No admins found, creating default root admin: admin / techweek2026');
            await this.create({ username: 'admin', password: 'techweek2026' });
        }
    }

    async create(createAdminDto: CreateAdminDto) {
        const existing = await this.findByUsername(createAdminDto.username);
        if (existing) {
            throw new ConflictException('Admin with this username already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(createAdminDto.password, salt);

        const newAdmin = new this.adminModel({
            username: createAdminDto.username,
            passwordHash,
        });
        const saved = await newAdmin.save();

        // Do not return hash
        const adminObj = saved.toObject();
        const { passwordHash: _, ...result } = adminObj;
        return result;
    }

    async findAll() {
        return this.adminModel.find().select('-passwordHash').exec();
    }

    async findByUsername(username: string): Promise<AdminDocument | null> {
        return this.adminModel.findOne({ username }).exec();
    }
}
