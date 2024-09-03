import { auth, db } from "@/firebaseConfig";
import { ref, onValue, off, set } from "firebase/database";
import { useState, useEffect } from "react";
import { FirebaseService }  from './firebaseService'
export interface Profile {
    userID: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
}

export function readProfileInformation() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const profileRef = ref(db, `users/${user.uid}`);

            const handleData = (snapshot: any) => {
                const data = snapshot.val();
                if (data) {
                    setProfile({
                        userID: user.uid,
                        fullName: data.fullName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        dateOfBirth: data.dateOfBirth
                    });
                } else {
                    setProfile(null);
                }
            };

            onValue(profileRef, handleData);

            return () => {
                off(profileRef, 'value', handleData);
            };
        }

    }, []);

    return profile;
}

export function readUserIDAndUsername() {
    const [userID, setUserID] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            setUserID(user.uid);
            const fetchData = async () => {
                const username = await FirebaseService.getUsername(user.uid);
                setUsername(username);
            };
            fetchData();
        }

    }, []);

    return { userID, username };
}