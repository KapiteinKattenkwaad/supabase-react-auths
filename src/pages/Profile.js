import Auth from "../supabase/Auth";
import Account from "../supabase/Account";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/supabaseClient";

const Profile = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <>
            <div className="container" style={{ padding: '50px 0 100px 0' }}>
                {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
            </div>
        </>
    )
}

export default Profile;
