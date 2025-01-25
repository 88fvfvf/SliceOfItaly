import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "./useFirebaseAuth";

export const useUserRole = () => {
    const { user, firestore, loading } = useFirebaseAuth();
    const [role, setRole] = useState<string | undefined>();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data()?.role || null);
                } else {
                    setRole(undefined);
                }
            }
        };

        fetchUserRole();
    }, [user, firestore]);

    return { user, role, loading };
};
