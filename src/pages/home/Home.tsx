import { User } from "../../api/auth"
import { user_store } from "../../store/user";
import HomeGerant from "./Gerant/HomeGerant";

function Home() {

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
