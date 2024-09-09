import SignOutButton from "@/components/SignOutButton"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

async function Settings() {
    // const session = await getServerSession(authOptions)
    // const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
    //     method: "GET",
    //     headers: {
    //         "Accept": "application/json",
    //         "Authorization": `Bearer ${session.user.accessToken}`,
    //         "X-API-KEY": `${process.env.API_KEY}`,
    //     }
    // })
    // const data = await res.json()

    return (
        <div>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre>
            <SignOutButton />
            <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    )
}

export default Settings