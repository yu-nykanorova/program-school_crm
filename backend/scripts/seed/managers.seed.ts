import { ManagerStatusEnum } from "../../src/enums/manager-status.enum";
import { UserRoleEnum } from "../../src/enums/user-role.enum";
import { User } from "../../src/models/user.model";
import { passwordService } from "../../src/services/password.service";

const managerNames = [
    ["Andrii", "Shevchenko"],
    ["John", "Smith"],
    ["Olena", "Kovalenko"],
    ["Emily", "Johnson"],
    ["Dmytro", "Petrenko"],
    ["Michael", "Brown"],
    ["Mariia", "Boyko"],
    ["Jessica", "Davis"],
    ["Artem", "Moroz"],
    ["David", "Wilson"],
    ["Svitlana", "Kravchenko"],
    ["Sarah", "Miller"],
    ["Oleksandr", "Bondarenko"],
    ["James", "Taylor"],
    ["Iryna", "Tkachenko"],
    ["Emma", "Anderson"],
    ["Yaroslav", "Shevchuk"],
    ["Daniel", "Thomas"],
    ["Tetiana", "Oliynyk"],
    ["Olivia", "Martinez"],
    ["Volodymyr", "Lysenko"],
    ["William", "Garcia"],
    ["Nataliia", "Melnyk"],
    ["Sophia", "Rodriguez"],
    ["Ihor", "Marchenko"],
    ["Alexander", "Wilson"],
    ["Yuliia", "Ponomarenko"],
    ["Charlotte", "Thomas"],
    ["Maksym", "Savchenko"],
    ["Lucas", "Taylor"],
    ["Kateryna", "Rudenko"],
    ["Amelia", "Moore"],
    ["Bohdan", "Kravets"],
    ["Benjamin", "Jackson"],
    ["Anastasiia", "Polishchuk"],
    ["Isabella", "Martin"],
    ["Tarass", "Shevets"],
    ["Mason", "Lee"],
    ["Oksana", "Kushnir"],
    ["Mia", "Perez"],
    ["Serhii", "Oliynyk"],
    ["Ethan", "Thompson"],
    ["Viktoriia", "Romanenko"],
    ["Evelyn", "White"],
    ["Ivan", "Zaitsev"],
    ["Oliver", "Harris"],
    ["Lidiia", "Honcharuk"],
    ["Harper", "Sanchez"],
    ["Pavlo", "Kostiuk"],
    ["Liam", "Clark"],
];

export const seedManagers = async (): Promise<void> => {
    const hashedPassword = await passwordService.hashPassword("AAAaaa111@");

    const managers = managerNames.map(([name, surname], index) => ({
        email: `manager${index + 1}@test.com`,
        password: hashedPassword,
        name,
        surname,
        role: UserRoleEnum.MANAGER,
        status:
            index < 35
                ? ManagerStatusEnum.ACTIVE
                : index < 43
                  ? ManagerStatusEnum.NEW
                  : ManagerStatusEnum.BANNED,
        lastLogin: null,
    }));

    await User.bulkWrite(
        managers.map((manager) => ({
            updateOne: {
                filter: { email: manager.email },
                update: { $setOnInsert: manager },
                upsert: true,
            },
        })),
    );

    console.log("Managers successfully created.");
};
