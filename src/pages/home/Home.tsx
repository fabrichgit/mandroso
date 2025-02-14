import { useEffect } from "react";
import { User } from "../../api/auth"
import { user_store } from "../../store/user";
import HomeGerant from "./Gerant/HomeGerant";

const defaultUsers = [
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
]

function Home() {

    useEffect(() => {
      localStorage.getItem('users') ? null : localStorage.setItem('users', JSON.stringify(defaultUsers))
      alert()
    }, [])

    const {data: user} = user_store()

    const HomeManager = ({user}: {user: User | null}) => {
        switch (user?.Role) {
            case "gerant":
                return <HomeGerant/>
            default:
                break;
        }
    }

  return (
    <HomeManager user={user}/>
  )
}

export default Home
