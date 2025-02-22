import { useEffect } from "react";
import { User } from "../../api/auth"
import { user_store } from "../../store/user";
import HomeGerant from "./Gerant/HomeGerant";
import { useStore_Users } from "../../store/data";
import HomeVendeur from "./Vendeur/HomeVendeur";

const defaultUsers: User[] = [
  {
    ID: "267",
    LastName: "son prenom",
    Name: "magasinier 1",
    Email: "user1@contact.com",
    Available: true,
    birthAt: "Nowhere",
    birthDate: "1992-12-12",
    Contact: ["+2613427715"],
    Post: "",
    Role: "magasinier",
    Avatar: ""
  },
  {
    ID: "y31",
    Name: "magasinier 2",
    LastName: "son prenom",
    Email: "user2@contact.com",
    Available: true,
    birthAt: "Nowhere",
    birthDate: "1992-12-12",
    Contact: ["+2613427715"],
    Post: "",
    Role: "magasinier",
    Avatar: ""
  },
  {
    ID: "aka",
    Name: "gerant 1",
    LastName: "son prenom",
    Email: "user3@contact.com",
    Available: true,
    birthAt: "Nowhere",
    birthDate: "1992-12-12",
    Contact: ["+2613427715"],
    Post: "",
    Role: "gerant",
    Avatar: ""
  },
  {
    ID: "qls",
    Name: "caissier 1",
    LastName: "son prenom",
    Email: "user4@contact.com",
    Available: true,
    birthAt: "Nowhere",
    birthDate: "1992-12-12",
    Contact: ["+2613427715"],
    Post: "",
    Role: "caissier",
    Avatar: ""
  },
  {
    ID: "safd",
    Name: "vendeur",
    LastName: "son prenom",
    Email: "user4@contact.com",
    Available: true,
    birthAt: "Nowhere",
    birthDate: "1992-12-12",
    Contact: ["+2613427715"],
    Post: "",
    Role: "vendeur",
    Avatar: ""
  }
]

function Home() {

  const { reFetch } = useStore_Users()
  const { data: user } = user_store();

  useEffect(() => {
    localStorage.getItem('users') ? null : localStorage.setItem('users', JSON.stringify(defaultUsers));
    reFetch()
  }, [])

  const HomeManager = ({ user }: { user: User | null }) => {
    switch (user?.Role) {
      case "gerant":
        return <HomeGerant />;
      case "vendeur":
        return <HomeVendeur />;
      default:
        break;
    }
  }

  return <HomeManager user={user} />
}

export default Home;