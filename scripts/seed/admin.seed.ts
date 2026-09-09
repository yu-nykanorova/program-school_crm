import { config } from "../../src/configs/config";
import { UserRoleEnum } from "../../src/enums/user-role.enum";

export const seedAdmin = async (): Promise<void> => {
    const admin = await userRepository.getByEmail(config.ADMIN_EMAIL);

    if (admin) {
        console.log(
            "Admin already exists. Use admin data to login the platform as admin.",
        );
        return;
    }

    const hashedPassword = await passwordService.hashPassword(
        config.ADMIN_PASSWORD,
    );

    await userRepository.create({
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        name: "admin",
        surname: "super",
        role: UserRoleEnum.ADMIN,
    });

    console.log("Admin successfully created.");
};
