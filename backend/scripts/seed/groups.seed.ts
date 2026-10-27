import { Group } from "../../src/models/group.model";

const groupNames = [
    "1",
    "2",
    "10",
    "11",
    "A",
    "B",
    "AA",
    "AB",
    "A-1",
    "B-2",
    "FS-01",
    "FS-10",
    "FE-20",
    "JS-1",
    "React-2026",
    "Node-01",
    "Frontend",
    "Backend",
    "Група",
    "Група-А",
    "Група-Б",
    "Група-1",
    "Група-10",
    "Потік-1",
    "Потік-10",
];

export const seedGroups = async (): Promise<void> => {
    const groups = groupNames.map((name) => ({
        name,
    }));

    await Group.bulkWrite(
        groups.map((group) => ({
            updateOne: {
                filter: { name: group.name },
                update: { $setOnInsert: group },
                upsert: true,
            },
        })),
    );

    console.log("Groups successfully created.");
};
