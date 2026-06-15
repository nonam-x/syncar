import { BaseRepository } from "./base.repository";
import type { User } from "@/lib/generated/prisma";

export class UserRepository extends BaseRepository {
  /**
   * Find a user by their Clerk ID.
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find a user by their email address.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create a new user from Clerk data.
   */
  async create(data: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        imageUrl: data.imageUrl,
      },
    });
  }

  /**
   * Update user details or preferences.
   */
  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
    }
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a user (soft or hard delete).
   */
  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
