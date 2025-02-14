import { User } from "../api/auth";

function useUsers() {
    return [
        {
            ID: "267",
            Name: "User 1",
            Email: "user1@contact.com",
            Available: true,
            birthAt: "Nowhere",
            birthDate: "12-12-12",
            Contact: "+2613427715",
            Post: "",
            Role: "magasinier",
            Avatar: ""
        },
        {
            ID: "y31",
            Name: "User 2",
            Email: "user2@contact.com",
            Available: true,
            birthAt: "Nowhere",
            birthDate: "12-12-12",
            Contact: "+2613427715",
            Post: "",
            Role: "magasinier",
            Avatar: ""
        },
        {
            ID: "aka",
            Name: "User 3",
            Email: "user3@contact.com",
            Available: true,
            birthAt: "Nowhere",
            birthDate: "12-12-12",
            Contact: "+2613427715",
            Post: "",
            Role: "gerant",
            Avatar: ""
        },
        {
            ID: "qls",
            Name: "User 4",
            Email: "user4@contact.com",
            Available: true,
            birthAt: "Nowhere",
            birthDate: "12-12-12",
            Contact: "+2613427715",
            Post: "",
            Role: "caissier",
            Avatar: ""
        }
    ] as User[]
}