import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from './registration.schema';
import { CreateRegistrationDto } from './create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel: Model<RegistrationDocument>,
  ) {}

  async create(dto: CreateRegistrationDto): Promise<Registration> {
    const allEmails = [
      dto.leaderEmail.toLowerCase(),
      ...dto.members.map((m) => m.email.toLowerCase()),
    ];
    const allPhones = [dto.leaderPhone, ...dto.members.map((m) => m.phone)];

    // Check for duplicates within the submission itself
    if (new Set(allEmails).size !== allEmails.length) {
      throw new ConflictException(
        'Des emails en double ont été détectés dans votre soumission.',
      );
    }
    if (new Set(allPhones).size !== allPhones.length) {
      throw new ConflictException(
        'Des numéros de téléphone en double ont été détectés dans votre soumission.',
      );
    }

    // Check emails against existing registrations
    const emailConflict = await this.registrationModel.findOne({
      $or: [
        { leaderEmail: { $in: allEmails } },
        { 'members.email': { $in: allEmails } },
      ],
    });
    if (emailConflict) {
      throw new ConflictException(
        'Un ou plusieurs emails sont déjà utilisés dans une autre inscription.',
      );
    }

    // Check phones against existing registrations
    const phoneConflict = await this.registrationModel.findOne({
      $or: [
        { leaderPhone: { $in: allPhones } },
        { 'members.phone': { $in: allPhones } },
      ],
    });
    if (phoneConflict) {
      throw new ConflictException(
        'Un ou plusieurs numéros de téléphone sont déjà utilisés dans une autre inscription.',
      );
    }

    return this.registrationModel.create(dto);
  }

  async findAll(): Promise<Registration[]> {
    return this.registrationModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByContest(contestType: string): Promise<Registration[]> {
    return this.registrationModel
      .find({ contestType })
      .sort({ createdAt: -1 })
      .exec();
  }
}
